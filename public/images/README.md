# Images

`manifest.json` maps a key to a file in this folder:

```json
{
  "hero-home": "/images/home-hero.jpg",
  "hero-services": "/images/services-hero.jpg",
  "the-ridgeview-estate": "/images/ridgeview.jpg",
  "tribeca-sky-penthouse": "/images/tribeca.jpg"
}
```

Keys:
- `hero-<page>`: hero photo. Page = path with slashes turned into dashes (`home`, `services`, `services-residential-hvac`, `about-client-reviews`...).
- Card and split images use the slug of the card title or media label (`the-ridgeview-estate`, `horizon-tech-innovation-hub`, `inverter-heat-pump`...).

`npm run figma:extract` fills this folder and the manifest from the Figma file automatically.
