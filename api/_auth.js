// api/_auth.js — verifica quem está chamando as funções /api (arquivo com "_" não vira rota na Vercel)
import { createClient } from '@supabase/supabase-js'

export function adminClient() {
  return createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// Retorna { user, profile } do usuário logado no CRM, ou null.
export async function getCaller(req) {
  const h = req.headers.authorization || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : ''
  if (!token) return null
  try {
    const sb = adminClient()
    const { data, error } = await sb.auth.getUser(token)
    if (error || !data?.user) return null
    const { data: profile } = await sb.from('profiles')
      .select('id, role, tenant_id, active').eq('id', data.user.id).maybeSingle()
    if (!profile || profile.active === false) return null
    return { user: data.user, profile }
  } catch (_) { return null }
}

const STAFF = ['corretor', 'admin', 'super_admin']

// Exige usuário do CRM (corretor/admin). Responde 401 e retorna null se não for.
export async function requireStaff(req, res, roles = STAFF) {
  const caller = await getCaller(req)
  if (!caller || !roles.includes(caller.profile.role)) {
    res.status(401).json({ error: 'Não autorizado' })
    return null
  }
  return caller
}

export const requireAdmin = (req, res) => requireStaff(req, res, ['admin', 'super_admin'])
