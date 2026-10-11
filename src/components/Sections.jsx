import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'
import { childrenOf, byPath } from '../data/site'
import { prefersReducedMotion } from '../hooks/useReducedMotion'
import { useImage, slug } from '../hooks/useImages'

gsap.registerPlugin(ScrollTrigger)

/* ---------- shared bits ---------- */

// Cards follow the pointer with a soft spotlight and a few degrees of tilt (fine pointers only).
function useTilt() {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    el.style.setProperty('--rx', `${(0.5 - y) * 5}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * 6}deg`)
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }
  return { ref, onPointerMove: onMove, onPointerLeave: onLeave }
}

// Image slot. Drop exported Figma images into /public/images and set media.src.
// Without a source it renders a quiet gradient so layout and parallax still work.
export function Media({ media, index = 0, ratio = '4 / 3' }) {
  const ref = useRef(null)
  const mapped = useImage(media?.key || slug(media?.label))
  const src = media?.src || mapped
  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return undefined
    const inner = ref.current.querySelector('.media-inner')
    const tween = gsap.fromTo(inner, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])
  const hue = 205 + ((index * 17) % 40)
  return (
    <figure ref={ref} className="media" style={{ aspectRatio: ratio, '--hue': hue }}>
      <div className="media-inner" style={src ? { backgroundImage: `url(${src})` } : undefined}>
        {!src && media?.label && <figcaption>{media.label}</figcaption>}
      </div>
    </figure>
  )
}

export function Counter({ prefix = '', value, suffix = '', decimals = 0 }) {
  const ref = useRef(null)
  const fmt = (v) => v.toFixed(decimals)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return undefined
    el.textContent = fmt(0)
    const obj = { v: 0 }
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: () => gsap.to(obj, { v: value, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = fmt(obj.v) } }),
    })
    return () => st.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals])
  return (
    <span className="num" aria-label={`${prefix}${fmt(value)}${suffix}`}>
      {prefix}<span ref={ref} aria-hidden="true">{fmt(value)}</span>{suffix}
    </span>
  )
}

function Head({ heading, text, link }) {
  if (!heading) return null
  return (
    <div className="section-head">
      <div>
        <h2 className="h2" data-reveal>{heading}</h2>
        {text && <p className="lede" data-reveal>{text}</p>}
      </div>
      {link && <Link className="text-link" to={link.to} data-reveal>{link.label}</Link>}
    </div>
  )
}

const Section = ({ tone, children, id }) => (
  <section className={`section tone-${tone || 'plain'}`} id={id}>
    <div className="container">{children}</div>
  </section>
)

/* ---------- section types ---------- */

function Card({ item, index, layout }) {
  const tilt = useTilt()
  const inner = (
    <>
      {item.media && <Media media={item.media} index={index} ratio={layout === 'portfolio' ? '4 / 3' : '16 / 10'} />}
      <div className="card-body">
        {item.tag && <p className="tag">{item.tag}</p>}
        <h3 className="h3">{item.title}</h3>
        <p>{item.text}</p>
        {item.to && <span className="text-link">{item.cta || 'Learn more'}</span>}
      </div>
    </>
  )
  const cls = `card ${item.media ? 'has-media' : ''}`
  return (
    <div className="card-wrap" data-reveal>
      {item.to ? <Link to={item.to} className={cls} {...tilt}>{inner}</Link> : <article className={cls} {...tilt}>{inner}</article>}
    </div>
  )
}

function Cards({ s }) {
  return (
    <Section tone={s.tone}>
      <Head {...s} />
      {s.items?.length > 0 && (
        <div className={`card-grid layout-${s.layout || 'grid'}`}>
          {s.items.map((it, i) => <Card key={it.title} item={it} index={i} layout={s.layout} />)}
        </div>
      )}
    </Section>
  )
}

function Paths({ s }) {
  return (
    <Section tone={s.tone}>
      <Head {...s} />
      <div className="paths">
        {s.items.map((p) => (
          <article key={p.title} className={`path path-${p.tone}`} data-reveal>
            <h3 className="h3">{p.title}</h3>
            <p>{p.text}</p>
            <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            <Button to={p.cta.to} variant={p.tone === 'dark' ? 'glass' : 'solid'}>{p.cta.label}</Button>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Stats({ s }) {
  return (
    <Section tone={s.tone}>
      <div className="stats-wrap">
        <div>
          <h2 className="h2" data-reveal>{s.heading}</h2>
          {s.text && <p className="lede" data-reveal>{s.text}</p>}
        </div>
        <dl className="stats">
          {s.items.map((it) => (
            <div key={it.label} className="stat" data-reveal>
              <dd><Counter {...it} /></dd>
              <dt>{it.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}

function Steps({ s }) {
  return (
    <Section tone={s.tone}>
      <Head {...s} />
      <ol className="steps">
        {s.items.map((it, i) => (
          <li key={it.title} data-reveal>
            <span className="step-n">{i + 1}</span>
            <h3 className="h3">{it.title}</h3>
            <p>{it.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function Faq({ s }) {
  return (
    <Section tone={s.tone}>
      <Head {...s} />
      <div className="faq">
        {s.items.map((it) => (
          <details key={it.q} data-reveal>
            <summary>{it.q}</summary>
            <div className="faq-a"><div><p>{it.a}</p></div></div>
          </details>
        ))}
      </div>
    </Section>
  )
}

function Quotes({ s }) {
  return (
    <Section tone={s.tone}>
      <Head {...s} />
      <div className="quotes">
        {s.items.map((q, i) => (
          <figure key={i} className="quote" data-reveal>
            <blockquote>{q.quote}</blockquote>
            <figcaption><strong>{q.name}</strong><span>{q.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

function Split({ s }) {
  return (
    <Section tone={s.tone}>
      <div className="split">
        <div className="split-copy">
          <h2 className="h2" data-reveal>{s.heading}</h2>
          <p className="lede" data-reveal>{s.text}</p>
          {s.points && <ul className="ticks" data-reveal>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>}
          {s.cta && <div data-reveal><Button to={s.cta.to}>{s.cta.label}</Button></div>}
        </div>
        <div data-reveal><Media media={s.media} ratio="5 / 4" /></div>
      </div>
    </Section>
  )
}

function Prose({ s }) {
  return (
    <Section tone={s.tone}>
      <div className="prose">
        <h2 className="h2" data-reveal>{s.heading}</h2>
        {s.paragraphs.map((p, i) => <p key={i} data-reveal>{p}</p>)}
      </div>
    </Section>
  )
}

function Children({ s, path }) {
  const kids = childrenOf(s.of || path).filter((k) => k.path !== path)
  if (!kids.length) return null
  return (
    <Section tone={s.tone}>
      <Head heading={s.heading} />
      <div className="card-grid layout-grid">
        {kids.map((k, i) => (
          <Card key={k.path} index={i} item={{ title: k.title, text: byPath[k.parent]?.title ? `Part of ${byPath[k.parent].label}` : '', to: k.path, cta: 'Open page' }} />
        ))}
      </div>
    </Section>
  )
}

function Cta({ s }) {
  return (
    <section className="section cta-section">
      <div className="container">
        <div className="cta-panel" data-reveal>
          <h2 className="h2">{s.heading}</h2>
          <p className="lede">{s.text}</p>
          <div className="btn-row">
            {s.ctas.map((c) => <Button key={c.label} to={c.to} href={c.href} variant={c.variant === 'ghost' ? 'glass' : 'solid'}>{c.label}</Button>)}
          </div>
        </div>
      </div>
    </section>
  )
}

const PROPERTY = ['Private residence', 'Multi-unit or hospitality', 'Commercial building', 'Institutional or public', 'Other']

function EstimateForm({ title }) {
  const [state, setState] = useState('idle') // idle | sending | ok | error
  async function submit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setState('sending')
    try {
      const res = await fetch('/api/estimate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error('bad status')
      setState('ok')
      e.currentTarget.reset()
    } catch { setState('error') }
  }
  return (
    <form className="form-card" onSubmit={submit} data-reveal>
      <h3 className="h3">{title}</h3>
      <div className="field-row">
        <label>Project ZIP code<input name="zip" inputMode="numeric" autoComplete="postal-code" required placeholder="e.g. 10013" /></label>
        <label>Property type
          <select name="property" defaultValue={PROPERTY[0]}>{PROPERTY.map((p) => <option key={p}>{p}</option>)}</select>
        </label>
      </div>
      <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="name@example.com" /></label>
      <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" /></label>
      <label>What do you need?<textarea name="details" rows="3" placeholder="New system, replacement, repair, air quality..." /></label>
      <button className="btn btn-solid" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending...' : 'Submit Consultation Request'}</button>
      <p className="form-note" role="status">
        {state === 'ok' && 'Thanks. An AERIS engineer will reply within one business day.'}
        {state === 'error' && 'Something went wrong sending your request. Please call us or try again.'}
        {state === 'idle' && 'We reply with a written scope, not a sales call.'}
      </p>
    </form>
  )
}

function FormSection({ s }) {
  return (
    <section className="section tone-dark form-section">
      <div className="container form-grid">
        <div>
          <h2 className="h2" data-reveal>{s.heading}</h2>
          <p className="lede" data-reveal>{s.text}</p>
        </div>
        <EstimateForm title={s.formTitle} />
      </div>
    </section>
  )
}

const MAP = { cards: Cards, paths: Paths, stats: Stats, steps: Steps, faq: Faq, quotes: Quotes, split: Split, prose: Prose, children: Children, cta: Cta, form: FormSection }

export function Sections({ sections, path }) {
  return sections.map((s, i) => {
    const C = MAP[s.type]
    return C ? <C key={i} s={s} path={path} /> : null
  })
}
