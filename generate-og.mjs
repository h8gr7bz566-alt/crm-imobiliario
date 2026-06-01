// generate-og.mjs — Gera páginas OG estáticas para cada imóvel publicado
// Roda após o vite build e escreve em dist/og/[id].html
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl  = process.env.VITE_SUPABASE_URL
const supabaseKey  = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Variáveis VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY não encontradas — pulando geração OG')
  process.exit(0)
}

try {

const supabase = createClient(supabaseUrl, supabaseKey)

const { data: properties, error } = await supabase
  .from('properties')
  .select('id, title, description, price, images, bedrooms, parking, city, neighborhood')
  .eq('published', true)

if (error) {
  console.warn('⚠️  Erro ao buscar imóveis:', error.message)
  process.exit(0)
}

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/[^\x00-\x7F]/g, c => `&#${c.charCodeAt(0)};`)
}

const ogDir = path.join('public', 'og')
fs.mkdirSync(ogDir, { recursive: true })

for (const p of properties ?? []) {
  const target = `https://omarcorretor.com.br/property.html?id=${p.id}`

  const parts = []
  if (p.price)        parts.push(p.price)
  if (p.bedrooms)     parts.push(`${p.bedrooms} dorm.`)
  if (p.parking)      parts.push(`${p.parking} vaga${p.parking > 1 ? 's' : ''}`)
  if (p.neighborhood) parts.push(p.neighborhood)
  if (p.city)         parts.push(p.city)

  const ogTitle = esc(`${p.title} - Isaac Omar Corretor`)
  const ogDesc  = esc(parts.length ? parts.join(' | ') : (p.description?.slice(0, 160) || 'Imovel em Isaac Omar Corretor'))
  // Filtra base64 data URIs — WhatsApp só aceita https://
  const rawImg = p.cover_image || (p.images && p.images.find(i => i && i.startsWith('http'))) || ''
  const ogImage = rawImg

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>${ogTitle}</title>
<meta property="og:type"        content="website">
<meta property="og:url"         content="${esc(target)}">
<meta property="og:title"       content="${ogTitle}">
<meta property="og:description" content="${ogDesc}">
<meta property="og:site_name"   content="Isaac Omar Corretor">
${ogImage ? `<meta property="og:image"       content="${esc(ogImage)}">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">` : ''}
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="${ogTitle}">
<meta name="twitter:description" content="${ogDesc}">
${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">` : ''}
<link rel="canonical" href="${esc(target)}">
<meta http-equiv="refresh" content="0;url=${target}">
</head>
<body style="font-family:sans-serif;text-align:center;padding:40px;color:#555">
<p>Redirecionando... <a href="${target}">Clique aqui</a></p>
</body>
</html>`

  fs.writeFileSync(path.join(ogDir, `${p.id}.html`), html, 'utf8')
}

  console.log(`✅  OG pages geradas: ${properties?.length ?? 0} imoveis`)
} catch (e) {
  console.warn('⚠️  generate-og.mjs erro (pulando):', e.message)
}
