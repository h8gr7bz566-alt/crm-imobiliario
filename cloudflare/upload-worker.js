// Cloudflare Worker "upload-imoveis" — upload de fotos para o R2 (bucket "imoveis")
// Versão com segurança (out/2026). Cole este código inteiro no editor do Worker na Cloudflare.
//
// O que mudou em relação à versão antiga:
// - Só aceita envio de quem está logado no CRM (token da sessão do Supabase)
// - Só aceita imagens (jpg, png, webp, gif, avif), até 15 MB
// - Não deixa sobrescrever uma foto que já existe
// - Só responde para o site omarcorretor.com.br (e as prévias da Vercel)
// O formato da resposta continua igual: { publicUrl } ou { error }.

const SUPABASE_URL = 'https://hfcohzumcxnquqkocwwj.supabase.co'
// Chave PÚBLICA (anon) do Supabase — a mesma que já vai dentro do site
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmY29oenVtY3hucXVxa29jd3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4NjE5NDIsImV4cCI6MjEwNjQzNzk0Mn0.shrz0LsQy9YaAXVcTpqtVUv16E--I2Qi_6N4raYYI6g'
const PUBLIC_BASE = 'https://pub-a706e9a03660454e9883f54411a96118.r2.dev/'

const MAX_BYTES = 15 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

function allowedOrigin(origin) {
  return /^https:\/\/(www\.)?omarcorretor\.com\.br$/.test(origin) ||
         /^https:\/\/crm-imobiliario[a-z0-9-]*\.vercel\.app$/.test(origin) ||
         /^http:\/\/localhost:\d+$/.test(origin)
}

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': allowedOrigin(origin) ? origin : 'https://omarcorretor.com.br',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin',
  }
}

function reply(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(origin) },
  })
}

// Encontra o bucket R2 ligado a este Worker, qualquer que seja o nome da ligação
function findBucket(env) {
  if (env.BUCKET) return env.BUCKET
  for (const v of Object.values(env)) {
    if (v && typeof v.put === 'function' && typeof v.head === 'function') return v
  }
  return null
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) })
    if (request.method !== 'POST') return reply({ error: 'Método não permitido' }, 405, origin)

    // 1) Precisa estar logado no CRM
    const auth = request.headers.get('Authorization') || ''
    if (!auth.startsWith('Bearer ')) return reply({ error: 'Não autorizado' }, 401, origin)
    const who = await fetch(SUPABASE_URL + '/auth/v1/user', {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: auth },
    })
    if (!who.ok) return reply({ error: 'Não autorizado' }, 401, origin)

    const bucket = findBucket(env)
    if (!bucket) return reply({ error: 'Bucket R2 não configurado no Worker' }, 500, origin)

    // 2) Arquivo e caminho
    let form
    try { form = await request.formData() } catch (_) { return reply({ error: 'Envio inválido' }, 400, origin) }
    const file = form.get('file')
    let path = String(form.get('path') || '')

    if (!file || typeof file === 'string') return reply({ error: 'Arquivo ausente' }, 400, origin)
    if (file.size > MAX_BYTES) return reply({ error: 'Arquivo muito grande (máx. 15 MB)' }, 413, origin)
    const type = (file.type || '').toLowerCase()
    if (!ALLOWED_TYPES.includes(type)) return reply({ error: 'Só imagens são aceitas' }, 415, origin)

    path = path.replace(/^\/+/, '')
    if (!path || path.length > 200 || path.includes('..') || !/^[A-Za-z0-9/_.\-]+$/.test(path)) {
      return reply({ error: 'Caminho inválido' }, 400, origin)
    }

    // 3) Não sobrescreve foto existente
    if (await bucket.head(path)) return reply({ error: 'Arquivo já existe' }, 409, origin)

    await bucket.put(path, file.stream(), { httpMetadata: { contentType: type, cacheControl: 'public, max-age=31536000, immutable' } })
    return reply({ publicUrl: PUBLIC_BASE + path }, 200, origin)
  },
}
