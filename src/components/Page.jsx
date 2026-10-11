import { Suspense, lazy, useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'
import { Sections } from './Sections'
import { crumbs } from '../data/site'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)
const HeroScene = lazy(() => import('./HeroScene'))

function Title({ text }) {
  return (
    <h1 className="hero-title" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="w" key={i} aria-hidden="true"><span className="wi">{w}</span>{' '}</span>
      ))}
    </h1>
  )
}

function Hero({ hero, path }) {
  const home = hero.variant === 'home'
  const trail = home ? [] : crumbs(path)
  return (
    <section className={`hero ${home ? 'hero-home' : 'hero-inner'}`}>
      <Suspense fallback={null}><HeroScene light={!home} compact={!home} /></Suspense>
      <div className="container hero-grid">
        <div className="hero-content">
          {trail.length > 1 && (
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                {trail.map((c, i) => (
                  <li key={c.path}>{i < trail.length - 1 ? <Link to={c.path}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
                ))}
              </ol>
            </nav>
          )}
          <Title text={hero.title} />
          <p className="hero-text">{hero.text}</p>
          {hero.ctas?.length > 0 && (
            <div className="btn-row">
              {hero.ctas.map((c) => (
                <Button key={c.label} to={c.to} href={c.href} variant={c.variant === 'ghost' ? (home ? 'glass' : 'ghost') : c.variant || 'solid'}>{c.label}</Button>
              ))}
            </div>
          )}
        </div>
        {hero.card && (
          <aside className="hero-card glass-dark" aria-label={hero.card.title}>
            <h2>{hero.card.title}</h2>
            <dl>
              {hero.card.rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
            </dl>
          </aside>
        )}
      </div>
    </section>
  )
}

export default function Page({ path, content }) {
  const root = useRef(null)

  useEffect(() => {
    document.title = path === '/' ? 'AERIS | Comfort, Elevated' : `${content.hero.title.split(':')[0]} | AERIS`
    let m = document.querySelector('meta[name="description"]')
    if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m) }
    m.content = content.seo || ''
  }, [path, content])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      // One orchestrated moment: the hero headline rises word by word.
      gsap.from('.hero-title .wi', { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.07, delay: 0.1 })
      gsap.from('.hero-text, .hero .btn-row, .crumbs, .hero-card', { opacity: 0, y: 18, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.5 })

      // Hero recedes as you scroll: content drifts up, the scene pushes in.
      gsap.to('.hero-content', { yPercent: -10, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-scene', { scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })

      // Everything marked data-reveal settles in as it enters view.
      gsap.set('[data-reveal]', { opacity: 0, y: 26 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      })
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => { window.removeEventListener('load', refresh); ctx.revert() }
  }, [path])

  return (
    <div ref={root} className="page">
      <Hero hero={content.hero} path={path} />
      <Sections sections={content.sections} path={path} />
    </div>
  )
}
