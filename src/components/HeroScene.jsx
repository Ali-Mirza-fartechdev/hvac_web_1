import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { prefersReducedMotion, useIsMobile } from '../hooks/useReducedMotion'

// A laminar airflow field: thousands of points drifting through the frame,
// bending around the cursor and lifting as the page scrolls. All motion runs on the GPU.
const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixel;
  uniform float uScroll;
  uniform vec2 uMouse;
  attribute vec3 aSeed;
  varying float vAlpha;
  varying float vMix;
  void main() {
    float range = 28.0;
    float speed = 0.35 + aSeed.x * 0.9;
    float x = mod(position.x + uTime * speed * 1.5 + range * 0.5, range) - range * 0.5;
    float wave = sin(x * 0.42 + uTime * 0.55 + aSeed.y * 6.2831) * (0.5 + aSeed.z * 1.5);
    float y = position.y + wave + sin(uTime * 0.35 + aSeed.y * 10.0) * 0.25;
    float z = position.z + cos(x * 0.28 + aSeed.z * 6.2831 + uTime * 0.45) * 0.9;
    vec3 p = vec3(x, y, z);
    vec2 d = p.xy - uMouse * vec2(10.0, 5.5);
    float dist = length(d);
    p.xy += normalize(d + 1e-4) * smoothstep(3.2, 0.0, dist) * 1.1;
    p.y += uScroll * 4.0 * (aSeed.x - 0.35);
    p.x -= uScroll * 2.0;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixel * (0.45 + aSeed.z) * (16.0 / -mv.z);
    vAlpha = smoothstep(range * 0.5, range * 0.36, abs(x)) * (0.3 + 0.7 * aSeed.x);
    vMix = aSeed.y;
  }
`
const fragment = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(mix(uColorA, uColorB, vMix), a * vAlpha * uOpacity);
  }
`

function Flow({ count, light, still }) {
  const mat = useRef()
  const { gl, pointer, invalidate } = useThree()
  const smooth = useRef(new THREE.Vector2())

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = (Math.random() - 0.5) * 11
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9 - 1
      seeds[i * 3] = Math.random()
      seeds[i * 3 + 1] = Math.random()
      seeds[i * 3 + 2] = Math.random()
    }
    return { positions, seeds }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: still ? 6 : 0 },
      uSize: { value: light ? 2.6 : 3.2 },
      uPixel: { value: gl.getPixelRatio() },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uOpacity: { value: light ? 0.55 : 0.9 },
      uColorA: { value: new THREE.Color(light ? '#0a5bb5' : '#7cc4ff') },
      uColorB: { value: new THREE.Color(light ? '#6aa9e8' : '#ffffff') },
    }),
    [gl, light, still],
  )

  useEffect(() => { if (still) invalidate() }, [still, invalidate])

  useFrame((_, dt) => {
    if (!mat.current) return
    const u = mat.current.uniforms
    if (!still) u.uTime.value += Math.min(dt, 0.05)
    smooth.current.lerp(pointer, 0.06)
    u.uMouse.value.copy(smooth.current)
    const s = Math.min(window.scrollY / window.innerHeight, 1.5)
    u.uScroll.value += (s - u.uScroll.value) * 0.08
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-aSeed" array={seeds} count={count} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  )
}

class SceneBoundary extends Component {
  constructor(p) { super(p); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

export default function HeroScene({ light = false, compact = false }) {
  const wrap = useRef(null)
  const [visible, setVisible] = useState(true)
  const isMobile = useIsMobile()
  const still = prefersReducedMotion()

  useEffect(() => {
    const el = wrap.current
    if (!el || !('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const count = compact ? (isMobile ? 1200 : 2600) : isMobile ? 2600 : 7000

  return (
    <div ref={wrap} className="hero-scene" aria-hidden="true">
      <SceneBoundary>
        <Canvas
          dpr={[1, isMobile ? 1.5 : 2]}
          camera={{ position: [0, 0, 12], fov: 50 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          frameloop={still ? 'demand' : visible ? 'always' : 'never'}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Flow count={count} light={light} still={still} />
        </Canvas>
      </SceneBoundary>
    </div>
  )
}
