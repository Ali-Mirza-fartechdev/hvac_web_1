import { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { SmoothScrollProvider, useLenis } from './hooks/useSmoothScroll'
import Header from './components/Header'
import Footer from './components/Footer'
import Page from './components/Page'
import { PAGES } from './data/site'
import { CONTENT, NOT_FOUND } from './data/content'

// A thin, quiet reading-progress line at the very top of the viewport.
function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const draw = () => {
      raf = 0
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? Math.min(window.scrollY / h, 1) : 0})`
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(draw) }
    draw()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  return null
}

export function Shell() {
  const { pathname } = useLocation()
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <ScrollProgress />
      <Header />
      <main id="content" key={pathname} className="page-enter">
        <Routes>
          {PAGES.map((p) => (
            <Route key={p.path} path={p.path} element={<Page path={p.path} content={CONTENT[p.path]} />} />
          ))}
          <Route path="*" element={<Page path="/404" content={NOT_FOUND} />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <Shell />
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
