# 06 — Frontend

## Estrutura de Arquivos

```
/
├── index.html          ← Site público
├── admin.html          ← Painel admin (todas as roles)
├── script.js           ← Lógica principal (compartilhada)
├── style.css           ← Estilos do site público
├── admin.css           ← Estilos do painel admin
├── lib/
│   ├── supabase.js     ← Instância do cliente Supabase
│   └── settings.js     ← Módulo de configurações centralizadas
├── supabase/
│   └── migrations/     ← SQL migrations
├── docs/               ← Esta documentação
├── vite.config.js      ← Config multi-page build
└── package.json
```

## Padrão de Seções Admin (Lazy Render)

Cada seção do painel admin só é inicializada quando o usuário clica nela pela primeira vez:

```javascript
// Flag de inicialização — evita dupla inicialização
async function initEmpresaSection() {
  const sec = document.getElementById('section-empresa')
  if (!sec || sec.dataset.loaded) return
  sec.dataset.loaded = '1'
  // Renderiza HTML + conecta event listeners
}

// Conectado em applyRolePermissions():
const btn = document.querySelector('.nav-item[data-section="empresa"]')
btn.addEventListener('click', () => initEmpresaSection(), { once: true })
```

## Seções do Painel Admin

| Seção | ID HTML | Função JS | Role |
|-------|---------|-----------|------|
| Imóveis | `section-imoveis` | renderAdmin() | admin+ |
| Leads | `section-leads` | — | admin+ |
| Agenda | `section-agenda` | — | todos |
| Configurações | `section-settings` | initSettings() | todos |
| Empresa | `section-empresa` | initEmpresaSection() | admin+ |
| Visual | `section-visual` | initVisualSection() | admin+ |
| Site & SEO | `section-site-config` | initSiteConfigSection() | admin+ |
| CRM | `section-crm-config` | initCRMConfigSection() | admin+ |
| Integrações | `section-integracoes` | initIntegracoesSection() | admin+ |
| Mídia | `section-midia` | initMidiaSection() | admin+ |
| Super Admin | `section-super-admin` | initSuperAdminSection() | super_admin |

## Módulo `lib/settings.js`

### Funções de Leitura
```javascript
// Carrega tudo do banco em paralelo (call uma vez no boot)
await loadAllSettings()

// Lê da cache (síncrono após load)
getSetting('company.name', 'Fallback')
getContent('hero.title', 'pt')  // multilíngue
```

### Funções de Escrita
```javascript
// Salva uma configuração
await saveSetting('company.name', 'Nova Imobiliária')

// Salva várias de uma vez (batch upsert)
await saveMultipleSettings([
  { key: 'visual.primary_color', value: '#c9a84c' },
  { key: 'visual.secondary_color', value: '#1a1a2e' },
])

// Salva conteúdo multilíngue
await saveContent('hero.title', { pt: 'Bem-vindo', en: 'Welcome', es: 'Bienvenido' })

// Salva integração
await saveIntegration('meta_pixel', '123456789', true)
```

### Funções de Aplicação
```javascript
// Aplica CSS custom properties + logo + favicon
applyVisualSettings()

// Atualiza DOM com textos do banco (atributo data-content-key)
applyDynamicContent('pt')

// Atualiza todos os links wa.me do site
applyWhatsAppLinks('5547999701743')
```

## Sistema de Temas Visuais

CSS custom properties controlam o tema inteiro:

```css
:root {
  --accent:       /* cor principal (ouro) */
  --primary-bg:   /* fundo principal */
  --secondary-bg: /* fundo secundário */
  --header-bg:    /* fundo do header */
  --text-color:   /* cor do texto */
  --card-bg:      /* fundo dos cards */
}
```

`applyVisualSettings()` lê do banco e aplica via:
```javascript
document.documentElement.style.setProperty('--accent', getSetting('visual.primary_color', '#c9a84c'))
```

## Conteúdo Dinâmico (site_content)

Qualquer elemento com `data-content-key` é atualizado automaticamente:

```html
<h1 data-content-key="hero.title">Texto padrão</h1>
<p data-content-key="hero.subtitle">Subtítulo padrão</p>
```

```javascript
applyDynamicContent('pt')
// → atualiza todos elementos com data-content-key
// → usando getContent(key, lang) da cache
```

## Formatação de Preços

```javascript
formatPrice(rawPrice, lang)
// 'pt' → 'R$ 1.400.000'
// 'en' → '$ 245.614' (convertido com taxa fixa BRL_TO_USD = 5.70)
// 'es' → 'R$ 1.400.000' (mantém BRL para Espanhol)
```

## Storage (Supabase)

Uploads de imagem usam a função helper:
```javascript
async function uploadImageToStorage(file, folder = 'assets') {
  const ext  = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { data, error } = await supabase.storage
    .from('property-images')
    .upload(path, file, { upsert: true })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage
    .from('property-images')
    .getPublicUrl(path)
  return publicUrl
}
```

Pastas usadas:
- `logos/` — logo da empresa
- `hero/` — imagem do hero/banner
- `media/` — biblioteca de mídia geral
- `avatars/` — fotos de perfil dos usuários
- `imoveis/` — fotos dos imóveis

## Segurança XSS

Todo conteúdo dinâmico usa `escapeHTML()` antes de inserir no DOM via innerHTML:

```javascript
function escapeHTML(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
```
