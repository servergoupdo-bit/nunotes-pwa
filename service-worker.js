const CACHE_NAME = "nunotes-v1";

const APP_FILES = [
  "/nunotes-pwa/",
  "/nunotes-pwa/index.html",
  "/nunotes-pwa/manifest.webmanifest",
  "/nunotes-pwa/icon-192.png",
  "/nunotes-pwa/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
