// api/og/[id].js — Vercel Serverless Function
// Usa fetch nativo (Node 18+) — sem dependência do supabase-js

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function formatPrice(raw) {
  if (!raw) return ''
  const str = String(raw).trim()
  let num
  if (str.includes(',') && str.lastIndexOf(',') > str.lastIndexOf('.')) {
    num = parseFloat(str.replace(/\./g, '').replace(',', '.'))
  } else {
    num = parseFloat(str.replace(/[^\d.]/g, ''))
  }
  if (isNaN(num) || num === 0) return str
  return 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

module.exports = async function handler(req, res) {
  const rawId = String(req.query.id || '').replace(/\.html$/, '').trim()
  const target = `https://www.omarcorretor.com.br/property.html?id=${rawId}`

  if (!rawId) return res.redirect(302, 'https://www.omarcorretor.com.br/')

  try {
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL
    const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY

    const apiUrl = `${SUPABASE_URL}/rest/v1/properties?id=eq.${encodeURIComponent(rawId)}&select=id,title,description,price,images,cover_image,bedrooms,parking,city,neighborhood&limit=1`

    const resp = await fetch(apiUrl, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Accept': 'application/json'
      }
    })

    if (!resp.ok) return res.redirect(302, target)

    const rows = await resp.json()
    const p = rows && rows[0]

    if (!p) return res.redirect(302, target)

    const price = formatPrice(p.price)
    const parts = [
      price,
      p.bedrooms ? `${p.bedrooms} dorm.` : '',
      p.parking  ? `${p.parking} vaga${p.parking > 1 ? 's' : ''}` : '',
      p.neighborhood,
      p.city,
    ].filter(Boolean)

    const ogTitle = esc(`${p.title} — Isaac Omar Corretor`)
    const ogDesc  = esc(parts.length ? parts.join(' · ') : (p.description || '').slice(0, 155) || 'Imóvel disponível')
    // Filtra base64 — WhatsApp só aceita https://
    function pickImage(candidates) {
      for (const c of candidates) {
        if (c && typeof c === 'string' && c.startsWith('http')) return c
      }
      return 'https://omarcorretor.com.br/logo.png'
    }
    const ogImage = pickImage([p.cover_image, ...(p.images || [])])
    const ogUrl   = `https://omarcorretor.com.br/og/${rawId}`

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>${ogTitle}</title>
<meta property="og:type"         content="website">
<meta property="og:url"          content="${esc(ogUrl)}">
<meta property="og:title"        content="${ogTitle}">
<meta property="og:description"  content="${ogDesc}">
<meta property="og:image"        content="${esc(ogImage)}">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name"    content="Isaac Omar Corretor">
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="${ogTitle}">
<meta name="twitter:description" content="${ogDesc}">
<meta name="twitter:image"       content="${esc(ogImage)}">
<meta http-equiv="refresh" content="0;url=${esc(target)}">
</head>
<body style="font-family:sans-serif;text-align:center;padding:60px 20px">
  <p>Abrindo imóvel... <a href="${esc(target)}">Clique aqui</a> se não redirecionar.</p>
  <script>window.location.replace(${JSON.stringify(target)})</script>
</body>
</html>`

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).send(html)

  } catch (err) {
    console.error('OG error:', err)
    return res.redirect(302, target)
  }
}
