# AGENTS.md

This file provides guidance to OpenCode when working in this repository.

## What this is

Static portfolio site for **HEM (Hyper Effect Marketing)**, a digital creative agency. Vanilla HTML/CSS/JS — no build tools, no frameworks, no `package.json`.

## Development commands

```bash
npx serve .
```

No build, lint, or test steps.

## Hosting & deploy

- GitHub Pages (`Hem-Portofolio/Hem-portofolio`, branch `main`)
- Live at `https://hemdigital.site/`
- **Deploy = `git push` to `main`**. No CI.
- After any content change, bump `APP_VERSION` in `sw.js:6` to invalidate caches for returning visitors.

## Architecture

### CSS (inlined per page)

- All CSS in `<style>` tags — no external stylesheets.
- `:root` custom properties block is **duplicated identically** in every page. When editing theme values, update **all** pages.
- Current theme: **light**. Key vars: `--bg`, `--surface`, `--text`, `--accent`, `--grad`, `--font-head`, `--font-body`, `--r*`, `--ease*`.
- Fonts (Plus Jakarta Sans, Inter) via Google Fonts, icons via Bootstrap Icons 1.11.3 CDN — both use `media="print" onload` lazy-load pattern.

### JavaScript (inlined per page)

- `index.html` has a single minified `<script defer>` IIFE covering: custom cursor (dual-element lerp + parallax), scroll-spy nav, `IntersectionObserver` reveal animations + skill-bar counters, stat count-up, mobile nav (hamburger ↔ drawer/overlay), PWA lifecycle (SW registration, install banner, update toast, offline bar, iOS guide).
- Service pages (`jasa-*.html`) and `portofolio.html` have simpler inline JS (scroll reveal, mobile nav, cursor only).

### PWA / Service Worker (`sw.js`)

- **Strategies**: cache-first (fonts, images), network-first with offline fallback (HTML), stale-while-revalidate (everything else).
- **Cache buckets**: `hem-static-*`, `hem-dynamic-*`, `hem-images-*` (versioned via `APP_VERSION`).
- **Pre-cached assets**: `index.html`, `manifest.json`, `logo.png`, `banner1.webp`, Google Fonts CSS.
- **Offline fallback** (`sw.js:134`): inline HTML string still uses dark-theme colors (`#080a0f`), unlike the main site.

### SEO

- `index.html` uses `ProfessionalService` JSON-LD; service pages use `Service`; blog uses `Article`.
- Every page: canonical URL, Open Graph, Twitter Card, `<html lang="id">`.
- `sitemap.xml` — 5 URLs, update when adding pages.
- `robots.txt` — allows all, points to sitemap.

## Known inconsistencies

- `<meta name="theme-color">` is `#f8f9fa` on `index.html` / portfolio / blog but `#061A40` on the two `jasa-*` pages (leftover from dark theme).
- `jasa-management-social-media.html` canonical URL is missing `.html` — `https://hemdigital.site/jasa-management-social-media` (sitemap has the `.html` version).
- `portofolio.html` has a simpler layout — no hamburger/drawer, no scroll-spy, no stat counters.
- Offline fallback HTML in `sw.js:134` still uses dark-theme colors (`#080a0f`).

## Adding a new page

1. Copy the `<head>` meta block from an existing page (canonical, OG, Twitter, JSON-LD, fonts, `:root` CSS vars).
2. Update `<title>`, canonical URL, OG/Twitter tags, and JSON-LD for the new page.
3. Add URL to `sitemap.xml`.
4. If it's a major page, add to `STATIC_ASSETS` in `sw.js`.
5. Bump `APP_VERSION` in `sw.js:6`.

## Theme migration (dark → light)

Completed. Archive reference: `.opencode/plans/light-theme-changes.md`. If re-doing: update `:root` vars in **all** pages, swap `rgba(255,255,255,…)` ↔ `rgba(0,0,0,…)` backgrounds, update `manifest.json` `background_color`.

## Images

- `img/*.webp` — 17 files (banner + 1–16).
- `testimoni/*.webp` — 6 files (1–6).
- Root: `logo.png` (in use), `banner.webp` (in use), `banner1.webp` (pre-cached in SW), `prof.webp` (unused).
- All images must be WebP.

## Contact info (hardcoded in HTML)

- WhatsApp: `+62 813-1255-6871` (also `+62 851-6592-5749` on index.html, `+62 823-4350-2671` on `jasa-pembuatan-website.html`)
- Email: `hemagencysukses@gmail.com`
- Instagram: `@hemagencysukses`
- Google Reviews: `https://share.google/R4AFGanBGeRNy5Og3`
