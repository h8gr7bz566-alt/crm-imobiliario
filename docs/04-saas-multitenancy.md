# 04 — SaaS e Multi-Tenancy

## Modelo de Isolamento

O ImobiPro usa **isolamento lógico por `tenant_id`** — todos os dados ficam no mesmo banco Supabase, mas cada linha pertence a um tenant específico. O RLS (Row Level Security) do PostgreSQL garante que cada usuário veja apenas os dados do seu próprio tenant.

```
Banco Supabase (único)
├── Tenant A: Imobiliária ABC (tenant_id = uuid-A)
│   ├── properties WHERE tenant_id = uuid-A
│   ├── leads      WHERE tenant_id = uuid-A
│   └── settings   WHERE tenant_id = uuid-A
│
├── Tenant B: Corretor XYZ (tenant_id = uuid-B)
│   ├── properties WHERE tenant_id = uuid-B
│   └── ...
│
└── Tenant Padrão: Isaac Omar (tenant_id = 00000000-...-0001)
```

## Como o tenant é determinado

1. Usuário faz login → Supabase Auth cria sessão JWT
2. `auth.uid()` identifica o usuário
3. `current_tenant_id()` busca `tenant_id` do perfil do usuário
4. Todas as políticas RLS filtram por esse `tenant_id`

```sql
-- Política RLS típica (exemplo: properties)
CREATE POLICY "tenant_isolation" ON properties
  FOR ALL TO authenticated
  USING (tenant_id = current_tenant_id());
```

## Tenant Padrão

Durante a fase atual (imobiliária única), todos os dados existentes foram associados ao tenant padrão:

```
tenant_id = '00000000-0000-0000-0000-000000000001'
name      = 'Isaac Omar Corretor de Imóveis'
slug      = 'omar-corretor'
plan      = Pro (período trial)
```

Isso garante compatibilidade com todos os dados criados antes da migration 002.

## Estrutura de Planos

```
Free       → R$ 0/mês    → 2 usuários, 20 imóveis, 100 leads
Starter    → R$ 97/mês   → 5 usuários, 100 imóveis, 1.000 leads
Pro        → R$ 197/mês  → 15 usuários, 500 imóveis, 10.000 leads
Enterprise → R$ 497/mês  → ilimitado
```

## Ciclo de Vida de um Tenant

```
1. Super Admin cria tenant (modal "Nova Imobiliária")
   ├── Insere em `tenants` (active=true)
   └── Opcionalmente cria assinatura trial em `subscriptions`

2. Admin da imobiliária é criado
   ├── Convite via Edge Function `invite-user`
   └── Profile criado com tenant_id = novo tenant

3. Imobiliária opera normalmente
   ├── Admin cadastra imóveis, corretores, leads
   └── Super Admin monitora via Painel Plataforma

4. Renovação mensal
   ├── Webhook do gateway → Edge Function → atualiza subscriptions.status
   └── Se past_due → aviso ao admin → se cancelado → active=false

5. Desativação
   └── tenants.active = false → usuários perdem acesso
```

## Adicionando uma Nova Imobiliária

Via Painel Super Admin → aba "Imobiliárias" → botão "+ Nova Imobiliária":

1. Preencher: nome, slug, domínio, plano
2. Clicar "Criar Imobiliária" → INSERT em `tenants`
3. Convidar o admin da imobiliária via Usuários Globais ou Edge Function
4. Admin recebe email → define senha → acessa painel

## Domínios Personalizados

Cada tenant pode ter um domínio próprio (campo `tenants.domain`). A configuração atual suporta subdomínios via Vercel — configuração de DNS e rewrite rules necessária por tenant.

## Escalabilidade

Para escalar além de 10.000 tenants, considerar:
- Migrar para isolamento por schema (um schema PostgreSQL por tenant)
- Ou isolamento por banco (um projeto Supabase por tenant de alto volume)
- A arquitetura atual suporta confortavelmente até ~1.000 tenants com volume moderado
