// /api/notify - Endpoint genérico pra disparar push notifications de eventos do CRM
// Body: { event, leadId, taskId, title?, body?, url? }
import { sendPushToUsers } from './push-helper.js'
import { createClient } from '@supabase/supabase-js'

const ALLOWED = ['https://omarcorretor.com.br', 'https://www.omarcorretor.com.br']

export default async function handler(req, res) {
  const origin = req.headers.origin || ''
  if (ALLOWED.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { event, leadId, taskId, title, body, url, tenantId, userIds } = req.body || {}
    
    const sb = createClient(
      process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Resolve targets: se passou userIds, usa eles. Senão, todos admins do tenant
    let resolvedTenantId = tenantId
    if (!resolvedTenantId) {
      const { data: tenants } = await sb.from('tenants').select('id').limit(1)
      resolvedTenantId = tenants?.[0]?.id
    }

    // Constrói título/corpo baseado no evento se não foi passado
    let pushTitle = title
    let pushBody = body
    let pushUrl = url || 'https://omarcorretor.com.br/ios.imobi'

    if (event === 'new_lead' && leadId) {
      const { data: lead } = await sb.from('leads').select('name, phone, source').eq('id', leadId).single()
      pushTitle = pushTitle || '🎯 Novo lead!'
      pushBody  = pushBody  || `${lead?.name || 'Lead'}${lead?.phone ? ' • ' + lead.phone : ''}${lead?.source ? ' • ' + lead.source : ''}`
      pushUrl   = `https://omarcorretor.com.br/ios.imobi#lead=${leadId}`
    } else if (event === 'task_new' && taskId) {
      const { data: task } = await sb.from('tasks').select('title, due_date, assigned_to').eq('id', taskId).single()
      pushTitle = pushTitle || '📋 Nova tarefa'
      pushBody  = pushBody  || task?.title
      pushUrl   = `https://omarcorretor.com.br/ios.imobi#tarefa=${taskId}`
    }

    if (!pushTitle || !pushBody) {
      return res.status(400).json({ error: 'title e body obrigatórios' })
    }

    const result = await sendPushToUsers({
      tenantId: resolvedTenantId,
      userIds,
      roles: ['admin', 'super_admin', 'corretor'],
      title: pushTitle,
      body: pushBody,
      url: pushUrl,
    })

    return res.status(200).json({ ok: true, event, ...result })
  } catch (e) {
    return res.status(500).json({ error: 'Falha ao notificar', detail: e.message })
  }
}
