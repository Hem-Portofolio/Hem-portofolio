# AGENTS.md — HEM Portfolio

## What this is
Static portfolio site for **HEM (Hyper Effect Marketing)**, a digital creative agency. Vanilla HTML/CSS/JS, no build tools, no frameworks, no package.json.

## Pages
```
index.html                       — SPA landing page (hero, about, layanan, software, portfolio, blog, reviews, contact)
portofolio.html                  — full project gallery
jasa-pembuatan-website.html      — service: website pembuatan
jasa-management-social-media.html — service: social media management
blog/jasa-website-cimahi.html    — blog article
```

## Hosting & deploy
- GitHub Pages (`Hem-Portofolio/Hem-portofolio`, branch `main`)
- Live at `https://hemdigital.site/`
- **Deploy = git push main**. No build step, no CI.
- After deploy, bump `APP_VERSION` in `sw.js:6` to force cache refresh for returning visitors.

## Development workflow
- Open `*.html` files directly in browser or use `npx serve .`
- All CSS is inlined in `<style>` tags per-page (no external stylesheets)
- The `:root` CSS custom properties block is duplicated identically in every HTML page — keep them in sync when editing

## PWA
- Service worker (`sw.js`): cache-first for assets, network-first for HTML, offline fallback string
- Caches: `hem-static-*`, `hem-dynamic-*`, `hem-images-*` (versioned via `APP_VERSION`)
- After any content change, bump `APP_VERSION` in `sw.js:6`
- `manifest.json` PWA manifest at root

## CSS conventions
- Theming via `:root` CSS vars (same block in every page):
  `--bg`, `--bg2`, `--bg3`, `--surface`, `--surface2`, `--border*`, `--text*`, `--muted`, `--subtle`,
  `--accent`, `--accent-l`, `--accent2`, `--accent3`, `--glow*`, `--grad*`, `--font-head`, `--font-body`,
  `--r*`, `--ease*`
- Fonts: `Plus Jakarta Sans` (headings), `Inter` (body) — Google Fonts
- All images in `img/` and `testimoni/` are `.webp`; add new images as WebP

## Images
- `img/*.webp`: 15 files (banner + 1–14)
- `testimoni/*.webp`: 6 files (1–6)
- Root: `logo.png` (in use), `banner.webp` (in use), `banner1.webp` (unused), `prof.webp` (unused)

## Theme migration history (dark→light)
- `.opencode/plans/light-theme-changes.md` documents the conversion
- If switching themes again: update `:root` CSS vars, replace `rgba(255,255,255,0.xx)` backgrounds with `rgba(0,0,0,0.xx)` equivalents (or vice versa), update `manifest.json` `background_color`
- `color: var(--bg)` appeared in button/badge foregrounds in the dark theme — in light theme these must use `#fff` instead

## Contact info
- WhatsApp: `+62 813-1255-6871` (also `+62 851-6592-5749`)
- Email: `hemagencysukses@gmail.com` (also in JSON-LD on every page)
- Instagram: `@hemagencysukses`
- Google Reviews: `https://share.google/R4AFGanBGeRNy5Og3`

## SEO infra
- `sitemap.xml` — lists 5 URLs, update when adding pages
- `robots.txt` — allows all, points to sitemap

## OpenCode config
- `.opencode/package.json` has `@opencode-ai/plugin@1.16.2`
- `AGENTS.md` lives at repo root
- `opencode.json` does not exist
