# YEMM — Technology by Heritage

A responsive Next.js website based on the supplied `hiro.png` hero reference and the original brand assets in `yamm/`.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
```

Next.js exports a static website to `out/`. Deploy this directory to any static host. No runtime server or external API is required.

Set `NEXT_PUBLIC_SITE_URL` to the verified production URL before building to enable absolute social preview image URLs.

## Content and assets

- Original assets are preserved in `yamm/` and `hiro.png`.
- Optimized transparent marks are in `public/brand/`; regenerate with `scripts/prepare-assets.py` (Pillow required).
- Shared page content and interactions: `app/home.js`.
- Layout, responsive rules and reduced-motion support: `app/globals.css`.
- Philosophy, featured concept, visual service examples, interactive lab and closing statement: `app/studio-sections.js` and `app/studio-sections.css`.
- Optional three-chapter YEMM Experience: `app/experience.js` and `app/experience.css`. Visitors supply a project name, idea, primary/support colors and visual style. `app/logo-engine.js` creates deterministic geometry from the brief, keyword family and variation. The generated mark, name and description appear throughout the experience. Visitors can revise the brief, explore variations, and download a transparent SVG logo or a concept card. Arabic exports embed the supplied font. This is a local rule-based concept generator; it uses no remote AI service and does not transmit briefs. Color-aware preview backgrounds keep light and dark marks visible.
- Run generator checks with `node --test scripts/logo-engine.test.mjs`.
- Arabic translation dictionary: `app/localize.js`; Arabic font and RTL styling: `app/arabic.css`.
- English lives at `/`; Arabic lives at `/ar/`, with server-rendered language and direction attributes and a language switch in the header.
- The supplied `yamm/mar.ttf` is served locally from `public/fonts/mar.ttf` as `YEMMMar`.
- Metadata and shared document: `app/site-document.js`; each language has its own root layout.

The work section contains clearly labelled studio concepts, not claimed client work. A verified contact email has not been provided. The enquiry form validates input and downloads a project brief; it does not send messages. Connect an approved contact destination before launching the official site.

Sites publishing tools were unavailable in the session; no hosted Site has been registered or deployed.
"# shmokh" 
"# shmokh" 
"# shmokh" 
