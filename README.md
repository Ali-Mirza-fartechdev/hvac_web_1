# AERIS website

React + Three.js + GSAP build of the AERIS Figma design. Responsive (desktop and mobile), SEO-optimised, deployed on Vercel.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # client build + SSR build + prerender into dist/
```

## Pages (same hierarchy as the Figma file)

```
/                                              Comfort, Elevated (home)
/services                                      Services Overview
  /services/residential-hvac                   Residential HVAC
  /services/commercial-hvac                    Commercial HVAC
  /services/ac-installation                    AC Installation
/service-areas                                 Service Areas Directory
  /service-areas/tribeca-manhattan             Tribeca, Manhattan Service Area
/projects                                      Projects & Portfolio
/about                                         About Us
  /about/client-reviews                        Client Reviews & Endorsements
/resources                                     Knowledge Center & Engineering Dossiers
  /resources/faq                               Architectural & Technical FAQ
  /resources/acoustic-threshold-inaudible-vrf  The Acoustic Threshold (article)
/contact                                       Contact Us
/request-estimate                              Request an Estimate
/privacy-policy                                Privacy Policy
404                                            404 - Page Not Found
```

Hierarchy, navigation, footer and breadcrumbs: `src/data/site.js`. All page copy: `src/data/content.js` (use `[text](/path)` for internal links).

## SEO

- **Prerendered HTML.** `npm run build` writes a static HTML file for every route (full content, no JavaScript needed) plus `404.html`, `sitemap.xml` and `robots.txt`. Vercel serves these directly, so crawlers and link previews see real content and unknown URLs return a real 404.
- **Per page:** unique title (under about 60 characters), meta description, canonical URL, Open Graph and Twitter tags, one H1, descriptive headings, internal links in the copy.
- **Structured data (JSON-LD):** `HVACBusiness` and `WebSite` (home), `BreadcrumbList` (inner pages), `FAQPage` (pages with FAQs), `Service` (service pages), `Article` (dossier), `ContactPage` (contact).
- **Set your real domain.** In Vercel > Settings > Environment Variables add `VITE_SITE_URL=https://your-domain.com` and redeploy. It feeds canonical URLs, the sitemap, robots.txt and structured data. Until then it uses `https://hvac-web-1.vercel.app`.
- **After launch:** add the site to Google Search Console, submit `/sitemap.xml`, and add the business to Google Business Profile.
- **Open Graph image:** `public/og.png` (1200x630). Replace it with a branded image when you have one.

## Motion

Additive and restrained, following the "Premium Animation Optimization" brief:

- Hero: headline rises word by word, supporting copy and buttons follow (under one second total); hero photo settles in. Hero recedes gently on scroll.
- Section headings rise out of a clipped line; other content uses one reveal (small rise and fade, grouped, once).
- Images: very light parallax, only on wide screens with a mouse. None on touch.
- Header: frosted glass pill with a sliding hover/active indicator (260 ms, no bounce). Mobile gets a full-screen glass menu.
- Buttons lift 1 px on hover and press down; cards lift 3 px, tilt up to 3 degrees and scale their image to 1.02.
- Numbers count up once. Footer groups reveal; the phone link is never delayed. Thin scroll-progress line. 240 ms page fade.
- Forms: focus ring, inline invalid state, sending state, success and error messages (always text, never motion only).
- `prefers-reduced-motion`: smooth scrolling, parallax, reveals and the 3D scene's motion are turned off.

## Images

Put images in `public/images/` and list them in `public/images/manifest.json`, or run `npm run figma:extract` to pull the originals from the Figma file (needs `FIGMA_TOKEN` in `.env`). See `public/images/README.md`. Hero photos use `hero-<page>` keys; cards use a slug of the card title. Cards without an image show a quiet gradient.

## Claims to confirm before launch

All copy avoids invented testimonials, certifications, awards, licence numbers and statistics. Numbers on the site (24/7 response, 10-year lifestyle warranty, +/-0.5 F, under 40 dBA, under 42 dBA, up to 24.5 SEER2) come from the Figma design. Please confirm the business can stand behind these statements:

1. **Service area:** New York City, with Manhattan neighborhoods listed on `/service-areas` (Tribeca, SoHo, Greenwich Village, West Village, Chelsea, Flatiron, Upper East Side, Upper West Side). Edit `SITE.area` in `site.js` and the list in `content.js`.
2. **Lead times and installation durations** (Services, AC Installation FAQs): written as general ranges.
3. **Permits and co-op/condo approvals:** stated that AERIS prepares documentation and coordinates filings where required.
4. **Incentives:** "may be available", with no specific programs named.
5. **Estimates:** whether site visits and estimates are free (the Request an Estimate FAQ asks visitors to call).
6. **Portfolio descriptions** for The Ridgeview Estate, TriBeCa Sky Penthouse and Horizon Tech Innovation Hub are general scope descriptions. Add real details when available.
7. **Phone:** `(800) 582-AERIS` dials +1 800 582 2374. Change `phoneHref` and `phoneE164` in `site.js` if the real number differs.
8. **Privacy policy** is a sensible template matching how this site handles data. Have it reviewed before launch, and update it if you add analytics.
9. **Reviews:** the Client Reviews page has no testimonials. When you have real ones (with permission), add a `quotes` section to that page in `content.js`.

## Deploy to Vercel

```
git init
git add .
git commit -m "AERIS website"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Import the repo in Vercel (framework: Vite). `vercel.json` sets caching and security headers; routes are served from the prerendered files.

### Contact / estimate form

Posts to `api/estimate.js` (a Vercel serverless function). It validates and logs by default. For email delivery set `RESEND_API_KEY`, `ESTIMATE_TO` and `ESTIMATE_FROM` in Vercel.

## Structure

```
api/estimate.js            form endpoint
scripts/prerender.mjs      writes static HTML, sitemap, robots, 404 after the build
scripts/figma-extract.mjs  Figma text + image exporter
src/seo.js                 titles, meta, canonical, JSON-LD
src/data/site.js           routes, nav, footer, helpers
src/data/content.js        all page copy
src/components/            Header, Footer, Page (hero + motion), Sections, HeroScene
src/styles/global.css      tokens + all styles
```

Section types in `content.js`: `cards` (grid, feature, portfolio), `paths`, `stats`, `steps`, `faq`, `quotes`, `split`, `prose`, `doc` (article-style blocks), `chips`, `children` (auto-lists child pages), `cta`, `form`.
