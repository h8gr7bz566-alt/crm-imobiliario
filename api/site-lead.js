// /api/site-lead - Cria lead vindo de uma landing page pública (fora do domínio do CRM)
// Usado pelas landing pages de anúncio (ex.: Netlify) que não têm sessão Supabase própria.
// Grava o lead no CRM (tabela leads) e dispara push notification, igual ao fluxo do chatbot-lead.
import { createClient } from '@supabase/supabase-js'
import { sendPushToUsers } from './push-helper.js'

// Origens autorizadas a chamar este endpoint — adicione aqui o link de cada landing page nova
const ALLOWED = [
  'https://omarcorretor.com.br',
  'https://www.omarcorretor.com.br',
  'https://apartamentonocentro.netlify.app',
  'http://localhost:5173',
]

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

    // Descobre o tenant padrão (site é single-corretor)
    let tenant_id = data.tenant_id || null
    if (!tenant_id) {
      const { data: tenants } = await sb.from('tenants').select('id').limit(1)
      tenant_id = tenants?.[0]?.id || null
    }
    if (!tenant_id) {
      return res.status(500).json({ error: 'Nenhum tenant encontrado no banco' })
    }

    // Acha o funil "ISAAC" (ou o default) e a etapa "Novo Lead"
    let pipeline_id = null
    let stageName = 'Novo Lead'
    try {
      const { data: pipes } = await sb.from('crm_pipelines').select('id, name, tenant_id, is_default').order('sort_order', { nullsFirst: false })
      const isaac = (pipes || []).find(p => /isaac/i.test(p.name || ''))
                || (pipes || []).find(p => p.is_default)
                || (pipes || [])[0]
      if (isaac) {
        pipeline_id = isaac.id
        if (isaac.tenant_id) tenant_id = isaac.tenant_id
        const { data: stages } = await sb.from('crm_stages').select('id, name, sort_order').eq('pipeline_id', isaac.id).order('sort_order', { nullsFirst: false })
        const stagesList = stages || []
        const normalize = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
        const novoLead = stagesList.find(s => normalize(s.name) === 'novo lead')
                     || stagesList.find(s => /novo\s*lead/i.test(s.name || ''))
                     || stagesList[0]
        if (novoLead?.name) stageName = novoLead.name
      }
    } catch (e) { /* segue com defaults */ }

    // Sanitiza os dados recebidos do formulário
    const name  = String(data.name  || data.nome || 'Lead do site').slice(0, 120).trim()
    const phone = String(data.phone || data.telefone || '').slice(0, 30).trim()
    const email = String(data.email || '').slice(0, 200).trim()
    const source = String(data.source || data.imovel || 'Landing Page').slice(0, 120).trim()

    const row = {
      tenant_id,
      pipeline_id,
      name,
      phone: phone || null,
      email: email || null,
      source,
      stage:  stageName,
      status: data.status || 'morno',
      notes:  data.notes || null,
      utm_source:   data.utm_source   || null,
      utm_medium:   data.utm_medium   || null,
      utm_campaign: data.utm_campaign || null,
      utm_content:  data.utm_content  || null,
      utm_term:     data.utm_term     || null,
      fbclid:       data.fbclid       || null,
      landing_url:  data.landing_url  || null,
      user_agent:   data.user_agent   || null,
    }

    const { data: inserted, error } = await sb.from('leads').insert(row).select().single()
    if (error) {
      return res.status(500).json({ error: 'Falha ao inserir lead', detail: error.message, code: error.code })
    }

    // Dispara push notification pro corretor (não-bloqueante: se falhar, o lead já foi salvo)
    let pushResult = { sent: 0 }
    try {
      pushResult = await sendPushToUsers({
        tenantId: tenant_id,
        roles: ['admin', 'super_admin', 'corretor'],
        title: '🎯 Novo lead — ' + source,
        body: `${name}${phone ? ' • ' + phone : ''}`,
        url: `https://omarcorretor.com.br/ios.imobi#lead=${inserted.id}`,
      })
    } catch (e) {
      pushResult = { sent: 0, error: e.message }
    }

    return res.status(200).json({ ok: true, leadId: inserted?.id, push: pushResult })
  } catch (e) {
    return res.status(500).json({ error: 'Erro inesperado', detail: e.message })
  }
}
