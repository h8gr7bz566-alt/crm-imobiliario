# 08 — Roadmap e Melhorias Futuras

## Status Atual (v2.0 — Maio 2026)

### Implementado ✅
- [x] Site público com listagem e filtros de imóveis
- [x] Suporte multilíngue (pt / en / es)
- [x] Painel admin com autenticação Supabase
- [x] Cadastro, edição e publicação de imóveis
- [x] Upload de imagens para Supabase Storage
- [x] Sistema de localizações (cidades/bairros)
- [x] Configurações totalmente administráveis (sem tocar código)
  - [x] Configurações da empresa (nome, logo, contatos, redes sociais)
  - [x] Personalização visual (cores, banners, imagens)
  - [x] Textos do site multilíngues editáveis
  - [x] SEO configurável (title, description, keywords)
  - [x] CRM configurável (pipelines, stages, tags, status)
  - [x] Integrações (Meta Pixel, GA, WhatsApp, SMTP, Webhooks)
  - [x] Biblioteca de mídia com upload e gerenciamento
- [x] Sistema de permissões em 3 níveis (super_admin / admin / corretor)
- [x] Arquitetura SaaS multi-tenant (banco pronto, migration 002)
- [x] Painel Super Admin (tenants, planos, assinaturas, usuários globais)
- [x] Tabela `leads` com CRM completo
- [x] Tabela `tasks` para agenda dos corretores
- [x] Documentação técnica automática em `/docs`

---

## Próximos Passos Imediatos

### P0 — Executar Migration 002
- [ ] Colar conteúdo de `supabase/migrations/002_saas_multitenancy.sql` no SQL Editor do Supabase
- [ ] Verificar que todas as tabelas foram criadas sem erros

### P1 — CRM Operacional
- [ ] Renderizar lista de leads no painel admin (seção Leads)
- [ ] Formulário de cadastro de lead (nome, email, telefone, origem)
- [ ] Kanban board por pipeline/stage (drag & drop)
- [ ] Timeline de atividades por lead
- [ ] Filtros de leads (por corretor, status, funil, data)

### P2 — Agenda e Tarefas
- [ ] Listagem de tarefas do corretor logado
- [ ] Criação e conclusão de tarefas
- [ ] Calendário mensal com eventos

---

## Médio Prazo (v2.1 — v2.3)

### Notificações
- [ ] Notificações push via PWA
- [ ] Alertas de novos leads em tempo real (Supabase Realtime)
- [ ] Notificações WhatsApp via Edge Function

### Integrações Avançadas
- [ ] Integração com portais de imóveis (ZAP, VivaReal, OLX)
- [ ] Sincronização de leads de Facebook Lead Ads via webhook
- [ ] Chatbot WhatsApp básico para triagem de leads

### Relatórios
- [ ] Dashboard com KPIs: conversão, tempo médio de fechamento
- [ ] Relatório de desempenho por corretor
- [ ] Funil de vendas com métricas
- [ ] Exportação CSV/Excel

### Automações
- [ ] Sequência de follow-up automático (email/WhatsApp)
- [ ] Distribuição automática de leads (round-robin)
- [ ] Alertas de lead sem contato há X dias

---

## Longo Prazo (v3.0+)

### IA e Machine Learning
- [ ] Score de qualificação de leads com IA
- [ ] Sugestão de imóvel ideal baseada no perfil do lead
- [ ] Análise de churn de assinantes

### SaaS Completo
- [ ] Portal de self-service para novas imobiliárias
- [ ] Integração com gateway de pagamento (Stripe / Pagar.me)
- [ ] Webhook de renovação automática de assinaturas
- [ ] Portal de administração de planos no Painel Super Admin
- [ ] Página de pricing pública

### Mobile
- [ ] PWA com modo offline para corretores em campo
- [ ] App React Native (futuro)

### Multitenancy Avançado
- [ ] Domínios personalizados por tenant com SSL automático
- [ ] White-label completo (logo, cores, domínio próprio)
- [ ] Isolamento por schema para tenants enterprise

---

## Débitos Técnicos

| Item | Prioridade | Impacto |
|------|-----------|---------|
| Testes automatizados (Vitest) | Média | Qualidade |
| TypeScript (migração gradual) | Baixa | Manutenibilidade |
| Virtualização de listas longas | Média | Performance |
| Cache de imóveis com Service Worker | Baixa | UX offline |
| Sanitização de inputs no backend | Alta | Segurança |
| Rate limiting nas Edge Functions | Alta | Segurança |
| Auditoria de logs de acesso | Média | Compliance |

---

## Convenções de Versão

- **v2.x** — melhorias no CRM e integrações (atual)
- **v3.x** — SaaS completo com pagamento automático
- **v4.x** — IA integrada e mobile nativo
