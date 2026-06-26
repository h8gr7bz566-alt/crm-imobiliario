-- 006: Push subscriptions + tasks.reminded_at
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  tenant_id   uuid REFERENCES public.tenants(id) ON DELETE CASCADE,
  endpoint    text NOT NULL UNIQUE,
  p256dh      text NOT NULL,
  auth        text NOT NULL,
  user_agent  text,
  created_at  timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS push_subs_user_idx ON public.push_subscriptions(user_id);
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "push_subs_owner" ON public.push_subscriptions;
CREATE POLICY "push_subs_owner" ON public.push_subscriptions FOR ALL
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Coluna pra evitar enviar lembrete duplicado
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS reminded_at timestamptz;
