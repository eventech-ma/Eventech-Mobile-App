const CACHE_NAME = "version-1";
const urlsToCache = ['index.html', 'offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .catch(() => caches.match('offline.html'));
      })
  );
});


self.addEventListener('push', (event) => {
  const notification = event.data.json();
  event.waitUntil(self.registration.showNotification(notification.title, {
    body: notification.body,
    icon: 'https://1fid.com/wp-content/uploads/2022/03/photo-de-profil-14-1024x1024.jpg',
    data:{
      notifUrl: notification.url
    }
  }));
});
self.addEventListener("notificationclick", (event) => {
  event.waitUntil(clients.openWindow(event.notification.data.notifUrl));
});





