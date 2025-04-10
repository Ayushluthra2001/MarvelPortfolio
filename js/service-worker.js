const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/css/bootstrap.min.css',
  '/css/assets/styles.css',
  '/owl.carousel.min.css',
  '/css/tooplate-style.css',
  '/css/unicons.css',
  '/css/owl.theme.default.min.css',
  '/images/project/project-image01.webp',
  '/images/project/project-image02.webp',
  'images/project/project-image03.webp',
  'images/project/project-image04webp',
  'images/project/project-image05.webp',
  '/js/bootstrap.min.js',
  '/js/custom.min.js',
  '/js/Headroom.min.js',
  '/js/jquery-3.3.1.min.js',
  '/js/jQuery.headroom.js',
  '/js/owl.carousel.min.js',
  '/js/owl.carousel.min.js',
  '/js/propper.min.js',
  '/js/service-worker.js',
  '/js/smothscroll.js',
  '/index.html',
  

  // Add more assets like images, fonts
];

self.addEventListener('install', (event) => {
  // Cache resources
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell...');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Removing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercept fetch requests
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response or fetch from network
        return response || fetch(event.request);
      })
  );
});