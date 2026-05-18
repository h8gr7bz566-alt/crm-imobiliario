# 02 — Papéis e Permissões

## Três Níveis de Acesso

### `super_admin` — Super Administrador da Plataforma
Controle total do SaaS. Acesso irrestrito a tudo.

**Responsabilidades:**
- Gerenciar todas as imobiliárias (tenants)
- Criar, editar e desativar planos de assinatura
- Visualizar e gerenciar todas as assinaturas
- Gerenciar todos os usuários globalmente
- Configurar parâmetros globais da plataforma (nome, email de suporte, trial padrão)
- Executar migrations, configurar Edge Functions, acessar logs

**No frontend:**
- Vê sidebar completa: todas seções admin + seção **⚡ Plataforma / Super Admin**
- Classes reveladas: `.admin-only` + `.super-admin-only`
- Inicia: todas as `initXSection()` + `initSuperAdminSection()`

---

### `admin` — Administrador da Imobiliária
Controle da sua imobiliária. Não acessa outras imobiliárias nem configurações críticas da plataforma.

**Responsabilidades:**
- Gerenciar imóveis (cadastro, edição, publicação)
- Gerenciar leads e funis de vendas
- Cadastrar e gerenciar corretores da equipe
- Configurar empresa (logo, contatos, redes sociais)
- Personalizar visual (cores, banners, imagens)
- Editar textos do site e SEO
- Configurar integrações (Meta Pixel, GA, WhatsApp, SMTP, Webhooks)
- Gerenciar biblioteca de mídia
- Configurar CRM (pipelines, tags, status de leads)

**No frontend:**
- Vê sidebar: seções admin (`Empresa`, `Visual`, `Site & SEO`, `CRM`, `Integrações`, `Mídia`)
- Classes reveladas: `.admin-only` (mas NÃO `.super-admin-only`)
- **Não vê:** Plataforma, planos, outras imobiliárias, usuários globais

---

### `corretor` — Corretor / Usuário Operacional
Acesso operacional ao próprio trabalho.

**Responsabilidades:**
- Visualizar e gerenciar seus próprios leads
- Registrar atividades (ligações, visitas, notas)
- Gerenciar suas tarefas e agenda
- Atualizar seu perfil e senha

**No frontend:**
- Sidebar mínima: apenas seções operacionais (leads próprios, agenda, perfil)
- Nenhuma seção de configuração visível
- **Não vê:** nada com `.admin-only` ou `.super-admin-only`

---

## Matriz de Permissões

| Recurso | super_admin | admin | corretor |
|---------|:-----------:|:-----:|:--------:|
| Imobiliárias (tenants) | ✅ CRUD | ✗ | ✗ |
| Planos e Assinaturas | ✅ CRUD | ✗ | ✗ |
| Usuários Globais | ✅ CRUD | ✗ | ✗ |
| Config. Plataforma | ✅ | ✗ | ✗ |
| Imóveis (todos) | ✅ | ✅ CRUD | 👁 Read |
| Leads (todos) | ✅ | ✅ CRUD | 📝 Próprios |
| Funis e Stages | ✅ | ✅ CRUD | ✗ |
| Tags e Status CRM | ✅ | ✅ CRUD | ✗ |
| Corretores (equipe) | ✅ | ✅ CRUD | ✗ |
| Configurações Empresa | ✅ | ✅ | ✗ |
| Visual / Banners | ✅ | ✅ | ✗ |
| Textos do Site | ✅ | ✅ | ✗ |
| Integrações | ✅ | ✅ | ✗ |
| Mídia | ✅ | ✅ | 📝 Upload |
| Tarefas | ✅ | ✅ | 📝 Próprias |
| Perfil Pessoal | ✅ | ✅ | ✅ |

---

## Implementação Técnica

### Frontend (`applyRolePermissions` em `script.js`)

```javascript
function applyRolePermissions(role) {
  // admin e super_admin: revelam .admin-only
  if (role === 'admin' || role === 'super_admin') {
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = '')
    // conecta lazy-render de todas as seções admin
  }
  // somente super_admin: revela .super-admin-only
  if (role === 'super_admin') {
    document.querySelectorAll('.super-admin-only').forEach(el => el.style.display = '')
    // conecta initSuperAdminSection()
  }
}
```

### Banco de Dados (`role_permissions`)

```sql
-- Tabela de permissões granulares
CREATE TABLE role_permissions (
  role     TEXT NOT NULL,  -- 'super_admin' | 'admin' | 'corretor'
  resource TEXT NOT NULL,  -- 'properties' | 'leads' | '*'
  action   TEXT NOT NULL,  -- 'read' | 'write' | 'delete' | '*'
  UNIQUE(role, resource, action)
);
```

### RLS (Row Level Security)

Todas as tabelas com dados de tenant usam políticas que verificam:
1. `auth.uid()` é válido (usuário logado)
2. `current_tenant_id()` == `tenant_id` da linha (isolamento)
3. Role do usuário tem permissão para a operação

Função helper:
```sql
CREATE FUNCTION has_permission(p_resource TEXT, p_action TEXT)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM role_permissions rp
    JOIN profiles p ON p.id = auth.uid()
    WHERE p.role = rp.role
      AND (rp.resource = p_resource OR rp.resource = '*')
      AND (rp.action   = p_action   OR rp.action   = '*')
  );
$$;
```
