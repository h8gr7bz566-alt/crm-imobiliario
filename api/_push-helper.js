// Helper compartilhado de envio de push notifications
import webpush from 'web-push'
import { createClient } from '@supabase/supabase-js'

let _sb = null
function sb() {
  if (!_sb) {
    _sb = createClient(
      process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  }
  return _sb
}

let _vapidSet = false
function ensureVapid() {
  if (_vapidSet) return
  webpush.setVapidDetails(
    'mailto:isaacomar11@icloud.com',
    process.env.VAPID_PUBLIC,
    process.env.VAPID_PRIVATE
  )
  _vapidSet = true
}

/**
 * Envia push notification pros usuários alvo
 * @param {Object} opts
 * @param {string[]} [opts.userIds] - IDs específicos
 * @param {string} [opts.tenantId] - ou todos do tenant
 * @param {string[]} [opts.roles] - filtra por roles (admin, super_admin, corretor)
 * @param {string} opts.title
 * @param {string} opts.body
 * @param {string} [opts.url] - URL pra abrir ao clicar
 * @param {string} [opts.icon]
 */
export async function sendPushToUsers(opts) {
  ensureVapid()
  const supabase = sb()

  // Resolver alvos
  let targetUserIds = opts.userIds || []
  if (!targetUserIds.length && opts.tenantId) {
    let q = supabase.from('profiles').select('id').eq('tenant_id', opts.tenantId)
    if (opts.roles?.length) q = q.in('role', opts.roles)
    const { data: profiles } = await q
    targetUserIds = (profiles || []).map(p => p.id)
  }
  if (!targetUserIds.length) return { sent: 0, errors: ['no targets'] }

  // Buscar subscriptions
  const { data: subs } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth, user_id')
    .in('user_id', targetUserIds)

  if (!subs || subs.length === 0) return { sent: 0, errors: ['no subscriptions for users'], userIds: targetUserIds }

  const payload = JSON.stringify({
    title: opts.title,
    body: opts.body,
    url: opts.url || 'https://omarcorretor.com.br/ios.imobi',
    icon: opts.icon || '/logo.png',
  })

  let sent = 0
  const errors = []
  for (const sub of subs) {
    try {
      await webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload
      )
      sent++
    } catch (e) {
      // Subscription expirou → limpa
      if (e.statusCode === 410 || e.statusCode === 404) {
        await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint)
      }
      errors.push({ endpoint: sub.endpoint.slice(0, 40), status: e.statusCode, msg: e.message?.slice(0, 100) })
    }
  }
  return { sent, errors, totalSubs: subs.length }
}
