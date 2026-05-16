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
    const { action, email, password, userId } = body

    // ── Ban user ──────────────────────────────────────────────────────────
    if (action === 'ban') {
      if (!userId) return json({ success: false, error: 'userId obrigatório' })
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        ban_duration: '87600h',
      })
      if (error) return json({ success: false, error: error.message })
      return json({ success: true })
    }

    // ── Unban user ────────────────────────────────────────────────────────
    if (action === 'unban') {
      if (!userId) return json({ success: false, error: 'userId obrigatório' })
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        ban_duration: 'none',
      })
      if (error) return json({ success: false, error: error.message })
      return json({ success: true })
    }

    // ── Create user ───────────────────────────────────────────────────────
    if (!email || !password) {
      return json({ success: false, error: 'Email e senha são obrigatórios' })
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })
    if (error) return json({ success: false, error: error.message })

    // Cria perfil automaticamente
    await supabase.from('profiles').upsert({
      id: data.user.id,
      name: email,
      role: 'corretor',
      active: true,
    })

    return json({ success: true, user: { id: data.user.id, email: data.user.email } })

  } catch (err) {
    return json({ success: false, error: String(err) }, 500)
  }
})
