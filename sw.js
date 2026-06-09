/* ═══════════════════════════════════════════════
   Service Worker — HEM (Hyper Effect Marketing)
   Strategy: Cache-First assets, Network-First pages
   ═══════════════════════════════════════════════ */

const APP_VERSION   = 'hem-v1.1.1';
const CACHE_STATIC  = `hem-static-${APP_VERSION}`;
const CACHE_DYNAMIC = `hem-dynamic-${APP_VERSION}`;
const CACHE_IMAGES  = `hem-images-${APP_VERSION}`;

/* Files to pre-cache on install */
const STATIC_ASSETS = [
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap'
];

/* ── INSTALL ── */
self.addEventListener('install', event => {
  console.log('[HEM SW] Installing...', APP_VERSION);
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[HEM SW] Pre-cache failed (some assets may be unavailable):', err))
  );
});

/* ── ACTIVATE: clean old caches ── */
self.addEventListener('activate', event => {
  console.log('[HEM SW] Activating...', APP_VERSION);
  const VALID = [CACHE_STATIC, CACHE_DYNAMIC, CACHE_IMAGES];
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !VALID.includes(k)).map(k => {
          console.log('[HEM SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())
  );
});

/* ── FETCH: routing ── */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // Google Fonts → Cache-First
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(cacheFirst(request, CACHE_STATIC));
    return;
  }

  // Images (Unsplash / local) → Cache-First + background refresh
  if (url.origin === 'https://images.unsplash.com' || request.destination === 'image') {
    event.respondWith(cacheFirstWithRefresh(request, CACHE_IMAGES));
    return;
  }

  // HTML pages → Network-First with offline fallback
  if (request.destination === 'document' || url.pathname.endsWith('.html')) {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  // Everything else → Stale-While-Revalidate
  event.respondWith(staleWhileRevalidate(request, CACHE_DYNAMIC));
});

/* ─── STRATEGIES ─── */

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 408, statusText: 'Offline' });
  }
}

async function cacheFirstWithRefresh(request, cacheName) {
  const cached = await caches.match(request);
  const networkFetch = fetch(request).then(async res => {
    if (res.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, res.clone());
    }
    return res;
  }).catch(() => null);
  return cached || await networkFetch || new Response('', { status: 408 });
}

async function networkFirstWithFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_STATIC);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request)
      || await caches.match('./index.html');
    return cached || new Response(offlinePage(), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkFetch = fetch(request).then(res => {
    if (res.ok) cache.put(request, res.clone());
    return res;
  }).catch(() => null);
  return cached || await networkFetch || new Response('', { status: 408 });
}

/* ─── OFFLINE FALLBACK PAGE ─── */
function offlinePage() {
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Offline — HEM</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',sans-serif;background:#080a0f;color:#e8eaf0;
       min-height:100vh;display:flex;align-items:center;justify-content:center;
       text-align:center;padding:2rem}
  .wrap{max-width:400px}
  .logo{font-size:2rem;font-weight:900;letter-spacing:-.03em;
        background:linear-gradient(135deg,#7c6bff,#06d6c7);
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;
        background-clip:text;margin-bottom:1.5rem}
  .icon{font-size:3.5rem;margin-bottom:1.25rem}
  h1{font-size:1.5rem;font-weight:800;margin-bottom:.75rem}
  p{color:#6b7280;line-height:1.7;margin-bottom:2rem;font-size:.9rem}
  button{padding:.85rem 2rem;
         background:linear-gradient(135deg,#7c6bff,#9d8fff);
         color:#fff;border:none;border-radius:100px;
         font-size:.9rem;font-weight:700;cursor:pointer;
         box-shadow:0 4px 24px rgba(124,107,255,.4)}
</style>
</head>
<body>
  <div class="wrap">
    <div class="logo">HEM.</div>
    <div class="icon">📡</div>
    <h1>Sedang Offline</h1>
    <p>Koneksi internet tidak tersedia. Pastikan Anda terhubung ke jaringan lalu coba lagi untuk mengakses portfolio HEM.</p>
    <button onclick="location.reload()">Coba Lagi</button>
  </div>
</body>
</html>`;
}

/* ── SKIP WAITING via postMessage ── */
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

/* ── BACKGROUND SYNC (future-ready) ── */
self.addEventListener('sync', event => {
  if (event.tag === 'hem-contact-sync') {
    console.log('[HEM SW] Background sync: contact form');
  }
});
