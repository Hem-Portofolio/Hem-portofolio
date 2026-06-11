# AGENTS.md — HEM Portfolio

## What this is
Static portfolio site for **HEM (Hyper Effect Marketing)**, a digital creative agency. Vanilla HTML/CSS/JS, no build tools, no frameworks.

## Repo structure
```
index.html                    — main SPA-style landing page (sections: hero, about, layanan, software, portfolio, blog, reviews, contact)
portofolio.html               — full project gallery
jasa-pembuatan-website.html   — service landing page
jasa-management-social-media.html
blog/jasa-website-cimahi.html — blog article
sw.js                         — service worker (PWA, cache-first assets, network-first HTML)
manifest.json                 — PWA manifest
img/*.webp                    — portfolio images (15)
testimoni/*.webp              — testimonial images (6)
.opencode/plans/              — opencode session plans
```

## Hosting & deploy
- GitHub Pages (repo: `Hem-Portofolio/Hem-portofolio`, branch `main`)
- Live at `https://hemdigital.site/`
- **Deploy = git push main**. No build step, no CI.
- After deploy, bump `APP_VERSION` in `sw.js:6` to force cache refresh for returning visitors.

## Development workflow
- **No package.json, no npm scripts, no test/lint/typecheck.**
- Open `*.html` files directly in browser or use any static server (`npx serve .`).
- All CSS is inlined in `<style>` tags per-page (no external stylesheets).

## CSS conventions
- Theming via CSS custom properties (`:root` block, identical across all pages):
  ```css
  --bg, --bg2, --bg3, --surface, --surface2, --border*, --text*, --muted, --subtle,
  --accent, --accent-l, --accent2, --accent3, --glow*, --grad*, --font-head, --font-body,
  --r*, --ease*
  ```
- Fonts: `Plus Jakarta Sans` (headings), `Inter` (body) — loaded from Google Fonts.
- All images in `img/` and `testimoni/` are `.webp` format. Add new images as WebP.
- Color `var(--bg)` in foreground contexts (`color:`) has been replaced with `#fff` (light theme).

## Theme history
- Converted from dark → light theme in a recent session (see `.opencode/plans/light-theme-changes.md`).
- If switching themes again: update `:root` vars, replace `rgba(255,255,255,0.xx)` backgrounds with `rgba(0,0,0,0.xx)` equivalents (or vice versa), and update `manifest.json` `background_color`.

## PWA notes
- Service worker caches: `hem-static-*`, `hem-dynamic-*`, `hem-images-*` (versioned).
- After any content change, bump `APP_VERSION` in `sw.js` so old caches are cleaned on activate.
- Offline fallback is an inline HTML string in `sw.js`.

## Contact info
- WhatsApp: `+62 813-1255-6871` (also `+62 851-6592-5749`)
- Email: `hemagencysukses@gmail.com`
- Instagram: `@hemagencysukses`
- Google Reviews: `https://share.google/R4AFGanBGeRNy5Og3`

## OpenCode config
- `.opencode/` has plugin dependency (`@opencode-ai/plugin@1.16.2`) and session plans.
- `AGENTS.md` lives at repo root — keep it compact.
