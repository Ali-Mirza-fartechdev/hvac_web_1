# AERIS website

React + Three.js + GSAP build of the AERIS Figma design. Desktop and mobile responsive, ready to deploy on Vercel.

```
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
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
*                                              404 - Page Not Found
```

The hierarchy lives in `src/data/site.js` (routes, header nav, footer, breadcrumbs, active nav section). Page content lives in `src/data/content.js`.

## What is built

- **Glass header.** Frosted pill with backdrop blur. It tightens on scroll. Hover or focus a link and one glass pill slides to it with a spring (like the iOS tab bar), then settles on the current section. Mobile gets a full-screen glass menu with staggered links.
- **Three.js hero.** `src/components/HeroScene.jsx` is a GPU airflow field (custom shader) that bends around the cursor and lifts on scroll. Home is dark and dense, inner pages use a lighter compact version. It pauses when off screen, lowers the point count and pixel ratio on phones, renders a still frame for reduced-motion users, and the page still works if WebGL fails.
- **Scroll animation.** Lenis smooth scroll feeding GSAP ScrollTrigger: hero headline rises word by word, hero recedes on scroll, content settles in as it enters view, number counters, image parallax.
- **Apple-style details.** Cards tilt and carry a cursor spotlight on mouse devices, press states on buttons, spring easing, animated FAQ.
- **Accessibility.** Skip link, visible focus, keyboard-operable nav, reduced-motion support, semantic landmarks.

## Content status (read before launch)

| Page | Status |
|---|---|
| Home, Services Overview | Headings and structure from the Figma screens. Body copy is close but should be checked against Figma. |
| All other pages | Structure from the Figma hierarchy, **draft copy**. |
| Anything saying `[placeholder]` | Must be replaced (testimonials, some FAQ answers, privacy policy, company story). |

`Terms of Service` and `Compliance & Licensure` appear in the footer as plain text because the Figma file has no pages for them.

### Pull the real text and images from Figma

```
cp .env.example .env      # add FIGMA_TOKEN (Figma > Settings > Security > personal access token)
npm run figma:extract
```

This downloads the **original image files** into `public/images/` and writes `public/images/manifest.json`; the site reads that manifest at runtime, so hero photos and card images appear without code changes (hero key: `hero-<page>`, card key: slug of the card title). It also writes `src/data/figma-extracted.json` (text per screen, in reading order) and `public/images/IMAGE-REPORT.json` (every image with its screen and nearby text) so you can fix any image that lands on the wrong card by editing the manifest. The script has not been run against the live Figma API yet, so expect to adjust it.

## Deploy to Vercel

1. Create an empty GitHub repo, then:
   ```
   git init
   git add .
   git commit -m "AERIS website"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In Vercel: **Add New > Project**, import the repo. Framework is detected as Vite. Deploy.
3. `vercel.json` already rewrites all routes to the SPA and caches built assets.

### Contact / estimate form

The form posts to `api/estimate.js` (a Vercel serverless function). It validates and logs by default. To get requests by email, set these in Vercel > Settings > Environment Variables (uses Resend): `RESEND_API_KEY`, `ESTIMATE_TO`, `ESTIMATE_FROM`.

### Before going live

- Replace `YOUR-DOMAIN.com` in `public/robots.txt` and `public/sitemap.xml`.
- Check the phone link. `(800) 582-AERIS` dials `+1 800 582 2374` (first four letters). Update `SITE.phoneHref` in `src/data/site.js` if the real number differs.
- Add Open Graph tags and analytics if needed.

## Structure

```
api/estimate.js            form endpoint
scripts/figma-extract.mjs  Figma text + image exporter
src/data/site.js           routes, nav, footer, helpers
src/data/content.js        page content (section types below)
src/components/            Header, Footer, Page (hero + animation), Sections, HeroScene
src/styles/global.css      tokens + all styles
```

Section types in `content.js`: `cards` (layouts: grid, feature, portfolio), `paths`, `stats`, `steps`, `faq`, `quotes`, `split`, `prose`, `children` (auto-lists child pages), `cta`, `form`.
