// /api/chatbot-lead - Cria lead via chatbot anônimo (usa service role pra burlar RLS)
import { createClient } from '@supabase/supabase-js'

const ALLOWED = ['https://omarcorretor.com.br', 'https://www.omarcorretor.com.br', 'http://localhost:5173']

export default async function handler(req, res) {
  const origin = req.headers.origin || ''
  if (ALLOWED.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({ error: 'Supabase admin não configurado no servidor' })
  }

  try {
    const data = req.body || {}
    const sb = createClient(supabaseUrl, serviceKey)

    // Descobre o tenant padrão (primeiro tenant ativo) — site é single-corretor
    let tenant_id = data.tenant_id || null
    if (!tenant_id) {
      const { data: tenants } = await sb.from('tenants').select('id').limit(1)
      tenant_id = tenants?.[0]?.id || null
    }
    if (!tenant_id) {
      return res.status(500).json({ error: 'Nenhum tenant encontrado no banco' })
    }

    // Procura o funil "ISAAC" (case-insensitive). Se não achar, usa o primeiro.
    let pipeline_id = null
    let stageName = 'Novo Lead'
    try {
      const { data: pipes } = await sb.from('pipelines').select('id, name, stages').eq('tenant_id', tenant_id)
      const isaac = (pipes || []).find(p => /isaac/i.test(p.name || '')) || (pipes || [])[0]
      if (isaac) {
        pipeline_id = isaac.id
        // Procura a etapa "Novo Lead" no funil; se não achar, usa a primeira etapa
        const stages = Array.isArray(isaac.stages) ? isaac.stages : []
        const novoLead = stages.find(s => /novo\s*lead/i.test(s.name || '')) || stages[0]
        if (novoLead?.name) stageName = novoLead.name
      }
    } catch (e) { /* segue sem pipeline */ }

    // Sanitiza nome/telefone/email
    const name  = String(data.name  || data.nome || 'Lead via chat').slice(0, 120).trim()
    const phone = String(data.phone || data.telefone || data.whatsapp || '').slice(0, 30).trim()
    const email = String(data.email || '').slice(0, 200).trim()

    const row = {
      tenant_id,
      pipeline_id,
      name,
      phone: phone || null,
      email: email || null,
      source: data.source || 'Chat IA',
      stage:  data.stage  || stageName,
      status: data.status || 'morno',
      notes:  data.notes  || null,
      utm_source:   data.utm_source   || null,
      utm_medium:   data.utm_medium   || null,
      utm_campaign: data.utm_campaign || null,
      utm_content:  data.utm_content  || null,
      utm_term:     data.utm_term     || null,
      fbclid:       data.fbclid       || null,
      gclid:        data.gclid        || null,
      fbp:          data.fbp          || null,
      fbc:          data.fbc          || null,
      landing_url:  data.landing_url  || null,
      user_agent:   data.user_agent   || null,
    }

    const { data: inserted, error } = await sb.from('leads').insert(row).select().single()
    if (error) {
      return res.status(500).json({ error: 'Falha ao inserir lead', detail: error.message, code: error.code })
    }
    return res.status(200).json({ ok: true, leadId: inserted?.id, name })
  } catch (e) {
    return res.status(500).json({ error: 'Erro inesperado', detail: e.message })
  }
}
