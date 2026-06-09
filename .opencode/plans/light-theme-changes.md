# Light Theme + Logo Conversion Plan

**File:** `D:\Hem_portofolio\index.html`

---

## 1. CSS Variables (`:root` block, line 43-69)

Replace entire `:root` block:

OLD:
```css
  :root {
    --bg:        #060d18;
    --bg2:       #0a1628;
    --bg3:       #0f1d33;
    --surface:   rgba(59,130,246,0.03);
    --surface2:  rgba(255,255,255,0.02);
    --border:    rgba(59,130,246,0.08);
    --border2:   rgba(59,130,246,0.15);
    --border3:   rgba(255,255,255,0.06);
    --text:      #f0ece4;
    --text2:     #d4cfc5;
    --muted:     #6a7590;
    --subtle:    #8e96a8;
    --accent:    #3b82f6;
    --accent-l:  #93bbff;
    --accent2:   #2563eb;
    --accent3:   #60a5fa;
    --glow:      rgba(59,130,246,0.2);
    --glow2:     rgba(37,99,235,0.15);
    --font-head: 'Plus Jakarta Sans', sans-serif;
    --font-body: 'Inter', sans-serif;
    --r:         12px;
    --r2:        20px;
    --r3:        28px;
    --ease:      cubic-bezier(0.23, 1, 0.32, 1);
    --ease2:     cubic-bezier(0.4, 0, 0.2, 1);
  }
```

NEW:
```css
  :root {
    --bg:        #f8f9fa;
    --bg2:       #f1f3f5;
    --bg3:       #e9ecef;
    --surface:   rgba(255,255,255,0.8);
    --surface2:  #ffffff;
    --border:    rgba(0,0,0,0.08);
    --border2:   rgba(0,0,0,0.12);
    --border3:   rgba(0,0,0,0.06);
    --text:      #1a202c;
    --text2:     #2d3748;
    --muted:     #6b7280;
    --subtle:    #4b5563;
    --accent:    #3b82f6;
    --accent-l:  #93bbff;
    --accent2:   #2563eb;
    --accent3:   #60a5fa;
    --glow:      rgba(59,130,246,0.15);
    --glow2:     rgba(37,99,235,0.1);
    --font-head: 'Plus Jakarta Sans', sans-serif;
    --font-body: 'Inter', sans-serif;
    --r:         12px;
    --r2:        20px;
    --r3:        28px;
    --ease:      cubic-bezier(0.23, 1, 0.32, 1);
    --ease2:     cubic-bezier(0.4, 0, 0.2, 1);
  }
```

---

## 2. Remove cursor `mix-blend-mode` (line 96)

OLD:
```
    mix-blend-mode: screen;
    box-shadow: 0 0 12px rgba(59,130,246,0.4);
```

NEW:
```
    box-shadow: 0 0 12px rgba(59,130,246,0.3);
```

---

## 3. Nav background (lines 125 & 133)

OLD:
```css
    background: rgba(6,13,24,0.75);
    ...
    background: rgba(6,13,24,0.92);
```

NEW:
```css
    background: rgba(255,255,255,0.85);
    ...
    background: rgba(255,255,255,0.95);
```

---

## 4. Nav links hover (line 160)

OLD:
```css
  .nav-links a:hover { color: var(--text); background: rgba(255,255,255,0.04); }
```

NEW:
```css
  .nav-links a:hover { color: var(--text); background: rgba(0,0,0,0.04); }
```

---

## 5. `color: var(--bg)` → `color: #fff` pada semua button/badge

Cari dan ganti semua `color: var(--bg)` menjadi `color: #fff` di:

| Line | Context |
|------|---------|
| 164 | `.nav-cta` |
| 174 | `.nav-cta:hover` |
| 290 | `.btn-primary` |
| 510 | `.about-exp-num` |
| 819 | `.form-submit` |
| 996 | `.drawer-cta` |
| 1176 | `.pwa-banner-icon` |
| 1186 | `.pwa-btn-install` (cek: mungkin `color: var(--bg)`) |
| 1215 | `.toast-refresh` (cek: mungkin `color: var(--bg)`) |
| 1265 | `.ios-guide-icon` (cek: mungkin `color: var(--bg)`) |
| 1298 | `.ios-step-num` (cek: mungkin `color: var(--bg)`) |

CATATAN: Jangan ganti `var(--bg)` di `background:` — itu harus tetap sebagai variable biar pakai warna light.

---

## 6. Hero photo overlay (line 383)

OLD:
```css
    background: linear-gradient(transparent, rgba(6,13,24,0.7));
```

NEW:
```css
    background: linear-gradient(transparent, rgba(255,255,255,0.3));
```

---

## 7. Hero photo badge bg (line 390)

OLD:
```css
    background: rgba(10,22,40,0.85);
    ...
    color: var(--accent-l);
```

NEW:
```css
    background: rgba(255,255,255,0.9);
    ...
    color: var(--text);
```

---

## 8. Hero float card bg (line 409, 415)

OLD:
```css
    background: rgba(10,22,40,0.88);
    ...
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
```

NEW:
```css
    background: rgba(255,255,255,0.95);
    ...
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
```

---

## 9. About exp label (line 511)

OLD:
```css
  .about-exp-label { font-size: 0.72rem; color: rgba(10,22,40,0.7); ... }
```

NEW:
```css
  .about-exp-label { font-size: 0.72rem; color: rgba(255,255,255,0.7); ... }
```

---

## 10. Skill bar bg (line 604)

OLD:
```css
    background: rgba(255,255,255,0.06);
```

NEW:
```css
    background: rgba(0,0,0,0.06);
```

---

## 11. Project img overlay (line 709)

OLD:
```css
    background: linear-gradient(transparent 40%, rgba(6,13,24,0.8));
```

NEW:
```css
    background: linear-gradient(transparent 40%, rgba(255,255,255,0.6));
```

---

## 12. Hamburger span (line 932)

OLD:
```css
  .hamburger span { width: 22px; height: 2px; background: var(--accent-l); ... }
```

NEW:
```css
  .hamburger span { width: 22px; height: 2px; background: var(--text); ... }
```

---

## 13. Drawer sidebar bg (line 954)

OLD:
```css
    background: rgba(10,22,40,0.97);
```

NEW:
```css
    background: rgba(255,255,255,0.97);
```

Juga update shadow (line 962):
```
    box-shadow: -20px 0 60px rgba(0,0,0,0.5);
```
→
```
    box-shadow: -20px 0 60px rgba(0,0,0,0.12);
```

Update drawer link hover color (line 982):
```
    color: var(--accent-l);
```
→
```
    color: var(--accent);
```

---

## 14. Drawer/PWA: semua `rgba(255,255,255,0.0x)` bg → `rgba(0,0,0,0.0x)`

| Line | Old | New |
|------|-----|-----|
| 1193 | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.04)` |
| 1198 | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |
| 1252 | `rgba(255,255,255,0.1)` | `rgba(0,0,0,0.06)` |
| 1273 | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.04)` |
| 1279 | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |
| 1288 | `rgba(255,255,255,0.03)` | `rgba(0,0,0,0.03)` |

---

## 15. PWA: install banner, update toast, iOS guide

### Install banner bg (line 1159)
OLD: `background: rgba(10,22,40,0.96);`  
NEW: `background: rgba(255,255,255,0.96);`

### Install banner shadow (line 1164)
OLD: `rgba(0,0,0,0.5)`  
NEW: `rgba(0,0,0,0.1)`

### Update toast bg (line 1203)
OLD: `background: rgba(10,22,40,0.95);`  
NEW: `background: rgba(255,255,255,0.95);`

### Update toast shadow (line 1207)
OLD: `rgba(0,0,0,0.4)`  
NEW: `rgba(0,0,0,0.1)`

### iOS guide bg (line 1238)
OLD: `background: rgba(10,22,40,0.97);`  
NEW: `background: rgba(255,255,255,0.97);`

### iOS guide shadow (line 1244)
OLD: `rgba(0,0,0,0.5)`  
NEW: `rgba(0,0,0,0.1)`

### iOS guide note bg (line 1305)
OLD: `rgba(59,130,246,0.06)` — biarkan (masih cocok)

---

## 16. Box shadows — reduce opacity untuk light theme

| Line | Old | New |
|------|-----|-----|
| 415 | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.08)` |
| 490 | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.08)` |
| 537 | `rgba(0,0,0,0.2)` | `rgba(0,0,0,0.06)` |
| 583 | `rgba(0,0,0,0.25)` | `rgba(0,0,0,0.08)` |
| 657 | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.08)` |
| 692 | `rgba(0,0,0,0.35)` | `rgba(0,0,0,0.1)` |
| 782 | `rgba(0,0,0,0.15)` | `rgba(0,0,0,0.05)` |

---

## 17. Hero photo: ganti `prof.webp` → `logo.png` + CSS

### HTML (line 1464)
OLD: `<img src="prof.webp" alt="HEM Team">`  
NEW: `<img src="logo.png" alt="HEM Logo">`

### CSS `.hero-photo-inner` (lines 364-376)
OLD:
```css
  .hero-photo-inner {
    position: relative; z-index: 1;
    border-radius: calc(var(--r3) - 2px);
    overflow: hidden;
    background: var(--bg3);
    aspect-ratio: 4/5;
  }
  .hero-photo-inner img {
    width: 100%; height: 100%;
    object-fit: cover;
    filter: grayscale(15%) contrast(1.05);
    transition: filter 0.5s var(--ease2), transform 0.6s var(--ease);
  }
  .hero-photo-wrap:hover .hero-photo-inner img { 
    filter: grayscale(0%) contrast(1.05); 
    transform: scale(1.03);
  }
```

NEW:
```css
  .hero-photo-inner {
    position: relative; z-index: 1;
    border-radius: calc(var(--r3) - 2px);
    overflow: hidden;
    background: #ffffff;
    aspect-ratio: 1/1;
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
  }
  .hero-photo-inner img {
    width: 100%; height: 100%;
    object-fit: contain;
    filter: none;
    transition: transform 0.6s var(--ease);
  }
  .hero-photo-wrap:hover .hero-photo-inner img { 
    transform: scale(1.04);
  }
```

---

## 18. Float card stars/val color (lines 428-429)

OLD:
```css
  .float-val { font-size: 0.88rem; font-weight: 700; color: var(--accent-l); }
  .float-stars { color: var(--accent); font-size: 0.75rem; letter-spacing: 2px; }
```

NEW:
```css
  .float-val { font-size: 0.88rem; font-weight: 700; color: var(--text); }
  .float-stars { color: var(--accent); font-size: 0.75rem; letter-spacing: 2px; }
```

---

## 19. Check `.drawer-link` color (line 971)

OLD: `color: var(--subtle);` — akan otomatis berubah via CSS var, OK.

---

## 20. `manifest.json` — update background color

OLD: `"background_color": "#080a0f"`  
NEW: `"background_color": "#f8f9fa"`

Juga update SVG icon fill di `icons`:
- `%23080a0f` → `%23f8f9fa` (di kedua icon entries)

---

## 21. `sw.js` — bump APP_VERSION

Jika ada, naikkan `APP_VERSION` agar cache lama tidak dipakai.

---

## Setelah semua perubahan

1. Buka `index.html` di browser (refresh hard: `Ctrl+Shift+R`)
2. Cek logo biru di navbar — harus kontras di latar putih
3. Cek hero section — logo.png muncul di circle container
4. Cek sidebar drawer — latar putih, teks gelap
5. Cek semua floating card, badge, overlay — tidak ada yang hitam pekat
