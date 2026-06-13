# AGENTS.md

This file provides guidance to Qoder (qoder.com) when working with code in this repository.

## What this is

Static portfolio site for **HEM (Hyper Effect Marketing)**, a digital creative agency. Vanilla HTML/CSS/JS — no build tools, no frameworks, no `package.json`.

## Development commands

```bash
# Serve locally (any static server works)
npx serve .

# No build, lint, or test steps — pure static site
```

## Hosting & deploy

- GitHub Pages (`Hem-Portofolio/Hem-portofolio`, branch `main`)
- Live at `https://hemdigital.site/`
- **Deploy = `git push` to `main`**. No build step, no CI.
- After any content change, bump `APP_VERSION` in `sw.js:6` to invalidate caches for returning visitors.

## Architecture

### CSS (inlined per page)

- All CSS lives in `<style>` tags inside each HTML file — no external stylesheets.
- The `:root` custom properties block is **duplicated identically** in every page. When editing theme values, update **all** pages.
- Current theme: **light**. Key vars: `--bg`, `--surface`, `--text`, `--accent`, `--grad`, `--font-head`, `--font-body`, `--r*`, `--ease*`.
- Fonts: Plus Jakarta Sans (headings), Inter (body) via Google Fonts with `preload` + `media="print" onload` pattern.
- Icons: Bootstrap Icons 1.11.3 CDN, same print-onload pattern.

### JavaScript (inlined per page)

All JS is minified inline in a single `<script defer>` IIFE at the bottom of `index.html`. Key subsystems:

- **Custom cursor** — dual-element (dot + ring) with `requestAnimationFrame` lerp, parallax on `.hero-bg`
- **Scroll-spy nav** — calculates section offsets, highlights active link
- **Reveal animations** — `IntersectionObserver` adds `.visible` to `.reveal` elements and animates `.skill-bar` width from `data-pct`
- **Stat counters** — `IntersectionObserver` triggers `requestAnimationFrame` count-up on `.stat-num`
- **Mobile nav** — hamburger toggles `.nav-drawer` + `.nav-overlay`
- **PWA lifecycle** — SW registration with 60 s polling, `beforeinstallprompt` install banner, update toast (`SKIP_WAITING`), offline bar, iOS Safari install guide with swipe-to-dismiss

Service pages (`jasa-*.html`) and `portofolio.html` have their own simpler inline JS (scroll reveal, mobile nav, cursor).

### PWA / Service Worker (`sw.js`)

- **Strategies**: cache-first (fonts, images), network-first with offline fallback (HTML), stale-while-revalidate (everything else)
- **Cache buckets**: `hem-static-*`, `hem-dynamic-*`, `hem-images-*` (versioned via `APP_VERSION`)
- **Pre-cached assets**: `index.html`, `manifest.json`, `logo.png`, `banner1.webp`, Google Fonts CSS
- **Offline fallback**: inline HTML string in `offlinePage()` — note this still uses dark-theme colors (`#080a0f`), unlike the main site

### SEO

- `index.html` uses `ProfessionalService` JSON-LD; service pages use `Service`; blog article uses `Article`
- Every page: canonical URL, Open Graph, Twitter Card, `<html lang="id">`
- `sitemap.xml` — 5 URLs, update when adding pages
- `robots.txt` — allows all, points to sitemap

## Key inconsistencies to be aware of

- `<meta name="theme-color">` is `#f8f9fa` on `index.html` / portfolio / blog but `#061A40` on the two `jasa-*` service pages (legacy from before the light-theme migration)
- `portofolio.html` uses an older CSS structure: nav id is `#navbar` (vs `nav` on index), hamburger uses `.active` class (vs `.open`), section-tag is a filled pill (vs gradient text on index)
- The offline fallback HTML in `sw.js` still has dark-theme styling

## Adding a new page

1. Copy the `<head>` meta block from an existing page (canonical, OG, Twitter, JSON-LD, fonts, `:root` CSS vars)
2. Update `<title>`, canonical URL, OG/Twitter tags, and JSON-LD for the new page
3. Add the URL to `sitemap.xml`
4. If it's a major page, add it to `STATIC_ASSETS` in `sw.js`
5. Bump `APP_VERSION` in `sw.js:6`

## Theme migration notes (dark → light)

- Plan documented in `.opencode/plans/light-theme-changes.md`
- To switch themes: update `:root` vars in **all** pages, swap `rgba(255,255,255,…)` ↔ `rgba(0,0,0,…)` backgrounds, update `manifest.json` `background_color`
- Button/badge foregrounds: dark theme used `color: var(--bg)`; light theme must use `#fff`

## Images

- `img/*.webp` — 15 files (banner + 1–14)
- `testimoni/*.webp` — 6 files (1–6)
- Root: `logo.png` (in use), `banner.webp` (in use), `banner1.webp` (pre-cached in SW), `prof.webp` (unused)
- All images must be WebP format

## Contact info (hardcoded in HTML)

- WhatsApp: `+62 813-1255-6871` (also `+62 851-6592-5749`)
- Email: `hemagencysukses@gmail.com`
- Instagram: `@hemagencysukses`
- Google Reviews: `https://share.google/R4AFGanBGeRNy5Og3`
