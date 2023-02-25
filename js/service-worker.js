
const offline_version = 1;
const cache_name = "offline";
const offline_url = "offline.html";

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(cache_name);
            await cache.add(new Request(offline_url, { cache: "reload" }));
        })()
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable();
        }
    })()
);

self.clients.claim();
});


self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    const preloadResponse = await event.preloadResponse;
                    if (preloadResponse) {
                        return preloadResponse;
                    }

                    const networkResponse = await fetch(event.request);
                    return networkResponse;
                }   catch (error) {
                    console.log("Fetch failed; returning offline page instead.", error);

                    const cache = await caches.open(cache_name);
                    const cachedResponse = await cache.match(offline_url);
                    return cachedResponse;
                }
            })()
        );
    }
});
