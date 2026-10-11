import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FOOTER, LEGAL, SITE } from '../data/site'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const ref = useRef(null)

  // Restrained group reveal. The brand column (phone link) is never animated or delayed.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.footer-col, .footer-legal', { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out', stagger: 0.06, scrollTrigger: { trigger: ref.current, start: 'top 95%', once: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <footer className="site-footer" ref={ref}>
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label="AERIS home">AERIS</Link>
          <p>{SITE.tagline}. Heating, cooling and air-quality systems for residential and commercial properties.</p>
          <a className="footer-phone" href={SITE.phoneHref}>{SITE.phone}</a>
        </div>
        {FOOTER.map((col) => (
          <div key={col.heading} className="footer-col">
            <h2>{col.heading}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-legal">
        <span>&copy; {new Date().getFullYear()} AERIS Climate Systems</span>
        <ul>
          {LEGAL.map((l) => (
            <li key={l.label}>{l.to ? <Link to={l.to}>{l.label}</Link> : <span>{l.label}</span>}</li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
