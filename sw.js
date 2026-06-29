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
  event.waitUntil((async () => {
    await self.registration.showNotification(title, options)
    // Incrementa badge do app (iOS/macOS PWA + Chrome)
    try {
      if (navigator.setAppBadge) {
        // Lê count salvo no IndexedDB simples (cookie não funciona em SW)
        const all = await self.clients.matchAll({ includeUncontrolled: true })
        // Tenta pedir pro client/cliente que enviou pra atualizar a contagem
        all.forEach(c => c.postMessage({ type: 'push-received' }))
        // Fallback: incrementa direto no SW se cliente não tá vivo
        const cur = parseInt(self._badgeCount || 0) + 1
        self._badgeCount = cur
        await navigator.setAppBadge(cur)
      }
    } catch(e) { /* ignore */ }
  })())
})

// Listener pra cliente pedir pra zerar badge
self.addEventListener('message', event => {
  if (event.data?.type === 'clear-badge') {
    self._badgeCount = 0
    try { navigator.clearAppBadge?.() } catch(e) {}
  } else if (event.data?.type === 'set-badge') {
    const n = Number(event.data.count) || 0
    self._badgeCount = n
    try { if (n > 0) navigator.setAppBadge?.(n); else navigator.clearAppBadge?.() } catch(e) {}
  }
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
