// lib/settings.js
import { supabase } from './supabase.js'

export const GLOBAL_TENANT_ID = '00000000-0000-0000-0000-000000000000'

let _s = {}
let _c = {}
let _tenantId = GLOBAL_TENANT_ID

export function setSettingsTenant(tenantId) {
  _tenantId = tenantId || GLOBAL_TENANT_ID
  _s = {}; _c = {}
}

export const getSettingsTenantId = () => _tenantId

// ─── Load ────────────────────────────────────────────────────────────────────
export async function loadAllSettings() {
  const [sr, cr] = await Promise.all([
    supabase.from('settings').select('key,value').eq('tenant_id', _tenantId),
    supabase.from('site_content').select('*').eq('tenant_id', _tenantId)
  ])
  if (sr.data) sr.data.forEach(r => { _s[r.key] = r.value })
  if (cr.data) cr.data.forEach(r => { _c[r.key] = r })

  // Se não há site_content para este tenant, tenta GLOBAL como fallback
  if ((!cr.data || cr.data.length === 0) && _tenantId !== GLOBAL_TENANT_ID) {
    const [sg, cg] = await Promise.all([
      supabase.from('settings').select('key,value').eq('tenant_id', GLOBAL_TENANT_ID),
      supabase.from('site_content').select('*').eq('tenant_id', GLOBAL_TENANT_ID)
    ])
    if (sg.data) sg.data.forEach(r => { if (_s[r.key] === undefined) _s[r.key] = r.value })
    if (cg.data) cg.data.forEach(r => { if (!_c[r.key]) _c[r.key] = r })
  }
}

// ─── Getters ─────────────────────────────────────────────────────────────────
export const getSetting = (key, fallback = null) =>
  _s[key] !== undefined ? _s[key] : fallback

export const getContent = (key, lang = 'pt') => {
  const r = _c[key]
  if (!r) return null
  return r['value_' + lang] || r.value_pt || null
}

export const getSettingsCache = () => ({ ..._s })
export const getContentCache  = () => ({ ..._c })

// ─── Save: single setting ────────────────────────────────────────────────────
export async function saveSetting(key, value) {
  const { error } = await supabase
    .from('settings')
    .upsert({ key, value, tenant_id: _tenantId, updated_at: new Date().toISOString() }, { onConflict: 'key,tenant_id' })
  if (!error) _s[key] = value
  return !error
}

// ─── Save: batch settings ────────────────────────────────────────────────────
export async function saveMultipleSettings(pairs) {
  const now  = new Date().toISOString()
  const rows = pairs.map(([key, value]) => ({ key, value, tenant_id: _tenantId, updated_at: now }))
  const { error } = await supabase
    .from('settings')
    .upsert(rows, { onConflict: 'key,tenant_id' })
  if (!error) pairs.forEach(([k, v]) => { _s[k] = v })
  return !error
}

// ─── Save: site_content ───────────────────────────────────────────────────────
// Salva para o tenant atual E para GLOBAL, garantindo que o site público leia
export async function saveContent(key, { pt, en, es }) {
  const now = new Date().toISOString()
  const row = { key, value_pt: pt, value_en: en, value_es: es, tenant_id: _tenantId, updated_at: now }
  const { error } = await supabase
    .from('site_content')
    .upsert(row, { onConflict: 'key,tenant_id' })
  if (!error) _c[key] = row

  // Também salva em GLOBAL_TENANT_ID para o fallback do site público
  if (_tenantId !== GLOBAL_TENANT_ID) {
    await supabase.from('site_content').upsert(
      { key, value_pt: pt, value_en: en, value_es: es, tenant_id: GLOBAL_TENANT_ID, updated_at: now },
      { onConflict: 'key,tenant_id' }
    )
  }
  return !error
}

// ─── Save: integration ───────────────────────────────────────────────────────
export async function saveIntegration(key, value, enabled) {
  const { error } = await supabase
    .from('integrations')
    .upsert({ key, value, enabled, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  return !error
}

// ─── Apply: visual settings ───────────────────────────────────────────────────
export function applyVisualSettings() {
  const root   = document.documentElement
  const accent = getSetting('visual.accent_color', '#b8962e')
  const primBg = getSetting('visual.primary_bg',   '#0f1c2e')
  const secBg  = getSetting('visual.secondary_bg', '#1a2f4a')
  root.style.setProperty('--accent',       accent)
  root.style.setProperty('--primary-bg',   primBg)
  root.style.setProperty('--secondary-bg', secBg)

  const logoUrl = getSetting('company.logo_url', '/logo.png')
  document.querySelectorAll('.logo-img').forEach(el => { el.src = logoUrl })

  const favUrl = getSetting('company.favicon_url', '/favicon.ico')
  const favEl  = document.querySelector('link[rel="shortcut icon"]')
  if (favEl) favEl.href = favUrl

  const heroBg = getSetting('visual.hero_bg_url', '')
  if (heroBg) {
    const heroEl = document.querySelector('.hero, .hero-v2')
    if (heroEl) heroEl.style.backgroundImage = "url('" + heroBg + "')"
  }
}

// ─── Apply: conteúdo dinâmico no site público ─────────────────────────────────
export function applyDynamicContent(lang) {
  lang = lang || 'pt'
  const get = key => getContent(key, lang) || ''

  // Hero
  const heroTitle = document.querySelector('[data-i18n="hero.title"]')
  if (heroTitle && get('hero.title')) heroTitle.innerHTML = get('hero.title')

  // Subtítulo do hero — suporta tanto .hero-content > p quanto [data-i18n="hero.subtitle"]
  const heroSub = document.querySelector('[data-i18n="hero.subtitle"]') ||
                  document.querySelector('.hero-content > p')
  if (heroSub && get('hero.subtitle')) heroSub.innerHTML = get('hero.subtitle')

  // Rodapé
  const footerEl = document.querySelector('.footer small, footer small')
  if (footerEl && get('footer.text')) footerEl.innerHTML = get('footer.text')

  // Seção "Sobre" — parágrafos
  const p1 = document.querySelector('[data-i18n="inst.p1"]')
  const p2 = document.querySelector('[data-i18n="inst.p2"]')
  const p3 = document.querySelector('[data-i18n="inst.p3"]')
  if (p1 && get('inst.bio_p1')) p1.innerHTML = get('inst.bio_p1')
  if (p2 && get('inst.bio_p2')) p2.innerHTML = get('inst.bio_p2')
  if (p3 && get('inst.bio_p3')) p3.innerHTML = get('inst.bio_p3')

  // Stats — suporta ambos os formatos de data-i18n
  const stat1n = document.querySelector('[data-i18n="inst.stat1_num"]')
  const stat2n = document.querySelector('[data-i18n="inst.stat2_num"]') ||
                 document.querySelector('[data-i18n-num="inst.stat2num"]')
  const stat3n = document.querySelector('[data-i18n="inst.stat3_num"]')
  const stat1l = document.querySelector('[data-i18n="inst.stat1_label"]') ||
                 document.querySelector('[data-i18n="inst.stat1"]')
  const stat2l = document.querySelector('[data-i18n="inst.stat2_label"]') ||
                 document.querySelector('[data-i18n="inst.stat2"]')
  const stat3l = document.querySelector('[data-i18n="inst.stat3_label"]') ||
                 document.querySelector('[data-i18n="inst.stat3"]')
  if (stat1n && get('inst.stat1_num'))   stat1n.innerHTML = get('inst.stat1_num')
  if (stat2n && get('inst.stat2_num'))   stat2n.innerHTML = get('inst.stat2_num')
  if (stat3n && get('inst.stat3_num'))   stat3n.innerHTML = get('inst.stat3_num')
  if (stat1l && get('inst.stat1_label')) stat1l.innerHTML = get('inst.stat1_label')
  if (stat2l && get('inst.stat2_label')) stat2l.innerHTML = get('inst.stat2_label')
  if (stat3l && get('inst.stat3_label')) stat3l.innerHTML = get('inst.stat3_label')

  // SEO
  const seoTitle = getContent('seo.title_pt', lang)
  if (seoTitle) document.title = seoTitle
  const seoDesc = getContent('seo.description_pt', lang)
  if (seoDesc) {
    const m = document.querySelector('meta[name="description"]')
    if (m) m.content = seoDesc
  }
}

// ─── Apply: WhatsApp links ────────────────────────────────────────────────────
export function applyWhatsAppLinks(number) {
  if (!number) return
  const url = 'https://wa.me/' + number
  document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
    const href = el.getAttribute('href')
    if (href) {
      const suffix = href.replace(/^https:\/\/wa\.me\/[^?]+/, '')
      el.href = url + suffix
    }
  })
}
