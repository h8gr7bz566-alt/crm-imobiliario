# 01 — Arquitetura do Sistema

## Visão Geral

O ImobiPro CRM é uma plataforma SaaS imobiliária multi-tenant construída com vanilla JavaScript e Supabase. Não utiliza nenhum framework frontend — apenas HTML, ES Modules nativos e CSS puro, compilados pelo Vite.

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Vite)                      │
│  ┌──────────────┐    ┌──────────────────────────────┐   │
│  │  index.html  │    │         admin.html            │   │
│  │  (site pub.) │    │  (painel admin — todas roles) │   │
│  └──────┬───────┘    └────────────┬─────────────────┘   │
│         │                        │                      │
│         └────────────┬───────────┘                      │
│                      │                                  │
│              script.js  (ES Module)                     │
│                      │                                  │
│              lib/supabase.js  (cliente)                  │
│              lib/settings.js  (configurações)            │
└──────────────────────┬──────────────────────────────────┘
                       │  HTTPS / WebSocket
┌──────────────────────▼──────────────────────────────────┐
│                   SUPABASE CLOUD                        │
│  ┌─────────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │ PostgreSQL  │  │   Auth   │  │     Storage      │   │
│  │  (RLS ativo)│  │ (JWT)    │  │ (logos, imagens) │   │
│  └─────────────┘  └──────────┘  └──────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │          Edge Functions (Deno)                   │   │
│  │  invite-user · send-email · webhook-receiver     │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Páginas

### `index.html` — Site Público
- Listagem de imóveis com filtros
- Detalhes de imóvel em modal
- Slider de preço
- Suporte multilíngue (pt / en / es)
- WhatsApp CTA dinâmico
- Formulário de contato

### `admin.html` — Painel Administrativo
- Login com Supabase Auth
- Sidebar com navegação por seções
- Acesso controlado por role (ver [02-permissions.md](02-permissions.md))
- Seções lazy-render (inicializa somente ao clicar pela 1ª vez)

## Módulos JavaScript

### `script.js`
Arquivo principal. Responsável por:
- Integração com Supabase (auth, dados, storage)
- Renderização do site público e do painel admin
- Funções de formatação (preço, endereço, etc.)
- Gerenciamento de estado local (imóveis, perfil, localizações)
- Inicialização de todas as seções admin

### `lib/supabase.js`
- Instância global do cliente Supabase
- URL e chave lidas de variáveis de ambiente Vite (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

### `lib/settings.js`
- Cache em memória para `settings` e `site_content`
- Funções: `loadAllSettings`, `getSetting`, `getContent`, `saveSetting`, `saveMultipleSettings`, `saveContent`, `saveIntegration`
- `applyVisualSettings()` — aplica CSS custom properties + logo + favicon
- `applyDynamicContent()` — atualiza DOM com textos do banco
- `applyWhatsAppLinks()` — atualiza todos os links wa.me

## Fluxo de Inicialização

```
DOMContentLoaded
  ├── loadAllSettings()          ← settings + site_content em paralelo
  ├── loadLocations()            ← cidades/bairros disponíveis
  ├── applyVisualSettings()      ← CSS vars + logo + favicon
  ├── supabase.auth.getSession() ← verifica sessão existente
  │     ├── [logado] → getProfile() → applyRolePermissions() → renderAdmin()
  │     └── [não logado] → renderPublic() → applyDynamicContent()
  └── supabase.auth.onAuthStateChange() ← listener para login/logout
```

## Build

```bash
npm run build     # gera /dist com index.html + admin.html + assets
npm run dev       # servidor local com HMR
```

Configuração Vite: `vite.config.js` — multi-page com entradas `index.html` e `admin.html`.
