const CACHE = "ios-imobi-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/admin.html",
  "/property.html",
  "/servicos.html",
  "/styles.css",
  "/admin.css",
  "/script.js",
  "/property.js",
  "/logo.png",
  "/favicon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/manifest.json"
];

// Install: cache assets
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network first, fallback to cache
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
