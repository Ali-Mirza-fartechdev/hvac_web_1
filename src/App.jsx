import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { SmoothScrollProvider, useLenis } from './hooks/useSmoothScroll'
import Header from './components/Header'
import Footer from './components/Footer'
import Page from './components/Page'
import { PAGES } from './data/site'
import { CONTENT, NOT_FOUND } from './data/content'

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  return null
}

function Shell() {
  const { pathname } = useLocation()
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
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
