import { Link } from 'react-router-dom'
import { FOOTER, LEGAL, SITE } from '../data/site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label="AERIS home">AERIS</Link>
          <p>{SITE.tagline}. Heating, cooling, and air-quality systems for residential and commercial properties.</p>
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
