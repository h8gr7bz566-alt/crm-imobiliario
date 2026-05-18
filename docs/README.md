# ImobiPro CRM — Documentação do Sistema

> Documentação técnica gerada automaticamente. Atualizada em: 2026-05-18

## Índice

| Arquivo | Conteúdo |
|---------|----------|
| [01-architecture.md](01-architecture.md) | Visão geral da arquitetura do sistema |
| [02-permissions.md](02-permissions.md) | Papéis, permissões e matriz de acesso |
| [03-database.md](03-database.md) | Todas as tabelas, colunas e relações |
| [04-saas-multitenancy.md](04-saas-multitenancy.md) | Design multi-tenant e SaaS |
| [05-authentication.md](05-authentication.md) | Fluxo de autenticação |
| [06-frontend.md](06-frontend.md) | Componentes e módulos do frontend |
| [07-edge-functions.md](07-edge-functions.md) | Edge Functions e APIs |
| [08-roadmap.md](08-roadmap.md) | Roadmap e melhorias futuras |

## Stack

- **Frontend:** HTML + JavaScript (ES Modules), Vite 5.4.x, multi-page build
- **Backend:** Supabase (PostgreSQL + Auth + Storage + RLS + Edge Functions)
- **Cliente Supabase:** @supabase/supabase-js v2
- **Hospedagem:** Vercel (frontend) + Supabase Cloud (backend)

## Acesso rápido

- Painel Admin: `/admin.html`
- Site Público: `/index.html`
- Módulo de Settings: `/lib/settings.js`
- Cliente Supabase: `/lib/supabase.js`
- Migrations SQL: `/supabase/migrations/`
