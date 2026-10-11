// Pulls text and the ORIGINAL image files out of the AERIS Figma file.
//
//   1. Figma > Settings > Security > create a personal access token (scope: File content - read).
//   2. cp .env.example .env   and set FIGMA_TOKEN
//   3. npm run figma:extract
//
// Output:
//   public/images/*.jpg|png       original images from the file (not re-rendered screenshots)
//   public/images/manifest.json   key -> file, read by the site at runtime (no code change needed)
//   public/images/IMAGE-REPORT.json  every image node: screen, size, nearby text (for manual fixes)
//   src/data/figma-extracted.json text per screen, per section, in reading order
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { PAGES } from '../src/data/site.js'

const env = existsSync('.env') ? Object.fromEntries((await readFile('.env', 'utf8')).split('\n').filter((l) => l.includes('=') && !l.startsWith('#')).map((l) => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })) : {}
const TOKEN = process.env.FIGMA_TOKEN || env.FIGMA_TOKEN
const KEY = process.env.FIGMA_FILE_KEY || env.FIGMA_FILE_KEY || 'hMANDNt7BpYnAItNCKbomm'
if (!TOKEN) { console.error('Set FIGMA_TOKEN in .env (see .env.example).'); process.exit(1) }

const api = async (url) => {
  const r = await fetch(`https://api.figma.com/v1${url}`, { headers: { 'X-Figma-Token': TOKEN } })
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`)
  return r.json()
}
const slug = (s = '') => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const pathKey = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '-'))

console.log('Fetching file tree...')
const file = await api(`/files/${KEY}`)
const canvas = file.document.children.find((c) => c.children?.some((n) => n.name?.startsWith('AERIS | ')))
const screens = canvas.children.filter((n) => n.type === 'FRAME' && n.name.startsWith('AERIS | '))

const text = {}
const images = [] // every visible node with an image fill
for (const screen of screens) {
  const title = screen.name.replace('AERIS | ', '')
  const top = screen.absoluteBoundingBox.y
  const sections = []

  const textsIn = (node, acc = []) => {
    if (node.visible === false) return acc
    if (node.type === 'TEXT') acc.push({ text: node.characters, size: node.style?.fontSize, y: node.absoluteBoundingBox?.y, x: node.absoluteBoundingBox?.x })
    node.children?.forEach((c) => textsIn(c, acc))
    return acc
  }
  const walk = (node, parents) => {
    if (node.visible === false || node.name === 'Header') return
    const fills = Array.isArray(node.fills) ? node.fills : []
    const img = fills.find((f) => f.type === 'IMAGE' && f.visible !== false && f.imageRef)
    if (img && node.absoluteBoundingBox && node.absoluteBoundingBox.width >= 120) {
      const box = node.absoluteBoundingBox
      // nearby text: from the closest ancestor that actually contains some text
      let near = []
      for (let i = parents.length - 1; i >= 0 && !near.length; i--) near = textsIn(parents[i]).map((t) => t.text.replace(/\s+/g, ' ').trim()).filter((t) => t.length > 2 && t.length < 90).slice(0, 4)
      images.push({ screen: title, node: node.id, ref: img.imageRef, w: Math.round(box.width), h: Math.round(box.height), y: Math.round(box.y - top), name: node.name, near })
    }
    node.children?.forEach((c) => walk(c, [...parents, node]))
  }
  const main = screen.children.find((c) => c.name === 'Main')
  const container = main?.children?.[0]
  const frames = container?.children?.length ? container.children : main?.children || []
  for (const sec of frames) {
    const t = textsIn(sec).sort((a, b) => a.y - b.y || a.x - b.x)
    if (t.length) sections.push({ frame: sec.name, texts: t.map(({ text, size }) => ({ text, size })) })
  }
  walk(screen, [])
  text[title] = { slug: slug(title), sections }
  console.log(`  ${title}: ${sections.length} sections`)
}
await mkdir('src/data', { recursive: true })
await writeFile('src/data/figma-extracted.json', JSON.stringify(text, null, 2))

// ---- original image files ----
console.log(`Downloading ${new Set(images.map((i) => i.ref)).size} unique images...`)
const { meta } = await api(`/files/${KEY}/images`)
const urls = meta?.images || {}
await mkdir('public/images', { recursive: true })
const fileFor = {}
for (const ref of new Set(images.map((i) => i.ref))) {
  const url = urls[ref]
  if (!url) { console.warn('  no URL for', ref); continue }
  const res = await fetch(url)
  const type = res.headers.get('content-type') || ''
  const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : type.includes('svg') ? 'svg' : 'jpg'
  const name = `${ref.slice(0, 10)}.${ext}`
  await writeFile(path.join('public/images', name), Buffer.from(await res.arrayBuffer()))
  fileFor[ref] = `/images/${name}`
}

// ---- manifest: hero-<page> from the biggest above-the-fold image, plus card keys from nearby titles ----
const manifest = existsSync('public/images/manifest.json') ? JSON.parse(await readFile('public/images/manifest.json', 'utf8')) : {}
for (const screen of screens) {
  const title = screen.name.replace('AERIS | ', '')
  const page = PAGES.find((p) => p.title === title)
  const mine = images.filter((i) => i.screen === title && fileFor[i.ref])
  const hero = mine.filter((i) => i.y < 1000 && i.w >= 500).sort((a, b) => b.w * b.h - a.w * a.h)[0]
  if (hero && page) manifest[`hero-${pathKey(page.path)}`] ??= fileFor[hero.ref]
  for (const i of mine) {
    if (i === hero) continue
    for (const t of i.near.slice(0, 3)) { const k = slug(t); if (k && k.length > 3) manifest[k] ??= fileFor[i.ref] }
  }
}
await writeFile('public/images/manifest.json', JSON.stringify(manifest, null, 2))
await writeFile('public/images/IMAGE-REPORT.json', JSON.stringify(images.map((i) => ({ ...i, file: fileFor[i.ref] })), null, 2))
console.log(`Done. ${Object.keys(fileFor).length} images, ${Object.keys(manifest).length} manifest keys.`)
console.log('Check public/images/IMAGE-REPORT.json; edit manifest.json if any image landed on the wrong card.')
