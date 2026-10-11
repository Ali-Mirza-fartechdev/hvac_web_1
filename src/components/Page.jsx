import { Suspense, lazy, useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'
import { Sections, Media } from './Sections'
import { useImage, pathKey } from '../hooks/useImages'
import { getSeo, applyHead } from '../seo'
import { crumbs } from '../data/site'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
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
  const photo = useImage('hero-' + pathKey(path))
  return (
    <section className={`hero ${home ? 'hero-home' : 'hero-inner'} ${photo && !home ? 'has-photo' : ''}`}>
      {photo && home && <div className="hero-photo" style={{ backgroundImage: `url(${photo})` }} aria-hidden="true" />}
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
        {photo && !home && <div className="hero-media"><Media media={{ src: photo }} ratio="4 / 3" /></div>}
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

  useEffect(() => { applyHead(getSeo(path)) }, [path])

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      // 01/02: short, coordinated hero entrance (under a second in total, nothing waits on it)
      gsap.from('.hero-title .wi', { yPercent: 115, duration: 0.8, ease: 'power3.out', stagger: 0.06, delay: 0.05 })
      gsap.from('.hero-text, .hero .btn-row, .crumbs, .hero-card', { opacity: 0, y: 14, duration: 0.65, ease: 'power2.out', stagger: 0.08, delay: 0.3 })

      // existing: hero recedes as you scroll (kept as is)
      gsap.to('.hero-content', { yPercent: -10, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-scene', { scale: 1.12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })

      // 02: major section headings rise out of a clipped line
      gsap.utils.toArray('.h2[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)', y: 16 }, { clipPath: 'inset(0 0 -14% 0)', y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'clipPath', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })

      // 03: one reveal language for everything else: small rise + fade, grouped, played once
      gsap.set('[data-reveal]:not(.h2)', { opacity: 0, y: 16 })
      ScrollTrigger.batch('[data-reveal]:not(.h2)', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06, overwrite: true }),
      })
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    requestAnimationFrame(refresh)
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
