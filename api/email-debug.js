// /api/email-debug - Diagnóstico do envio de email via Resend
export default async function handler(req, res) {
  const apiKey = process.env.RESEND_API_KEY
  const to     = process.env.NOTIFY_EMAIL || 'isaacomar11@icloud.com'
  const from   = process.env.RESEND_FROM || 'IOS Imobi <onboarding@resend.dev>'
  
  const out = {
    env: {
      RESEND_API_KEY_set: !!apiKey,
      RESEND_API_KEY_prefix: apiKey?.slice(0, 6) || '',
      NOTIFY_EMAIL: to,
      RESEND_FROM: from,
    },
    test_send: null,
  }
  
  if (!apiKey) {
    out.error = 'RESEND_API_KEY não configurada no Vercel'
    return res.status(200).json(out)
  }
  
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        subject: '🧪 Teste IOS Imobi (debug)',
        html: '<p>Se você está vendo isso, o email funciona! 🎉</p>',
        text: 'Se você está vendo isso, o email funciona!',
      }),
    })
    const data = await r.json()
    out.test_send = {
      status: r.status,
      ok: r.ok,
      response: data,
    }
  } catch (e) {
    out.test_send = { error: e.message }
  }
  
  return res.status(200).json(out)
}
