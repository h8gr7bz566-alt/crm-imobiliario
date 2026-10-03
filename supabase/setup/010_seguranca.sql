-- ═══════════════════════════════════════════════════════════════════════════
-- 010_seguranca.sql — reforço de segurança do banco (out/2026)
-- Pode rodar mais de uma vez (idempotente). Rodar no Supabase → SQL Editor.
-- Também foi acrescentado no final do 000_instalacao_completa.sql.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1) Perfis: visitante sem login não lê mais nome/e-mail/cargo dos usuários do CRM
DROP POLICY IF EXISTS "profiles_read_all" ON public.profiles;
CREATE POLICY "profiles_read_all" ON public.profiles FOR SELECT TO authenticated USING (true);

-- 2) Perfis: ninguém promove a si mesmo (cargo, imobiliária, permissões, ativo)
--    Só admin/super_admin mudam esses campos; admin não cria super_admin nem troca de imobiliária.
CREATE OR REPLACE FUNCTION public.protect_profile_fields()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_role text;
BEGIN
  -- Sem usuário (SQL Editor, service_role, funções do servidor): liberado
  IF auth.uid() IS NULL THEN RETURN NEW; END IF;

  SELECT role INTO v_role FROM public.profiles WHERE id = auth.uid();
  IF v_role = 'super_admin' THEN RETURN NEW; END IF;

  IF v_role = 'admin'
     AND NEW.role IS DISTINCT FROM 'super_admin'
     AND OLD.role IS DISTINCT FROM 'super_admin'
     AND NEW.tenant_id IS NOT DISTINCT FROM OLD.tenant_id THEN
    RETURN NEW;
  END IF;

  IF NEW.role        IS DISTINCT FROM OLD.role
  OR NEW.tenant_id   IS DISTINCT FROM OLD.tenant_id
  OR NEW.permissions IS DISTINCT FROM OLD.permissions
  OR NEW.active      IS DISTINCT FROM OLD.active THEN
    RAISE EXCEPTION 'Sem permissão para alterar cargo, imobiliária ou status do usuário';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_profile_fields ON public.profiles;
CREATE TRIGGER protect_profile_fields
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.protect_profile_fields();

-- 3) Imóveis: só usuários do CRM (corretor/admin/super_admin) cadastram, editam e excluem
DROP POLICY IF EXISTS "properties_write_auth"  ON public.properties;
DROP POLICY IF EXISTS "properties_update_auth" ON public.properties;
DROP POLICY IF EXISTS "properties_delete_auth" ON public.properties;
CREATE POLICY "properties_write_auth" ON public.properties FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('corretor','admin','super_admin'));
CREATE POLICY "properties_update_auth" ON public.properties FOR UPDATE TO authenticated
  USING (public.current_user_role() IN ('corretor','admin','super_admin'));
CREATE POLICY "properties_delete_auth" ON public.properties FOR DELETE TO authenticated
  USING (public.current_user_role() IN ('corretor','admin','super_admin'));

-- 4) Leads das apresentações: só usuários do CRM leem
DROP POLICY IF EXISTS "apres_leads_read" ON public.apresentacao_leads;
CREATE POLICY "apres_leads_read" ON public.apresentacao_leads FOR SELECT TO authenticated
  USING (public.current_user_role() IN ('corretor','admin','super_admin'));
