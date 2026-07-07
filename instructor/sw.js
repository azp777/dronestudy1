const CACHE = 'instructor-app-v4';
const ASSETS = [
  './',
  'index.html',
  'drill.html',
  'phrases.html',
  'terms.html',
  'terms-zh.html',
  'textbook.html',
  'textbook-zh.html',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 繝阪ャ繝亥━蜈医・螟ｱ謨玲凾繧ｭ繝｣繝・す繝･(譖ｴ譁ｰ縺悟渚譏縺輔ｌ繧・☆縺・婿蠑・
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true })
      .then(hit => hit || caches.match('index.html')))
  );
});
