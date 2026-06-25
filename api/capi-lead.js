// api/capi-lead.js — Endpoint Meta Conversions API
// Recebe dados do lead e envia evento "Lead" para a CAPI do Meta com SHA-256.
// Dedupe com o Pixel client-side via event_id.

const crypto = require('crypto')

const PIXEL_ID = '660044113549849'
// Token configurado em Vercel → Settings → Environment Variables
// Variable: META_CAPI_ACCESS_TOKEN  (NÃO usar prefixo VITE_ pra não vazar no client)
// Fallback hardcoded (caso a env var não esteja setada). Remover em produção sensível.
const FALLBACK_TOKEN = 'EAAU2CB11ZCmkBR2eivNuBCIQIgMMpiEVCNl08wt7V7nZAjZAVFzQZCzfW1zYrxZC9PM53EgJgBRZBKdzIynLARbHa6faSfsraMAZBYKZB9Q8mcC8TrQGva4FbnTpT35n1dhEYZBNQbZCVbmKTqX4etc6EY2tfFheBuR3lZAlja6y3ZAi5o2HZB7ZB3uf3taq8aNfEwmgZDZD'

function sha256(value) {
  if (!value) return null
  const normalized = String(value).toLowerCase().trim()
  return crypto.createHash('sha256').update(normalized).digest('hex')
}

// Telefone: remove tudo que não é dígito, garante DDI 55 se for celular brasileiro
function normalizePhone(phone) {
  if (!phone) return null
  let digits = String(phone).replace(/\D/g, '')
  if (digits.length === 10 || digits.length === 11) digits = '55' + digits
  return digits || null
}

function getClientIp(req) {
  const xfwd = req.headers['x-forwarded-for']
  if (xfwd) return String(xfwd).split(',')[0].trim()
  return req.headers['cf-connecting-ip'] || req.socket?.remoteAddress || null
}

module.exports = async function handler(req, res) {
  // CORS restrito apenas pra omarcorretor.com.br (e localhost pra dev)
  const ALLOWED_ORIGINS = [
    'https://omarcorretor.com.br',
    'https://www.omarcorretor.com.br',
    'http://localhost:5173',
    'http://localhost:3000',
  ]
  const origin = req.headers.origin || ''
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Vary', 'Origin')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' })

  const TOKEN = process.env.META_CAPI_ACCESS_TOKEN || FALLBACK_TOKEN
  if (!TOKEN) return res.status(500).json({ error: 'token_not_configured' })

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { return res.status(400).json({ error: 'invalid_json' }) }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'invalid_body' })
  }

  const {
    event_id,                 // ID único para deduplicar com Pixel client-side
    event_name = 'Lead',
    event_source_url,         // URL onde o lead foi capturado
    name, email, phone,       // dados de contato
    fbp, fbc, fbclid,         // cookies/click ID
    user_agent,               // user agent do navegador
  } = body

  const eventTime = Math.floor(Date.now() / 1000)
  const eid = event_id || `lead_${eventTime}_${Math.random().toString(36).slice(2, 10)}`
  const clientIp = getClientIp(req)

  // Quebra nome em first/last se vier completo
  let firstName = null, lastName = null
  if (name) {
    const parts = String(name).trim().split(/\s+/)
    firstName = parts[0]
    if (parts.length > 1) lastName = parts.slice(1).join(' ')
  }

  const userData = {
    em: email ? [sha256(email)] : undefined,
    ph: phone ? [sha256(normalizePhone(phone))] : undefined,
    fn: firstName ? [sha256(firstName)] : undefined,
    ln: lastName  ? [sha256(lastName)]  : undefined,
    country: [sha256('br')],
    fbp: fbp || undefined,
    fbc: fbc || (fbclid ? `fb.1.${eventTime}.${fbclid}` : undefined),
    client_ip_address:    clientIp || undefined,
    client_user_agent:    user_agent || req.headers['user-agent'] || undefined,
  }
  // Remove campos undefined
  Object.keys(userData).forEach(k => userData[k] === undefined && delete userData[k])

  const payload = {
    data: [{
      event_name,
      event_time: eventTime,
      event_id: eid,
      action_source: 'website',
      event_source_url: event_source_url || req.headers.referer || 'https://omarcorretor.com.br/',
      user_data: userData,
    }],
  }

  const url = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(TOKEN)}`

  try {
    const fbResp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const result = await fbResp.json().catch(() => ({}))

    if (!fbResp.ok) {
      console.error('[CAPI] Meta retornou erro:', fbResp.status, result)
      return res.status(502).json({
        ok: false,
        status: fbResp.status,
        meta_error: result,
        event_id: eid,
      })
    }

    return res.status(200).json({
      ok: true,
      event_id: eid,
      events_received: result.events_received ?? 1,
      fb_trace_id: result.fbtrace_id,
    })
  } catch (err) {
    console.error('[CAPI] erro de rede:', err.message)
    return res.status(502).json({ ok: false, error: 'meta_request_failed', message: err.message, event_id: eid })
  }
}
