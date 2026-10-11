// Site map mirrors the Figma file: 17 screens, grouped by the header navigation.
export const SITE = {
  name: 'AERIS',
  tagline: 'Architectural-grade climate engineering',
  phone: '(800) 582-AERIS',
  phoneHref: 'tel:+18005822374',
  phoneE164: '+1-800-582-2374',
  // Set VITE_SITE_URL in Vercel (Settings > Environment Variables) once the real domain is connected.
  url: (import.meta.env?.VITE_SITE_URL || 'https://hvac-web-1.vercel.app').replace(/\/$/, ''),
  area: 'New York City',
}

// parent drives breadcrumbs + "children" sections. group drives the active nav pill.
export const PAGES = [
  { path: '/', label: 'Home', title: 'Comfort, Elevated', group: null, parent: null },

  { path: '/services', label: 'Services', title: 'Services Overview', group: 'services', parent: '/' },
  { path: '/services/residential-hvac', label: 'Residential HVAC', title: 'Residential HVAC', group: 'services', parent: '/services' },
  { path: '/services/commercial-hvac', label: 'Commercial HVAC', title: 'Commercial HVAC', group: 'services', parent: '/services' },
  { path: '/services/ac-installation', label: 'AC Installation', title: 'AC Installation', group: 'services', parent: '/services' },
  { path: '/service-areas', label: 'Service Areas', title: 'Service Areas Directory', group: 'services', parent: '/services' },
  { path: '/service-areas/tribeca-manhattan', label: 'Tribeca, Manhattan', title: 'Tribeca, Manhattan Service Area', group: 'services', parent: '/service-areas' },

  { path: '/projects', label: 'Projects', title: 'Projects & Portfolio', group: 'projects', parent: '/' },

  { path: '/about', label: 'About', title: 'About Us', group: 'about', parent: '/' },
  { path: '/about/client-reviews', label: 'Client Reviews', title: 'Client Reviews & Endorsements', group: 'about', parent: '/about' },

  { path: '/resources', label: 'Resources', title: 'Knowledge Center & Engineering Dossiers', group: 'resources', parent: '/' },
  { path: '/resources/faq', label: 'FAQ', title: 'Architectural & Technical FAQ', group: 'resources', parent: '/resources' },
  { path: '/resources/acoustic-threshold-inaudible-vrf', label: 'The Acoustic Threshold', title: 'The Acoustic Threshold: Inaudible VRF in Historic Brownstones', group: 'resources', parent: '/resources' },

  { path: '/contact', label: 'Contact', title: 'Contact Us', group: 'contact', parent: '/' },
  { path: '/request-estimate', label: 'Request an Estimate', title: 'Request an Estimate', group: null, parent: '/' },
  { path: '/privacy-policy', label: 'Privacy Policy', title: 'Privacy Policy', group: null, parent: '/' },
]
// The 17th screen is the 404 page (rendered by the catch-all route).

export const NAV = [
  { label: 'Services', to: '/services', group: 'services' },
  { label: 'Projects', to: '/projects', group: 'projects' },
  { label: 'About', to: '/about', group: 'about' },
  { label: 'Resources', to: '/resources', group: 'resources' },
  { label: 'Contact', to: '/contact', group: 'contact' },
]

export const FOOTER = [
  {
    heading: 'Systems',
    links: [
      { label: 'Residential HVAC', to: '/services/residential-hvac' },
      { label: 'Commercial HVAC', to: '/services/commercial-hvac' },
      { label: 'Residential AC', to: '/services/ac-installation' },
      { label: 'Hydronic Heating', to: '/services' },
      { label: 'Heat Pumps & VRF', to: '/services' },
      { label: 'IAQ & HEPA Filtration', to: '/services' },
      { label: 'Maintenance Plans', to: '/services' },
    ],
  },
  {
    heading: 'Practice',
    links: [
      { label: 'About AERIS', to: '/about' },
      { label: 'Case Studies', to: '/projects' },
      { label: 'Knowledge Center', to: '/resources' },
      { label: 'Service Areas', to: '/service-areas' },
      { label: 'Careers & Fellowships', to: '/about' },
    ],
  },
  {
    heading: 'Services & Engagement',
    links: [
      { label: '24/7 Rapid Incident Response', to: '/contact' },
      { label: 'Architectural Liaison', to: '/contact' },
      { label: 'Request an Estimate', to: '/request-estimate' },
    ],
  },
]

export const LEGAL = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service' }, // no page in the Figma file yet
  { label: 'Compliance & Licensure' }, // no page in the Figma file yet
]

export const byPath = Object.fromEntries(PAGES.map((p) => [p.path, p]))
export const childrenOf = (path) => PAGES.filter((p) => p.parent === path)
export function crumbs(path) {
  const out = []
  let cur = byPath[path]
  while (cur) { out.unshift(cur); cur = cur.parent ? byPath[cur.parent] : null }
  return out
}
export function groupOf(pathname) {
  const hit = [...PAGES].sort((a, b) => b.path.length - a.path.length).find((p) => p.path !== '/' && (pathname === p.path || pathname.startsWith(p.path + '/')))
  return hit ? hit.group : null
}
