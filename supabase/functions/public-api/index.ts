import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const url = new URL(req.url)
  const apiKey = url.searchParams.get('key') || req.headers.get('x-api-key')

  if (!apiKey) {
    return json({
      error: 'API key obrigatória',
      hint: 'Use ?key=SUA_CHAVE ou o header X-Api-Key',
    }, 401)
  }

  // A chave é o próprio ID do tenant (UUID único — sem schema change necessário)
  // Futuramente pode ser migrada para api_key dedicada
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, name, active')
    .eq('id', apiKey)
    .single()

  if (!tenant) return json({ error: 'API key inválida' }, 401)
  if (tenant.active === false) return json({ error: 'Conta inativa. Contate o suporte.' }, 403)

  const tenantId = tenant.id

  // Descobre o recurso a partir do path
  // Ex: /functions/v1/public-api/properties?...
  const path = url.pathname.replace(/.*\/public-api\/?/, '')
  const [resource, resourceId] = path.split('/')

  // ── GET /properties ──────────────────────────────────────────────
  if (req.method === 'GET' && resource === 'properties') {
    if (resourceId) {
      const { data, error } = await supabase
        .from('properties')
        .select('id,title,reference,city,neighborhood,price,area,bedrooms,suites,parking,description,images,condominium,construction_status,published,created_at')
        .eq('id', resourceId)
        .eq('tenant_id', tenantId)
        .eq('published', true)
        .single()
      if (error || !data) return json({ error: 'Imóvel não encontrado' }, 404)
      return json(data)
    }

    const type       = url.searchParams.get('type')
    const city       = url.searchParams.get('city')
    const minPrice   = url.searchParams.get('min_price')
    const maxPrice   = url.searchParams.get('max_price')
    const bedrooms   = url.searchParams.get('bedrooms')
    const limit      = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100)
    const page       = Math.max(1, parseInt(url.searchParams.get('page') || '1'))
    const offset     = (page - 1) * limit

    let q = supabase
      .from('properties')
      .select('id,title,reference,city,neighborhood,price,area,bedrooms,suites,parking,images,condominium,construction_status,published,created_at', { count: 'exact' })
      .eq('tenant_id', tenantId)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (city)     q = q.ilike('city', `%${city}%`)
    if (minPrice) q = q.gte('price', parseFloat(minPrice))
    if (maxPrice) q = q.lte('price', parseFloat(maxPrice))
    if (bedrooms) q = q.eq('bedrooms', parseInt(bedrooms))

    const { data, error, count } = await q
    if (error) return json({ error: error.message }, 500)

    return json({
      data: data || [],
      pagination: { total: count || 0, page, limit, pages: Math.ceil((count || 0) / limit) },
    })
  }

  // ── GET /settings ─────────────────────────────────────────────────
  if (req.method === 'GET' && resource === 'settings') {
    const { data } = await supabase
      .from('settings')
      .select('key,value')
      .eq('tenant_id', tenantId)
    const out: Record<string, unknown> = {}
    data?.forEach(r => { out[r.key] = r.value })
    return json(out)
  }

  // ── POST /leads ───────────────────────────────────────────────────
  if (req.method === 'POST' && resource === 'leads') {
    let body: Record<string, unknown> = {}
    try { body = await req.json() } catch { return json({ error: 'JSON inválido' }, 400) }

    const { name, email, phone, message, source } = body as Record<string, string>
    if (!name || !phone) return json({ error: 'name e phone são obrigatórios' }, 400)

    const { data, error } = await supabase.from('leads').insert({
      name,
      email:  email  || null,
      phone:  phone  || null,
      notes:  message || null,
      source: source || 'api',
      stage:  'novo',
      tenant_id: tenantId,
    }).select('id').single()

    if (error) return json({ error: error.message }, 500)
    return json({ success: true, lead_id: data?.id })
  }

  // ── GET / (documentação inline) ───────────────────────────────────
  if (!resource) {
    return json({
      api: 'IOS imobi Public API',
      tenant: tenant.name,
      version: '1.0',
      base_url: `${url.origin}${url.pathname}`,
      endpoints: {
        'GET /properties':         'Lista imóveis publicados. Filtros: type, city, min_price, max_price, bedrooms, limit, page',
        'GET /properties/:id':     'Detalhe de um imóvel',
        'GET /settings':           'Configurações públicas da imobiliária (nome, contatos, redes sociais)',
        'POST /leads':             'Registra um lead. Body: { name*, phone*, email, message, property_id, source }',
      },
      authentication: 'Passe ?key=SUA_CHAVE na URL ou header X-Api-Key',
    })
  }

  return json({ error: 'Endpoint não encontrado' }, 404)
})
