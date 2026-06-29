// /api/telegram-send - Envia mensagem via Telegram Bot
// ENV: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const token  = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    return res.status(500).json({ error: 'TELEGRAM_BOT_TOKEN ou TELEGRAM_CHAT_ID não configurados' })
  }

  const { text, title } = req.body || {}
  if (!text) return res.status(400).json({ error: 'text obrigatório' })

  const message = (title ? `*${title}*\n` : '') + text
  const url = `https://api.telegram.org/bot${token}/sendMessage`

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
      }),
    })
    const data = await r.json()
    if (!data.ok) return res.status(500).json({ error: 'Telegram API erro', detail: data })
    return res.status(200).json({ ok: true, message_id: data.result?.message_id })
  } catch (e) {
    return res.status(500).json({ error: 'Falha ao chamar Telegram', detail: e.message })
  }
}
