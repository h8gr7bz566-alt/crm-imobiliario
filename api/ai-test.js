// /api/ai-test - Diagnóstico do estado da integração Gemini
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-flash-latest']

export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY
  const result = {
    timestamp: new Date().toISOString(),
    env: {
      GEMINI_API_KEY_set: !!apiKey,
      GEMINI_API_KEY_length: apiKey?.length || 0,
      GEMINI_API_KEY_prefix: apiKey?.slice(0, 4) || '',
    },
    models: {},
  }

  if (!apiKey) {
    result.error = 'GEMINI_API_KEY não está no ambiente do Vercel'
    return res.status(200).json(result)
  }

  // Testa cada modelo com prompt mínimo
  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'oi' }] }],
          generationConfig: { maxOutputTokens: 20 },
        }),
      })
      const txt = await r.text()
      result.models[model] = {
        status: r.status,
        ok: r.ok,
        response: txt.slice(0, 400),
      }
    } catch (e) {
      result.models[model] = { error: e.message }
    }
  }

  return res.status(200).json(result)
}
