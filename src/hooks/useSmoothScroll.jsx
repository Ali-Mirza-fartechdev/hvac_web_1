import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

// Lenis gives the inertial, Apple-like scroll feel; GSAP ScrollTrigger reads from it.
export function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (t) => instance.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
