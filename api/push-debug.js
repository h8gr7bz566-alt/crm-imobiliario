// /api/push-debug - Diagnóstico completo do sistema de push
import { createClient } from '@supabase/supabase-js'
import webpush from 'web-push'

export default async function handler(req, res) {
  const out = {
    env: {
      SUPABASE_URL_set: !!(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL),
      SUPABASE_SERVICE_ROLE_KEY_set: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_SERVICE_ROLE_KEY_prefix: (process.env.SUPABASE_SERVICE_ROLE_KEY || '').slice(0, 12),
      VAPID_PUBLIC_set: !!process.env.VAPID_PUBLIC,
      VAPID_PRIVATE_set: !!process.env.VAPID_PRIVATE,
    },
    subscriptions: [],
    test_send: null,
  }

  try {
    const sb = createClient(
      process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Lista subscriptions
    const { data: subs, error } = await sb
      .from('push_subscriptions')
      .select('id, user_id, endpoint, user_agent, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      out.subscriptions_error = error.message
    } else {
      out.subscriptions = (subs || []).map(s => ({
        id: s.id,
        user_id: s.user_id,
        endpoint_host: (s.endpoint || '').split('/')[2] || 'unknown',
        endpoint_preview: (s.endpoint || '').slice(0, 80) + '...',
        user_agent: (s.user_agent || '').slice(0, 80),
        created_at: s.created_at,
      }))
      out.subscriptions_total = subs?.length || 0
    }

    // Se ?send=1 → testa enviar pra todas
    if (req.query?.send === '1' && subs?.length) {
      webpush.setVapidDetails(
        'mailto:isaacomar11@icloud.com',
        process.env.VAPID_PUBLIC,
        process.env.VAPID_PRIVATE
      )
      const results = []
      for (const sub of subs) {
        try {
          const { data: full } = await sb.from('push_subscriptions').select('*').eq('id', sub.id).single()
          await webpush.sendNotification(
            { endpoint: full.endpoint, keys: { p256dh: full.p256dh, auth: full.auth } },
            JSON.stringify({
              title: '🧪 Teste IOS Imobi',
              body: 'Se você está vendo isso, push funciona!',
              url: 'https://omarcorretor.com.br/ios.imobi',
            })
          )
          results.push({ id: sub.id, status: 'sent', user_agent: sub.user_agent?.slice(0, 50) })
        } catch (e) {
          results.push({ id: sub.id, status: 'error', code: e.statusCode, msg: e.message?.slice(0, 200) })
        }
      }
      out.test_send = results
    } else {
      out.test_send = 'pra testar envio adicionar ?send=1 na URL'
    }
  } catch (e) {
    out.fatal = e.message
  }

  return res.status(200).json(out)
}
