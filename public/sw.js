const CACHE_NAME = "auto-forensic-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Install Event - Caching the structural offline core shell files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Claiming immediate control of all client tabs
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch Event - Network-First for dynamic assets with explicit API protection
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // CRITICAL BYPASS: If the request is an internal API route or payment gateway hook, 
  // skip the cache entirely and pass it straight through to the live network!
  if (event.request.method !== "GET" || url.pathname.startsWith("/api/") || url.hostname.includes("stripe") || url.hostname.includes("razorpay")) {
    return; // Let the browser handle this natively over the live internet connection
  }

  // Network-First with Cache Fallback for structural UI assets
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone and save clean network responses to cache for offline capabilities
        if (response && response.status === 200 && response.type === "basic") {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // If the user loses network entirely in a garage, serve the cached UI shell
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          
          // Redirect navigation fallbacks safely to root index shell
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
          return new Response("Offline network connection dropped.", { status: 503 });
        });
      })
  );
});
