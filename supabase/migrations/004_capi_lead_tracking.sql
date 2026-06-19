-- ═══════════════════════════════════════════════════════════════════
-- CRM Imobiliário — Migração 004: Tracking de origem do lead (Meta CAPI)
-- Execute no Supabase Dashboard → SQL Editor (projeto crm imobiliário)
-- ═══════════════════════════════════════════════════════════════════

-- Campos de atribuição de campanha (UTM)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_source   text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_medium   text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_campaign text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_content  text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_term     text;

-- Click IDs (anúncios)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS fbclid text;  -- Facebook click ID
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS gclid  text;  -- Google Ads click ID

-- Cookies do Meta (necessários para CAPI deduplicar com Pixel)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS fbp text;  -- _fbp browser cookie
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS fbc text;  -- _fbc browser cookie

-- Metadata da requisição (necessário pelo CAPI)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS client_ip   text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS user_agent  text;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS landing_url text;

-- Controle do envio para CAPI (evita duplicar)
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS capi_sent_at  timestamptz;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS capi_event_id text;

-- Index para consultas por campanha
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON public.leads(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source   ON public.leads(utm_source);
