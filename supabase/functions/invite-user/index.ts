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
        try {
          // Busca usuário existente pelo e-mail
          const listResult = await supabase.auth.admin.listUsers({ perPage: 1000 })
          const users: Array<{ id: string; email?: string }> = (listResult?.data as any)?.users ?? []
          const existing = users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
          if (existing) {
            const profileUpd: Record<string, unknown> = { active: true }
            if (role)      profileUpd.role      = role
            if (tenant_id) profileUpd.tenant_id = tenant_id
            await supabase.from('profiles').update(profileUpd).eq('id', existing.id)
            return json({ success: true, user_id: existing.id, linked: true })
          }
        } catch (listErr) {
          console.error('Erro ao buscar usuário existente:', listErr)
        }
        return json({ success: false, error: 'Usuário já cadastrado. Verifique o e-mail informado.' })
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
    const loginUrl  = 'https://omarcorretor.com.br/admin.html'
    const crmName   = 'IOS imobi - Gerenciamento de Imóveis'
    const emailHtml = [
      '<div style="font-family:\'Segoe UI\',Arial,sans-serif;max-width:580px;margin:0 auto;padding:0;background:#f4f5f7;border-radius:12px;overflow:hidden;">',

      // Header
      '<div style="background:linear-gradient(135deg,#0a1628 0%,#1a2f4a 100%);padding:32px 32px 24px;text-align:center;">',
      '<div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:8px;">',
      '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="8" width="7" height="18" rx="1.5" fill="#c9a84c"/><rect x="11" y="4" width="7" height="22" rx="1.5" fill="#c9a84c"/><rect x="20" y="11" width="6" height="15" rx="1.5" fill="#c9a84c"/></svg>',
      '<span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">' + crmName.split(' - ')[0] + '</span>',
      '</div>',
      '<p style="color:#94a3b8;font-size:13px;margin:0;">' + crmName.split(' - ')[1] + '</p>',
      '</div>',

      // Body
      '<div style="background:#ffffff;padding:32px;">',
      '<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 8px;">Bem-vindo ao ' + crmName.split(' - ')[0] + '!</h2>',
      '<p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px;">Seu acesso foi criado. Use as credenciais abaixo para entrar no sistema:</p>',

      '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:24px;">',
      '<p style="margin:0 0 10px;font-size:14px;color:#334155;"><strong>E-mail:</strong> <span style="color:#2563eb;">' + email + '</span></p>',
      '<p style="margin:0;font-size:14px;color:#334155;"><strong>Senha:</strong> <span style="font-family:monospace;background:#f1f5f9;padding:2px 8px;border-radius:4px;">' + password + '</span></p>',
      '</div>',

      '<a href="' + loginUrl + '" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:700;font-size:15px;margin-bottom:24px;">Acessar o CRM →</a>',

      '<p style="color:#94a3b8;font-size:13px;margin:0;">Recomendamos alterar sua senha após o primeiro acesso.</p>',
      '</div>',

      // Footer
      '<div style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;text-align:center;">',
      '<p style="color:#94a3b8;font-size:12px;margin:0;">' + crmName + '</p>',
      '</div>',

      '</div>',
    ].join('')

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + Deno.env.get('RESEND_API_KEY'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'IOS imobi <noreply@omarcorretor.com.br>',
        to: email,
        subject: 'Seu acesso ao CRM - IOS imobi',
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
