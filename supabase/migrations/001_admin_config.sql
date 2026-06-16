-- ═══════════════════════════════════════════════════════════════════
-- CRM Imobiliário — Migração 001: Configurações Administrativas
-- Execute no Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════

-- ─── 1. settings (chave-valor global) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.settings (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL DEFAULT 'null'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_read"  ON public.settings;
DROP POLICY IF EXISTS "settings_write" ON public.settings;
CREATE POLICY "settings_read"  ON public.settings FOR SELECT USING (true);
CREATE POLICY "settings_write" ON public.settings FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── 2. site_content (blocos de texto multilíngue) ───────────────────────────
CREATE TABLE IF NOT EXISTS public.site_content (
  key        text PRIMARY KEY,
  value_pt   text,
  value_en   text,
  value_es   text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "content_read"  ON public.site_content;
DROP POLICY IF EXISTS "content_write" ON public.site_content;
CREATE POLICY "content_read"  ON public.site_content FOR SELECT USING (true);
CREATE POLICY "content_write" ON public.site_content FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── 3. crm_pipelines ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.crm_pipelines (
  id         serial PRIMARY KEY,
  name       text NOT NULL,
  is_default boolean DEFAULT false,
  sort_order int  DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.crm_pipelines ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "pipelines_auth" ON public.crm_pipelines;
CREATE POLICY "pipelines_auth" ON public.crm_pipelines FOR ALL
  USING (auth.role() = 'authenticated');

-- ─── 4. crm_stages ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.crm_stages (
  id          serial PRIMARY KEY,
  pipeline_id int  REFERENCES public.crm_pipelines(id) ON DELETE CASCADE,
  name        text NOT NULL,
  color       text DEFAULT '#6b7280',
  sort_order  int  DEFAULT 0
);

ALTER TABLE public.crm_stages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "stages_auth" ON public.crm_stages;
CREATE POLICY "stages_auth" ON public.crm_stages FOR ALL
  USING (auth.role() = 'authenticated');

-- ─── 5. crm_tags ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.crm_tags (
  id    serial PRIMARY KEY,
  name  text NOT NULL,
  color text DEFAULT '#6b7280'
);

ALTER TABLE public.crm_tags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tags_auth" ON public.crm_tags;
CREATE POLICY "tags_auth" ON public.crm_tags FOR ALL
  USING (auth.role() = 'authenticated');

-- ─── 6. crm_lead_statuses ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.crm_lead_statuses (
  id         serial PRIMARY KEY,
  name       text NOT NULL,
  color      text DEFAULT '#6b7280',
  is_final   boolean DEFAULT false,
  sort_order int DEFAULT 0
);

ALTER TABLE public.crm_lead_statuses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "lead_statuses_auth" ON public.crm_lead_statuses;
CREATE POLICY "lead_statuses_auth" ON public.crm_lead_statuses FOR ALL
  USING (auth.role() = 'authenticated');

-- ─── 7. integrations ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.integrations (
  key        text PRIMARY KEY,
  value      text,
  enabled    boolean DEFAULT false,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "integrations_admin" ON public.integrations;
CREATE POLICY "integrations_admin" ON public.integrations FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ─── 8. media_library ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.media_library (
  id         serial PRIMARY KEY,
  name       text,
  url        text NOT NULL,
  type       text DEFAULT 'image',
  size       bigint,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "media_read"  ON public.media_library;
DROP POLICY IF EXISTS "media_write" ON public.media_library;
DROP POLICY IF EXISTS "media_delete" ON public.media_library;
CREATE POLICY "media_read"   ON public.media_library FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "media_write"  ON public.media_library FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "media_delete" ON public.media_library FOR DELETE
  USING (created_by = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ═══════════════════════════════════════════════════════════════════
-- SEED DATA — valores padrão baseados nos hardcodes atuais
-- ═══════════════════════════════════════════════════════════════════

INSERT INTO public.settings (key, value) VALUES
  ('company.name',          '"Isaac Omar Corretor de Imóveis"'),
  ('company.creci',         '"69965F"'),
  ('company.whatsapp',      '"5547999701743"'),
  ('company.phone',         '"(47) 99970-1743"'),
  ('company.email',         '"contato@omarcorretor.com.br"'),
  ('company.website',       '"https://omarcorretor.com.br"'),
  ('company.address',       '"Balneário Camboriú, SC"'),
  ('company.logo_url',      '"/logo.png"'),
  ('company.favicon_url',   '"/favicon.ico"'),
  ('company.facebook_url',  '"https://www.facebook.com"'),
  ('company.instagram_url', '"https://www.instagram.com/isaacomar.imoveissc?igsh=c2UxaWV0bHNiOHJ3"'),
  ('company.tiktok_url',    '""'),
  ('company.youtube_url',   '""'),
  ('company.linkedin_url',  '""'),
  ('visual.accent_color',   '"#b8962e"'),
  ('visual.primary_bg',     '"#0f1c2e"'),
  ('visual.secondary_bg',   '"#1a2f4a"'),
  ('visual.price_max_slider', '130000000'),
  ('visual.hero_bg_url',    '""')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.site_content (key, value_pt, value_en, value_es) VALUES
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
  ('seo.title_pt',     'Isaac Omar — Corretor de Imóveis',      'Isaac Omar — Real Estate Agent',         'Isaac Omar — Agente Inmobiliario'),
  ('seo.description_pt','Corretor de imóveis especialista no litoral catarinense. CRECI 69965F.','Real estate agent specializing in the Santa Catarina coast. CRECI 69965F.','Agente inmobiliario especialista en el litoral de Santa Catarina. CRECI 69965F.'),
  ('footer.text',      '© 2026 Isaac Omar — Corretor de Imóveis — CRECI 69965F','© 2026 Isaac Omar — Real Estate Agent — CRECI 69965F','© 2026 Isaac Omar — Agente Inmobiliario — CRECI 69965F'),
  ('nav.cta_text',     'Falar com Corretor', 'Talk to Agent', 'Hablar con Agente'),
  ('planta.tag',       'Lançamentos',        'New Launches',  'Lanzamientos'),
  ('planta.title',     'Procurando investir,<br>morar ou veranear?','Looking to invest,<br>live or vacation?','¿Buscando invertir,<br>vivir o vacacionar?')
ON CONFLICT (key) DO NOTHING;

-- Pipeline padrão
INSERT INTO public.crm_pipelines (name, is_default, sort_order)
VALUES ('Funil Principal', true, 0)
ON CONFLICT DO NOTHING;

-- Stages padrão
DO $$
DECLARE pid int;
BEGIN
  SELECT id INTO pid FROM public.crm_pipelines WHERE is_default = true LIMIT 1;
  IF pid IS NOT NULL THEN
    INSERT INTO public.crm_stages (pipeline_id, name, color, sort_order) VALUES
      (pid, 'Novo Lead',         '#3b82f6', 0),
      (pid, 'Contato Feito',     '#8b5cf6', 1),
      (pid, 'Visita Agendada',   '#f59e0b', 2),
      (pid, 'Proposta Enviada',  '#f97316', 3),
      (pid, 'Negociação',        '#ec4899', 4),
      (pid, 'Fechado',           '#22c55e', 5),
      (pid, 'Perdido',           '#6b7280', 6)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- Tags padrão
INSERT INTO public.crm_tags (name, color) VALUES
  ('Urgente',      '#ef4444'),
  ('VIP',          '#b8962e'),
  ('Investidor',   '#8b5cf6'),
  ('Permuta',      '#3b82f6'),
  ('Financiamento','#22c55e')
ON CONFLICT DO NOTHING;

-- Status de leads padrão
INSERT INTO public.crm_lead_statuses (name, color, is_final, sort_order) VALUES
  ('Novo',           '#3b82f6', false, 0),
  ('Em atendimento', '#f59e0b', false, 1),
  ('Qualificado',    '#8b5cf6', false, 2),
  ('Convertido',     '#22c55e', true,  3),
  ('Perdido',        '#6b7280', true,  4)
ON CONFLICT DO NOTHING;

-- Integrações padrão
INSERT INTO public.integrations (key, value, enabled) VALUES
  ('meta_pixel_id',      '', false),
  ('ga_measurement_id',  '', false),
  ('gtm_container_id',   '', false),
  ('smtp_host',          '', false),
  ('smtp_port',          '587', false),
  ('smtp_user',          '', false),
  ('smtp_from_name',     'Omar Corretor', false),
  ('webhook_new_lead',   '', false),
  ('webhook_new_property', '', false)
ON CONFLICT (key) DO NOTHING;
