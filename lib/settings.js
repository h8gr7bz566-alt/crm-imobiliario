// lib/settings.js — Módulo central de configurações administrativas
import { supabase } from './supabase.js'

let _s = {}   // cache: settings (key → value jsonb)
let _c = {}   // cache: site_content (key → { value_pt, value_en, value_es })

// ─── Load ────────────────────────────────────────────────────────────────────
export async function loadAllSettings() {
  const [sr, cr] = await Promise.all([
    supabase.from('settings').select('key,value'),
    supabase.from('site_content').select('*')
  ])
  if (sr.data) sr.data.forEach(r => { _s[r.key] = r.value })
  if (cr.data) cr.data.forEach(r => { _c[r.key] = r })
}

// ─── Getters ─────────────────────────────────────────────────────────────────
export const getSetting = (key, fallback = null) =>
  _s[key] !== undefined ? _s[key] : fallback

export const getContent = (key, lang = 'pt') => {
  const r = _c[key]
  if (!r) return null
  return r[`value_${lang}`] ?? r.value_pt ?? null
}

export const getSettingsCache = () => ({ ..._s })
export const getContentCache  = () => ({ ..._c })

// ─── Save: single setting ────────────────────────────────────────────────────
export async function saveSetting(key, value) {
  const { error } = await supabase
    .from('settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  if (!error) _s[key] = value
  return !error
}

// ─── Save: batch settings ────────────────────────────────────────────────────
export async function saveMultipleSettings(pairs) {
  const now  = new Date().toISOString()
  const rows = pairs.map(([key, value]) => ({ key, value, updated_at: now }))
  const { error } = await supabase
    .from('settings')
    .upsert(rows, { onConflict: 'key' })
  if (!error) pairs.forEach(([k, v]) => { _s[k] = v })
  return !error
}

// ─── Save: site_content (multilíngue) ────────────────────────────────────────
export async function saveContent(key, { pt, en, es }) {
  const row = { key, value_pt: pt, value_en: en, value_es: es, updated_at: new Date().toISOString() }
  const { error } = await supabase
    .from('site_content')
    .upsert(row, { onConflict: 'key' })
  if (!error) _c[key] = row
  return !error
}

// ─── Save: integration ───────────────────────────────────────────────────────
export async function saveIntegration(key, value, enabled) {
  const { error } = await supabase
    .from('integrations')
    .upsert({ key, value, enabled, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  return !error
}

// ─── Apply: injeta variáveis CSS + atualiza elementos visuais ────────────────
export function applyVisualSettings() {
  const root   = document.documentElement
  const accent = getSetting('visual.accent_color', '#b8962e')
  const primBg = getSetting('visual.primary_bg',   '#0f1c2e')
  const secBg  = getSetting('visual.secondary_bg', '#1a2f4a')

  root.style.setProperty('--accent',       accent)
  root.style.setProperty('--primary-bg',   primBg)
  root.style.setProperty('--secondary-bg', secBg)

  // Logo dinâmico
  const logoUrl = getSetting('company.logo_url', '/logo.png')
  document.querySelectorAll('.logo-img').forEach(el => { el.src = logoUrl })

  // Favicon dinâmico
  const favUrl = getSetting('company.favicon_url', '/favicon.ico')
  const favEl  = document.querySelector('link[rel="shortcut icon"]')
  if (favEl) favEl.href = favUrl

  // Hero background (se definido)
  const heroBg = getSetting('visual.hero_bg_url', '')
  if (heroBg) {
    const heroEl = document.querySelector('.hero')
    if (heroEl) heroEl.style.backgroundImage = `url('${heroBg}')`
  }
}

// ─── Apply: conteúdo dinâmico no site público ─────────────────────────────────
export function applyDynamicContent(lang = 'pt') {
  const get = key => getContent(key, lang) ?? ''

  const heroTitle = document.querySelector('[data-i18n="hero.title"]')
  if (heroTitle && get('hero.title')) heroTitle.innerHTML = get('hero.title')

  const heroSub = document.querySelector('.hero-content > p')
  if (heroSub && get('hero.subtitle')) heroSub.innerHTML = get('hero.subtitle')

  const footerEl = document.querySelector('.footer small')
  if (footerEl && get('footer.text')) footerEl.innerHTML = get('footer.text')

  // Textos institucionais (aplica innerHTML para preservar <strong>)
  const p1 = document.querySelector('[data-i18n="inst.p1"]')
  const p2 = document.querySelector('[data-i18n="inst.p2"]')
  const p3 = document.querySelector('[data-i18n="inst.p3"]')
  if (p1 && get('inst.bio_p1')) p1.innerHTML = get('inst.bio_p1')
  if (p2 && get('inst.bio_p2')) p2.innerHTML = get('inst.bio_p2')
  if (p3 && get('inst.bio_p3')) p3.innerHTML = get('inst.bio_p3')

  // Stats institucionais
  const stat1n = document.querySelector('[data-i18n-num="inst.stat2num"]')
  const stat1l = document.querySelector('[data-i18n="inst.stat1"]')
  const stat2l = document.querySelector('[data-i18n="inst.stat2"]')
  const stat3l = document.querySelector('[data-i18n="inst.stat3"]')
  if (stat1n && get('inst.stat2_num'))   stat1n.innerHTML = get('inst.stat2_num')
  if (stat1l && get('inst.stat1_label')) stat1l.innerHTML = get('inst.stat1_label')
  if (stat2l && get('inst.stat2_label')) stat2l.innerHTML = get('inst.stat2_label')
  if (stat3l && get('inst.stat3_label')) stat3l.innerHTML = get('inst.stat3_label')

  // SEO
  const seoTitle = getContent('seo.title_pt', lang)
  if (seoTitle && document.title) document.title = seoTitle
  const seoDesc = getContent('seo.description_pt', lang)
  if (seoDesc) {
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.content = seoDesc
  }
}

// ─── Apply: WhatsApp links dinâmicos ─────────────────────────────────────────
export function applyWhatsAppLinks(number) {
  if (!number) return
  const url = `https://wa.me/${number}`
  document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
    const href = el.getAttribute('href')
    if (href) {
      // Preserva texto após wa.me/XXXXXX (ex: ?text=...)
      const suffix = href.replace(/^https:\/\/wa\.me\/[^?]+/, '')
      el.href = url + suffix
    }
  })
}
