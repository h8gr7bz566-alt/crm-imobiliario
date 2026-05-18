# 03 — Banco de Dados

## Migration Files

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| `supabase/migrations/001_admin_config.sql` | ✅ Executado | Configurações, CRM, integrações, mídia |
| `supabase/migrations/002_saas_multitenancy.sql` | ⏳ Pendente execução | Tenants, planos, assinaturas, multi-tenant |

---

## Tabelas — Migration 001

### `settings`
Configurações chave-valor da plataforma/imobiliária.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK tenants | Adicionado na migration 002 |
| key | text UNIQUE | Ex: `company.name`, `visual.primary_color` |
| value | text | Valor serializado |
| updated_at | timestamptz | |

**Categorias de chaves:**
- `company.*` — nome, CNPJ, endereço, WhatsApp, email, horário
- `company.social.*` — Instagram, Facebook, YouTube, LinkedIn, TikTok
- `visual.*` — cores, URLs de banner, logo
- `platform.*` — nome da plataforma, email de suporte, trial padrão

### `site_content`
Textos multilíngues do site público.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK | |
| key | text UNIQUE | Ex: `hero.title`, `about.text` |
| value_pt | text | Português |
| value_en | text | Inglês |
| value_es | text | Espanhol |
| updated_at | timestamptz | |

### `crm_pipelines`
Funis de vendas do CRM.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK | |
| name | text | Nome do funil |
| is_default | boolean | Funil padrão |
| order_index | int | Ordem de exibição |
| created_at | timestamptz | |

### `crm_stages`
Etapas dentro de um pipeline.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| pipeline_id | uuid FK crm_pipelines | |
| tenant_id | uuid FK | |
| name | text | Ex: "Qualificação", "Proposta" |
| color | text | Hex color |
| order_index | int | |
| created_at | timestamptz | |

### `crm_tags`
Tags para classificar leads.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK | |
| name | text | Nome da tag |
| color | text | Hex color |
| created_at | timestamptz | |

### `crm_lead_statuses`
Status possíveis de um lead.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK | |
| name | text | Ex: "Novo", "Em contato" |
| color | text | Hex color |
| is_final | boolean | Status de encerramento |
| order_index | int | |
| created_at | timestamptz | |

### `integrations`
Configurações de integrações externas.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK | |
| key | text UNIQUE | Ex: `meta_pixel`, `google_analytics` |
| value | text | Token / ID da integração |
| enabled | boolean | Ativo ou não |
| updated_at | timestamptz | |

**Chaves predefinidas:** `meta_pixel`, `google_analytics`, `whatsapp_number`, `smtp_host`, `smtp_port`, `smtp_user`, `smtp_pass`, `smtp_from_name`, `webhook_lead`

### `media_library`
Imagens enviadas via painel admin.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK | |
| name | text | Nome original do arquivo |
| url | text | URL pública no Supabase Storage |
| size | int | Tamanho em bytes |
| mime_type | text | Ex: `image/jpeg` |
| uploaded_by | uuid FK profiles | |
| created_at | timestamptz | |

---

## Tabelas — Migration 002

### `plans`
Planos de assinatura SaaS.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| name | text | `free` \| `starter` \| `pro` \| `enterprise` |
| price_brl | numeric | Preço em R$ (0 = gratuito) |
| max_users | int | Máx. usuários por tenant |
| max_properties | int | Máx. imóveis |
| max_leads | int | Máx. leads |
| features | jsonb | Array de features incluídas |
| created_at | timestamptz | |

**Planos padrão:**

| Plano | Preço | Usuários | Imóveis | Leads |
|-------|-------|----------|---------|-------|
| Free | R$ 0 | 2 | 20 | 100 |
| Starter | R$ 97 | 5 | 100 | 1.000 |
| Pro | R$ 197 | 15 | 500 | 10.000 |
| Enterprise | R$ 497 | 999 | 9.999 | 99.999 |

### `tenants`
Imobiliárias cadastradas na plataforma.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| name | text | Nome da imobiliária |
| slug | text UNIQUE | Identificador URL amigável |
| plan_id | uuid FK plans | Plano atual |
| active | boolean | Conta ativa |
| trial_ends_at | timestamptz | Fim do trial |
| domain | text | Domínio personalizado |
| logo_url | text | URL do logo |
| settings | jsonb | Configurações extras |
| created_at | timestamptz | |

**Tenant padrão:** `00000000-0000-0000-0000-000000000001` = "Isaac Omar Corretor de Imóveis"

### `subscriptions`
Assinaturas ativas por tenant.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK tenants | |
| plan_id | uuid FK plans | |
| status | text | `active` \| `trialing` \| `past_due` \| `cancelled` \| `paused` |
| current_period_start | timestamptz | Início do período |
| current_period_end | timestamptz | Fim do período |
| payment_method | text | `pix` \| `credit_card` \| `boleto` |
| external_id | text | ID no gateway de pagamento |
| created_at | timestamptz | |

### `leads`
Leads do CRM imobiliário.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK | |
| assigned_to | uuid FK profiles | Corretor responsável |
| name | text | |
| email | text | |
| phone | text | |
| source | text | `site` \| `whatsapp` \| `instagram` \| `indicacao` \| `outros` |
| status_id | uuid FK crm_lead_statuses | |
| pipeline_id | uuid FK crm_pipelines | |
| stage_id | uuid FK crm_stages | |
| property_id | uuid FK properties | Imóvel de interesse |
| notes | text | |
| tags | int[] | Array de IDs de tags |
| budget_min | numeric | |
| budget_max | numeric | |
| interest | text | `compra` \| `aluguel` |
| city_interest | text | |
| next_contact | date | |
| converted_at | timestamptz | |
| lost_at | timestamptz | |
| lost_reason | text | |
| created_at | timestamptz | |

### `lead_activities`
Histórico de atividades por lead.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| lead_id | uuid FK leads | |
| tenant_id | uuid FK | |
| user_id | uuid FK profiles | Quem registrou |
| type | text | `note` \| `call` \| `email` \| `visit` \| `stage_change` \| `status_change` |
| content | text | Descrição da atividade |
| metadata | jsonb | Dados extras |
| created_at | timestamptz | |

### `tasks`
Tarefas e agenda dos corretores.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| tenant_id | uuid FK | |
| assigned_to | uuid FK profiles | |
| lead_id | uuid FK leads | (opcional) |
| property_id | uuid FK properties | (opcional) |
| title | text | |
| description | text | |
| due_date | date | |
| priority | text | `low` \| `medium` \| `high` |
| status | text | `pending` \| `done` \| `cancelled` |
| created_at | timestamptz | |

### `role_permissions`
Permissões granulares por role.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid PK | |
| role | text | `super_admin` \| `admin` \| `corretor` |
| resource | text | Recurso (ou `*` para todos) |
| action | text | Ação (ou `*` para todas) |

---

## Tabelas Pré-existentes

### `profiles`
Perfis de usuário (criados via trigger ao cadastrar no Auth).

| Coluna | Tipo | Notas |
|--------|------|-------|
| id | uuid PK | = auth.uid() |
| tenant_id | uuid FK | Adicionado na migration 002 |
| name | text | |
| role | text | `super_admin` \| `admin` \| `corretor` |
| avatar_url | text | |
| active | boolean | |
| permissions | jsonb | Adicionado na migration 002 |
| created_at | timestamptz | |

### `properties`
Imóveis cadastrados.

| Coluna | Tipo | Notas |
|--------|------|-------|
| id | uuid PK | |
| tenant_id | uuid FK | Adicionado na migration 002 |
| title | text | |
| type | text | `Apartamento` \| `Casa` \| etc |
| price | text | |
| city | text | |
| neighborhood | text | |
| area | text | |
| bedrooms | text | |
| bathrooms | text | |
| parking | text | |
| images | text[] | Array de URLs |
| published | boolean | |
| reference | text | Código de referência |
| created_at | timestamptz | |

### `locations`
Cidades e bairros disponíveis para filtro.

| Coluna | Tipo |
|--------|------|
| id | uuid PK |
| city | text |
| neighborhood | text |

---

## Funções SQL Helper

```sql
-- Retorna o tenant_id do usuário logado
CREATE FUNCTION current_tenant_id() RETURNS uuid
LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT tenant_id FROM profiles WHERE id = auth.uid()
$$;

-- Verifica se o usuário tem permissão para um recurso/ação
CREATE FUNCTION has_permission(p_resource TEXT, p_action TEXT) RETURNS BOOLEAN
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM role_permissions rp
    JOIN profiles p ON p.id = auth.uid()
    WHERE p.role = rp.role
      AND (rp.resource = p_resource OR rp.resource = '*')
      AND (rp.action   = p_action   OR rp.action   = '*')
  )
$$;
```
