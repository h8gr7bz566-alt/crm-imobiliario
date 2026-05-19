// lib/editmode.js — Editor visual inline para admins
import { supabase } from './supabase.js'
import {
  saveSetting, saveContent,
  getSetting, getContentCache
} from './settings.js'

let _popup  = null
let _active = null

// ─── Entry point ──────────────────────────────────────────────────────────────
export async function initEditMode() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()

  if (!profile || !['admin', 'super_admin'].includes(profile.role)) return

  injectStyles()
  injectToolbar()
  markElements()
  document.addEventListener('click', onDocClick, true)
}

// ─── Styles ───────────────────────────────────────────────────────────────────
function injectStyles() {
  const s = document.createElement('style')
  s.textContent = `
    #em-bar {
      position:fixed;top:0;left:0;right:0;z-index:99999;
      background:#0f1c2e;border-bottom:2px solid #b8962e;
      display:flex;align-items:center;gap:12px;padding:8px 16px;
      font-family:system-ui,sans-serif;font-size:13px;color:#fff;
      box-shadow:0 2px 16px rgba(0,0,0,.5);
    }
    #em-bar .em-badge {
      background:#b8962e;color:#0f1c2e;font-weight:700;
      padding:3px 10px;border-radius:20px;font-size:11px;letter-spacing:.04em;
    }
    #em-bar .em-hint { color:rgba(255,255,255,.45);font-size:12px; }
    #em-bar .em-colors { display:flex;gap:10px;align-items:center;margin-left:auto; }
    #em-bar .em-ci { display:flex;align-items:center;gap:4px;font-size:11px;color:rgba(255,255,255,.65); }
    #em-bar .em-ci input[type=color] { width:26px;height:20px;border:none;padding:0;border-radius:4px;cursor:pointer;background:none; }
    #em-bar .em-exit {
      background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);
      color:#fff;padding:4px 12px;border-radius:6px;cursor:pointer;font-size:12px;
    }
    #em-bar .em-exit:hover { background:rgba(239,68,68,.25);border-color:#f87171; }

    body { padding-top:46px !important; }

    [data-editable] { cursor:pointer !important; }
    [data-editable]:hover {
      outline:2px dashed #b8962e !important;
      outline-offset:3px !important;
    }
    [data-editable].em-on { outline:2px solid #b8962e !important;outline-offset:3px !important; }

    #em-pop {
      position:fixed;z-index:100000;
      background:#1a2f4a;border:1px solid #b8962e;
      border-radius:12px;padding:18px;width:360px;max-width:calc(100vw - 24px);
      box-shadow:0 8px 40px rgba(0,0,0,.6);font-family:system-ui,sans-serif;
    }
    #em-pop .ep-title {
      font-size:11px;font-weight:700;color:#b8962e;
      text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;
    }
    #em-pop .ep-tabs { display:flex;gap:4px;margin-bottom:10px; }
    #em-pop .ep-tab {
      padding:3px 10px;border-radius:6px;
      border:1px solid rgba(255,255,255,.15);
      background:none;color:rgba(255,255,255,.55);font-size:11px;cursor:pointer;
    }
    #em-pop .ep-tab.active { background:#b8962e;color:#0f1c2e;border-color:#b8962e;font-weight:700; }
    #em-pop .ep-lbl { font-size:11px;color:rgba(255,255,255,.45);margin-bottom:4px; }
    #em-pop textarea, #em-pop input[type=text], #em-pop input[type=url] {
      width:100%;box-sizing:border-box;
      background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);
      border-radius:6px;color:#fff;padding:8px 10px;font-size:13px;
      resize:vertical;outline:none;font-family:inherit;
    }
    #em-pop textarea:focus, #em-pop input:focus { border-color:#b8962e; }
    #em-pop .ep-row { display:flex;gap:8px;margin-top:12px;align-items:center; }
    #em-pop .ep-save {
      background:#b8962e;color:#0f1c2e;font-weight:700;
      border:none;padding:7px 20px;border-radius:6px;cursor:pointer;font-size:13px;
    }
    #em-pop .ep-cancel {
      background:rgba(255,255,255,.07);color:#fff;
      border:1px solid rgba(255,255,255,.15);
      padding:7px 14px;border-radius:6px;cursor:pointer;font-size:13px;
    }
    #em-pop .ep-msg { font-size:11px; }
    #em-pop .ep-upload {
      display:flex;gap:6px;align-items:center;margin-top:6px;
    }
    #em-pop .ep-ubtn {
      background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);
      color:#fff;padding:5px 10px;border-radius:6px;cursor:pointer;font-size:12px;white-space:nowrap;
    }
    #em-pop .ep-preview {
      max-width:100%;max-height:80px;border-radius:6px;margin-top:8px;object-fit:contain;
    }
  `
  document.head.appendChild(s)
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────
function injectToolbar() {
  const accent = getSetting('visual.accent_color', '#b8962e')
  const prim   = getSetting('visual.primary_bg',   '#0f1c2e')
  const sec    = getSetting('visual.secondary_bg',  '#1a2f4a')

  const bar = document.createElement('div')
  bar.id = 'em-bar'
  bar.innerHTML = `
    <span class="em-badge">✏️ MODO EDIÇÃO</span>
    <span class="em-hint">Clique em qualquer elemento destacado para editar</span>
    <div class="em-colors">
      <div class="em-ci"><input type="color" id="em-c-accent"  value="${accent}" title="Cor de destaque"><span>Destaque</span></div>
      <div class="em-ci"><input type="color" id="em-c-primary" value="${prim}"   title="Fundo principal"><span>Fundo 1</span></div>
      <div class="em-ci"><input type="color" id="em-c-sec"     value="${sec}"    title="Fundo secundário"><span>Fundo 2</span></div>
      <button class="em-exit" id="em-exit">✕ Sair da edição</button>
    </div>
  `
  document.body.prepend(bar)

  let t = null
  const applyColors = async () => {
    const a = document.getElementById('em-c-accent').value
    const p = document.getElementById('em-c-primary').value
    const s = document.getElementById('em-c-sec').value
    document.documentElement.style.setProperty('--accent', a)
    document.documentElement.style.setProperty('--primary-bg', p)
    document.documentElement.style.setProperty('--secondary-bg', s)
    await Promise.all([
      saveSetting('visual.accent_color', a),
      saveSetting('visual.primary_bg',   p),
      saveSetting('visual.secondary_bg', s),
    ])
  }
  ;['em-c-accent','em-c-primary','em-c-sec'].forEach(id =>
    document.getElementById(id).addEventListener('input', () => { clearTimeout(t); t = setTimeout(applyColors, 700) })
  )

  document.getElementById('em-exit').addEventListener('click', () => {
    const u = new URL(location.href)
    u.searchParams.delete('edit')
    location.href = u.toString()
  })
}

// ─── Mark editable elements ───────────────────────────────────────────────────
function markElements() {
  const map = [
    ['.logo-img',                             'image:company.logo_url',      'Logo'],
    ['.brand-name',                           'setting:company.name',        'Nome da empresa'],
    ['.brand-title',                          'setting:company.tagline',     'Slogan / CRECI'],
    ['.topbar-phone-bare',                    'setting:company.whatsapp',    'Número WhatsApp'],
    ['.social-icon-link[aria-label="Facebook"]',  'setting:social.facebook_url',  'Link Facebook'],
    ['.social-icon-link[aria-label="Instagram"]', 'setting:social.instagram_url', 'Link Instagram'],
    ['.hero',                                 'image:visual.hero_bg_url',    'Imagem de fundo (Hero)'],
    ['[data-i18n="hero.title"]',              'content:hero.title',          'Título do Hero'],
    ['.hero-content > p',                     'content:hero.subtitle',       'Subtítulo do Hero'],
    ['.hero-whatsapp-btn',                    'setting:hero.cta_text',       'Botão CTA'],
    ['.planta-title',                         'content:planta.title',        'Título — Seção Planta'],
    ['.planta-card-title',                    'content:planta.card_title',   'Card — Planta título'],
    ['.planta-card-desc',                     'content:planta.card_desc',    'Card — Planta descrição'],
    ['.selecao-title',                        'content:home.available_title','Título — Imóveis Disponíveis'],
    ['.selecao-sub',                          'content:home.available_sub',  'Subtítulo — Imóveis Disponíveis'],
    ['#institucional h2',                     'content:inst.title',          'Título — Institucional'],
    ['[data-i18n="inst.p1"]',                'content:inst.bio_p1',         'Bio — parágrafo 1'],
    ['[data-i18n="inst.p2"]',                'content:inst.bio_p2',         'Bio — parágrafo 2'],
    ['[data-i18n="inst.p3"]',                'content:inst.bio_p3',         'Bio — parágrafo 3'],
    ['#institucional .planta-cta, #institucional a[href*="wa.me"]', 'setting:company.whatsapp', 'WhatsApp CTA'],
    ['#institucional img',                    'image:company.photo_url',     'Foto do corretor'],
    ['.footer small',                         'content:footer.text',         'Rodapé'],
  ]

  map.forEach(([sel, attr, label]) => {
    document.querySelectorAll(sel).forEach(el => {
      // Avoid double-marking
      if (!el.dataset.editable) {
        el.dataset.editable = attr
        el.dataset.editLabel = label
      }
    })
  })
}

// ─── Click handler ────────────────────────────────────────────────────────────
function onDocClick(e) {
  // Click outside popup → close
  if (_popup && !_popup.contains(e.target) && !e.target.closest('[data-editable]')) {
    closePopup(); return
  }

  const el = e.target.closest('[data-editable]')
  if (!el) return

  e.preventDefault()
  e.stopPropagation()
  closePopup()

  document.querySelectorAll('[data-editable].em-on').forEach(x => x.classList.remove('em-on'))
  el.classList.add('em-on')
  _active = el
  openPopup(el)
}

// ─── Popup ────────────────────────────────────────────────────────────────────
function openPopup(el) {
  const attr  = el.dataset.editable
  const label = el.dataset.editLabel || attr
  const [type, key] = attr.split(':')

  const pop = document.createElement('div')
  pop.id = 'em-pop'
  _popup = pop

  pop.innerHTML = `<div class="ep-title">✏️ ${esc(label)}</div>${buildBody(type, key, el)}<div class="ep-row"><button class="ep-save" id="ep-save">Salvar</button><button class="ep-cancel" id="ep-cancel">Cancelar</button><span class="ep-msg" id="ep-msg"></span></div>`
  document.body.appendChild(pop)
  positionPopup(el, pop)
  bindPopup(pop, type, key, el)
}

function buildBody(type, key, el) {
  if (type === 'content') {
    const c = getContentCache()[key] || {}
    const pt = c.value_pt || el.innerText.trim()
    const en = c.value_en || ''
    const es = c.value_es || ''
    return `
      <div class="ep-tabs">
        <button class="ep-tab active" data-lang="pt">🇧🇷 PT</button>
        <button class="ep-tab" data-lang="en">🇺🇸 EN</button>
        <button class="ep-tab" data-lang="es">🇪🇸 ES</button>
      </div>
      <div id="epl-pt"><div class="ep-lbl">Português</div><textarea id="epv-pt" rows="3">${esc(pt)}</textarea></div>
      <div id="epl-en" style="display:none"><div class="ep-lbl">English</div><textarea id="epv-en" rows="3">${esc(en)}</textarea></div>
      <div id="epl-es" style="display:none"><div class="ep-lbl">Español</div><textarea id="epv-es" rows="3">${esc(es)}</textarea></div>`
  }

  if (type === 'setting') {
    const cur = getSetting(key, '')
    return `<div class="ep-lbl">Valor</div><input type="text" id="epv-setting" value="${escA(cur)}" placeholder="${escA(label)}">`
  }

  if (type === 'image') {
    const cur = getSetting(key, '')
    return `
      <div class="ep-lbl">URL da imagem</div>
      <input type="url" id="epv-image" value="${escA(cur)}" placeholder="https://... ou /logo.png">
      <div class="ep-upload">
        <input type="file" id="epv-file" accept="image/*" style="display:none">
        <button class="ep-ubtn" id="ep-upbtn">📁 Upload</button>
        <span style="font-size:11px;color:rgba(255,255,255,.35)">ou cole a URL acima</span>
      </div>
      ${cur ? `<img class="ep-preview" id="ep-prev" src="${escA(cur)}" alt="">` : '<img class="ep-preview" id="ep-prev" style="display:none" alt="">'}`
  }
  return ''
}

function bindPopup(pop, type, key, el) {
  // Tab switching (content)
  pop.querySelectorAll('.ep-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      pop.querySelectorAll('.ep-tab').forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      ;['pt','en','es'].forEach(l => {
        const d = pop.querySelector(`#epl-${l}`)
        if (d) d.style.display = l === tab.dataset.lang ? '' : 'none'
      })
    })
  })

  // Image URL → live preview
  if (type === 'image') {
    const inp  = pop.querySelector('#epv-image')
    const prev = pop.querySelector('#ep-prev')
    inp.addEventListener('input', () => { prev.src = inp.value; prev.style.display = inp.value ? '' : 'none' })

    const file = pop.querySelector('#epv-file')
    pop.querySelector('#ep-upbtn').addEventListener('click', () => file.click())
    file.addEventListener('change', async e => {
      const f = e.target.files[0]; if (!f) return
      setMsg(pop, 'Enviando…', '#fbbf24')
      const path = `public/site/${key.replace(/\./g,'_')}_${Date.now()}.${f.name.split('.').pop()}`
      const { error } = await supabase.storage.from('media').upload(path, f, { upsert: true })
      if (error) { setMsg(pop, 'Erro no upload', '#f87171'); return }
      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(path)
      inp.value = publicUrl
      prev.src = publicUrl; prev.style.display = ''
      setMsg(pop, 'Upload OK!', '#4ade80')
    })
  }

  // Save
  pop.querySelector('#ep-save').addEventListener('click', async () => {
    setMsg(pop, 'Salvando…', '#fbbf24')
    let ok = false

    if (type === 'content') {
      const pt = pop.querySelector('#epv-pt')?.value || ''
      const en = pop.querySelector('#epv-en')?.value || ''
      const es = pop.querySelector('#epv-es')?.value || ''
      ok = await saveContent(key, { pt, en, es })
      if (ok) el.innerHTML = pt
    } else if (type === 'setting') {
      const val = pop.querySelector('#epv-setting')?.value || ''
      ok = await saveSetting(key, val)
      if (ok) applySettingLive(key, val, el)
    } else if (type === 'image') {
      const val = pop.querySelector('#epv-image')?.value || ''
      ok = await saveSetting(key, val)
      if (ok) applyImageLive(key, val)
    }

    if (ok) { setMsg(pop, '✓ Salvo!', '#4ade80'); setTimeout(closePopup, 700) }
    else     { setMsg(pop, '✗ Erro', '#f87171') }
  })

  pop.querySelector('#ep-cancel').addEventListener('click', closePopup)
}

// ─── Live DOM update after save ───────────────────────────────────────────────
function applySettingLive(key, val, el) {
  if (key === 'company.name')    document.querySelectorAll('.brand-name').forEach(e => e.textContent = val)
  if (key === 'company.tagline') document.querySelectorAll('.brand-title').forEach(e => e.textContent = val)
  if (key === 'hero.cta_text')   el.textContent = val
  if (key === 'social.facebook_url') el.href = val
  if (key === 'social.instagram_url') el.href = val
  if (key === 'company.whatsapp') {
    const num = val.replace(/\D/g,'')
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      const sfx = a.href.replace(/https:\/\/wa\.me\/[^?]+/, '')
      a.href = `https://wa.me/${num}${sfx}`
    })
    document.querySelectorAll('.topbar-phone-bare').forEach(e => e.textContent = val)
  }
}

function applyImageLive(key, url) {
  if (key === 'company.logo_url')   document.querySelectorAll('.logo-img').forEach(e => e.src = url)
  if (key === 'visual.hero_bg_url') {
    const h = document.querySelector('.hero')
    if (h) h.style.backgroundImage = `url('${url}')`
  }
  if (key === 'company.photo_url') {
    const img = document.querySelector('#institucional img')
    if (img) img.src = url
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function positionPopup(el, pop) {
  const r = el.getBoundingClientRect()
  const W = window.innerWidth, H = window.innerHeight
  let left = r.left, top = r.bottom + 8
  if (left + 360 > W - 8) left = W - 368
  if (left < 8) left = 8
  if (top + 320 > H) top = Math.max(50, r.top - 8 - 320)
  pop.style.left = `${left}px`
  pop.style.top  = `${top}px`
}

function closePopup() {
  _popup?.remove(); _popup = null
  document.querySelectorAll('[data-editable].em-on').forEach(x => x.classList.remove('em-on'))
  _active = null
}

function setMsg(pop, txt, color) {
  const m = pop.querySelector('#ep-msg')
  if (m) { m.textContent = txt; m.style.color = color }
}

const esc  = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
const escA = s => String(s).replace(/"/g,'&quot;')
