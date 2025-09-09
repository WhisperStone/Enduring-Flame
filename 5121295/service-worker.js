const CACHE_NAME = 'whisper-stone-v6';
const ROOT = new URL('/', self.location)pathname; // base path for Ellie’s stone
const ASSETS = [
  ROOT,
  ROOT + 'index.html',
  ROOT + 'Background-3.png',
  ROOT + 'story-image.png',
  ROOT + 'symbol.png',
  ROOT + 'ellie-intro.mp3',
  ROOT + 'ellie-outro_v2.mp3',
  ROOT + 'manifest.webmanifest',
  ROOT + 'icon-192.png',
  ROOT + 'icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // HTML: network-first
  if (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(req).then(res => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
        return res;
      }).catch(() => caches.match(ROOT + 'index.html'))
    );
    return;
  }

  // Assets: cache-first
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const resClone = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
      return res;
    }))
  );
});
