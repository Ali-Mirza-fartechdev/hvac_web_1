// Pulls text and images out of the AERIS Figma file so they can replace the draft copy.
//
//   1. Create a personal access token in Figma (Settings > Security) with "File content: read".
//   2. Copy .env.example to .env and set FIGMA_TOKEN.
//   3. npm run figma:extract
//
// Output:
//   src/data/figma-extracted.json   text per screen, grouped by section, in reading order
//   public/images/<screen>/<id>.png images found in each screen (2x)
//
// Then move the text into src/data/content.js (or ask Claude to map it for you).
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const env = existsSync('.env') ? Object.fromEntries((await readFile('.env', 'utf8')).split('\n').filter((l) => l.includes('=') && !l.startsWith('#')).map((l) => l.split(/=(.*)/s).slice(0, 2).map((s) => s.trim()))) : {}
const TOKEN = process.env.FIGMA_TOKEN || env.FIGMA_TOKEN
const KEY = process.env.FIGMA_FILE_KEY || env.FIGMA_FILE_KEY || 'hMANDNt7BpYnAItNCKbomm'
if (!TOKEN) { console.error('Set FIGMA_TOKEN (see .env.example).'); process.exit(1) }

const api = async (url) => {
  const r = await fetch(`https://api.figma.com/v1${url}`, { headers: { 'X-Figma-Token': TOKEN } })
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`)
  return r.json()
}
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

console.log('Fetching file...')
const file = await api(`/files/${KEY}`)
const canvas = file.document.children.find((c) => c.children?.some((n) => n.name?.startsWith('AERIS | ')))
const screens = canvas.children.filter((n) => n.type === 'FRAME' && n.name.startsWith('AERIS | '))

const out = {}
const imageNodes = {}
for (const screen of screens) {
  const title = screen.name.replace('AERIS | ', '')
  const main = screen.children.find((c) => c.name === 'Main')
  const sections = []
  const walk = (node, bucket) => {
    if (node.visible === false) return
    if (node.type === 'TEXT') { bucket.push({ text: node.characters, size: node.style?.fontSize, y: node.absoluteBoundingBox?.y, x: node.absoluteBoundingBox?.x }); return }
    if (node.fills?.some((f) => f.type === 'IMAGE' && f.visible !== false) && node.absoluteBoundingBox?.width > 120) {
      ;(imageNodes[title] ||= []).push({ id: node.id, name: node.name, w: Math.round(node.absoluteBoundingBox.width), h: Math.round(node.absoluteBoundingBox.height) })
    }
    node.children?.forEach((c) => walk(c, bucket))
  }
  // Main > Container > Section frames
  const container = main?.children?.[0]
  const sectionFrames = container?.children?.length ? container.children : main?.children || []
  for (const sec of sectionFrames) {
    const texts = []
    walk(sec, texts)
    texts.sort((a, b) => a.y - b.y || a.x - b.x)
    if (texts.length) sections.push({ frame: sec.name, texts: texts.map(({ text, size }) => ({ text, size })) })
  }
  const footer = screen.children.find((c) => c.name === 'Footer')
  out[title] = { slug: slug(title), sections }
  console.log(`  ${title}: ${sections.length} sections`)
}
await writeFile('src/data/figma-extracted.json', JSON.stringify(out, null, 2))

console.log('Exporting images...')
for (const [title, nodes] of Object.entries(imageNodes)) {
  const ids = nodes.map((n) => n.id).join(',')
  const { images } = await api(`/images/${KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=2`)
  const dir = path.join('public', 'images', slug(title))
  await mkdir(dir, { recursive: true })
  for (const n of nodes) {
    const url = images[n.id]
    if (!url) continue
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer())
    await writeFile(path.join(dir, `${n.id.replace(':', '-')}.png`), buf)
  }
  console.log(`  ${title}: ${nodes.length} images`)
}
console.log('Done. Wire images with media: { src: "/images/<screen>/<id>.png" } in src/data/content.js.')
