-- ═══════════════════════════════════════════════════════════════════
-- CRM Imobiliário — Migração 003: Properties + Profiles
-- Cria as tabelas principais (faltavam nas migrações 001 e 002)
-- Execute no Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ─── 1. PROFILES (estende auth.users) ────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        text,
  full_name    text,
  avatar_url   text,
  role         text DEFAULT 'user',     -- 'user', 'admin', 'super_admin'
  tenant_id    uuid,
  permissions  jsonb DEFAULT '{}'::jsonb,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_read_all"    ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_self" ON public.profiles;

CREATE POLICY "profiles_read_all" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "profiles_update_self" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Trigger: cria profile automaticamente quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── 2. PROPERTIES (Imóveis) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.properties (
  id                    bigserial PRIMARY KEY,
  tenant_id             uuid,
  title                 text NOT NULL,
  rua                   text DEFAULT '',
  numero                text DEFAULT '',
  city                  text,
  neighborhood          text,
  price                 text,
  bedrooms              int DEFAULT 0,
  suites                int DEFAULT 0,
  area                  numeric DEFAULT 0,
  parking               int DEFAULT 0,
  published             boolean DEFAULT true,
  images                jsonb DEFAULT '[]'::jsonb,
  cover_image           text DEFAULT '',
  description           text DEFAULT '',
  owner_name            text DEFAULT '',
  owner_phone           text DEFAULT '',
  owner_email           text DEFAULT '',
  owner_notes           text DEFAULT '',
  construction_status   text DEFAULT '',
  condominium           text DEFAULT '',
  collection            text DEFAULT '[]',
  created_at            timestamptz DEFAULT now(),
  updated_at            timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_properties_tenant    ON public.properties(tenant_id);
CREATE INDEX IF NOT EXISTS idx_properties_published ON public.properties(published);
CREATE INDEX IF NOT EXISTS idx_properties_city      ON public.properties(city);

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "properties_read_public"  ON public.properties;
DROP POLICY IF EXISTS "properties_read_auth"    ON public.properties;
DROP POLICY IF EXISTS "properties_write_auth"   ON public.properties;
DROP POLICY IF EXISTS "properties_update_auth"  ON public.properties;
DROP POLICY IF EXISTS "properties_delete_auth"  ON public.properties;

CREATE POLICY "properties_read_public" ON public.properties
  FOR SELECT USING (published = true);

CREATE POLICY "properties_read_auth" ON public.properties
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "properties_write_auth" ON public.properties
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "properties_update_auth" ON public.properties
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "properties_delete_auth" ON public.properties
  FOR DELETE TO authenticated USING (true);

-- ─── 3. STORAGE BUCKET para imagens de imóveis ───────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('imoveis', 'imoveis', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "imoveis_read_public" ON storage.objects;
DROP POLICY IF EXISTS "imoveis_upload_auth" ON storage.objects;
DROP POLICY IF EXISTS "imoveis_delete_auth" ON storage.objects;

CREATE POLICY "imoveis_read_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'imoveis');

CREATE POLICY "imoveis_upload_auth" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'imoveis');

CREATE POLICY "imoveis_delete_auth" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'imoveis');
