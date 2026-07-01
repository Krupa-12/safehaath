const CACHE = "safehaath-v1";

const files = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/script.js",
    "./icon.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(files))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});