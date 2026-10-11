// Runs after the client + SSR builds. Writes one static HTML file per route with the full page
// content and its own <title>, meta description, canonical, Open Graph tags and JSON-LD, so search
// engines and link previews see real content without running JavaScript. Also writes sitemap.xml,
// robots.txt and 404.html.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = 'dist'
const server = await import(pathToFileURL(path.resolve(DIST, '.server/entry-server.js')).href)
const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

const strip = (html) => html.replace(/<title>[\s\S]*?<\/title>\s*/i, '').replace(/<meta name="description"[^>]*>\s*/i, '')
const base = strip(template)

function page(url, seoPath) {
  const app = server.render(url)
  const head = server.headTags(server.getSeo(seoPath))
  return base.replace('</head>', `    ${head}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${app}</div>`)
}

const routes = server.PAGES.map((p) => p.path)
for (const route of routes) {
  const out = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html')
  await mkdir(path.dirname(out), { recursive: true })
  await writeFile(out, page(route, route))
}
await writeFile(path.join(DIST, '404.html'), page('/page-not-found', '/page-not-found'))

const today = new Date().toISOString().slice(0, 10)
const url = server.SITE.url
const priority = (r) => (r === '/' ? '1.0' : r.split('/').length === 2 ? '0.8' : '0.6')
await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map((r) => `  <url><loc>${url}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod><priority>${priority(r)}</priority></url>`).join('\n') +
    `\n</urlset>\n`,
)
await writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${url}/sitemap.xml\n`)
await rm(path.join(DIST, '.server'), { recursive: true, force: true })
console.log(`Prerendered ${routes.length} pages + 404, sitemap.xml and robots.txt for ${url}`)
