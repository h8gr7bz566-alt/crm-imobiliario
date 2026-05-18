# 05 — Autenticação

## Provider

Supabase Auth com email + senha (magic link desabilitado por padrão).

## Fluxo de Login

```
1. Usuário acessa admin.html
2. Verifica sessão: supabase.auth.getSession()
   ├── [Sessão válida] → getProfile() → renderAdmin()
   └── [Sem sessão] → exibe formulário de login

3. Login: supabase.auth.signInWithPassword({ email, password })
   ├── [Sucesso] → onAuthStateChange('SIGNED_IN') → getProfile()
   └── [Erro] → exibe mensagem de erro

4. getProfile()
   ├── SELECT * FROM profiles WHERE id = auth.uid()
   ├── Cache em currentProfile
   ├── applyRolePermissions(profile.role)
   └── renderAdmin() / initSettings()
```

## Fluxo de Reset de Senha

```
1. Admin clica "Esqueci minha senha"
2. supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/admin.html' })
3. Supabase envia email com link PKCE
4. Usuário clica no link → redirecionado para admin.html com hash
5. supabase.auth.onAuthStateChange detecta 'PASSWORD_RECOVERY'
   → FLAG pendingPasswordRecovery = true (capturado ANTES do DOMContentLoaded)
6. DOMContentLoaded verifica flag → exibe modal de redefinição
7. supabase.auth.updateUser({ password: novasenha })
```

> **Importante:** O flag `pendingPasswordRecovery` é capturado no listener de `onAuthStateChange` registrado ANTES do `DOMContentLoaded`, porque o Supabase troca o código PKCE durante a inicialização da página, antes do DOM estar pronto.

## Convite de Usuários (Admin convidando Corretor)

```
Admin → preenche formulário (nome, email, role)
      → POST /functions/v1/invite-user
      → Edge Function: supabase.auth.admin.inviteUserByEmail()
      → Email de convite enviado ao corretor
      → Corretor define senha → perfil criado automaticamente
      → Trigger SQL: on INSERT to auth.users → INSERT into profiles
```

## Trigger de Criação de Perfil

```sql
CREATE FUNCTION handle_new_user() RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, name, tenant_id, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    '00000000-0000-0000-0000-000000000001',  -- tenant padrão
    COALESCE(NEW.raw_user_meta_data->>'role', 'corretor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## Segurança

- JWT expiração: padrão Supabase (1 hora, refresh automático)
- RLS ativo em todas as tabelas — usuário só acessa seu tenant
- Super admin: role definido diretamente no banco (não via frontend)
- Chave `anon` exposta no frontend: aceitável porque RLS protege os dados
- Chave `service_role`: usada apenas nas Edge Functions (nunca no frontend)

## Logout

```javascript
await supabase.auth.signOut()
// onAuthStateChange('SIGNED_OUT') → location.reload()
```
