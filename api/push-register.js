import { createClient } from '@supabase/supabase-js'

const ALLOWED = 'https://omarcorretor.com.br'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { subscription, userId, tenantId, userAgent } = req.body || {}
  if (!subscription?.endpoint || !subscription?.keys?.p256dh) {
    return res.status(400).json({ error: 'invalid subscription' })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { error } = await supabase.from('push_subscriptions').upsert({
    user_id: userId || null,
    tenant_id: tenantId || null,
    endpoint: subscription.endpoint,
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth,
    user_agent: userAgent || null,
  }, { onConflict: 'endpoint' })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ ok: true })
}
