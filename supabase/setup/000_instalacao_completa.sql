-- ═══════════════════════════════════════════════════════════════════════════
-- CRM Imobiliário — INSTALAÇÃO COMPLETA EM BANCO VAZIO (projeto novo)
--
-- Por que existe: as migrações 001→006 foram escritas para um banco que já
-- tinha profiles/properties/locations criadas à mão. Num projeto novo, rodar
-- elas na ordem falha (001 referencia profiles antes de existir, 002 altera
-- locations que nunca é criada) e ainda faltam tabelas/colunas que o código usa.
--
-- Este arquivo consolida 001 + 002 v2 + 002 repair + 003 + 004 + 005 + 006,
-- mais o que o código usa e não estava nas migrações:
--   • tabela locations e apresentacao_leads
--   • colunas: properties (state, furnishing_status, furnished, reference,
--     type, lat, lng), leads (stage, status, tags text[], rating, company,
--     job_title, property_id, client_ip…), profiles (name, active,
--     needs_password_reset), crm_stages.tenant_id
--   • UNIQUE (key, tenant_id) em settings/site_content (upserts do código)
--   • função get_user_id_by_email (usada pela Edge Function invite-user)
--   • leitura anônima de tenants por domínio e insert anônimo de leads
--     (site público e página de apresentação)
-- Storage do Supabase NÃO é usado: todas as fotos vão para o Cloudflare R2.
--
-- Pode ser rodado mais de uma vez (idempotente).
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 0. PLANOS E TENANTS (base de tudo) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.plans (
  id             text PRIMARY KEY,
  name           text NOT NULL,
  price_brl      numeric(10,2) DEFAULT 0,
  max_users      int  DEFAULT 3,
  max_properties int  DEFAULT 50,
  max_leads      int  DEFAULT 200,
  features       jsonb DEFAULT '[]'::jsonb,
  active         boolean DEFAULT true,
  created_at     timestamptz DEFAULT now()
);

INSERT INTO public.plans (id, name, price_brl, max_users, max_properties, max_leads, features) VALUES
  ('free',       'Gratuito',   0,   2,   30,    100,  '["imoveis","leads","site_publico"]'),
  ('starter',    'Starter',    197, 5,   150,   500,  '["imoveis","leads","site_publico","personalizacao","analytics"]'),
  ('pro',        'Pro',        397, 15,  500,   2000, '["imoveis","leads","site_publico","personalizacao","analytics","automacoes","api","webhooks"]'),
  ('enterprise', 'Enterprise', 0,   999, 9999,  99999,'["tudo","whitelabel","suporte_dedicado","sla"]')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.tenants (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name          text NOT NULL,
  slug          text UNIQUE NOT NULL,
  plan_id       text REFERENCES public.plans(id) DEFAULT 'starter',
  active        boolean DEFAULT true,
  trial_ends_at timestamptz,
  domain        text,
  logo_url      text,
  settings      jsonb DEFAULT '{}'::jsonb,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

INSERT INTO public.tenants (id, name, slug, plan_id, domain)
VALUES ('00000000-0000-0000-0000-000000000001', 'Isaac Omar Corretor de Imóveis',
        'omar-corretor', 'starter', 'omarcorretor.com.br')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                   uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id            uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
  plan_id              text REFERENCES public.plans(id),
  status               text DEFAULT 'active',
  current_period_start timestamptz DEFAULT now(),
  current_period_end   timestamptz DEFAULT (now() + interval '30 days'),
  cancel_at_period_end boolean DEFAULT false,
  payment_method       text,
  external_id          text,
  created_at           timestamptz DEFAULT now(),
  updated_at           timestamptz DEFAULT now()
);

INSERT INTO public.subscriptions (tenant_id, plan_id, status)
SELECT '00000000-0000-0000-0000-000000000001', 'starter', 'active'
WHERE NOT EXISTS (SELECT 1 FROM public.subscriptions
                  WHERE tenant_id = '00000000-0000-0000-0000-000000000001');

-- ─── 1. PROFILES (estende auth.users) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id                   uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                text,
  full_name            text,
  name                 text,
  avatar_url           text,
  role                 text DEFAULT 'user',   -- 'user' | 'corretor' | 'admin' | 'super_admin'
  tenant_id            uuid,
  permissions          jsonb DEFAULT '{}'::jsonb,
  active               boolean DEFAULT true,
  needs_password_reset boolean DEFAULT false,
  created_at           timestamptz DEFAULT now(),
  updated_at           timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── 2. FUNÇÕES HELPER (SECURITY DEFINER = sem recursão de RLS) ─────────────
CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public AS $$
DECLARE v_tenant_id uuid;
BEGIN
  SELECT tenant_id INTO v_tenant_id FROM public.profiles WHERE id = auth.uid();
  RETURN v_tenant_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS text LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

CREATE TABLE IF NOT EXISTS public.role_permissions (
  id       serial PRIMARY KEY,
  role     text NOT NULL,
  resource text NOT NULL,
  action   text NOT NULL,
  UNIQUE (role, resource, action)
);

INSERT INTO public.role_permissions (role, resource, action) VALUES
  ('super_admin','*','*'),
  ('admin','properties','read'),('admin','properties','write'),('admin','properties','delete'),
  ('admin','leads','read'),('admin','leads','write'),('admin','leads','delete'),
  ('admin','users','read'),('admin','users','write'),('admin','users','delete'),
  ('admin','settings','read'),('admin','settings','write'),
  ('admin','site_content','read'),('admin','site_content','write'),
  ('admin','crm','read'),('admin','crm','write'),
  ('admin','integrations','read'),('admin','integrations','write'),
  ('admin','media','read'),('admin','media','write'),('admin','media','delete'),
  ('admin','reports','read'),
  ('admin','locations','read'),('admin','locations','write'),('admin','locations','delete'),
  ('corretor','properties','read'),
  ('corretor','leads','read'),('corretor','leads','write'),
  ('corretor','media','read'),('corretor','media','write'),
  ('corretor','profile','read'),('corretor','profile','write')
ON CONFLICT (role, resource, action) DO NOTHING;

CREATE OR REPLACE FUNCTION public.has_permission(p_resource text, p_action text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public AS $$
DECLARE v_role text;
BEGIN
  SELECT role INTO v_role FROM public.profiles WHERE id = auth.uid();
  IF v_role = 'super_admin' THEN RETURN true; END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.role_permissions
    WHERE role = v_role
      AND (resource = p_resource OR resource = '*')
      AND (action   = p_action   OR action   = '*')
  );
END;
$$;

-- Usada pela Edge Function invite-user (somente service_role)
CREATE OR REPLACE FUNCTION public.get_user_id_by_email(user_email text)
RETURNS TABLE (id uuid) LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public, auth AS $$
  SELECT u.id FROM auth.users u WHERE lower(u.email) = lower(user_email)
$$;
REVOKE ALL ON FUNCTION public.get_user_id_by_email(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_id_by_email(text) TO service_role;

-- ─── 3. CONFIGURAÇÕES (001) ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.settings (
  id         bigserial PRIMARY KEY,
  key        text NOT NULL,
  value      jsonb NOT NULL DEFAULT 'null'::jsonb,
  tenant_id  uuid,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (key, tenant_id)
);

CREATE TABLE IF NOT EXISTS public.site_content (
  id         bigserial PRIMARY KEY,
  key        text NOT NULL,
  value_pt   text,
  value_en   text,
  value_es   text,
  tenant_id  uuid,
  updated_at timestamptz DEFAULT now(),
  UNIQUE (key, tenant_id)
);

CREATE TABLE IF NOT EXISTS public.crm_pipelines (
  id         serial PRIMARY KEY,
  name       text NOT NULL,
  is_default boolean DEFAULT false,
  sort_order int DEFAULT 0,
  tenant_id  uuid,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.crm_stages (
  id          serial PRIMARY KEY,
  pipeline_id int REFERENCES public.crm_pipelines(id) ON DELETE CASCADE,
  name        text NOT NULL,
  color       text DEFAULT '#6b7280',
  sort_order  int DEFAULT 0,
  tenant_id   uuid
);

CREATE TABLE IF NOT EXISTS public.crm_tags (
  id        serial PRIMARY KEY,
  name      text NOT NULL,
  color     text DEFAULT '#6b7280',
  tenant_id uuid
);

CREATE TABLE IF NOT EXISTS public.crm_lead_statuses (
  id         serial PRIMARY KEY,
  name       text NOT NULL,
  color      text DEFAULT '#6b7280',
  is_final   boolean DEFAULT false,
  sort_order int DEFAULT 0,
  position   int DEFAULT 0,               -- usado na importação de leads
  tenant_id  uuid
);
ALTER TABLE public.crm_lead_statuses ADD COLUMN IF NOT EXISTS position int DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.integrations (
  key        text PRIMARY KEY,
  value      text,
  enabled    boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.media_library (
  id         serial PRIMARY KEY,
  name       text,
  url        text NOT NULL,
  type       text DEFAULT 'image',
  size       bigint,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  tenant_id  uuid,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.locations (
  id         serial PRIMARY KEY,
  type       text NOT NULL,                 -- 'cidade' | 'bairro'
  name       text NOT NULL,
  parent_id  int REFERENCES public.locations(id) ON DELETE CASCADE,
  tenant_id  uuid DEFAULT '00000000-0000-0000-0000-000000000001',
  created_at timestamptz DEFAULT now()
);

-- ─── 4. IMÓVEIS (003 + colunas usadas pelo código) ───────────────────────────
CREATE TABLE IF NOT EXISTS public.properties (
  id                  bigserial PRIMARY KEY,
  tenant_id           uuid,
  title               text NOT NULL,
  reference           text,
  type                text,
  rua                 text DEFAULT '',
  numero              text DEFAULT '',
  city                text,
  state               text DEFAULT '',
  neighborhood        text,
  price               text,
  bedrooms            int DEFAULT 0,
  suites              int DEFAULT 0,
  area                numeric DEFAULT 0,
  parking             int DEFAULT 0,
  published           boolean DEFAULT true,
  images              jsonb DEFAULT '[]'::jsonb,
  cover_image         text DEFAULT '',
  description         text DEFAULT '',
  owner_name          text DEFAULT '',
  owner_phone         text DEFAULT '',
  owner_email         text DEFAULT '',
  owner_notes         text DEFAULT '',
  construction_status text DEFAULT '',
  condominium         text DEFAULT '',
  furnishing_status   text DEFAULT '',
  furnished           boolean DEFAULT false,
  collection          text DEFAULT '[]',
  lat                 double precision,
  lng                 double precision,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_properties_tenant    ON public.properties(tenant_id);
CREATE INDEX IF NOT EXISTS idx_properties_published ON public.properties(published);
CREATE INDEX IF NOT EXISTS idx_properties_city      ON public.properties(city);

-- Mantém updated_at atualizado (o código usa para detectar mudanças no cache)
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
DROP TRIGGER IF EXISTS properties_touch ON public.properties;
CREATE TRIGGER properties_touch BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ─── 5. LEADS (002 v2 + 004 + colunas usadas pelo código) ────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id     uuid REFERENCES public.tenants(id) ON DELETE CASCADE
                DEFAULT '00000000-0000-0000-0000-000000000001',
  assigned_to   uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  name          text NOT NULL,
  email         text,
  phone         text,
  company       text,
  job_title     text,
  source        text DEFAULT 'site',
  pipeline_id   int,
  stage         text,
  stage_id      int,
  status        text,
  status_id     int,
  notes         text,
  tags          text[] DEFAULT '{}',
  rating        int,
  property_id   bigint,
  budget_min    numeric,
  budget_max    numeric,
  interest      text,
  city_interest text,
  next_contact  timestamptz,
  converted_at  timestamptz,
  lost_at       timestamptz,
  lost_reason   text,
  -- 004: tracking Meta CAPI / UTM
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  utm_term      text,
  fbclid        text,
  gclid         text,
  fbp           text,
  fbc           text,
  client_ip     text,
  user_agent    text,
  landing_url   text,
  capi_sent_at  timestamptz,
  capi_event_id text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_tenant       ON public.leads(tenant_id);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON public.leads(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source   ON public.leads(utm_source);

DROP TRIGGER IF EXISTS leads_touch ON public.leads;
CREATE TRIGGER leads_touch BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE IF NOT EXISTS public.lead_activities (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id    uuid REFERENCES public.leads(id) ON DELETE CASCADE,
  tenant_id  uuid REFERENCES public.tenants(id),
  user_id    uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  type       text NOT NULL,
  content    text,
  metadata   jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- 005
CREATE TABLE IF NOT EXISTS public.lead_notes (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id   uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
  lead_id     uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  author_id   uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name text,
  body        text NOT NULL,
  created_at  timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lead_notes_lead_idx ON public.lead_notes(lead_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.tasks (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id   uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  lead_id     uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  title       text NOT NULL,
  description text,
  due_date    timestamptz,
  priority    text DEFAULT 'media',
  status      text DEFAULT 'pendente',
  reminded_at timestamptz,               -- 006
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- 006
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  tenant_id  uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
  endpoint   text NOT NULL UNIQUE,
  p256dh     text NOT NULL,
  auth       text NOT NULL,
  user_agent text,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS push_subs_user_idx ON public.push_subscriptions(user_id);

-- Leads capturados nas páginas de apresentação
CREATE TABLE IF NOT EXISTS public.apresentacao_leads (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  apresentacao_id     text,
  apresentacao_titulo text,
  nome                text,
  whatsapp            text,
  imoveis_ids         jsonb,
  tenant_id           uuid,
  created_at          timestamptz DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 6. ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════
ALTER TABLE public.plans              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_pipelines      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_stages         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_tags           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_lead_statuses  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apresentacao_leads ENABLE ROW LEVEL SECURITY;

-- plans: leitura pública (tela de planos / super admin)
DROP POLICY IF EXISTS "plans_read" ON public.plans;
CREATE POLICY "plans_read" ON public.plans FOR SELECT USING (true);
DROP POLICY IF EXISTS "plans_super_admin" ON public.plans;
CREATE POLICY "plans_super_admin" ON public.plans FOR ALL
  USING (public.current_user_role() = 'super_admin');

-- tenants
DROP POLICY IF EXISTS "tenants_super_admin"         ON public.tenants;
DROP POLICY IF EXISTS "tenants_self_read"           ON public.tenants;
DROP POLICY IF EXISTS "tenants_public_domain_lookup" ON public.tenants;
CREATE POLICY "tenants_super_admin" ON public.tenants FOR ALL
  USING (public.current_user_role() = 'super_admin');
CREATE POLICY "tenants_self_read" ON public.tenants FOR SELECT
  USING (id = public.current_tenant_id());
CREATE POLICY "tenants_public_domain_lookup" ON public.tenants FOR SELECT TO anon USING (true);

-- subscriptions
DROP POLICY IF EXISTS "subscriptions_super_admin"  ON public.subscriptions;
DROP POLICY IF EXISTS "subscriptions_tenant_admin" ON public.subscriptions;
CREATE POLICY "subscriptions_super_admin" ON public.subscriptions FOR ALL
  USING (public.current_user_role() = 'super_admin');
CREATE POLICY "subscriptions_tenant_admin" ON public.subscriptions FOR SELECT
  USING (tenant_id = public.current_tenant_id()
         AND public.current_user_role() IN ('admin','super_admin'));

-- profiles
DROP POLICY IF EXISTS "profiles_read_all"      ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_self"   ON public.profiles;
DROP POLICY IF EXISTS "profiles_self_write"    ON public.profiles;
DROP POLICY IF EXISTS "profiles_tenant_read"   ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_manage"  ON public.profiles;
CREATE POLICY "profiles_read_all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_self" ON public.profiles FOR UPDATE
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_admin_manage" ON public.profiles FOR ALL
  USING (public.current_user_role() = 'super_admin'
         OR (public.current_user_role() = 'admin' AND tenant_id = public.current_tenant_id()));

-- role_permissions: leitura para logados
DROP POLICY IF EXISTS "role_permissions_read" ON public.role_permissions;
CREATE POLICY "role_permissions_read" ON public.role_permissions FOR SELECT TO authenticated USING (true);

-- settings
DROP POLICY IF EXISTS "settings_read_tenant" ON public.settings;
DROP POLICY IF EXISTS "settings_write_admin" ON public.settings;
CREATE POLICY "settings_read_tenant" ON public.settings FOR SELECT USING (true);
CREATE POLICY "settings_write_admin" ON public.settings FOR ALL
  USING (public.current_user_role() IN ('admin','super_admin'))
  WITH CHECK (public.current_user_role() IN ('admin','super_admin'));

-- site_content
DROP POLICY IF EXISTS "content_read_public" ON public.site_content;
DROP POLICY IF EXISTS "content_write_admin" ON public.site_content;
CREATE POLICY "content_read_public" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "content_write_admin" ON public.site_content FOR ALL
  USING (public.current_user_role() IN ('admin','super_admin'))
  WITH CHECK (public.current_user_role() IN ('admin','super_admin'));

-- CRM (pipelines, stages, tags, statuses) — por tenant
DROP POLICY IF EXISTS "pipelines_tenant" ON public.crm_pipelines;
CREATE POLICY "pipelines_tenant" ON public.crm_pipelines FOR ALL TO authenticated
  USING (tenant_id = public.current_tenant_id() OR tenant_id IS NULL
         OR public.current_user_role() = 'super_admin')
  WITH CHECK (true);

DROP POLICY IF EXISTS "stages_tenant" ON public.crm_stages;
CREATE POLICY "stages_tenant" ON public.crm_stages FOR ALL TO authenticated
  USING (tenant_id = public.current_tenant_id() OR tenant_id IS NULL
         OR public.current_user_role() = 'super_admin')
  WITH CHECK (true);

DROP POLICY IF EXISTS "tags_tenant" ON public.crm_tags;
CREATE POLICY "tags_tenant" ON public.crm_tags FOR ALL TO authenticated
  USING (tenant_id = public.current_tenant_id() OR tenant_id IS NULL
         OR public.current_user_role() = 'super_admin')
  WITH CHECK (true);

DROP POLICY IF EXISTS "lead_statuses_tenant" ON public.crm_lead_statuses;
CREATE POLICY "lead_statuses_tenant" ON public.crm_lead_statuses FOR ALL TO authenticated
  USING (tenant_id = public.current_tenant_id() OR tenant_id IS NULL
         OR public.current_user_role() = 'super_admin')
  WITH CHECK (true);

-- integrations
DROP POLICY IF EXISTS "integrations_admin_tenant" ON public.integrations;
CREATE POLICY "integrations_admin_tenant" ON public.integrations FOR ALL
  USING (public.current_user_role() IN ('admin','super_admin'))
  WITH CHECK (public.current_user_role() IN ('admin','super_admin'));

-- media_library
DROP POLICY IF EXISTS "media_tenant_read"   ON public.media_library;
DROP POLICY IF EXISTS "media_tenant_write"  ON public.media_library;
DROP POLICY IF EXISTS "media_tenant_delete" ON public.media_library;
CREATE POLICY "media_tenant_read" ON public.media_library FOR SELECT TO authenticated
  USING (tenant_id = public.current_tenant_id() OR tenant_id IS NULL
         OR public.current_user_role() = 'super_admin');
CREATE POLICY "media_tenant_write" ON public.media_library FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "media_tenant_delete" ON public.media_library FOR DELETE TO authenticated
  USING (created_by = auth.uid() OR public.current_user_role() IN ('admin','super_admin'));

-- locations (cidades/bairros): leitura pública, escrita admin
DROP POLICY IF EXISTS "locations_read_all"    ON public.locations;
DROP POLICY IF EXISTS "locations_write_admin" ON public.locations;
CREATE POLICY "locations_read_all" ON public.locations FOR SELECT USING (true);
CREATE POLICY "locations_write_admin" ON public.locations FOR ALL
  USING (public.current_user_role() IN ('admin','super_admin'))
  WITH CHECK (public.current_user_role() IN ('admin','super_admin'));

-- properties: site público lê publicados; logados gerenciam (003 + 002)
DROP POLICY IF EXISTS "properties_read_public" ON public.properties;
DROP POLICY IF EXISTS "properties_read_auth"   ON public.properties;
DROP POLICY IF EXISTS "properties_write_auth"  ON public.properties;
DROP POLICY IF EXISTS "properties_update_auth" ON public.properties;
DROP POLICY IF EXISTS "properties_delete_auth" ON public.properties;
DROP POLICY IF EXISTS "properties_tenant"      ON public.properties;
CREATE POLICY "properties_read_public" ON public.properties FOR SELECT USING (published = true);
CREATE POLICY "properties_read_auth"   ON public.properties FOR SELECT TO authenticated USING (true);
CREATE POLICY "properties_write_auth"  ON public.properties FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "properties_update_auth" ON public.properties FOR UPDATE TO authenticated USING (true);
CREATE POLICY "properties_delete_auth" ON public.properties FOR DELETE TO authenticated USING (true);

-- leads
DROP POLICY IF EXISTS "leads_super_admin"     ON public.leads;
DROP POLICY IF EXISTS "leads_tenant_admin"    ON public.leads;
DROP POLICY IF EXISTS "leads_tenant_corretor" ON public.leads;
DROP POLICY IF EXISTS "leads_tenant_write"    ON public.leads;
DROP POLICY IF EXISTS "leads_public_insert"   ON public.leads;
CREATE POLICY "leads_super_admin" ON public.leads FOR ALL
  USING (public.current_user_role() = 'super_admin')
  WITH CHECK (public.current_user_role() = 'super_admin');
CREATE POLICY "leads_tenant_admin" ON public.leads FOR ALL
  USING (tenant_id = public.current_tenant_id() AND public.current_user_role() = 'admin')
  WITH CHECK (tenant_id = public.current_tenant_id());
CREATE POLICY "leads_tenant_corretor" ON public.leads FOR SELECT
  USING (assigned_to = auth.uid() OR tenant_id = public.current_tenant_id());
CREATE POLICY "leads_tenant_write" ON public.leads FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.current_tenant_id());
-- formulário da página de apresentação (visitante sem login)
CREATE POLICY "leads_public_insert" ON public.leads FOR INSERT TO anon WITH CHECK (true);

-- lead_activities / lead_notes / tasks
DROP POLICY IF EXISTS "activities_tenant" ON public.lead_activities;
CREATE POLICY "activities_tenant" ON public.lead_activities FOR ALL TO authenticated
  USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS "lead_notes_tenant" ON public.lead_notes;
CREATE POLICY "lead_notes_tenant" ON public.lead_notes FOR ALL TO authenticated
  USING (tenant_id = public.current_tenant_id()) WITH CHECK (tenant_id = public.current_tenant_id());

DROP POLICY IF EXISTS "tasks_tenant" ON public.tasks;
CREATE POLICY "tasks_tenant" ON public.tasks FOR ALL TO authenticated
  USING (tenant_id = public.current_tenant_id()
         AND (assigned_to = auth.uid() OR public.current_user_role() IN ('admin','super_admin')))
  WITH CHECK (tenant_id = public.current_tenant_id());

-- push_subscriptions
DROP POLICY IF EXISTS "push_subs_owner" ON public.push_subscriptions;
CREATE POLICY "push_subs_owner" ON public.push_subscriptions FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- apresentacao_leads: visitante grava, CRM lê
DROP POLICY IF EXISTS "apres_leads_insert" ON public.apresentacao_leads;
DROP POLICY IF EXISTS "apres_leads_read"   ON public.apresentacao_leads;
CREATE POLICY "apres_leads_insert" ON public.apresentacao_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "apres_leads_read" ON public.apresentacao_leads FOR SELECT TO authenticated USING (true);

-- ═══════════════════════════════════════════════════════════════════════════
-- 7. DADOS PADRÃO (seed do 001, já vinculados ao tenant do Isaac)
-- ═══════════════════════════════════════════════════════════════════════════
INSERT INTO public.settings (key, value, tenant_id) VALUES
  ('company.name',          '"Isaac Omar Corretor de Imóveis"', '00000000-0000-0000-0000-000000000001'),
  ('company.creci',         '"69965F"',                         '00000000-0000-0000-0000-000000000001'),
  ('company.whatsapp',      '"5547999701743"',                  '00000000-0000-0000-0000-000000000001'),
  ('company.phone',         '"(47) 99970-1743"',                '00000000-0000-0000-0000-000000000001'),
  ('company.email',         '"contato@omarcorretor.com.br"',    '00000000-0000-0000-0000-000000000001'),
  ('company.website',       '"https://omarcorretor.com.br"',    '00000000-0000-0000-0000-000000000001'),
  ('company.address',       '"Balneário Camboriú, SC"',         '00000000-0000-0000-0000-000000000001'),
  ('company.logo_url',      '"/logo.png"',                      '00000000-0000-0000-0000-000000000001'),
  ('company.favicon_url',   '"/favicon.ico"',                   '00000000-0000-0000-0000-000000000001'),
  ('company.facebook_url',  '"https://www.facebook.com"',       '00000000-0000-0000-0000-000000000001'),
  ('company.instagram_url', '"https://www.instagram.com/isaacomar.imoveissc?igsh=c2UxaWV0bHNiOHJ3"', '00000000-0000-0000-0000-000000000001'),
  ('company.tiktok_url',    '""', '00000000-0000-0000-0000-000000000001'),
  ('company.youtube_url',   '""', '00000000-0000-0000-0000-000000000001'),
  ('company.linkedin_url',  '""', '00000000-0000-0000-0000-000000000001'),
  ('visual.accent_color',   '"#b8962e"', '00000000-0000-0000-0000-000000000001'),
  ('visual.primary_bg',     '"#0f1c2e"', '00000000-0000-0000-0000-000000000001'),
  ('visual.secondary_bg',   '"#1a2f4a"', '00000000-0000-0000-0000-000000000001'),
  ('visual.price_max_slider', '130000000', '00000000-0000-0000-0000-000000000001'),
  ('visual.hero_bg_url',    '""', '00000000-0000-0000-0000-000000000001')
ON CONFLICT (key, tenant_id) DO NOTHING;

INSERT INTO public.site_content (key, value_pt, value_en, value_es, tenant_id)
SELECT k, pt, en, es, '00000000-0000-0000-0000-000000000001'::uuid FROM (VALUES
  ('hero.title',
    'Descubra o Endereço do Seu Próximo Legado',
    'Discover the Address of Your Next Legacy',
    'Descubre la Dirección de Tu Próximo Legado'),
  ('hero.subtitle',
    'Uma curadoria rigorosa de propriedades de alto padrão e investimentos estratégicos nas localizações mais cobiçadas do Sul do país.',
    'A curated selection of luxury properties and strategic investments in the most sought-after locations in southern Brazil.',
    'Una selección curada de propiedades de lujo e inversiones estratégicas en las ubicaciones más codiciadas del sur de Brasil.'),
  ('inst.bio_p1',
    'Com <strong style="color:#b8962e;">8 anos de experiência</strong> no mercado imobiliário, Isaac Omar é especialista em lançamentos imobiliários e construiu uma trajetória sólida com mais de <strong style="color:#b8962e;">1.000 clientes</strong> atendidos em todo o Brasil.',
    'With <strong style="color:#b8962e;">8 years of experience</strong> in real estate, Isaac Omar is a specialist in property launches and has built a solid track record with over <strong style="color:#b8962e;">1,000 clients</strong> served across Brazil.',
    'Con <strong style="color:#b8962e;">8 años de experiencia</strong> en el mercado inmobiliario, Isaac Omar es especialista en lanzamientos inmobiliarios y ha construido una trayectoria sólida con más de <strong style="color:#b8962e;">1.000 clientes</strong> atendidos en todo Brasil.'),
  ('inst.bio_p2',
    'Com atuação em todo o território nacional e ênfase especial no litoral catarinense — Balneário Camboriú, Itapema, Itajaí e Florianópolis — alia profundo conhecimento de mercado a um atendimento personalizado e dedicado.',
    'Operating nationwide with a special focus on the Santa Catarina coast — Balneário Camboriú, Itapema, Itajaí and Florianópolis — combining deep market knowledge with personalized, dedicated service.',
    'Con presencia en todo el territorio nacional y especial enfoque en el litoral de Santa Catarina — Balneário Camboriú, Itapema, Itajaí y Florianópolis — combinando profundo conocimiento del mercado con un servicio personalizado y dedicado.'),
  ('inst.bio_p3',
    'Cada negociação é tratada com atenção única aos detalhes, garantindo que o cliente encontre não apenas um imóvel, mas o endereço certo para o próximo capítulo da sua história.',
    'Each negotiation is handled with unique attention to detail, ensuring that clients find not just a property, but the right address for the next chapter of their story.',
    'Cada negociación se trata con atención única al detalle, asegurando que el cliente encuentre no solo una propiedad, sino la dirección correcta para el próximo capítulo de su historia.'),
  ('inst.stat1_num',   '8+',      '8+',       '8+'),
  ('inst.stat1_label', 'Anos de<br>experiência', 'Years of<br>experience', 'Años de<br>experiencia'),
  ('inst.stat2_num',   '1.000+',  '1,000+',   '1.000+'),
  ('inst.stat2_label', 'Clientes<br>atendidos', 'Clients<br>served', 'Clientes<br>atendidos'),
  ('inst.stat3_num',   'BR',      'BR',        'BR'),
  ('inst.stat3_label', 'Atuação<br>nacional', 'Nationwide<br>reach', 'Cobertura<br>nacional'),
  ('seo.title_pt',     'Isaac Omar — Corretor de Imóveis', 'Isaac Omar — Real Estate Agent', 'Isaac Omar — Agente Inmobiliario'),
  ('seo.description_pt','Corretor de imóveis especialista no litoral catarinense. CRECI 69965F.','Real estate agent specializing in the Santa Catarina coast. CRECI 69965F.','Agente inmobiliario especialista en el litoral de Santa Catarina. CRECI 69965F.'),
  ('footer.text',      '© 2026 Isaac Omar — Corretor de Imóveis — CRECI 69965F','© 2026 Isaac Omar — Real Estate Agent — CRECI 69965F','© 2026 Isaac Omar — Agente Inmobiliario — CRECI 69965F'),
  ('nav.cta_text',     'Falar com Corretor', 'Talk to Agent', 'Hablar con Agente'),
  ('planta.tag',       'Lançamentos',        'New Launches',  'Lanzamientos'),
  ('planta.title',     'Procurando investir,<br>morar ou veranear?','Looking to invest,<br>live or vacation?','¿Buscando invertir,<br>vivir o vacacionar?')
) AS v(k, pt, en, es)
ON CONFLICT (key, tenant_id) DO NOTHING;

INSERT INTO public.integrations (key, value, enabled) VALUES
  ('meta_pixel_id', '', false), ('ga_measurement_id', '', false), ('gtm_container_id', '', false),
  ('smtp_host', '', false), ('smtp_port', '587', false), ('smtp_user', '', false),
  ('smtp_from_name', 'Omar Corretor', false),
  ('webhook_new_lead', '', false), ('webhook_new_property', '', false)
ON CONFLICT (key) DO NOTHING;

DO $$
DECLARE
  t   uuid := '00000000-0000-0000-0000-000000000001';
  pid int;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.crm_pipelines WHERE tenant_id = t) THEN
    INSERT INTO public.crm_pipelines (name, is_default, sort_order, tenant_id)
    VALUES ('Funil Principal', true, 0, t) RETURNING id INTO pid;

    INSERT INTO public.crm_stages (pipeline_id, name, color, sort_order, tenant_id) VALUES
      (pid, 'Novo Lead',        '#3b82f6', 0, t),
      (pid, 'Contato Feito',    '#8b5cf6', 1, t),
      (pid, 'Visita Agendada',  '#f59e0b', 2, t),
      (pid, 'Proposta Enviada', '#f97316', 3, t),
      (pid, 'Negociação',       '#ec4899', 4, t),
      (pid, 'Fechado',          '#22c55e', 5, t),
      (pid, 'Perdido',          '#6b7280', 6, t);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.crm_tags WHERE tenant_id = t) THEN
    INSERT INTO public.crm_tags (name, color, tenant_id) VALUES
      ('Urgente', '#ef4444', t), ('VIP', '#b8962e', t), ('Investidor', '#8b5cf6', t),
      ('Permuta', '#3b82f6', t), ('Financiamento', '#22c55e', t);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.crm_lead_statuses WHERE tenant_id = t) THEN
    INSERT INTO public.crm_lead_statuses (name, color, is_final, sort_order, tenant_id) VALUES
      ('Novo', '#3b82f6', false, 0, t), ('Em atendimento', '#f59e0b', false, 1, t),
      ('Qualificado', '#8b5cf6', false, 2, t), ('Convertido', '#22c55e', true, 3, t),
      ('Perdido', '#6b7280', true, 4, t);
  END IF;
END $$;

-- ─── 8. VERIFICAÇÃO ──────────────────────────────────────────────────────────
SELECT table_name,
       (SELECT count(*) FROM information_schema.columns c
         WHERE c.table_schema = 'public' AND c.table_name = t.table_name) AS colunas
FROM information_schema.tables t
WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
ORDER BY table_name;
