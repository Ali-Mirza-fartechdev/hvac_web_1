import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV, SITE, groupOf } from '../data/site'
import Button from './Button'
import { useLenis } from '../hooks/useSmoothScroll'

// iOS tab-bar style glass nav: one frosted pill slides to whatever you hover or focus,
// and settles back on the current section when you leave.
function GlassNav({ active }) {
  const list = useRef(null)
  const pill = useRef(null)
  const items = useRef({})
  const [hover, setHover] = useState(null)
  const [press, setPress] = useState(false)
  const [ready, setReady] = useState(false)
  const target = hover ?? active

  const place = useCallback(() => {
    const el = target && items.current[target]
    const p = pill.current
    if (!p) return
    if (!el) { p.style.opacity = '0'; return }
    p.style.setProperty('--x', `${el.offsetLeft}px`)
    p.style.setProperty('--w', `${el.offsetWidth}px`)
    p.style.opacity = '1'
  }, [target])

  useLayoutEffect(place, [place])
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    const ro = new ResizeObserver(place)
    if (list.current) ro.observe(list.current)
    return () => { cancelAnimationFrame(id); ro.disconnect() }
  }, [place])

  return (
    <nav className="glass-nav" aria-label="Primary" onMouseLeave={() => { setHover(null); setPress(false) }}>
      <ul ref={list}>
        <li
          ref={pill}
          className="glass-pill"
          data-ready={ready}
          data-mode={hover && hover !== active ? 'hover' : 'active'}
          data-press={press}
          aria-hidden="true"
        />
        {NAV.map((n) => (
          <li key={n.group}>
            <Link
              ref={(el) => { items.current[n.group] = el }}
              to={n.to}
              aria-current={active === n.group ? 'page' : undefined}
              onMouseEnter={() => setHover(n.group)}
              onFocus={() => setHover(n.group)}
              onBlur={() => setHover(null)}
              onMouseDown={() => setPress(true)}
              onMouseUp={() => setPress(false)}
            >
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Header() {
  const { pathname } = useLocation()
  const active = groupOf(pathname)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (lenis) { if (open) lenis.stop(); else lenis.start() }
    document.documentElement.classList.toggle('menu-open', open)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => { window.removeEventListener('keydown', esc); document.documentElement.classList.remove('menu-open') }
  }, [open, lenis])

  return (
    <header className="site-header" data-scrolled={scrolled} data-open={open}>
      <div className="header-pill glass">
        <Link to="/" className="logo" aria-label="AERIS home">AERIS</Link>
        <GlassNav active={active} />
        <div className="header-cta">
          <a className="header-phone" href={SITE.phoneHref}>{SITE.phone}</a>
          <Button to="/request-estimate">Get a Free Estimate</Button>
        </div>
        <Link to="/request-estimate" className="btn btn-solid btn-sm header-mobile-cta">Estimate</Link>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu glass" data-open={open}>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.group} style={{ '--i': i }}>
              <Link to={n.to} aria-current={active === n.group ? 'page' : undefined}>{n.label}</Link>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-foot" style={{ '--i': NAV.length }}>
          <Button to="/request-estimate">Get a Free Estimate</Button>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </div>
      </div>
    </header>
  )
}
