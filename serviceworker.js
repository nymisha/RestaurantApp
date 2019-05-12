let restaurantCacheName = "mws_cache_v1";
const URLValues = ['/js/main.js',
    '/js/restaurant_info.js', '/js/dbhelper.js', '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/restaurant.json',
    '/css/responsive.css',
    '/css/style.css',
    '/css/styles3.css',
    'restaurant?id=1',
    'restaurant?id=2',
    'restaurant?id=3',
    'restaurant?id=4',
    'restaurant?id=5',
    'restaurant?id=6',
    'restaurant?id=7',
    'restaurant?id=8',
    'restaurant?id=9',
    'restaurant?id=10',
    'index.html',
    'restaurant.html'


];

self.addEventListener("fetch", function(event) {
    event.respondWith(caches.match(event.request).then((response) => {
        //if the requested resource present in the cacche return
        if (response) return response;
        //else retun the resource from the network
        return fetch(event.request);

    }))
});



self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('review-') &&
                        cacheName != restaurantCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener("install", function(event) {
    event.waitUntil(caches.open(restaurantCacheName).then((cache) => {
        return cache.addAll(URLValues);
    }).catch((event) => {
        console.log(event.URLValues);
    }));
});