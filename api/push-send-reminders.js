// Cron job: roda a cada 5 min, envia push pras tarefas vencendo nos próximos 15 min
// Vercel: { "crons": [{ "path": "/api/push-send-reminders", "schedule": "*/5 * * * *" }] }
import { createClient } from '@supabase/supabase-js'
import webpush from 'web-push'

export default async function handler(req, res) {
  // Proteção contra abuso: aceita só do Vercel cron OU com bearer
  const authHeader = req.headers.authorization
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Vercel adiciona header próprio em crons
    if (!req.headers['x-vercel-cron']) return res.status(401).json({ error: 'unauthorized' })
  }

  webpush.setVapidDetails(
    'mailto:isaacomar11@icloud.com',
    process.env.VAPID_PUBLIC,
    process.env.VAPID_PRIVATE
  )

  const supabase = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // Tarefas que vencem nos próximos 15 min e ainda não foram lembradas
  const nowIso = new Date().toISOString()
  const inFifteenMin = new Date(Date.now() + 15 * 60 * 1000).toISOString()

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('id, title, due_date, assigned_to')
    .neq('status', 'done')
    .neq('status', 'concluida')
    .is('reminded_at', null)
    .gte('due_date', nowIso)
    .lte('due_date', inFifteenMin)

  if (error) return res.status(500).json({ error: error.message })

  let sent = 0
  for (const task of tasks || []) {
    if (!task.assigned_to) continue
    const { data: subs } = await supabase
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth')
      .eq('user_id', task.assigned_to)

    const payload = JSON.stringify({
      title: '⏰ ' + task.title,
      body: 'Tarefa vencendo em breve',
      url: 'https://omarcorretor.com.br/ios.imobi#tarefas',
    })

    for (const sub of subs || []) {
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
      }
    }

    // Marca como lembrada pra não enviar de novo
    await supabase.from('tasks').update({ reminded_at: new Date().toISOString() }).eq('id', task.id)
  }

  return res.status(200).json({ ok: true, tasks: tasks?.length || 0, sent })
}
