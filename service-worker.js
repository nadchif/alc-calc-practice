const cacheName = 'cache_v1';
const preCacheResources = [
    "/",
    "index.html",
    "assets/app.css",
    "assets/app.js",
    "assets/images/favicon-16x16.png",
    "assets/images/android-icon-192x192.png"
];

self.skipWaiting();

self.addEventListener("install", (event) => {
    console.log("Installing service worker");
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log("SW caching....", preCacheResources);
            return cache.addAll(preCacheResources);
        })
    );
})

self.addEventListener("activate", (event) => {
    console.log("Activating the service worker");
})

//watch for fetch events;
self.addEventListener('fetch', event => {
    
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    )
   
});