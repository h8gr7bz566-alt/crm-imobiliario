// /api/ai.js — Proxy pro Gemini (Google AI)
// Recebe: { mode, prompt, context }
// Retorna: { text, parsed? }
// Modes: 'search', 'chat', 'qa', 'similar'

const ALLOWED = ['https://omarcorretor.com.br', 'https://www.omarcorretor.com.br', 'http://localhost:5173']
const MODELS = ['gemini-2.5-flash', 'gemini-flash-latest']  // só os que confirmadamente funcionam

export default async function handler(req, res) {
  // CORS
  const origin = req.headers.origin || ''
  if (ALLOWED.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY não configurada no servidor' })

    const { mode = 'chat', prompt = '', context = {} } = req.body || {}
    if (!prompt) return res.status(400).json({ error: 'prompt obrigatório' })

    const systems = {
      search: `Você é um assistente que extrai filtros de busca de imóveis a partir de pedidos em português brasileiro.
A resposta DEVE ser um JSON válido (sem markdown, sem explicação extra) com estas chaves opcionais:
{
  "type": "venda" | "aluguel" | null,
  "category": "apartamento" | "casa" | "terreno" | "sobrado" | "comercial" | null,
  "city": "nome da cidade" | null,
  "neighborhood": "nome do bairro" | null,
  "state": "UF" | null,
  "bedrooms_min": número | null,
  "bathrooms_min": número | null,
  "parking_min": número | null,
  "price_max": número (em reais, sem pontos) | null,
  "price_min": número | null,
  "area_min": número | null,
  "keywords": []
}
NUNCA inclua chaves que não estejam no pedido. Se não mencionou, deixa null.
EXEMPLO: "apto 3 quartos na Barra Sul até 800 mil"
RESPOSTA: {"category":"apartamento","bedrooms_min":3,"neighborhood":"Barra Sul","price_max":800000,"keywords":[]}`,

      chat: `Você é a assistente virtual do corretor Isaac Omar.
Conversa CURTA e objetiva. UMA pergunta por vez. Português BR casual.

ORDEM (siga essa ordem):
1. Quer comprar ou alugar?
2. Tipo: apto, casa, terreno?
3. Cidade ou bairro?
4. Orçamento?
5. Dorms?
6. Qual seu nome?
7. WhatsApp com DDD?

REGRAS:
- Telefone é OBRIGATÓRIO. Insista educadamente se pular: "Pra Isaac te chamar, preciso do whats."
- Se já tem nome E telefone, FINALIZE.

QUANDO TIVER NOME + TELEFONE, responda EXATAMENTE assim e PARE:
PRONTO_PARA_CRIAR_LEAD
{"name":"...","phone":"...","email":"","intencao":"...","tipo":"...","cidade":"...","bairro":"...","orcamento":"...","dormitorios":"..."}

Sem nome+telefone, JAMAIS escreva PRONTO_PARA_CRIAR_LEAD. Continue a conversa.`,

      qa: `Você é um assistente especialista em imóveis. Responda dúvidas do visitante sobre o imóvel abaixo.
Seja direto, breve (2-3 frases). Se a info não estiver disponível, ofereça falar com o corretor (Isaac).
IMÓVEL: ${JSON.stringify(context.property || {}, null, 2)}`,

      similar: `Dado um imóvel, escolha os 5 mais parecidos da lista fornecida.
Critérios: cidade/bairro, tipo, quartos, faixa de preço, área.
Responda APENAS um JSON: {"ids": ["id1","id2","id3","id4","id5"]} (sem markdown).
IMÓVEL DE REFERÊNCIA: ${JSON.stringify(context.property || {}, null, 2)}
CANDIDATOS: ${JSON.stringify(context.candidates || [], null, 2)}`,
    }

    const systemPrompt = systems[mode] || systems.chat

    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        temperature: (mode === 'search' || mode === 'similar') ? 0.1 : 0.7,
        maxOutputTokens: mode === 'qa' ? 600 : 2000,  // chat e search precisam mais (thinking do 2.5)
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    }

    // Tenta cada modelo até um funcionar
    let text = ''
    let lastErr = null
    for (const model of MODELS) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      try {
        const r = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (r.ok) {
          const data = await r.json()
          text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
          if (text) break
          lastErr = { status: 200, detail: 'empty response', model }
          continue
        }
        const txt = await r.text()
        lastErr = { status: r.status, detail: txt.slice(0, 300), model }
        // Erros não-recuperáveis abortam (auth, etc)
        if (r.status === 401 || r.status === 403 || r.status === 400) {
          return res.status(r.status).json({ error: 'Gemini auth/request error', detail: txt.slice(0, 300), model })
        }
        // 429/503/500 — tenta próximo modelo
      } catch (e) {
        lastErr = { status: 0, detail: e.message, model }
      }
    }

    if (!text) {
      return res.status(429).json({ error: 'Todos os modelos esgotados ou indisponíveis', detail: lastErr })
    }

    // Parse JSON pra modos que retornam estruturado
    let parsed = null
    if (mode === 'search' || mode === 'similar') {
      try {
        const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
        parsed = JSON.parse(clean)
      } catch (e) { /* parsed fica null */ }
    }

    return res.status(200).json({ text, parsed })
  } catch (e) {
    return res.status(500).json({ error: 'Falha inesperada', detail: e.message, stack: e.stack?.slice(0, 500) })
  }
}
