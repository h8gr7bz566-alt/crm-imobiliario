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

function buildEmailHtml(email: string, password: string, loginUrl: string, crmName: string): string {
  const [shortName, subtitle] = crmName.split(' - ')
  return [
    '<div style="font-family:\'Segoe UI\',Arial,sans-serif;max-width:580px;margin:0 auto;background:#f4f5f7;border-radius:12px;overflow:hidden;">',
    '<div style="background:linear-gradient(135deg,#0a1628 0%,#1a2f4a 100%);padding:32px;text-align:center;">',
    '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:8px;"><rect x="2" y="8" width="7" height="18" rx="1.5" fill="#c9a84c"/><rect x="11" y="4" width="7" height="22" rx="1.5" fill="#c9a84c"/><rect x="20" y="11" width="6" height="15" rx="1.5" fill="#c9a84c"/></svg>',
    '<span style="font-size:22px;font-weight:800;color:#ffffff;vertical-align:middle;">' + shortName + '</span>',
    subtitle ? '<p style="color:#94a3b8;font-size:13px;margin:8px 0 0;">' + subtitle + '</p>' : '',
    '</div>',
    '<div style="background:#ffffff;padding:32px;">',
    '<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:0 0 8px;">Bem-vindo ao ' + shortName + '!</h2>',
    '<p style="color:#475569;font-size:15px;line-height:1.6;margin:0 0 24px;">Seu acesso foi criado. Use as credenciais abaixo para entrar no sistema:</p>',
    '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-bottom:24px;">',
    '<p style="margin:0 0 10px;font-size:14px;color:#334155;"><strong>E-mail:</strong> <span style="color:#2563eb;">' + email + '</span></p>',
    '<p style="margin:0;font-size:14px;color:#334155;"><strong>Senha:</strong> <span style="font-family:monospace;background:#f1f5f9;padding:2px 8px;border-radius:4px;">' + password + '</span></p>',
    '</div>',
    '<a href="' + loginUrl + '" style="display:inline-block;background:#c9a84c;color:#fff;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:700;font-size:15px;margin-bottom:24px;">Acessar o CRM →</a>',
    '<p style="color:#94a3b8;font-size:13px;margin:0;">Recomendamos alterar sua senha após o primeiro acesso.</p>',
    '</div>',
    '<div style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;text-align:center;">',
    '<p style="color:#94a3b8;font-size:12px;margin:0;">' + crmName + '</p>',
    '</div>',
    '</div>',
  ].join('')
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
          // Busca usuário existente via SQL direto (mais confiável que listUsers)
          const { data: authUsers, error: listErr2 } = await supabase
            .rpc('get_user_id_by_email', { user_email: email.toLowerCase() })
          console.log('rpc result:', JSON.stringify(authUsers), listErr2?.message)

          // Fallback: listUsers paginado
          const listResult = await supabase.auth.admin.listUsers({ page: 1, perPage: 500 })
          console.log('listUsers error:', (listResult as any)?.error?.message)
          const rawUsers = (listResult as any)?.data?.users
          console.log('listUsers count:', Array.isArray(rawUsers) ? rawUsers.length : 'not array', typeof rawUsers)
          const users: Array<{ id: string; email?: string }> = Array.isArray(rawUsers) ? rawUsers : []
          const existing = users.find((u) => u.email?.toLowerCase() === email.toLowerCase())
          console.log('found existing:', existing?.id, 'searching for:', email.toLowerCase())
          if (existing) {
            // Busca role atual para não rebaixar super_admin
            const { data: existingProfile } = await supabase
              .from('profiles').select('role').eq('id', existing.id).single()
            const currentRole = existingProfile?.role
            const profileUpd: Record<string, unknown> = { active: true }
            // Nunca rebaixa super_admin para uma role inferior
            if (role && currentRole !== 'super_admin') profileUpd.role = role
            if (tenant_id) profileUpd.tenant_id = tenant_id
            await supabase.from('profiles').update(profileUpd).eq('id', existing.id)

            // Nunca altera senha de super_admin
            if (currentRole !== 'super_admin') {
              await supabase.auth.admin.updateUserById(existing.id, { password })
            }

            // Envia e-mail com as novas credenciais
            const loginUrl2 = 'https://omarcorretor.com.br/admin.html'
            const crmName2  = 'IOS imobi - Gerenciamento de Imóveis'
            const html2     = buildEmailHtml(email, password, loginUrl2, crmName2)
            const resendKey2 = Deno.env.get('RESEND_API_KEY')
            let emailSent2 = false
            let emailError2 = ''
            if (resendKey2) {
              const r = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + resendKey2, 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: 'IOS imobi <noreply@omarcorretor.com.br>', to: email, subject: 'Seu acesso ao CRM - IOS imobi', html: html2 })
              })
              if (r.ok) { emailSent2 = true } else { emailError2 = await r.text() }
            } else {
              emailError2 = 'RESEND_API_KEY não configurada'
            }
            return json({ success: true, user_id: existing.id, linked: true, email_sent: emailSent2, email_error: emailError2 || undefined })
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
    const emailHtml = buildEmailHtml(email, password, loginUrl, crmName)

    const resendKey = Deno.env.get('RESEND_API_KEY')
    if (!resendKey) {
      console.error('RESEND_API_KEY não configurada')
      return json({ success: true, user_id: data.user.id, email_sent: false, email_error: 'Chave RESEND_API_KEY não configurada no servidor.' })
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + resendKey,
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
      const errText = await resendRes.text()
      console.error('Resend error:', resendRes.status, errText)
      return json({ success: true, user_id: data.user.id, email_sent: false, email_error: `Resend ${resendRes.status}: ${errText}` })
    }

    return json({ success: true, user_id: data.user.id, email_sent: true })

  } catch (err) {
    return json({ success: false, error: String(err) }, 500)
  }
})
