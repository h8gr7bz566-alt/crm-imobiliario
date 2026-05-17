import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

Deno.serve(async (req: Request) => {
  const url    = new URL(req.url)
  const id     = url.searchParams.get('id')
  const target = `https://omarcorretor.com.br/property.html?id=${id}`

  if (!id) return Response.redirect('https://omarcorretor.com.br', 302)

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data, error } = await supabase
      .from('properties')
      .select('title, description, price, images, bedrooms, suites, parking, city, neighborhood')
      .eq('id', id)
      .eq('published', true)
      .maybeSingle()

    if (error || !data) return Response.redirect(target, 302)

    // Montar título e descrição para o preview
    const ogTitle = `${data.title} — Isaac Omar Corretor`

    const descParts: string[] = []
    if (data.price)        descParts.push(data.price)
    if (data.bedrooms)     descParts.push(`${data.bedrooms} dorm.`)
    if (data.suites)       descParts.push(`${data.suites} suíte${data.suites > 1 ? 's' : ''}`)
    if (data.parking)      descParts.push(`${data.parking} vaga${data.parking > 1 ? 's' : ''}`)
    if (data.neighborhood) descParts.push(data.neighborhood)
    if (data.city)         descParts.push(data.city)
    const ogDesc = descParts.length
      ? descParts.join(' · ')
      : (data.description?.slice(0, 160) || 'Veja este imóvel em Isaac Omar Corretor')

    const ogImage = data.images?.[0] ?? ''

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(ogTitle)}</title>

  <!-- Open Graph -->
  <meta property="og:type"        content="website">
  <meta property="og:url"         content="${escapeHtml(target)}">
  <meta property="og:title"       content="${escapeHtml(ogTitle)}">
  <meta property="og:description" content="${escapeHtml(ogDesc)}">
  <meta property="og:site_name"   content="Isaac Omar Corretor">
  ${ogImage ? `<meta property="og:image"       content="${escapeHtml(ogImage)}">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">` : ''}

  <!-- Twitter / WhatsApp fallback -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${escapeHtml(ogTitle)}">
  <meta name="twitter:description" content="${escapeHtml(ogDesc)}">
  ${ogImage ? `<meta name="twitter:image"       content="${escapeHtml(ogImage)}">` : ''}

  <!-- Redireciona o usuário humano imediatamente -->
  <meta http-equiv="refresh" content="0;url=${escapeHtml(target)}">
  <link rel="canonical" href="${escapeHtml(target)}">
</head>
<body style="font-family:sans-serif;text-align:center;padding:40px;color:#555">
  <p>Redirecionando para o imóvel…</p>
  <a href="${escapeHtml(target)}">Clique aqui se não for redirecionado</a>
</body>
</html>`

    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })

  } catch (err) {
    return Response.redirect(target, 302)
  }
})
