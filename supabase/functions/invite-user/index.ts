import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const body = await req.json()
    const { action, email, userId, active } = body

    // ── Toggle ativo/pausado ──────────────────────────────────────────────
    if (action === 'toggle') {
      if (!userId) return json({ success: false, error: 'userId obrigatorio' })
      await supabase.from('profiles').update({ active }).eq('id', userId)
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        ban_duration: active ? 'none' : '87600h',
      })
      if (error) return json({ success: false, error: error.message })
      return json({ success: true })
    }

    // ── Excluir corretor ──────────────────────────────────────────────────
    if (action === 'delete') {
      if (!userId) return json({ success: false, error: 'userId obrigatorio' })
      await supabase.from('profiles').delete().eq('id', userId)
      const { error } = await supabase.auth.admin.deleteUser(userId)
      if (error) return json({ success: false, error: error.message })
      return json({ success: true })
    }

    // ── Enviar convite ────────────────────────────────────────────────────
    if (!email) return json({ success: false, error: 'Email obrigatorio' })

    // generateLink type invite cria o usuario (se nao existir) e gera link correto
    // Esse link pede para o usuario definir a senha na primeira vez que acessar
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'invite',
      email,
      options: { redirectTo: 'https://omarcorretor.com.br/admin.html' }
    })

    if (linkError) return json({ success: false, error: linkError.message })

    // Criar/atualizar perfil com role corretor
    const newUserId = linkData?.user?.id
    if (newUserId) {
      await supabase.from('profiles').upsert({
        id: newUserId,
        name: email,
        role: 'corretor',
        active: true,
        needs_password_reset: true,
      }, { onConflict: 'id' })
    }

    const accessLink = linkData?.properties?.action_link ?? 'https://omarcorretor.com.br/admin.html'

    const emailHtml = [
      '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">',
      '<h2 style="color:#1a1a2e;">Bem-vindo ao CRM Omar Corretor!</h2>',
      '<p>Seu acesso foi criado. Clique no botao abaixo para definir sua senha e acessar o sistema:</p>',
      '<a href="' + accessLink + '" style="display:inline-block;background:#b8962e;color:white;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:bold;margin:16px 0;">Acessar o CRM</a>',
      '<p style="color:#666;font-size:14px;">Se o botao nao funcionar, copie este link:<br>' + accessLink + '</p>',
      '<p style="color:#999;font-size:12px;">Este link expira em 24 horas.</p>',
      '<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">',
      '<p style="color:#999;font-size:12px;">Omar Corretor de Imoveis - CRECI 69965F</p>',
      '</div>',
    ].join('')

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + Deno.env.get('RESEND_API_KEY'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Omar Corretor <noreply@omarcorretor.com.br>',
        to: email,
        subject: 'Seu acesso ao CRM - Omar Corretor',
        html: emailHtml,
      })
    })

    if (!resendRes.ok) {
      const err = await resendRes.text()
      return json({ success: false, error: 'Erro ao enviar email: ' + err })
    }

    return json({ success: true })

  } catch (err) {
    return json({ success: false, error: String(err) }, 500)
  }
})
