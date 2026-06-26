// sw.js — Service Worker para PWA + Push Notifications
const CACHE_NAME = 'imobi-v3'

self.addEventListener('install', e => { self.skipWaiting() })
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()) })

// ─── Push handler ──────────────────────────────────────────────────────────
self.addEventListener('push', event => {
  let data = {}
  try { data = event.data ? event.data.json() : {} } catch(e) { data = { title: 'Tarefa', body: event.data?.text() } }
  const title = data.title || 'IOS Imobi'
  const options = {
    body: data.body || 'Nova notificação',
    icon: data.icon || '/logo.png',
    badge: '/logo.png',
    data: { url: data.url || '/ios.imobi' },
    requireInteraction: true,
    vibrate: [200, 100, 200],
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

// Click → abre o CRM na tarefa
self.addEventListener('notificationclick', event => {
  event.notification.close()
  const url = event.notification.data?.url || '/ios.imobi'
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      for (const c of list) {
        if (c.url.includes('/ios.imobi')) return c.focus()
      }
      return clients.openWindow(url)
    })
  )
})
