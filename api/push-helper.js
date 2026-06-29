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



// ─── Email notification via Resend (bulletproof — iPhone Mail entrega sempre) ──
async function sendEmail(title, body, url) {
  const apiKey = process.env.RESEND_API_KEY
  const to     = process.env.NOTIFY_EMAIL || 'isaacomar11@icloud.com'
  const from   = process.env.RESEND_FROM || 'IOS Imobi <onboarding@resend.dev>'
  if (!apiKey) return { skipped: 'no RESEND_API_KEY' }
  try {
    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;margin:0 auto;padding:20px;background:#f8fafc;border-radius:12px">
        <h2 style="color:#0f1c2e;margin:0 0 12px;font-size:20px">${title}</h2>
        <p style="color:#475569;font-size:15px;line-height:1.6;white-space:pre-wrap">${body.replace(/</g,'&lt;')}</p>
        ${url ? `<a href="${url}" style="display:inline-block;margin-top:14px;padding:12px 24px;background:#b8962e;color:#fff;text-decoration:none;border-radius:8px;font-weight:600">Abrir no CRM</a>` : ''}
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">
        <p style="color:#94a3b8;font-size:12px">Você recebeu este email porque é admin do IOS Imobi.</p>
      </div>`
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject: title, html, text: body + (url ? '\n' + url : '') }),
    })
    const data = await r.json()
    return { ok: !!data.id, id: data.id, error: data.message }
  } catch (e) { return { error: e.message } }
}

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

  if (!subs || subs.length === 0) {
    const email = await sendEmail(opts.title, opts.body, opts.url)
    return { sent: 0, errors: ['no subscriptions for users'], userIds: targetUserIds, email }
  }

  const payload = JSON.stringify({
    title: opts.title,
    body: opts.body,
    url: opts.url || 'https://omarcorretor.com.br/ios.imobi',
    icon: opts.icon || '/logo.png',
    tag: opts.tag || ('lead-' + Date.now()), // único pra não suprimir
    renotify: true, // re-toca som mesmo se tag for igual
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
  // Email em paralelo (sempre dispara, garantido)
  const email = await sendEmail(opts.title, opts.body, opts.url)
  return { sent, errors, totalSubs: subs.length, email }
}
