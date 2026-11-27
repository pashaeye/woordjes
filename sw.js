// Старое приложение Woordjes переехало на https://plons.io.
// Этот service worker заменяет прежний: удаляет старый кэш, отключается и открывает новый адрес.
// Данные на устройстве (IndexedDB) не трогаем.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate('https://plons.io/');
  })());
});
