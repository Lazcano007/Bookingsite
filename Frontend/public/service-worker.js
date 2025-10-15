var assets = [
    "/",
    "/index.html",
    "/manifest.json",
    "icons/android-chrome-192x192.png",
    "icons/android-chrome-512x512.png"

]

// Detta laddar ner allt viktigt första gången man öppnar sidan
self.addEventListener("install", function(installEvent){
    installEvent.waitUntil(
        caches.open("fresh-line-barber").then(function(cache) {
            return cache.addAll(assets).catch((err) => {
                console.log("Cache addAll failed", err);
            
            })
        })
    )
})

// Detta rensar den befitliga cache-versioner när du uppdaterar sidan
self.addEventListener("activate", (activateEvent) => {
    activateEvent.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(keys.filter(function(key) {
                return key !== "fresh-line-barber"}).map(function(key) {
                    return caches.delete(key); 
                })
            )
        })
    );
    console.log("Service worker activated");
})

// Hämtar från chache när du är ofline, annars hämatar den från internet
self.addEventListener("fetch", function(fetchEvent) {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(function(res) {
            return res || fetch(fetchEvent.request).catch(() => {
                console.warn("offline, no cache found for:", fetchEvent.request.url)
            });
        })
    );
});