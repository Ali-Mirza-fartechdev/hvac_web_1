import { SITE, byPath, crumbs } from './data/site'
import { CONTENT, NOT_FOUND } from './data/content'

const abs = (p) => SITE.url + (p === '/' ? '/' : p)
const BUSINESS_ID = `${SITE.url}/#business`

function business() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': BUSINESS_ID,
    name: SITE.name,
    url: SITE.url + '/',
    telephone: SITE.phoneE164,
    image: abs('/og.png'),
    logo: abs('/favicon.svg'),
    description: 'Architectural-grade heating, cooling and indoor air quality engineering for residential and commercial properties.',
    areaServed: { '@type': 'City', name: SITE.area },
    knowsAbout: ['HVAC installation', 'Heat pumps', 'VRF systems', 'Hydronic heating', 'Indoor air quality', 'HVAC maintenance'],
  }
}

const plain = (t) => String(t).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

function faqItems(content) {
  return (content.sections || []).filter((s) => s.type === 'faq').flatMap((s) => s.items)
}

function buildJsonLd(path, c) {
  const out = []
  if (path === '/') {
    out.push(business())
    out.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url + '/', publisher: { '@id': BUSINESS_ID } })
  } else {
    const trail = crumbs(path)
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.label, item: abs(t.path) })),
    })
  }
  const faqs = faqItems(c)
  if (faqs.length) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
    })
  }
  if (c.schema === 'service') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: c.hero.title,
      serviceType: c.serviceType || c.hero.title,
      description: c.seo.description,
      provider: { '@id': BUSINESS_ID },
      areaServed: { '@type': 'City', name: SITE.area },
      url: abs(path),
    })
  }
  if (c.schema === 'article') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: c.hero.title,
      description: c.seo.description,
      datePublished: c.published,
      dateModified: c.published,
      author: { '@id': BUSINESS_ID },
      publisher: { '@id': BUSINESS_ID },
      image: abs('/og.png'),
      mainEntityOfPage: abs(path),
    })
  }
  if (c.schema === 'contact') {
    out.push({ '@context': 'https://schema.org', '@type': 'ContactPage', name: c.hero.title, url: abs(path), about: { '@id': BUSINESS_ID } })
  }
  if (path !== '/' && c.schema) out.push({ ...business(), '@context': undefined })
  return out
}

export function getSeo(path) {
  const found = CONTENT[path]
  const c = found || NOT_FOUND
  return {
    title: c.seo.title,
    description: c.seo.description,
    canonical: found ? abs(path) : null,
    image: abs('/og.png'),
    robots: found ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
    type: c.schema === 'article' ? 'article' : 'website',
    jsonld: found ? buildJsonLd(path, c) : [],
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Static <head> markup for the prerender step.
export function headTags(seo) {
  const t = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    seo.canonical ? `<link rel="canonical" href="${seo.canonical}" />` : '',
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    seo.canonical ? `<meta property="og:url" content="${seo.canonical}" />` : '',
    `<meta property="og:image" content="${seo.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.image}" />`,
    ...seo.jsonld.map((j) => `<script type="application/ld+json" data-seo>${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ]
  return t.filter(Boolean).join('\n    ')
}

// Keeps the head in sync when visitors navigate client-side.
export function applyHead(seo) {
  document.title = seo.title
  const meta = (sel, attr, key, val) => {
    let el = document.head.querySelector(sel)
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
    el.setAttribute('content', val)
  }
  meta('meta[name="description"]', 'name', 'description', seo.description)
  meta('meta[name="robots"]', 'name', 'robots', seo.robots)
  meta('meta[property="og:title"]', 'property', 'og:title', seo.title)
  meta('meta[property="og:description"]', 'property', 'og:description', seo.description)
  meta('meta[property="og:type"]', 'property', 'og:type', seo.type)
  meta('meta[property="og:image"]', 'property', 'og:image', seo.image)
  meta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title)
  meta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description)
  let link = document.head.querySelector('link[rel="canonical"]')
  if (seo.canonical) {
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
    link.href = seo.canonical
    meta('meta[property="og:url"]', 'property', 'og:url', seo.canonical)
  } else link?.remove()
  document.head.querySelectorAll('script[data-seo]').forEach((n) => n.remove())
  seo.jsonld.forEach((j) => {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.dataset.seo = ''
    s.textContent = JSON.stringify(j)
    document.head.appendChild(s)
  })
}
