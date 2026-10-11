import { useEffect, useState } from 'react'

// public/images/manifest.json maps keys -> image URLs. `npm run figma:extract` writes it from the
// Figma file; you can also edit it by hand. No rebuild needed when an image is added.
let cache
const load = () => (cache ||= fetch('/images/manifest.json').then((r) => (r.ok ? r.json() : {})).catch(() => ({})))

export const slug = (s = '') => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const pathKey = (path) => (path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '-'))

export function useImage(key) {
  const [src, setSrc] = useState(null)
  useEffect(() => {
    let live = true
    if (!key) return undefined
    load().then((m) => live && setSrc(m[key] || null))
    return () => { live = false }
  }, [key])
  return src
}
