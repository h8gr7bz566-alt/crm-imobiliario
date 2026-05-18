# 07 — Edge Functions

## Visão Geral

Edge Functions são executadas no runtime Deno do Supabase. Usam a `service_role` key (nunca exposta no frontend) para operações privilegiadas que o cliente anônimo não pode realizar.

## URL Base

```
https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/
```

## Função: `invite-user`

Convida um novo usuário (corretor ou admin) para a plataforma.

**Endpoint:** `POST /functions/v1/invite-user`

**Headers:**
```
Authorization: Bearer <SUPABASE_ANON_KEY>
Content-Type: application/json
```

**Body:**
```json
{
  "email": "corretor@email.com",
  "name": "João Silva",
  "role": "corretor"
}
```

**Resposta (sucesso):**
```json
{ "success": true, "userId": "uuid" }
```

**Resposta (erro):**
```json
{ "error": "mensagem de erro" }
```

**O que faz internamente:**
1. Valida body (email, name, role obrigatórios)
2. Chama `supabase.auth.admin.inviteUserByEmail(email, { data: { name, role } })`
3. Supabase envia email de convite automático
4. Quando usuário aceita → trigger SQL cria perfil em `profiles`

**Chamada no frontend (`script.js`):**
```javascript
const EDGE_FN_URL = 'https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user'

async function callEdgeFunction(body) {
  const res = await fetch(EDGE_FN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return res.json()
}
```

---

## Funções Planejadas (Roadmap)

### `send-email`
Envio de emails transacionais via SMTP configurado no painel admin.

**Uso:** notificações de lead, confirmações, relatórios.

### `webhook-receiver`
Recebe webhooks de gateways de pagamento (Stripe, Pagar.me, etc.) e atualiza `subscriptions.status`.

**Uso:** sincronização automática de status de assinatura.

### `lead-notification`
Dispara notificações push / WhatsApp quando um novo lead chega.

**Uso:** alertas em tempo real para corretores.

### `auto-assign-lead`
Lógica de round-robin para distribuição automática de leads entre corretores.

**Uso:** equilíbrio de carga de leads na equipe.

---

## Criar/Deploy de Nova Edge Function

```bash
# Instalar CLI Supabase (se necessário)
npm install -g supabase

# Login
supabase login

# Criar nova função
supabase functions new nome-da-funcao

# Deploy
supabase functions deploy nome-da-funcao --project-ref onknpbzdcrhbfozzvxtz

# Variáveis de ambiente da função
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=... --project-ref onknpbzdcrhbfozzvxtz
```

## Variáveis de Ambiente das Funções

| Variável | Descrição |
|----------|-----------|
| `SUPABASE_URL` | URL do projeto Supabase (automático) |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service_role (nunca no frontend) |
| `SMTP_HOST` | Servidor SMTP (para send-email) |
| `SMTP_PORT` | Porta SMTP |
| `SMTP_USER` | Usuário SMTP |
| `SMTP_PASS` | Senha SMTP |
