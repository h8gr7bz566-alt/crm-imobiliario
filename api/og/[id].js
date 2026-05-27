// api/og/[id].js — Vercel Serverless Function
// Gera HTML com Open Graph tags dinâmicas para cada imóvel
// WhatsApp, Telegram, iMessage leem essas tags para mostrar o preview

import { createClient } from '@supabase/supabase-js'

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

export default async function handler(req, res) {
  const { id } = req.query
  const target  = `https://omarcorretor.com.br/property.html?id=${id}`

  if (!id) return res.redirect(302, 'https://omarcorretor.com.br/')

  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    )

    const { data: p, error } = await supabase
      .from('properties')
      .select('id, title, description, price, images, cover_image, bedrooms, suites, parking, city, neighborhood, reference')
      .eq('id', id)
      .maybeSingle()

    if (error || !p) return res.redirect(302, target)

    const price = formatPrice(p.price)
    const parts = [
      price,
      p.bedrooms ? `${p.bedrooms} dorm.` : '',
      p.parking  ? `${p.parking} vaga${p.parking > 1 ? 's' : ''}` : '',
      p.neighborhood,
      p.city,
    ].filter(Boolean)

    const ogTitle = esc(`${p.title} — Isaac Omar Corretor`)
    const ogDesc  = esc(
      parts.length
        ? parts.join(' · ')
        : (p.description?.slice(0, 155) || 'Imóvel disponível — Isaac Omar Corretor de Imóveis')
    )
    const ogImage = p.cover_image || p.images?.[0] || 'https://omarcorretor.com.br/logo.png'
    const ogUrl   = `https://omarcorretor.com.br/og/${id}`

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
<meta property="og:locale"       content="pt_BR">
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="${ogTitle}">
<meta name="twitter:description" content="${ogDesc}">
<meta name="twitter:image"       content="${esc(ogImage)}">
<meta http-equiv="refresh" content="0;url=${esc(target)}">
<link rel="canonical" href="${esc(target)}">
</head>
<body style="font-family:sans-serif;text-align:center;padding:60px 20px;color:#0d2144;background:#f5f7fa">
  <p style="font-size:16px">Abrindo imóvel... <a href="${esc(target)}" style="color:#c9a84c">Clique aqui</a> se não redirecionar.</p>
  <script>window.location.replace(${JSON.stringify(target)})</script>
</body>
</html>`

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).send(html)

  } catch (err) {
    console.error('OG handler error:', err)
    return res.redirect(302, target)
  }
}
