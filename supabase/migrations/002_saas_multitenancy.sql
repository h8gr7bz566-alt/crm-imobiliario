-- ═══════════════════════════════════════════════════════════════════
-- CRM Imobiliário — Migração 002: SaaS Multitenancy + Permissões
-- Execute no Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ─── 1. PLANOS SaaS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.plans (
  id               text PRIMARY KEY,  -- 'free' | 'starter' | 'pro' | 'enterprise'
  name             text NOT NULL,
  price_brl        numeric(10,2) DEFAULT 0,
  max_users        int  DEFAULT 3,
  max_properties   int  DEFAULT 50,
  max_leads        int  DEFAULT 200,
  features         jsonb DEFAULT '[]'::jsonb,
  active           boolean DEFAULT true,
  created_at       timestamptz DEFAULT now()
);

INSERT INTO public.plans (id, name, price_brl, max_users, max_properties, max_leads, features) VALUES
  ('free',       'Gratuito',   0,       2,   30,   100, '["imóveis","leads","site_publico"]'),
  ('starter',    'Starter',    197,     5,   150,  500, '["imóveis","leads","site_publico","personalização","analytics"]'),
  ('pro',        'Pro',        397,     15,  500,  2000,'["imóveis","leads","site_publico","personalização","analytics","automacoes","api","webhooks"]'),
  ('enterprise', 'Enterprise', 0,       999, 9999, 99999,'["tudo","whitelabel","suporte_dedicado","sla"]')
ON CONFLICT (id) DO NOTHING;

-- ─── 2. TENANTS (Imobiliárias) ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tenants (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name         text NOT NULL,
  slug         text UNIQUE NOT NULL,            -- ex: 'omar-corretor'
  plan_id      text REFERENCES public.plans(id) DEFAULT 'starter',
  active       boolean DEFAULT true,
  trial_ends_at timestamptz,
  domain       text,                             -- domínio customizado
  logo_url     text,
  settings     jsonb DEFAULT '{}'::jsonb,        -- overrides por tenant
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenants_super_admin"          ON public.tenants;
DROP POLICY IF EXISTS "tenants_self_read"             ON public.tenants;
DROP POLICY IF EXISTS "tenants_public_domain_lookup"  ON public.tenants;
CREATE POLICY "tenants_super_admin" ON public.tenants FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'));
CREATE POLICY "tenants_self_read" ON public.tenants FOR SELECT
  USING (id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));
-- Permite que visitantes anônimos encontrem o tenant pelo domínio (necessário para o site público)
CREATE POLICY "tenants_public_domain_lookup" ON public.tenants FOR SELECT TO anon USING (true);

-- Tenant padrão (Isaac Omar — imobiliária existente)
INSERT INTO public.tenants (id, name, slug, plan_id, domain)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Isaac Omar Corretor de Imóveis',
  'omar-corretor',
  'starter',
  'omarcorretor.com.br'
) ON CONFLICT (id) DO NOTHING;

-- ─── 3. SUBSCRIPTIONS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                    uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id             uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
  plan_id               text REFERENCES public.plans(id),
  status                text DEFAULT 'active',  -- active|trialing|past_due|cancelled|paused
  current_period_start  timestamptz DEFAULT now(),
  current_period_end    timestamptz DEFAULT (now() + interval '30 days'),
  cancel_at_period_end  boolean DEFAULT false,
  payment_method        text,                    -- 'stripe'|'pix'|'boleto'
  external_id           text,                    -- ID no gateway de pagamento
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "subscriptions_super_admin" ON public.subscriptions;
DROP POLICY IF EXISTS "subscriptions_tenant_admin" ON public.subscriptions;
CREATE POLICY "subscriptions_super_admin" ON public.subscriptions FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'));
CREATE POLICY "subscriptions_tenant_admin" ON public.subscriptions FOR SELECT
  USING (tenant_id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

INSERT INTO public.subscriptions (tenant_id, plan_id, status)
VALUES ('00000000-0000-0000-0000-000000000001', 'starter', 'active')
ON CONFLICT DO NOTHING;

-- ─── 4. ADICIONAR tenant_id AOS PROFILES ─────────────────────────────────────
-- Adiciona coluna tenant_id com default para o tenant existente
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id) DEFAULT '00000000-0000-0000-0000-000000000001';

-- Garante que todos os perfis existentes apontem para o tenant padrão
UPDATE public.profiles
  SET tenant_id = '00000000-0000-0000-0000-000000000001'
  WHERE tenant_id IS NULL;

-- Adiciona coluna super_admin ao role (altera o check constraint se existir)
-- O role agora aceita: 'super_admin' | 'admin' | 'corretor'
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS permissions jsonb DEFAULT '{}'::jsonb;

-- ─── 5. ADICIONAR tenant_id ÀS TABELAS DE DADOS ──────────────────────────────
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id) DEFAULT '00000000-0000-0000-0000-000000000001';
UPDATE public.properties SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.locations
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id) DEFAULT '00000000-0000-0000-0000-000000000001';
UPDATE public.locations SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id) DEFAULT '00000000-0000-0000-0000-000000000001';
UPDATE public.settings SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.site_content
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id) DEFAULT '00000000-0000-0000-0000-000000000001';
UPDATE public.site_content SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.crm_pipelines
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id) DEFAULT '00000000-0000-0000-0000-000000000001';
UPDATE public.crm_pipelines SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.crm_tags
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id) DEFAULT '00000000-0000-0000-0000-000000000001';
UPDATE public.crm_tags SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.crm_lead_statuses
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id) DEFAULT '00000000-0000-0000-0000-000000000001';
UPDATE public.crm_lead_statuses SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.media_library
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id) DEFAULT '00000000-0000-0000-0000-000000000001';
UPDATE public.media_library SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

-- ─── 6. TABELA DE PERMISSÕES GRANULARES ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id          serial PRIMARY KEY,
  role        text NOT NULL,            -- 'super_admin'|'admin'|'corretor'
  resource    text NOT NULL,            -- 'properties'|'leads'|'settings'|'users'|etc
  action      text NOT NULL,            -- 'read'|'write'|'delete'|'manage'
  tenant_id   uuid,                     -- null = global (super_admin)
  UNIQUE(role, resource, action)
);

INSERT INTO public.role_permissions (role, resource, action) VALUES
  -- SUPER ADMIN: tudo
  ('super_admin','*','*'),

  -- ADMIN: gestão completa do tenant
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

  -- CORRETOR: acesso operacional restrito
  ('corretor','properties','read'),
  ('corretor','leads','read'),('corretor','leads','write'),
  ('corretor','media','read'),('corretor','media','write'),
  ('corretor','profile','read'),('corretor','profile','write')
ON CONFLICT (role, resource, action) DO NOTHING;

-- ─── 7. TABELA DE LEADS (estrutura completa) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id     uuid REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
  assigned_to   uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  name          text NOT NULL,
  email         text,
  phone         text,
  source        text DEFAULT 'site',    -- 'site'|'whatsapp'|'instagram'|'indicacao'|'portal'
  status_id     int  REFERENCES public.crm_lead_statuses(id),
  pipeline_id   int  REFERENCES public.crm_pipelines(id),
  stage_id      int  REFERENCES public.crm_stages(id),
  property_id   int  REFERENCES public.properties(id) ON DELETE SET NULL,
  notes         text,
  tags          int[] DEFAULT '{}',     -- array de crm_tags.id
  budget_min    numeric,
  budget_max    numeric,
  interest      text,                   -- tipo de imóvel de interesse
  city_interest text,
  next_contact  timestamptz,
  converted_at  timestamptz,
  lost_at       timestamptz,
  lost_reason   text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "leads_super_admin"   ON public.leads;
DROP POLICY IF EXISTS "leads_tenant_admin"  ON public.leads;
DROP POLICY IF EXISTS "leads_tenant_corretor" ON public.leads;
CREATE POLICY "leads_super_admin"    ON public.leads FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'));
CREATE POLICY "leads_tenant_admin"   ON public.leads FOR ALL
  USING (tenant_id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "leads_tenant_corretor" ON public.leads FOR SELECT
  USING (assigned_to = auth.uid() OR tenant_id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ─── 8. TABELA DE ATIVIDADES / TIMELINE ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.lead_activities (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id     uuid REFERENCES public.leads(id) ON DELETE CASCADE,
  tenant_id   uuid REFERENCES public.tenants(id),
  user_id     uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  type        text NOT NULL,  -- 'note'|'call'|'email'|'visit'|'stage_change'|'status_change'
  content     text,
  metadata    jsonb DEFAULT '{}'::jsonb,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "activities_tenant" ON public.lead_activities;
CREATE POLICY "activities_tenant" ON public.lead_activities FOR ALL
  USING (tenant_id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- ─── 9. TABELA DE TAREFAS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.tasks (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id    uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
  assigned_to  uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  lead_id      uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  property_id  int  REFERENCES public.properties(id) ON DELETE SET NULL,
  title        text NOT NULL,
  description  text,
  due_date     timestamptz,
  priority     text DEFAULT 'media',   -- 'baixa'|'media'|'alta'|'urgente'
  status       text DEFAULT 'pendente',-- 'pendente'|'em_progresso'|'concluida'|'cancelada'
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tasks_tenant" ON public.tasks;
CREATE POLICY "tasks_tenant" ON public.tasks FOR ALL
  USING (tenant_id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
    AND (assigned_to = auth.uid()
      OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin'))));

-- ─── 10. FUNÇÃO HELPER: verificar permissão ───────────────────────────────────
CREATE OR REPLACE FUNCTION public.has_permission(p_resource text, p_action text)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_role text;
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

-- ─── 11. FUNÇÃO HELPER: tenant do usuário atual ───────────────────────────────
CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_tenant_id uuid;
BEGIN
  SELECT tenant_id INTO v_tenant_id FROM public.profiles WHERE id = auth.uid();
  RETURN v_tenant_id;
END;
$$;

-- ─── 12. ATUALIZAR POLICIES DAS TABELAS EXISTENTES (tenant-aware) ────────────

-- profiles
DROP POLICY IF EXISTS "profiles_tenant_read"  ON public.profiles;
DROP POLICY IF EXISTS "profiles_tenant_write" ON public.profiles;
DROP POLICY IF EXISTS "profiles_self_write"   ON public.profiles;
CREATE POLICY "profiles_tenant_read" ON public.profiles FOR SELECT
  USING (
    tenant_id = (SELECT tenant_id FROM public.profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
  );
CREATE POLICY "profiles_self_write" ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- properties (tenant-aware)
DROP POLICY IF EXISTS "properties_tenant" ON public.properties;
CREATE POLICY "properties_tenant" ON public.properties FOR ALL
  USING (
    tenant_id = public.current_tenant_id()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- settings (tenant-aware)
DROP POLICY IF EXISTS "settings_read"  ON public.settings;
DROP POLICY IF EXISTS "settings_write" ON public.settings;
CREATE POLICY "settings_read_tenant" ON public.settings FOR SELECT
  USING (tenant_id = public.current_tenant_id() OR tenant_id IS NULL);
CREATE POLICY "settings_write_admin" ON public.settings FOR ALL
  USING (
    (tenant_id = public.current_tenant_id() AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')))
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- site_content (tenant-aware)
DROP POLICY IF EXISTS "content_read"  ON public.site_content;
DROP POLICY IF EXISTS "content_write" ON public.site_content;
CREATE POLICY "content_read_public"  ON public.site_content FOR SELECT USING (true);
CREATE POLICY "content_write_admin"  ON public.site_content FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')));

-- locations (tenant-aware)
DROP POLICY IF EXISTS "locations_read"  ON public.locations;
DROP POLICY IF EXISTS "locations_write" ON public.locations;
CREATE POLICY "locations_read_all"   ON public.locations FOR SELECT USING (true);
CREATE POLICY "locations_write_admin" ON public.locations FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')));

-- crm_pipelines (tenant-aware)
DROP POLICY IF EXISTS "pipelines_auth" ON public.crm_pipelines;
CREATE POLICY "pipelines_tenant" ON public.crm_pipelines FOR ALL
  USING (tenant_id = public.current_tenant_id()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'));

-- crm_tags (tenant-aware)
DROP POLICY IF EXISTS "tags_auth" ON public.crm_tags;
CREATE POLICY "tags_tenant" ON public.crm_tags FOR ALL
  USING (tenant_id = public.current_tenant_id()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'));

-- crm_lead_statuses (tenant-aware)
DROP POLICY IF EXISTS "lead_statuses_auth" ON public.crm_lead_statuses;
CREATE POLICY "lead_statuses_tenant" ON public.crm_lead_statuses FOR ALL
  USING (tenant_id = public.current_tenant_id()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'));

-- media_library (tenant-aware)
DROP POLICY IF EXISTS "media_read"   ON public.media_library;
DROP POLICY IF EXISTS "media_write"  ON public.media_library;
DROP POLICY IF EXISTS "media_delete" ON public.media_library;
CREATE POLICY "media_tenant_read"   ON public.media_library FOR SELECT
  USING (tenant_id = public.current_tenant_id()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'));
CREATE POLICY "media_tenant_write"  ON public.media_library FOR INSERT
  WITH CHECK (tenant_id = public.current_tenant_id());
CREATE POLICY "media_tenant_delete" ON public.media_library FOR DELETE
  USING (created_by = auth.uid()
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')));

-- integrations
DROP POLICY IF EXISTS "integrations_admin" ON public.integrations;
CREATE POLICY "integrations_admin_tenant" ON public.integrations FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')));
