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
    const { action, email, password, userId, active, role, tenant_id } = body

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

    // ── Criar corretor com senha definida pelo admin ──────────────────────
    if (!email || !password) {
      return json({ success: false, error: 'Email e senha sao obrigatorios' })
    }

    // Criar usuario com a senha definida pelo admin
    const { data, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    // Se o usuário já existe, vincula ao tenant em vez de errar
    if (createError) {
      const alreadyExists = createError.message?.toLowerCase().includes('already') ||
                            createError.message?.toLowerCase().includes('registered')
      if (alreadyExists) {
        // Busca usuário existente pelo e-mail
        const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1000 })
        const existing = users?.find((u: { email?: string }) => u.email?.toLowerCase() === email.toLowerCase())
        if (existing) {
          const profileUpd: Record<string, unknown> = { active: true }
          if (role)      profileUpd.role      = role
          if (tenant_id) profileUpd.tenant_id = tenant_id
          await supabase.from('profiles').update(profileUpd).eq('id', existing.id)
          return json({ success: true, user_id: existing.id, linked: true })
        }
      }
      return json({ success: false, error: createError.message })
    }

    // Criar/atualizar perfil com role e tenant_id opcionais
    const profileData: Record<string, unknown> = {
      id: data.user.id,
      name: email,
      role: role || 'corretor',
      active: true,
    }
    if (tenant_id) profileData.tenant_id = tenant_id

    const { error: profileError } = await supabase.from('profiles').upsert(profileData, { onConflict: 'id' })
    if (profileError) {
      console.error('Erro ao criar perfil:', profileError.message)
      await supabase.from('profiles').insert(profileData).select()
    }

    // Enviar email com as credenciais de acesso via Resend
    const loginUrl = 'https://omarcorretor.com.br/admin.html'
    const emailHtml = [
      '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;">',
      '<h2 style="color:#1a1a2e;">Bem-vindo ao CRM Omar Corretor!</h2>',
      '<p>Seu acesso foi criado. Use as credenciais abaixo para entrar no sistema:</p>',
      '<div style="background:#f5f5f5;border-radius:8px;padding:16px;margin:16px 0;">',
      '<p style="margin:4px 0;"><strong>E-mail:</strong> ' + email + '</p>',
      '<p style="margin:4px 0;"><strong>Senha:</strong> ' + password + '</p>',
      '</div>',
      '<a href="' + loginUrl + '" style="display:inline-block;background:#b8962e;color:white;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:bold;margin:16px 0;">Acessar o CRM</a>',
      '<p style="color:#999;font-size:12px;margin-top:16px;">Recomendamos alterar sua senha apos o primeiro acesso.</p>',
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
      // Email failed but user was created — return success with user_id
      console.error('Erro ao enviar email:', err)
    }

    return json({ success: true, user_id: data.user.id })

  } catch (err) {
    return json({ success: false, error: String(err) }, 500)
  }
})
