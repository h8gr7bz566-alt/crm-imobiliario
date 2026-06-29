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

    // Procura o funil "ISAAC" e a etapa "Novo Lead"
    // Tabelas reais: crm_pipelines + crm_stages (com pipeline_id)
    let pipeline_id = null
    let stageName = 'Novo Lead'
    let pipelineDebug = { available: [], chosen: null }
    try {
      // 1) Busca todos os pipelines (independente de tenant — site pode estar em outro)
      const { data: pipes } = await sb.from('crm_pipelines').select('id, name, tenant_id, is_default').order('sort_order', { nullsFirst: false })
      pipelineDebug.available = (pipes || []).map(p => ({ id: p.id, name: p.name, tenant_id: p.tenant_id }))
      
      // Tenta encontrar "ISAAC" (case-insensitive), senão pega o default ou o primeiro
      const isaac = (pipes || []).find(p => /isaac/i.test(p.name || ''))
                || (pipes || []).find(p => p.is_default)
                || (pipes || [])[0]
      
      if (isaac) {
        pipeline_id = isaac.id
        if (isaac.tenant_id) tenant_id = isaac.tenant_id // alinha tenant_id ao pipeline
        
        // 2) Busca as stages desse pipeline em crm_stages
        const { data: stages } = await sb.from('crm_stages').select('id, name, sort_order').eq('pipeline_id', isaac.id).order('sort_order', { nullsFirst: false })
        const stagesList = stages || []
        
        // Procura "Novo Lead" (case + acento insensitive), senão usa a primeira
        const normalize = (s) => (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim()
        const novoLead = stagesList.find(s => normalize(s.name) === 'novo lead')
                     || stagesList.find(s => /novo\s*lead/i.test(s.name || ''))
                     || stagesList[0]
        
        if (novoLead?.name) stageName = novoLead.name
        pipelineDebug.chosen = { name: isaac.name, stageName, allStages: stagesList.map(s => s.name) }
      } else {
        pipelineDebug.chosen = 'nenhum pipeline encontrado'
      }
    } catch (e) { pipelineDebug.error = e.message }

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
    return res.status(200).json({ ok: true, leadId: inserted?.id, name, pipeline: pipelineDebug.chosen, row: { name, phone, email, stage: row.stage, pipeline_id } })
  } catch (e) {
    return res.status(500).json({ error: 'Erro inesperado', detail: e.message })
  }
}
