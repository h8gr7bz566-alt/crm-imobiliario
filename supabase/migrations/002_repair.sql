-- ═══════════════════════════════════════════════════════════════════
-- REPARO Migration 002 — Execute este SQL no Supabase SQL Editor
-- Causa: políticas foram criadas antes de profiles.tenant_id existir
-- ═══════════════════════════════════════════════════════════════════

-- ─── 1. Garante que tenant_id existe em profiles (se falhou) ────────────────
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS tenant_id uuid;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS permissions jsonb DEFAULT '{}'::jsonb;

UPDATE public.profiles
  SET tenant_id = '00000000-0000-0000-0000-000000000001'
  WHERE tenant_id IS NULL;

-- ─── 2. Garante que tenant_id existe em todas as tabelas ────────────────────
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS tenant_id uuid;
UPDATE public.properties
  SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.locations
  ADD COLUMN IF NOT EXISTS tenant_id uuid;
UPDATE public.locations
  SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS tenant_id uuid;
UPDATE public.settings
  SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.site_content
  ADD COLUMN IF NOT EXISTS tenant_id uuid;
UPDATE public.site_content
  SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.crm_pipelines
  ADD COLUMN IF NOT EXISTS tenant_id uuid;
UPDATE public.crm_pipelines
  SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.crm_tags
  ADD COLUMN IF NOT EXISTS tenant_id uuid;
UPDATE public.crm_tags
  SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.crm_lead_statuses
  ADD COLUMN IF NOT EXISTS tenant_id uuid;
UPDATE public.crm_lead_statuses
  SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

ALTER TABLE public.media_library
  ADD COLUMN IF NOT EXISTS tenant_id uuid;
UPDATE public.media_library
  SET tenant_id = '00000000-0000-0000-0000-000000000001' WHERE tenant_id IS NULL;

-- ─── 3. Recria políticas que falharam ──────────────────────────────────────

-- tenants: self_read falhava porque profiles.tenant_id não existia ainda
DROP POLICY IF EXISTS "tenants_self_read" ON public.tenants;
CREATE POLICY "tenants_self_read" ON public.tenants FOR SELECT
  USING (id IN (SELECT tenant_id FROM public.profiles WHERE id = auth.uid()));

-- subscriptions: tenant_admin falhava pelo mesmo motivo
DROP POLICY IF EXISTS "subscriptions_tenant_admin" ON public.subscriptions;
CREATE POLICY "subscriptions_tenant_admin" ON public.subscriptions FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')
  ));

-- media_library: delete policy — compatível com uploaded_by ou created_by
DROP POLICY IF EXISTS "media_tenant_delete" ON public.media_library;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='media_library' AND column_name='created_by'
  ) THEN
    EXECUTE $p$
      CREATE POLICY "media_tenant_delete" ON public.media_library FOR DELETE
        USING (created_by = auth.uid()
          OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')));
    $p$;
  ELSIF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='media_library' AND column_name='uploaded_by'
  ) THEN
    EXECUTE $p$
      CREATE POLICY "media_tenant_delete" ON public.media_library FOR DELETE
        USING (uploaded_by = auth.uid()
          OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')));
    $p$;
  ELSE
    EXECUTE $p$
      CREATE POLICY "media_tenant_delete" ON public.media_library FOR DELETE
        USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin','super_admin')));
    $p$;
  END IF;
END $$;

-- ─── 4. Garante funções helper (recria se necessário) ──────────────────────
CREATE OR REPLACE FUNCTION public.current_tenant_id()
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE v_tenant_id uuid;
BEGIN
  SELECT tenant_id INTO v_tenant_id FROM public.profiles WHERE id = auth.uid();
  RETURN v_tenant_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_permission(p_resource text, p_action text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$
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

-- ─── 5. Verificação final ───────────────────────────────────────────────────
-- Consulta para confirmar que tudo está correto:
SELECT
  t.table_name,
  bool_or(c.column_name = 'tenant_id') AS has_tenant_id
FROM information_schema.tables t
LEFT JOIN information_schema.columns c
  ON c.table_schema = t.table_schema AND c.table_name = t.table_name
WHERE t.table_schema = 'public'
  AND t.table_name IN ('profiles','properties','locations','settings','site_content',
                       'crm_pipelines','crm_tags','crm_lead_statuses','media_library')
GROUP BY t.table_name
ORDER BY t.table_name;
