// script.js — Supabase Integration
import { supabase } from './lib/supabase.js'
import {
  loadAllSettings, getSetting, getContent,
  saveMultipleSettings, saveSetting, saveContent, saveIntegration,
  applyVisualSettings, applyDynamicContent, applyWhatsAppLinks,
  setSettingsTenant, getSettingsTenantId, GLOBAL_TENANT_ID
} from './lib/settings.js'

const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

let WHATSAPP_NUMBER = '5547999701743'
let WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}`

const SAMPLE_URLS = [
  'https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop'
]

// ─── Formatação de preço com suporte a moeda ─────────────────────────────
const BRL_TO_USD = 5.70 // taxa fixa aproximada

function formatPrice(rawPrice, lang) {
  if (!rawPrice) return '—'
  const str = String(rawPrice).trim()
  // Extrai número: suporta formato BR (1.400.000,00) e genérico
  let num
  if (str.includes(',') && str.lastIndexOf(',') > str.lastIndexOf('.')) {
    // Formato BR: ponto = milhar, vírgula = decimal
    num = parseFloat(str.replace(/\./g, '').replace(',', '.'))
  } else {
    num = parseFloat(str.replace(/[^\d.]/g, ''))
  }
  if (isNaN(num) || num === 0) return str

  if (lang === 'en') {
    const usd = num / BRL_TO_USD
    return '$ ' + usd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }
  // PT e ES: sempre Real brasileiro
  return 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

// Expõe lang atual para uso nos templates (atualizado pelo setLang() do index.html)
window.currentLang = window.currentLang || 'pt'

// Cache em memória — necessário para o carousel funcionar sem re-fetch
let cachedProperties = []
let currentProfile    = null
let cachedLocations   = []

// Flag: captura PASSWORD_RECOVERY antes do DOMContentLoaded
// O Supabase troca o código PKCE durante a inicialização, antes do DOM estar pronto
let pendingPasswordRecovery = false
supabase.auth.onAuthStateChange((event) => {
  if (event === 'PASSWORD_RECOVERY') {
    pendingPasswordRecovery = true
  }
})

// ─── Cache helpers (localStorage com TTL) ────────────────────────────────
function cacheSet(key, value, ttlMs) {
  try { localStorage.setItem(key, JSON.stringify({ v: value, exp: Date.now() + ttlMs })) } catch (_) {}
}
function cacheGet(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const obj = JSON.parse(raw)
    if (Date.now() > obj.exp) { localStorage.removeItem(key); return null }
    return obj.v
  } catch (_) { return null }
}

// ─── Supabase: buscar imóveis publicados (listagem pública) ───────────────
async function getPublishedProperties({ background = false } = {}) {
  const rawHost = window.location.hostname
  const isLocal = rawHost === 'localhost' || rawHost === '127.0.0.1'

  if (isLocal) {
    const { data, error } = await supabase
      .from('properties').select('*').eq('published', true)
      .order('created_at', { ascending: false })
    if (error) console.error('Supabase select error:', error)
    return data || []
  }

  // ── Resolve tenant ──────────────────────────────────────────────────────
  const tenantCacheKey = `imobi_tenant_${rawHost.replace(/^www\./, '')}`
  let tenantId = getSettingsTenantId()

  if (!tenantId || tenantId === GLOBAL_TENANT_ID) {
    // Tenta cache local antes de ir ao servidor
    const cached = cacheGet(tenantCacheKey)
    if (cached) {
      tenantId = cached
      setSettingsTenant(tenantId)
    } else {
      const base = rawHost.replace(/^www\./, '')
      for (const d of [base, 'www.' + base]) {
        const { data } = await supabase.from('tenants').select('id').eq('domain', d).maybeSingle()
        if (data?.id) { tenantId = data.id; setSettingsTenant(tenantId); break }
      }
      if (tenantId && tenantId !== GLOBAL_TENANT_ID) {
        cacheSet(tenantCacheKey, tenantId, 24 * 60 * 60 * 1000) // 24h
      }
    }
  }

  if (!tenantId || tenantId === GLOBAL_TENANT_ID) {
    console.warn('[ImobiCRM] Tenant não encontrado para domínio:', rawHost)
    return []
  }

  // ── Propriedades com stale-while-revalidate ─────────────────────────────
  const propsCacheKey = `imobi_props_${tenantId}`
  const PROPS_TTL = 5 * 60 * 1000 // 5 minutos

  // Em modo normal: retorna cache se fresco (< 5 min) e dispara refresh em fundo
  if (!background) {
    const cached = cacheGet(propsCacheKey)
    if (cached) {
      // Agenda refresh silencioso em 100ms para não bloquear a renderização
      setTimeout(() => getPublishedProperties({ background: true }), 100)
      return cached
    }
  }

  // Busca no servidor
  const { data, error } = await supabase
    .from('properties').select('*')
    .eq('published', true)
    .eq('tenant_id', tenantId)
    .order('created_at', { ascending: false })
  if (error) { console.error('Supabase select error:', error); return cacheGet(propsCacheKey) || [] }

  const result = data || []
  cacheSet(propsCacheKey, result, PROPS_TTL)

  // Se foi refresh em fundo e o conteúdo mudou, re-renderiza silenciosamente
  if (background && typeof renderPublic === 'function') {
    renderPublic().catch(() => {})
  }

  return result
}

// ─── Supabase: buscar todos os imóveis (painel admin) ────────────────────
async function getAllProperties() {
  let query = supabase.from('properties').select('*').order('created_at', { ascending: false })

  if (currentProfile?.role === 'super_admin') {
    // Super admin vê todos os seus imóveis (sem filtro de tenant)
  } else if (currentProfile?.tenant_id) {
    query = query.eq('tenant_id', currentProfile.tenant_id)
  } else {
    query = query.or('tenant_id.is.null,tenant_id.eq.00000000-0000-0000-0000-000000000000')
  }

  const { data, error } = await query
  if (error) { console.error('Supabase select error:', error); return [] }
  cachedProperties = data || []
  autoAssignReferences()
  autoApplyWatermarks()
  return cachedProperties
}

// ─── Supabase: salvar imóvel (INSERT ou UPDATE) ───────────────────────────
async function saveProperty(prop) {
  if (prop.id) {
    const { id, created_at, ...rest } = prop
    const { error } = await supabase.from('properties').update(rest).eq('id', id)
    if (error) throw error
    const idx = cachedProperties.findIndex(p => p.id === id)
    if (idx >= 0) cachedProperties[idx] = { ...cachedProperties[idx], ...rest }
  } else {
    // Gera referência única baseada em timestamp (evita conflito entre tenants)
    if (!prop.reference) {
      prop.reference = 'IO-' + Date.now().toString(36).toUpperCase().slice(-5)
    }
    const { data, error } = await supabase.from('properties').insert(prop).select()
    if (error) throw error
    if (data?.[0]) cachedProperties.unshift(data[0])
  }
}

// ─── Supabase: deletar imóvel ─────────────────────────────────────────────
async function deleteProperty(id) {
  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) throw error
  cachedProperties = cachedProperties.filter(p => p.id !== id)
}

// ─── Auth admin (Supabase Auth) ───────────────────────────────────────────
async function loginAdmin(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  return !error
}

// ─── Compressão → Blob (sem passar por base64) ───────────────────────────
function compressToBlob(file, maxW = 1200, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      let w = img.width, h = img.height
      if (w > maxW) { h = Math.round(h * maxW / w); w = maxW }
      canvas.width = w; canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)

      // ── Marca d'água com logo ──────────────────────────────────────────
      const logo = new Image()
      logo.crossOrigin = 'anonymous'
      logo.onload = () => {
        // Tamanho da marca d'água: 18% da largura da imagem
        const wmW = Math.round(w * 0.18)
        const wmH = Math.round(logo.naturalHeight * wmW / logo.naturalWidth)
        const margin = Math.round(w * 0.02)
        const x = w - wmW - margin          // canto inferior direito
        const y = h - wmH - margin

        ctx.globalAlpha = 0.45              // 45% opacidade
        ctx.drawImage(logo, x, y, wmW, wmH)
        ctx.globalAlpha = 1.0

        canvas.toBlob(
          blob => blob ? resolve(blob) : reject(new Error('Canvas toBlob falhou')),
          'image/jpeg', quality
        )
      }
      logo.onerror = () => {
        // Se logo não carregar, salva sem marca d'água
        canvas.toBlob(
          blob => blob ? resolve(blob) : reject(new Error('Canvas toBlob falhou')),
          'image/jpeg', quality
        )
      }
      logo.src = '/logo.png'
    }
    img.onerror = reject
    img.src = url
  })
}

// ─── Upload para Supabase Storage (bucket "imoveis") ─────────────────────
async function uploadToStorage(file) {
  const blob = await compressToBlob(file)
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`

  const { error } = await supabase.storage
    .from('imoveis')
    .upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('imoveis')
    .getPublicUrl(path)

  return publicUrl
}

async function uploadMultiple(files, onProgress) {
  const list = Array.from(files).filter(f => f.size > 0)
  const urls = []
  for (let i = 0; i < list.length; i++) {
    if (onProgress) onProgress(i + 1, list.length)
    urls.push(await uploadToStorage(list[i]))
  }
  return urls
}

// ─── Render listagem pública ──────────────────────────────────────────────


// ─── Preserva estado dos carrosséis através de re-renders ──────────────────
function snapshotCarouselState(container) {
  if (!container) return {}
  const state = {}
  container.querySelectorAll('.icard-img-wrap').forEach(w => {
    const pid = w.dataset.pid
    const idx = w.dataset.idx
    if (pid && idx && idx !== '0') state[pid] = parseInt(idx, 10)
  })
  return state
}
function restoreCarouselState(container, state) {
  if (!container || !state) return
  Object.entries(state).forEach(([pid, idx]) => {
    const w = container.querySelector('.icard-img-wrap[data-pid="' + pid + '"]')
    if (!w) return
    const total = parseInt(w.dataset.total, 10)
    if (!total || total < 2) return
    const i = idx % total
    w.dataset.idx = i
    try {
      const images = JSON.parse(decodeURIComponent(w.dataset.images || '[]'))
      if (images[i]) {
        const fg = w.querySelector('.carousel-img')
        const bg = w.querySelector('.carousel-img-bg')
        if (fg) fg.src = images[i]
        if (bg) bg.src = images[i]
      }
    } catch(e) {}
    const dots = w.querySelectorAll('.icard-dot')
    if (dots.length) {
      const activeIdx = i % dots.length
      dots.forEach((d, j) => d.classList.toggle('active', j === activeIdx))
    }
  })
}

// ─── Renderiza seções de coleção na homepage ─────────────────────────────────
function renderCollections(all) {
  const wrap = document.getElementById('collections-wrap')
  if (!wrap) return

  // Filtros de coleção — usa campo `collection` se existir, ou heurísticas
  const byCollection = (key) => all.filter(p => {
    // Tenta JSON array primeiro (campo collection como ["frente-mar","decorados"])
    if (p.collection) {
      try {
        const cols = JSON.parse(p.collection)
        if (Array.isArray(cols)) return cols.includes(key)
      } catch(e) {}
      // Fallback: string simples
      if (p.collection === key) return true
    }
    // Fallback heurístico para imóveis sem collection preenchido
    const t = ((p.title || '') + ' ' + (p.description || '')).toLowerCase()
    if (key === 'frente-mar')       return t.includes('frente mar') || t.includes('frente ao mar')
    if (key === 'decorados')        return t.includes('decorad') || t.includes('mobiliado')
    if (key === 'casas-condominio') return (p.condominium || '').length > 2
    return false
  })

  function buildSection(sectionTitle, color, props, verTodosUrl) {
    if (!props.length) return ''
    const cards = props.slice(0, 8).map(p => buildPropertyCard(p)).join('')
    return `
      <div class="colecao-section">
        <div class="colecao-header">
          <h2 class="colecao-title" style="color:${color}">${escapeHTML(sectionTitle)}</h2>
          <a href="${escapeHTML(verTodosUrl)}" class="colecao-ver-todos">Ver todos</a>
        </div>
        <div class="imoveis-grid colecao-grid" data-collection="${sectionTitle}">${cards}</div>
      </div>`
  }

  const frenteMar   = byCollection('frente-mar')
  const decorados   = byCollection('decorados')
  const casas       = byCollection('casas-condominio')

  const _carouselState = snapshotCarouselState(wrap)
  wrap.innerHTML = [
    buildSection('Imóveis ' + (document.title.split('|')[0].trim() || 'Isaac Omar').split(' ').pop(), '#8B4513', all, 'imoveis.html'),
    frenteMar.length  ? buildSection('Coleção FRENTE MAR',          '#8B4513', frenteMar,  'imoveis.html?collection=frente-mar') : '',
    decorados.length  ? buildSection('Coleção DECORADOS',            '#8B4513', decorados,  'imoveis.html?collection=decorados')  : '',
    casas.length      ? buildSection('Coleção CASAS EM CONDOMÍNIO',  '#8B4513', casas,       'imoveis.html?collection=casas-condominio') : '',
  ].join('')
  restoreCarouselState(wrap, _carouselState)

  // Delegação de eventos para os novos cards (carousel + links)
  if (!wrap._carouselDelegated) {
    wrap._carouselDelegated = true
    wrap.addEventListener('click', carouselHandler)
  }
}

async function renderPublic() {
  const vendasCarousel = document.getElementById('vendas-carousel')   // homepage
  const gridContainer  = document.getElementById('properties')         // imoveis.html
  if (!vendasCarousel && !gridContainer) return

  const all = await getPublishedProperties()
  cachedProperties = all

  // Renderiza Seleção Isaac Omar (só na primeira chamada)
  if (document.getElementById('selecao-carousel')?.innerHTML === '') renderSelecao(all)

  const city         = document.getElementById('city-filter')?.value || ''
  const neighborhood = document.getElementById('neighborhood-filter')?.value || ''
  const bedrooms     = document.getElementById('bedrooms-filter')?.value || ''
  const parking      = document.getElementById('parking-filter')?.value || ''
  const construction = document.getElementById('construction-filter')?.value || ''
  const { min: priceMin, max: priceMax } = getPriceRange()

  const filtered = all.filter(p => {
    if (city && p.city !== city) return false
    if (neighborhood && p.neighborhood !== neighborhood) return false
    if (bedrooms) {
      if (bedrooms === '4+' && Number(p.bedrooms) < 4) return false
      if (bedrooms !== '4+' && Number(p.bedrooms) !== Number(bedrooms)) return false
    }
    if (parking) {
      if (parking === '4+' && Number(p.parking) < 4) return false
      if (parking !== '4+' && Number(p.parking) !== Number(parking)) return false
    }
    if (construction && p.construction_status !== construction) return false
    const priceStr = String(p.price || '').replace(/,\d{0,2}$/, '').replace(/[^0-9]/g, '')
    const price = parseInt(priceStr, 10) || 0
    if (price < priceMin) return false
    if (priceMax !== Infinity && price > priceMax) return false
    return true
  })

  // ── Homepage: seções de coleção ──────────────────────────────────────
  if (vendasCarousel) {
    // Renderiza coleções curadas + seção geral
    renderCollections(all)
    return
  }

  // ── Modo grid (imoveis.html) ──────────────────────────────────────────
  if (!filtered.length) {
    gridContainer.innerHTML = '<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>'
    return
  }

  const _gridCarouselState = snapshotCarouselState(gridContainer)
  gridContainer.innerHTML = filtered.map(p => buildPropertyCard(p)).join('')
  restoreCarouselState(gridContainer, _gridCarouselState)

  // Event delegation no container — funciona mesmo após re-render
  const grid = document.getElementById('properties')
  if (grid && !grid._carouselDelegated) {
    grid._carouselDelegated = true
    grid.addEventListener('click', carouselHandler)
  }
}

// ─── Seleção Isaac Omar — carousel curado ────────────────────────────────
function renderSelecao(props) {
  const carousel = document.getElementById('selecao-carousel')
  if (!carousel) return
  // Mostra os 6 mais recentes publicados
  const featured = props.slice(0, 6)
  if (!featured.length) {
    carousel.closest('.selecao-section')?.classList.add('hidden')
    return
  }
  // Usa o mesmo card padrão (buildPropertyCard) para consistência visual
  carousel.innerHTML = featured.map(p => buildPropertyCard(p)).join('')

  // Delegação de eventos para os carrosséis dos cards (setas + estado)
  if (!carousel._carouselDelegated) {
    carousel._carouselDelegated = true
    carousel.addEventListener('click', carouselHandler)
  }

  // Navegação horizontal do container
  const wrap = carousel.closest('.selecao-carousel-wrap')
  wrap?.querySelector('.selecao-prev')?.addEventListener('click', () => {
    carousel.scrollBy({ left: -340, behavior: 'smooth' })
  })
  wrap?.querySelector('.selecao-next')?.addEventListener('click', () => {
    carousel.scrollBy({ left: 340, behavior: 'smooth' })
  })
}

// ─── Filtro rápido por status (botões da seção Imóveis na Planta) ─────────
window.filterByStatus = function(status) {
  const sel = document.getElementById('construction-filter')
  if (sel) { sel.value = status }
  document.getElementById('vendas-section')?.scrollIntoView({ behavior: 'smooth' })
  renderPublic()
}

function carouselHandler(e) {
  // Só age se o clique/toque foi num botão de carousel
  const btn = e.target.closest('.carousel-btn')
  if (!btn) return
  // Agora sim: impede navegação e bubbling
  e.preventDefault()
  e.stopPropagation()
  const wrap = btn.closest('.icard-img-wrap')
  if (!wrap) return
  const total = parseInt(wrap.dataset.total, 10)
  if (!total || total < 2) return
  let idx = parseInt(wrap.dataset.idx, 10) || 0
  const dir = btn.classList.contains('carousel-next') ? 1 : -1
  idx = (idx + dir + total) % total
  wrap.dataset.idx = idx
  // Lê imagens do atributo data-images (gravado no render)
  try {
    const images = JSON.parse(decodeURIComponent(wrap.dataset.images || '[]'))
    if (images.length && images[idx]) {
      const newSrc = images[idx]
      const fg = wrap.querySelector('.carousel-img')
      const bg = wrap.querySelector('.carousel-img-bg')
      if (fg) fg.src = newSrc
      if (bg) bg.src = newSrc
    }
  } catch(err) {
    // fallback: busca em cachedProperties
    const prop = cachedProperties.find(x => String(x.id) === String(wrap.dataset.pid))
    const imgs = prop?.images?.length ? prop.images : SAMPLE_URLS
    if (imgs[idx]) {
      const fg = wrap.querySelector('.carousel-img')
      const bg = wrap.querySelector('.carousel-img-bg')
      if (fg) fg.src = imgs[idx]
      if (bg) bg.src = imgs[idx]
    }
  }
  // Atualiza dots indicadores
  const dots = wrap.querySelectorAll('.icard-dot')
  if (dots.length) {
    const activeIdx = idx % dots.length
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIdx))
  }
}

// ─── Faixa de Preço (select) ──────────────────────────────────────────────
function getPriceRange() {
  const val = document.getElementById('price-range')?.value || ''
  if (!val) return { min: 0, max: Infinity }
  const [minStr, maxStr] = val.split('-')
  return {
    min: parseInt(minStr, 10) || 0,
    max: maxStr ? parseInt(maxStr, 10) : Infinity,
  }
}

function attachPriceSlider() {
  const sel = document.getElementById('price-range')
  if (!sel) return
  sel.addEventListener('change', () => renderPublic())
}

// ─── Filtros ──────────────────────────────────────────────────────────────
function attachFilters() {
  const cityFilter         = document.getElementById('city-filter')
  const neighborhoodFilter = document.getElementById('neighborhood-filter')
  if (cityFilter && neighborhoodFilter) {
    const cities = getCities()
    cityFilter.innerHTML = '<option value="">Todas as cidades</option>' +
      cities.map(c => `<option value="${c.name}">${escapeHTML(c.name)}</option>`).join('')
    cityFilter.addEventListener('change', () => {
      const sel = getCities().find(c => c.name === cityFilter.value)
      const neighborhoods = sel ? getNeighborhoods(sel.id) : []
      neighborhoodFilter.innerHTML = '<option value="">Todos os bairros</option>' +
        neighborhoods.map(n => `<option value="${n.name}">${escapeHTML(n.name)}</option>`).join('')
      renderPublic()
    })
  }
  document.querySelectorAll('[id$="-filter"]').forEach(el => {
    el.addEventListener('change', renderPublic)
  })
}

// ─── Render painel admin ──────────────────────────────────────────────────
function renderAdminTable(props) {
  const tbody = document.getElementById('admin-properties')
  if (!tbody) return
  if (!props.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-row">Nenhum imóvel encontrado.</td></tr>'
    return
  }
  tbody.innerHTML = props.map(p => {
    const img   = p.cover_image || p.images?.[0] || SAMPLE_URLS[0]
    const addr  = [p.rua, p.numero ? `nº ${p.numero}` : '', p.neighborhood, p.city].filter(Boolean).join(', ') || '—'
    const badge = p.published === true
      ? '<span class="badge badge-green">● Publicado</span>'
      : '<span class="badge badge-gray">○ Rascunho</span>'
    return `<tr data-id="${p.id}">
      <td style="position:relative;width:80px;">
        <img src="${img}" class="table-thumb" alt="">
        ${p.reference ? `<span class="ref-badge">${escapeHTML(p.reference)}</span>` : ''}
      </td>
      <td>
        <div class="cell-title">${escapeHTML(p.title)}</div>
        <div class="cell-sub">#${p.id}${p.condominium ? ' · ' + escapeHTML(p.condominium) : ''}</div>
      </td>
      <td class="cell-addr col-addr">${escapeHTML(addr)}</td>
      <td class="cell-price">${escapeHTML(formatPrice(p.price, 'pt'))}</td>
      <td>${p.bedrooms ?? '—'}</td>
      <td>${p.parking ?? '—'}</td>
      <td>${badge}</td>
      <td>
        <div class="action-btns">
          ${(currentProfile?.role === 'admin' || currentProfile?.role === 'super_admin') ? `<button data-id="${p.id}" class="icon-btn edit-btn" title="Editar">✏️</button>` : ''}
          ${(currentProfile?.role === 'admin' || currentProfile?.role === 'super_admin') ? `<button data-id="${p.id}" class="icon-btn del-btn" title="Remover">🗑️</button>` : ''}
        </div>
      </td>
    </tr>`
  }).join('')
}

function populateFilterCitySelect() {
  const sel = document.getElementById('f-city')
  if (!sel) return
  const cities = getCities()
  const cur = sel.value
  sel.innerHTML = '<option value="">Todas</option>' +
    cities.map(c => `<option value="${c.name}">${escapeHTML(c.name)}</option>`).join('')
  if (cur) sel.value = cur
}

function getAdminFilterValues() {
  return {
    ref:          (document.getElementById('f-ref')?.value || '').trim().toLowerCase(),
    title:        (document.getElementById('f-title')?.value || '').trim().toLowerCase(),
    type:         document.getElementById('f-type')?.value || '',
    city:         document.getElementById('f-city')?.value || '',
    neighborhood: document.getElementById('f-neighborhood')?.value || '',
    condominium:  (document.getElementById('f-condominium')?.value || '').trim().toLowerCase(),
    priceMin:     parseFloat(document.getElementById('f-price-min')?.value) || 0,
    priceMax:     parseFloat(document.getElementById('f-price-max')?.value) || Infinity,
    areaMin:      parseFloat(document.getElementById('f-area-min')?.value) || 0,
    areaMax:      parseFloat(document.getElementById('f-area-max')?.value) || Infinity,
    construction: document.getElementById('f-construction')?.value || '',
    published:    document.getElementById('f-published')?.value || '',
    bedrooms:     document.querySelector('#f-bedrooms .filter-btn.active')?.dataset.val || '',
    suites:       document.querySelector('#f-suites .filter-btn.active')?.dataset.val || '',
    parking:      document.querySelector('#f-parking .filter-btn.active')?.dataset.val || '',
  }
}

function applyAdminFilters(props) {
  const f = getAdminFilterValues()
  const hasFilter = Object.values(f).some(v => v !== '' && v !== 0 && v !== Infinity)
  if (!hasFilter) return props
  return props.filter(p => {
    if (f.ref   && !(p.reference || '').toLowerCase().includes(f.ref)) return false
    if (f.title && !(p.title || '').toLowerCase().includes(f.title)) return false
    if (f.type  && !(p.title || '').toLowerCase().includes(f.type.toLowerCase())) return false
    if (f.city         && p.city         !== f.city)         return false
    if (f.neighborhood && p.neighborhood !== f.neighborhood) return false
    if (f.condominium  && !(p.condominium || '').toLowerCase().includes(f.condominium)) return false
    const priceNum = parseInt(String(p.price || '').replace(/[^0-9]/g, ''), 10) || 0
    if (f.priceMin > 0        && priceNum < f.priceMin) return false
    if (f.priceMax < Infinity && priceNum > f.priceMax) return false
    const area = parseFloat(p.area) || 0
    if (f.areaMin > 0        && area < f.areaMin) return false
    if (f.areaMax < Infinity && area > f.areaMax) return false
    if (f.construction && p.construction_status !== f.construction) return false
    if (f.published !== '' && String(p.published) !== f.published) return false
    if (f.bedrooms) {
      if (f.bedrooms === '5+' && Number(p.bedrooms) < 5) return false
      if (f.bedrooms !== '5+' && Number(p.bedrooms) !== Number(f.bedrooms)) return false
    }
    if (f.suites) {
      if (f.suites === '5+' && Number(p.suites) < 5) return false
      if (f.suites !== '5+' && Number(p.suites) !== Number(f.suites)) return false
    }
    if (f.parking) {
      if (f.parking === '5+' && Number(p.parking) < 5) return false
      if (f.parking !== '5+' && Number(p.parking) !== Number(f.parking)) return false
    }
    return true
  })
}

async function renderAdmin() {
  if (!document.getElementById('admin-properties')) return
  const props = await getAllProperties()

  const total     = props.length
  const published = props.filter(p => p.published === true).length
  const elTotal   = document.getElementById('stat-total')
  const elPub     = document.getElementById('stat-published')
  const elLeads   = document.getElementById('stat-leads')
  if (elTotal)  elTotal.textContent  = total
  if (elPub)    elPub.textContent    = published
  if (elLeads)  elLeads.textContent  = '—'

  populateFilterCitySelect()
  renderAdminTable(cachedProperties)
}

// ─── Formulário admin ─────────────────────────────────────────────────────
let editingId = null
let selectedCover = ''

function openModal(title) {
  document.getElementById('modal-title').textContent = title || 'Novo Imóvel'
  document.getElementById('property-modal').classList.remove('hidden')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  document.getElementById('property-modal').classList.add('hidden')
  document.body.style.overflow = ''
}

function renderCoverPicker(images) {
  const picker = document.getElementById('cover-picker')
  const strip  = document.getElementById('cover-strip')
  if (!picker || !strip) return
  if (!images.length) { picker.style.display = 'none'; return }
  picker.style.display = ''
  strip.innerHTML = images.map(url => `
    <div class="cover-thumb-wrap${url === selectedCover ? ' selected' : ''}" data-url="${url}">
      <img src="${url}" class="cover-thumb" alt="">
      <span class="cover-star">★</span>
    </div>`).join('')
  strip.querySelectorAll('.cover-thumb-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      selectedCover = wrap.dataset.url
      strip.querySelectorAll('.cover-thumb-wrap').forEach(w => w.classList.remove('selected'))
      wrap.classList.add('selected')
    })
  })
}

function attachAdminForm() {
  const form      = document.getElementById('property-form')
  if (!form) return
  const submitBtn = document.getElementById('form-submit-btn')

  form.addEventListener('submit', async e => {
    e.preventDefault()
    const fd         = new FormData(form)
    const imageFiles = fd.getAll('images')
    let images       = []

    const newFiles = imageFiles.filter(f => f.size > 0)
    if (newFiles.length) {
      submitBtn.disabled    = true
      submitBtn.textContent = `Enviando 0/${newFiles.length} foto…`
      try {
        images = await uploadMultiple(newFiles, (done, total) => {
          submitBtn.textContent = `Enviando ${done}/${total} foto…`
        })
      } catch (err) {
        console.error('Erro no upload:', err)
        submitBtn.disabled    = false
        submitBtn.textContent = editingId ? 'Salvar Alterações' : 'Salvar Imóvel'
        alert('Erro ao enviar fotos.\nVerifique se o bucket "imoveis" existe no Supabase Storage e se as políticas de upload estão configuradas.')
        return
      }
    } else if (editingId) {
      const orig = cachedProperties.find(x => x.id === editingId)
      if (orig?.images) images = orig.images
    }
    if (!images.length) images = [...SAMPLE_URLS]

    const prop = {
      ...(editingId ? { id: editingId } : {}),
      title:        fd.get('title'),
      rua:          fd.get('rua') || '',
      numero:       fd.get('numero') || '',
      city:         fd.get('city'),
      neighborhood: fd.get('neighborhood'),
      price:        fd.get('price'),
      bedrooms:     parseInt(fd.get('bedrooms'), 10) || 0,
      suites:       parseInt(fd.get('suites'), 10) || 0,
      area:         parseFloat(fd.get('area')) || 0,
      parking:      parseInt(fd.get('parking'), 10) || 0,
      published:    fd.get('published') === 'true',
      images,
      description:  fd.get('description') || '',
      owner_name:   fd.get('owner_name') || '',
      owner_phone:  fd.get('owner_phone') || '',
      owner_email:  fd.get('owner_email') || '',
      owner_notes:  fd.get('owner_notes') || '',
      cover_image:  selectedCover || '',
      construction_status: fd.get('construction_status') || '',
      condominium:  fd.get('condominium') || '',
      furnished:    fd.get('furnished') === 'true',
      collection:   JSON.stringify(
        ['col_frente_mar','col_decorados','col_casas','col_alto_padrao','col_lancamentos']
          .filter(n => fd.get(n))
          .map(n => fd.get(n))
      ),
      tenant_id:    editingId
                      ? (cachedProperties.find(x => x.id === editingId)?.tenant_id ?? currentProfile?.tenant_id ?? null)
                      : (currentProfile?.tenant_id ?? null),
    }

    try {
      await saveProperty(prop)
      editingId             = null
      submitBtn.disabled    = false
      submitBtn.textContent = 'Salvar Imóvel'
      form.reset()
      const pubSel = document.getElementById('adminPublished')
      if (pubSel) pubSel.value = 'true'
      const neighSel = document.getElementById('adminNeighborhood')
      if (neighSel) neighSel.innerHTML = '<option value="">Selecione a cidade primeiro</option>'
      const constrSel = document.getElementById('adminConstructionStatus')
      if (constrSel) constrSel.value = ''
      selectedCover = ''
      renderCoverPicker([])
      closeModal()
      await renderAdmin()
    } catch (err) {
      console.error(err)
      submitBtn.disabled    = false
      submitBtn.textContent = editingId ? 'Salvar Alterações' : 'Salvar Imóvel'
      alert('Erro ao salvar imóvel:\n' + (err?.message || JSON.stringify(err)))
    }
  })

  document.addEventListener('click', async e => {
    if (e.target.matches('.del-btn')) {
      const id = Number(e.target.dataset.id)
      if (!id || !confirm('Remover este imóvel?')) return
      try {
        await deleteProperty(id)
        await renderAdmin()
      } catch {
        alert('Erro ao remover imóvel.')
      }
    }

    if (e.target.matches('.edit-btn')) {
      if (currentProfile?.role !== 'admin' && currentProfile?.role !== 'super_admin') return
      const id = Number(e.target.dataset.id)
      if (!id) return
      const p = cachedProperties.find(x => x.id === id)
      if (!p) return
      editingId = id
      submitBtn.textContent = 'Salvar Alterações'
      form.querySelector('[name="title"]').value       = p.title || ''
      form.querySelector('[name="rua"]').value         = p.rua || ''
      form.querySelector('[name="numero"]').value      = p.numero || ''
      form.querySelector('[name="city"]').value        = p.city || ''
      form.querySelector('[name="price"]').value       = p.price || ''
      form.querySelector('[name="bedrooms"]').value    = p.bedrooms || ''
      form.querySelector('[name="suites"]').value      = p.suites || ''
      form.querySelector('[name="area"]').value        = p.area   || ''
      form.querySelector('[name="parking"]').value     = p.parking || ''
      form.querySelector('[name="description"]').value  = p.description || ''
      form.querySelector('[name="construction_status"]').value = p.construction_status || ''
      form.querySelector('[name="owner_name"]').value   = p.owner_name || ''
      form.querySelector('[name="owner_phone"]').value  = p.owner_phone || ''
      form.querySelector('[name="owner_email"]').value  = p.owner_email || ''
      form.querySelector('[name="owner_notes"]').value  = p.owner_notes || ''
      form.querySelector('[name="condominium"]').value     = p.condominium || ''
      // Restore furnished checkbox
      const furnishedCb = form.querySelector('[name="furnished"]')
      if (furnishedCb) furnishedCb.checked = p.furnished === true
      // Restore collection checkboxes
      try {
        const cols = JSON.parse(p.collection || '[]')
        ;['col_frente_mar','col_decorados','col_casas','col_alto_padrao','col_lancamentos'].forEach(n => {
          const cb = form.querySelector('[name="' + n + '"]')
          if (cb) cb.checked = cols.includes(cb.value)
        })
      } catch(e) {}
      const pubSel = document.getElementById('adminPublished')
      if (pubSel) pubSel.value = p.published === true ? 'true' : 'false'
      const citySel = document.getElementById('adminCitySelect')
      if (citySel) {
        citySel.value = p.city || ''
        citySel.dispatchEvent(new Event('change'))
        setTimeout(() => {
          const neighSel = document.getElementById('adminNeighborhood')
          if (neighSel) neighSel.value = p.neighborhood || ''
        }, 50)
      }
      selectedCover = p.cover_image || p.images?.[0] || ''
      renderCoverPicker(p.images || [])
      openModal('Editar Imóvel')
    }
  })
}

function escapeHTML(s) {
  if (!s) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ─── Formata endereço sem número ─────────────────────────────────────────────
function formatAddress(rua, numero, neighborhood, city, state) {
  // Monta endereço omitindo o número (rua, bairro, cidade - SC)
  const parts = []
  if (rua)          parts.push(rua)           // só rua, sem número
  if (neighborhood) parts.push(neighborhood)
  if (city)         parts.push(city + (state ? ' - ' + state : ''))
  return parts.join(', ')
}

// ─── Constrói card de imóvel no estilo moderno ────────────────────────────────
function buildPropertyCard(p) {
  const images = p.images?.length ? p.images : SAMPLE_URLS
  const total  = images.length
  const img0   = p.cover_image || images[0]
  const addr   = formatAddress(p.rua, p.numero, p.neighborhood, p.city, 'SC')
  const price  = formatPrice(p.price, window.currentLang || 'pt')
  const ogLink = `https://omarcorretor.com.br/og/${p.id}`
  const waMsg  = encodeURIComponent(`Olá! Tenho interesse no imóvel *${p.title}*${p.reference ? ` (Ref: ${p.reference})` : ''}. Poderia me dar mais informações?\n${ogLink}`)

  // Indicadores
  const area    = p.area     ? `<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>${p.area}m²</span>` : ''
  const beds    = p.bedrooms ? `<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20v-6a2 2 0 012-2h16a2 2 0 012 2v6"/><path d="M2 14V8a2 2 0 012-2h4l2 3h8a2 2 0 012 2v3"/></svg>${p.bedrooms} quarto${p.bedrooms != 1 ? 's' : ''}</span>` : ''
  const baths   = p.bathrooms ? `<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 000-2.12L6 1.5a1.5 1.5 0 00-2.12 0L2 3.38a1.5 1.5 0 000 2.12L5.5 9"/><path d="M2 20h20M20 12H4a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2v-4a2 2 0 00-2-2z"/></svg>${p.bathrooms} banheiro${p.bathrooms != 1 ? 's' : ''}</span>` : ''
  const park    = p.parking  ? `<span class="icard-spec"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>${p.parking} vaga${p.parking != 1 ? 's' : ''}</span>` : ''

  // Dots de paginação
  // Mostra dots em todos os cards (mínimo 1, máximo 6)
  const dotCount = Math.max(1, Math.min(total, 6))
  const dots = `<div class="icard-dots">${Array.from({length:dotCount},(_,i)=>`<span class="icard-dot${i===0?' active':''}"></span>`).join('')}</div>`

  return `
    <div class="imovel-card" data-pid="${p.id}">
      <div class="icard-img-wrap" data-total="${total}" data-idx="0" data-pid="${p.id}" data-images="${encodeURIComponent(JSON.stringify(images))}">
        <img src="${escapeHTML(img0)}" alt="" class="icard-img-bg carousel-img-bg" aria-hidden="true">
        <a href="property.html?id=${p.id}" class="icard-img-link">
          <img src="${escapeHTML(img0)}" alt="${escapeHTML(p.title)}" class="icard-img carousel-img">
        </a>
        ${total > 1 ? `
          <button type="button" class="carousel-btn carousel-prev icard-prev" aria-label="Anterior">&#8249;</button>
          <button type="button" class="carousel-btn carousel-next icard-next" aria-label="Próximo">&#8250;</button>
        ` : ''}
        ${dots}
      </div>
      <div class="icard-body">
        ${p.furnished === true ? '<span class="icard-badge">🛋️ Mobiliado</span>' : ''}
        <div class="icard-neighborhood">${escapeHTML(p.neighborhood || p.title)}</div>
        <div class="icard-address">${escapeHTML(addr)}</div>
        ${(area||beds||baths||park) ? `<div class="icard-specs">${area}${beds}${baths}${park}</div>` : ''}
        <div class="icard-price-row">
          <div>
            <div class="icard-price-label">Comprar</div>
            <div class="icard-price">${escapeHTML(price)}</div>
          </div>
        </div>
        <div class="icard-footer">
          <span class="icard-code">Cód. ${escapeHTML(String(p.reference || p.id))}</span>
          <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}" target="_blank" rel="noopener" class="icard-wa" title="WhatsApp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 24l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          </a>
          <a href="property.html?id=${p.id}" class="icard-heart" title="Ver detalhes">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `
}


let viewImages = []
let viewIdx    = 0

function openViewModal(p) {
  // Store property ID on edit button for reliable lookup
  const editBtn = document.getElementById('view-modal-edit')
  if (editBtn) editBtn.dataset.pid = p.id

  // Header: code, title, status badge
  document.getElementById('view-code').textContent         = p.id || ''
  document.getElementById('view-modal-title').textContent  = p.title || 'Imóvel'
  const badge = document.getElementById('view-status-badge')
  if (p.published) {
    badge.textContent  = '● Publicado'
    badge.className    = 'badge badge-green'
  } else {
    badge.textContent  = '○ Rascunho'
    badge.className    = 'badge badge-gray'
  }

  // Address + Google Maps
  const addr = [p.rua, p.numero ? `nº ${p.numero}` : '', p.neighborhood, p.city].filter(Boolean)
  document.getElementById('view-modal-address').textContent = addr.length ? `📍 ${addr.join(', ')}` : ''
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr.join(' '))}`
  document.getElementById('view-map-link').href        = mapsUrl
  document.getElementById('view-directions-link').href = mapsUrl

  // Thumbnail preview (header)
  const firstImg = p.images?.[0] || SAMPLE_URLS[0]
  document.getElementById('view-thumb-preview').src = firstImg

  // Gallery (Principal tab)
  viewImages = p.images?.length ? p.images : SAMPLE_URLS
  viewIdx    = 0
  renderViewGallery()

  // Data grid
  document.getElementById('view-price').textContent    = formatPrice(p.price, 'pt')
  document.getElementById('view-bedrooms').textContent = p.bedrooms || '—'
  document.getElementById('view-suites').textContent   = p.suites   || '—'
  document.getElementById('view-parking').textContent  = p.parking  || '—'
  document.getElementById('view-area').textContent     = p.area ? `${p.area} m²` : '—'
  const condItem = document.getElementById('view-condominium-item')
  const condEl   = document.getElementById('view-condominium')
  if (condEl) condEl.textContent = p.condominium || ''
  if (condItem) condItem.style.display = p.condominium ? '' : 'none'

  // Detalhes tab
  document.getElementById('view-description').textContent = p.description || 'Sem descrição.'

  // Confidencial tab
  document.getElementById('conf-name').textContent  = p.owner_name  || '—'
  document.getElementById('conf-phone').textContent = p.owner_phone || '—'
  document.getElementById('conf-email').textContent = p.owner_email || '—'
  document.getElementById('conf-notes').textContent = p.owner_notes || '—'

  // Reset tabs to Principal
  document.querySelectorAll('#view-modal .tab-btn').forEach(b => b.classList.remove('active'))
  document.querySelectorAll('#view-modal .tab-panel').forEach(t => t.classList.add('hidden'))
  document.querySelector('#view-modal .tab-btn[data-tab="principal"]').classList.add('active')
  document.getElementById('tab-principal').classList.remove('hidden')

  // Preencher link de compartilhamento
  const shareUrl = 'https://omarcorretor.com.br/og/' + p.id
  const shareLinkInput = document.getElementById('share-link-input')
  if (shareLinkInput) shareLinkInput.value = shareUrl
  // Fechar share panel ao abrir novo modal; armazena pid para mensagem WhatsApp
  const sharePanel = document.getElementById('share-panel')
  if (sharePanel) { sharePanel.style.display = 'none'; sharePanel.dataset.pid = p.id }

  document.getElementById('view-modal').classList.remove('hidden')
  document.body.style.overflow = 'hidden'
}

function closeViewModal() {
  document.getElementById('view-modal').classList.add('hidden')
  document.body.style.overflow = ''
}

function renderViewGallery() {
  const mainImg  = document.getElementById('view-main-img')
  const counter  = document.getElementById('view-counter')
  const prev     = document.getElementById('view-prev')
  const next     = document.getElementById('view-next')
  const thumbs   = document.getElementById('view-thumbs')

  mainImg.src = viewImages[viewIdx]
  mainImg.alt = `Foto ${viewIdx + 1}`

  const many = viewImages.length > 1
  prev.style.display    = many ? 'flex' : 'none'
  next.style.display    = many ? 'flex' : 'none'
  counter.textContent   = many ? `${viewIdx + 1} / ${viewImages.length}` : ''

  thumbs.innerHTML = many
    ? viewImages.map((src, i) =>
        `<img src="${src}" class="view-thumb${i === viewIdx ? ' active' : ''}" data-i="${i}" alt="Foto ${i + 1}">`
      ).join('')
    : ''

  thumbs.querySelectorAll('.view-thumb').forEach(t => {
    t.addEventListener('click', () => { viewIdx = +t.dataset.i; renderViewGallery() })
  })
}

// ─── Profile: load, topnav, permissions ──────────────────────────────────────
async function loadProfile(userId) {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  return data
}

function renderSidebarUser(profile) {
  const initEl    = document.getElementById('topnav-avatar-initial')
  const imgEl     = document.getElementById('topnav-avatar-img')
  const nameEl    = document.getElementById('topnav-name')
  const roleEl    = document.getElementById('topnav-role')
  if (!nameEl) return

  const name    = profile?.name || 'Sem nome'
  const roleStr = profile?.role === 'super_admin' ? 'Super Admin' : profile?.role === 'admin' ? 'Administrador' : 'Corretor'
  nameEl.textContent = name
  if (roleEl) roleEl.textContent = roleStr

  // Avatar circle — photo takes priority over initial
  if (profile?.avatar_url && imgEl) {
    imgEl.src = profile.avatar_url
    imgEl.style.display = ''
    if (initEl) initEl.style.display = 'none'
  } else {
    if (initEl) { initEl.textContent = name[0]?.toUpperCase() || '?'; initEl.style.display = '' }
    if (imgEl)  imgEl.style.display = 'none'
  }

  // Sync avatar dropdown header
  const ddName  = document.getElementById('avatar-dd-name')
  const ddRole  = document.getElementById('avatar-dd-role')
  const ddImg   = document.getElementById('avatar-dd-img')
  const ddInit  = document.getElementById('avatar-dd-initial')
  if (ddName) ddName.textContent = name
  if (ddRole) ddRole.textContent = roleStr
  if (profile?.avatar_url && ddImg) {
    ddImg.src = profile.avatar_url; ddImg.style.display = ''
    if (ddInit) ddInit.style.display = 'none'
  } else {
    if (ddInit) { ddInit.textContent = name[0]?.toUpperCase() || '?'; ddInit.style.display = '' }
    if (ddImg)  ddImg.style.display = 'none'
  }
}

// Atualiza o link "Ver site" com a URL correta para o tenant do usuário logado
async function updateVerSiteLink(profile) {
  const link = document.getElementById('avatar-dd-ver-site')
  if (!link) return

  // Tenta tenant_id do perfil; fallback via settings (caso perfil não tenha o campo)
  const tenantId = profile?.tenant_id || getSettingsTenantId()
  const validTenant = tenantId && tenantId !== GLOBAL_TENANT_ID

  // URL absoluta para evitar ambiguidade de caminhos relativos
  const origin  = window.location.origin // ex: https://omarcorretor.com.br
  const demoUrl = validTenant ? `${origin}/demo.html?key=${tenantId}` : `${origin}/index.html`
  link.href = demoUrl

  if (!validTenant) return

  try {
    const { data: tenant } = await supabase
      .from('tenants').select('domain').eq('id', tenantId).maybeSingle()

    const currentHost = window.location.hostname.replace(/^www\./, '')
    const rawDomain   = (tenant?.domain || '').replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '').trim()

    if (rawDomain && rawDomain !== currentHost) {
      // Tenant tem domínio próprio diferente do hosting → vai para o site deles
      link.href = `https://${rawDomain}`
    }
    // Sem domínio, ou domínio igual ao hosting → fica no demo
  } catch (_) { /* mantém demoUrl */ }
}

// Helper: navigate to a section by name
// Mapa de inicializadores de seção — lazy init na primeira navegação
const _sectionInitMap = {
  'dashboard':   () => initDashboardSection(),
  'empresa':     () => initEmpresaSection(),
  'visual':      () => initVisualSection(),
  'site-config': () => initSiteConfigSection(),
  'crm-config':  () => initCRMConfigSection(),
  'integracoes': () => initIntegracoesSection(),
  'midia':       () => initMidiaSection(),
  'depoimentos': () => initDepoimentosSection(),
}

function navigateToSection(sectionName) {
  document.querySelectorAll('.topnav-link, .topnav-dropdown-item').forEach(b => b.classList.remove('active'))
  const btn = document.querySelector(`.topnav-link[data-section="${sectionName}"], .topnav-dropdown-item[data-section="${sectionName}"]`)
  if (btn) btn.classList.add('active')
  document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'))
  document.getElementById(`section-${sectionName}`)?.classList.remove('hidden')
  // Inicializa seção se houver função registrada (lazy init)
  if (typeof _sectionInitMap !== 'undefined' && _sectionInitMap[sectionName]) {
    const fn = _sectionInitMap[sectionName]
    _sectionInitMap[sectionName] = null
    setTimeout(fn, 0)
  }
  // Close menus
  document.getElementById('topnav-links')?.classList.remove('open')
  closeAllDropdowns()

  if (sectionName === 'contatos') initContatosSection()
  if (sectionName === 'funil')    initFunilSection()
  if (sectionName === 'tarefas')  initTarefasSection()
}

function applyRolePermissions(role) {
  const root = document.getElementById('admin-root')
  if (root) root.dataset.role = role || 'corretor'

  if (role === 'admin' || role === 'super_admin') {
    document.querySelectorAll('.admin-only').forEach(el => { el.style.display = '' })
    const adminSections = {
      'empresa':      initEmpresaSection,
      'visual':       initVisualSection,
      'site-config':  initSiteConfigSection,
      'crm-config':   initCRMConfigSection,
      'integracoes':  initIntegracoesSection,
      'midia':        initMidiaSection,
      'depoimentos':   initDepoimentosSection,
    }
    Object.entries(adminSections).forEach(([name, fn]) => {
      // Support both old .nav-item and new .topnav-dropdown-item selectors
      const btn = document.querySelector(`.topnav-dropdown-item[data-section="${name}"]`)
        || document.querySelector(`.nav-item[data-section="${name}"]`)
      if (btn) btn.addEventListener('click', () => fn(), { once: true })
    })
    // Re-run lucide icons after showing admin-only elements
    if (window.lucide) lucide.createIcons()
  }

  if (role === 'super_admin') {
    document.querySelectorAll('.super-admin-only').forEach(el => { el.style.display = '' })
    const btn = document.querySelector('.topnav-link[data-section="super-admin"]')
      || document.querySelector('.nav-item[data-section="super-admin"]')
    if (btn) btn.addEventListener('click', () => initSuperAdminSection(), { once: true })
    if (window.lucide) lucide.createIcons()
  }
}

function closeAllDropdowns() {
  document.getElementById('avatar-dropdown')?.classList.add('hidden')
  document.getElementById('notif-dropdown')?.classList.add('hidden')
}

function openChangePasswordModal() {
  const existing = document.getElementById('change-pass-modal-root')
  if (existing) existing.remove()
  const wrap = document.createElement('div')
  wrap.id = 'change-pass-modal-root'
  wrap.className = 'modal-backdrop'
  wrap.innerHTML = `
    <div class="modal" style="max-width:400px;">
      <div class="modal-header">
        <h3>Alterar Senha</h3>
        <button class="modal-close" id="cp-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
          <label class="form-label">Nova senha</label>
          <input id="cp-new" type="password" class="form-control" placeholder="Mínimo 6 caracteres">
        </div>
        <div class="form-group">
          <label class="form-label">Confirmar nova senha</label>
          <input id="cp-confirm" type="password" class="form-control" placeholder="Repita a senha">
        </div>
        <p id="cp-msg" style="display:none;font-size:13px;margin:0;"></p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cp-cancel">Cancelar</button>
        <button class="btn-primary" id="cp-save" style="margin:0;">Salvar Senha</button>
      </div>
    </div>`
  document.body.appendChild(wrap)
  const close = () => wrap.remove()
  document.getElementById('cp-close')?.addEventListener('click', close)
  document.getElementById('cp-cancel')?.addEventListener('click', close)
  wrap.addEventListener('click', e => { if (e.target === wrap) close() })
  document.getElementById('cp-save')?.addEventListener('click', async () => {
    const nova     = document.getElementById('cp-new')?.value || ''
    const confirma = document.getElementById('cp-confirm')?.value || ''
    const msgEl    = document.getElementById('cp-msg')
    const btn      = document.getElementById('cp-save')
    msgEl.style.display = 'none'
    if (nova.length < 6) { msgEl.style.color = '#ef4444'; msgEl.textContent = 'Mínimo 6 caracteres.'; msgEl.style.display = ''; return }
    if (nova !== confirma) { msgEl.style.color = '#ef4444'; msgEl.textContent = 'As senhas não coincidem.'; msgEl.style.display = ''; return }
    btn.disabled = true; btn.textContent = 'Salvando…'
    const { error } = await supabase.auth.updateUser({ password: nova })
    btn.disabled = false; btn.textContent = 'Salvar Senha'
    if (error) { msgEl.style.color = '#ef4444'; msgEl.textContent = 'Erro: ' + error.message; msgEl.style.display = ''; return }
    msgEl.style.color = '#16a34a'; msgEl.textContent = '✅ Senha alterada com sucesso!'; msgEl.style.display = ''
    setTimeout(close, 1500)
  })
}

function openChangePhotoModal() {
  const existing = document.getElementById('change-photo-modal-root')
  if (existing) existing.remove()
  const wrap = document.createElement('div')
  wrap.id = 'change-photo-modal-root'
  wrap.className = 'modal-backdrop'
  const currentSrc = document.getElementById('topnav-avatar-img')?.src || ''
  const hasPhoto = currentSrc && !currentSrc.endsWith('/')
  wrap.innerHTML = `
    <div class="modal" style="max-width:380px;">
      <div class="modal-header">
        <h3>Alterar Foto</h3>
        <button class="modal-close" id="cph-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:16px;">
        <div style="width:90px;height:90px;border-radius:50%;overflow:hidden;border:3px solid #e2e8f0;background:#f1f5f9;display:flex;align-items:center;justify-content:center;">
          <img id="cph-preview" src="${hasPhoto ? currentSrc : ''}" alt="" style="width:100%;height:100%;object-fit:cover;display:${hasPhoto ? '' : 'none'};">
          <span id="cph-initial" style="font-size:32px;font-weight:700;color:#64748b;display:${hasPhoto ? 'none' : ''};">${(currentProfile?.name || '?')[0].toUpperCase()}</span>
        </div>
        <label class="btn-secondary" style="cursor:pointer;padding:10px 20px;">
          <input id="cph-file" type="file" accept="image/*" style="display:none"> Escolher Foto
        </label>
        <p id="cph-msg" style="display:none;font-size:13px;margin:0;"></p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="cph-cancel">Cancelar</button>
        <button class="btn-primary" id="cph-save" style="margin:0;" disabled>Salvar Foto</button>
      </div>
    </div>`
  document.body.appendChild(wrap)
  const close = () => wrap.remove()
  document.getElementById('cph-close')?.addEventListener('click', close)
  document.getElementById('cph-cancel')?.addEventListener('click', close)
  wrap.addEventListener('click', e => { if (e.target === wrap) close() })
  document.getElementById('cph-file')?.addEventListener('change', e => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const img = document.getElementById('cph-preview')
    const init = document.getElementById('cph-initial')
    if (img) { img.src = url; img.style.display = '' }
    if (init) init.style.display = 'none'
    document.getElementById('cph-save').disabled = false
  })
  document.getElementById('cph-save')?.addEventListener('click', async () => {
    const file = document.getElementById('cph-file')?.files[0]
    if (!file) return
    const btn   = document.getElementById('cph-save')
    const msgEl = document.getElementById('cph-msg')
    btn.disabled = true; btn.textContent = 'Salvando…'
    try {
      const blob = await compressToBlob(file, 400, 0.85)
      const path = `avatars/${currentProfile.id}-${Date.now()}.jpg`
      const { error: upErr } = await supabase.storage.from('imoveis')
        .upload(path, blob, { contentType: 'image/jpeg', upsert: true })
      if (upErr) throw upErr
      const { data: { publicUrl } } = supabase.storage.from('imoveis').getPublicUrl(path)
      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', currentProfile.id)
      currentProfile = { ...currentProfile, avatar_url: publicUrl }
      renderSidebarUser(currentProfile)
      close()
    } catch (err) {
      msgEl.style.color = '#ef4444'; msgEl.textContent = 'Erro: ' + err.message; msgEl.style.display = ''
      btn.disabled = false; btn.textContent = 'Salvar Foto'
    }
  })
}

function openAddCorretorModal(overrideTenantId, onSuccess) {
  const existing = document.getElementById('add-corretor-modal-root')
  if (existing) existing.remove()
  const wrap = document.createElement('div')
  wrap.id = 'add-corretor-modal-root'
  wrap.className = 'modal-backdrop'
  wrap.innerHTML = `
    <div class="modal" style="max-width:440px;">
      <div class="modal-header">
        <h3>Adicionar Usuário</h3>
        <button class="modal-close" id="ac-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;display:flex;flex-direction:column;gap:14px;">
        <div class="form-group">
          <label class="form-label">Função *</label>
          <select id="ac-role" class="form-control">
            <option value="corretor">Corretor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">E-mail *</label>
          <input id="ac-email" type="email" class="form-control" placeholder="usuario@email.com">
        </div>
        <div class="form-group">
          <label class="form-label">Senha de acesso *</label>
          <input id="ac-password" type="text" class="form-control" placeholder="Mínimo 6 caracteres">
        </div>
        <p id="ac-note" style="display:none;font-size:13px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin:0;line-height:1.6;"></p>
      </div>
      <div class="modal-footer">
        <button class="btn-cancel" id="ac-cancel">Cancelar</button>
        <button class="btn-primary" id="ac-save" style="margin:0;">+ Criar Acesso</button>
      </div>
    </div>`
  document.body.appendChild(wrap)
  const close = () => wrap.remove()
  document.getElementById('ac-close')?.addEventListener('click', close)
  document.getElementById('ac-cancel')?.addEventListener('click', close)
  wrap.addEventListener('click', e => { if (e.target === wrap) close() })
  document.getElementById('ac-save')?.addEventListener('click', async () => {
    const email    = document.getElementById('ac-email')?.value.trim()
    const password = document.getElementById('ac-password')?.value.trim()
    const btn      = document.getElementById('ac-save')
    const noteEl   = document.getElementById('ac-note')
    if (!email) { alert('Informe o e-mail do corretor.'); return }
    if (!password || password.length < 6) { alert('A senha precisa ter no mínimo 6 caracteres.'); return }
    btn.disabled = true; btn.textContent = 'Criando…'
    noteEl.style.display = 'none'
    try {
      const tenantIdToUse = overrideTenantId || currentProfile?.tenant_id || null
      const role = document.getElementById('ac-role')?.value || 'corretor'
      const result = await callEdgeFunction({ email, password, role, tenant_id: tenantIdToUse })
      btn.disabled = false; btn.textContent = '+ Criar Acesso'
      if (result.success) {
        document.getElementById('ac-email').value = ''
        document.getElementById('ac-password').value = ''
        if (result.email_sent === false) {
          noteEl.innerHTML = `✅ Acesso criado! <span style="color:#ef4444;">⚠️ E-mail não enviado.</span><br>Compartilhe manualmente:<br><strong>E-mail:</strong> ${escapeHTML(email)}<br><strong>Senha:</strong> ${escapeHTML(password)}`
          noteEl.style.color = '#0f172a'
        } else {
          noteEl.textContent = '✅ Acesso criado! O corretor receberá um e-mail com as credenciais.'
          noteEl.style.color = '#16a34a'
        }
        noteEl.style.display = ''
        if (typeof onSuccess === 'function') setTimeout(onSuccess, 1500)
      } else {
        alert('Erro: ' + (result.error || 'Falha desconhecida'))
      }
    } catch (err) {
      btn.disabled = false; btn.textContent = '+ Criar Acesso'
      alert('Erro: ' + err.message)
    }
  })
}

function attachSidebarUserClick() {
  // Avatar dropdown toggle
  const avatarWrap = document.getElementById('topnav-avatar-wrap')
  const avatarDD   = document.getElementById('avatar-dropdown')
  avatarWrap?.addEventListener('click', e => {
    e.stopPropagation()
    const hidden = avatarDD?.classList.toggle('hidden')
    if (!hidden) document.getElementById('notif-dropdown')?.classList.add('hidden')
  })

  // Avatar dropdown actions — stopPropagation evita que o clique suba para avatarWrap e re-abra o dropdown
  document.getElementById('avatar-dd-change-photo')?.addEventListener('click', e => { e.stopPropagation(); closeAllDropdowns(); openChangePhotoModal() })
  document.getElementById('avatar-dd-change-pass')?.addEventListener('click', e => { e.stopPropagation(); closeAllDropdowns(); openChangePasswordModal() })
  document.getElementById('avatar-dd-add-corretor')?.addEventListener('click', e => { e.stopPropagation(); closeAllDropdowns(); openAddCorretorModal() })
  document.getElementById('avatar-dd-settings')?.addEventListener('click', e => { e.stopPropagation(); closeAllDropdowns(); navigateToSection('settings') })
  document.getElementById('avatar-dd-logout')?.addEventListener('click', async e => {
    e.stopPropagation()
    await supabase.auth.signOut()
    location.reload()
  })

  // Notification dropdown
  const notifWrap = document.getElementById('topnav-notif-wrap')
  const notifDD   = document.getElementById('notif-dropdown')
  notifWrap?.addEventListener('click', e => {
    e.stopPropagation()
    const hidden = notifDD?.classList.toggle('hidden')
    if (!hidden) { document.getElementById('avatar-dropdown')?.classList.add('hidden'); loadNotifications() }
  })
  document.getElementById('notif-mark-all')?.addEventListener('click', () => { markNotifsRead(); closeAllDropdowns() })

  // Search overlay
  document.getElementById('btn-search-open')?.addEventListener('click', () => {
    document.getElementById('search-overlay')?.classList.remove('hidden')
    document.getElementById('search-input')?.focus()
  })
  document.getElementById('search-overlay-close')?.addEventListener('click', () => {
    document.getElementById('search-overlay')?.classList.add('hidden')
  })
  document.getElementById('search-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'search-overlay') document.getElementById('search-overlay').classList.add('hidden')
  })
  let searchTimeout
  document.getElementById('search-input')?.addEventListener('input', e => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => runSearch(e.target.value.trim()), 280)
  })
  document.getElementById('search-input')?.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.getElementById('search-overlay')?.classList.add('hidden')
  })

  // Close dropdowns on outside click
  document.addEventListener('click', closeAllDropdowns)
}

// ═══════════════════════════════════════════════════════════════════
// SEÇÃO FUNIL (KANBAN)
// ═══════════════════════════════════════════════════════════════════

let funilInitialized = false
let kanbanPipes = []
let kanbanStages = []
let kanbanLeads = []
let kanbanTagMap = {}    // name → { color }
let kanbanStatuses = []
let activePipeId = null
let dragLeadId = null
let kanbanFilter = { search: '', tags: new Set(), status: '' }

async function initFunilSection() {
  // Não usa guard funilInitialized para que recarregue quando funnils forem criados
  if (funilInitialized) {
    // Já inicializado: apenas recarrega listas
    await reloadFunilData()
    return
  }
  funilInitialized = true

  await reloadFunilData()

  document.getElementById('btn-funil-add-lead')?.addEventListener('click', () => openLeadModal())
  initImportLeads()

  const sel = document.getElementById('funil-pipe-sel')
  sel?.addEventListener('change', async () => {
    activePipeId = parseInt(sel.value, 10)
    await loadKanbanLeads()
  })
}

function buildKanbanFilters(tags) {
  const filtersEl = document.getElementById('kanban-filters')
  if (!filtersEl) return
  filtersEl.style.display = 'block'

  // Status options
  const statusSel = document.getElementById('kf-status')
  if (statusSel) {
    statusSel.innerHTML = '<option value="">Todos os status</option>' +
      kanbanStatuses.map(s => `<option value="${escapeHTML(s.name)}">${escapeHTML(s.name)}</option>`).join('')
    statusSel.value = kanbanFilter.status
    statusSel.onchange = () => { kanbanFilter.status = statusSel.value; renderKanban() }
  }

  // Tag pills
  const tagsEl = document.getElementById('kf-tags')
  if (tagsEl) {
    if (!tags.length) { tagsEl.style.display = 'none'; return }
    tagsEl.style.display = 'flex'
    tagsEl.innerHTML =
      '<span class="kf-tags-label">Tags:</span>' +
      tags.map(t => {
        const active = kanbanFilter.tags.has(t.name)
        return `<button class="kf-tag-btn${active ? ' active' : ''}" data-tag="${escapeHTML(t.name)}"
          style="--kf-tc:${t.color}">
          ${escapeHTML(t.name)}
        </button>`
      }).join('')
    tagsEl.querySelectorAll('.kf-tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.dataset.tag
        if (kanbanFilter.tags.has(tag)) kanbanFilter.tags.delete(tag)
        else kanbanFilter.tags.add(tag)
        // Rebuild just the tag pills to update active state
        buildKanbanFilters(tags)
        renderKanban()
      })
    })
  }

  // Search
  const searchEl = document.getElementById('kf-search')
  if (searchEl) {
    searchEl.value = kanbanFilter.search
    searchEl.oninput = () => { kanbanFilter.search = searchEl.value.toLowerCase(); renderKanban() }
  }

  // Clear
  document.getElementById('kf-clear')?.addEventListener('click', () => {
    kanbanFilter = { search: '', tags: new Set(), status: '' }
    buildKanbanFilters(tags)
    renderKanban()
  })
}

async function reloadFunilData() {
  const tid = getSettingsTenantId()
  const [{ data: pipes }, { data: tags }, { data: statuses }] = await Promise.all([
    supabase.from('crm_pipelines').select('*').eq('tenant_id', tid).order('sort_order'),
    supabase.from('crm_tags').select('*').eq('tenant_id', tid).order('name'),
    supabase.from('crm_lead_statuses').select('*').eq('tenant_id', tid).order('sort_order'),
  ])
  kanbanPipes = pipes || []
  kanbanStatuses = statuses || []

  // Build tag color map
  kanbanTagMap = {}
  ;(tags || []).forEach(t => { kanbanTagMap[t.name] = t })

  // Load stages by pipeline IDs to avoid tenant_id NULL mismatch on pre-migration rows
  const pipeIds = kanbanPipes.map(p => p.id)
  const { data: stages } = pipeIds.length
    ? await supabase.from('crm_stages').select('*').in('pipeline_id', pipeIds).order('sort_order')
    : { data: [] }
  kanbanStages = stages || []

  // Build filter UI
  buildKanbanFilters(tags || [])


  const sel = document.getElementById('funil-pipe-sel')
  if (sel) {
    const prev = activePipeId
    sel.innerHTML = kanbanPipes.length
      ? kanbanPipes.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('')
      : '<option value="">Sem funis cadastrados</option>'
    const def = kanbanPipes.find(p => p.id === prev) || kanbanPipes.find(p => p.is_default) || kanbanPipes[0]
    if (def) { sel.value = def.id; activePipeId = def.id }
    else activePipeId = null
  }

  await loadKanbanLeads()
}

async function loadKanbanLeads() {
  const board = document.getElementById('kanban-board')
  if (!board) return
  board.innerHTML = '<div class="kanban-loading">Carregando…</div>'

  let query = supabase.from('leads').select('*').order('created_at', { ascending: false })
  if (currentProfile?.role === 'corretor') query = query.eq('assigned_to', currentProfile.id)
  else if (currentProfile?.tenant_id) query = query.eq('tenant_id', currentProfile.tenant_id)
  if (activePipeId) query = query.eq('pipeline_id', activePipeId)

  const { data } = await query
  kanbanLeads = data || []
  renderKanban()
}

function renderKanban() {
  const board = document.getElementById('kanban-board')
  if (!board) return

  const stages = kanbanStages.filter(s => s.pipeline_id === activePipeId)

  if (!stages.length) {
    board.innerHTML = '<div class="kanban-loading">Nenhuma etapa configurada para este funil. Crie etapas em Configurações → CRM Config.</div>'
    return
  }

  // Apply filters
  const f = kanbanFilter
  const visibleLeads = kanbanLeads.filter(l => {
    if (f.search) {
      const hay = `${l.name||''} ${l.phone||''} ${l.email||''}`.toLowerCase()
      if (!hay.includes(f.search)) return false
    }
    if (f.status && l.status !== f.status) return false
    if (f.tags.size > 0) {
      const lt = Array.isArray(l.tags) ? l.tags : []
      if (![...f.tags].every(t => lt.includes(t))) return false
    }
    return true
  })

  const grouped = {}
  stages.forEach(s => { grouped[s.name] = [] })
  visibleLeads.forEach(l => {
    const key = l.stage || stages[0]?.name
    if (!grouped[key]) grouped[stages[0]?.name || ''] = []
    ;(grouped[key] || grouped[stages[0]?.name])?.push(l)
  })

  board.innerHTML = stages.map(stage => {
    const cards = (grouped[stage.name] || [])
    const cardsHTML = cards.length
      ? cards.map(l => {
          const waNum = (l.phone || '').replace(/\D/g,'')
          const waMsg = encodeURIComponent(`Olá ${l.name}! Aqui é da ${getSetting('company.name','nossa imobiliária')}. Vi seu interesse e gostaria de ajudar. Posso falar agora?`)
          return `
        <div class="kanban-card" draggable="true" data-id="${l.id}" data-stage="${escapeHTML(stage.name)}" style="cursor:pointer;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;">
            <div class="kanban-card-name" style="flex:1;">${escapeHTML(l.name || '—')}</div>
            ${waNum ? `<a href="https://wa.me/${waNum}?text=${waMsg}" target="_blank" rel="noopener"
              onclick="event.stopPropagation()"
              style="flex-shrink:0;width:28px;height:28px;background:#25d366;border-radius:6px;display:flex;align-items:center;justify-content:center;text-decoration:none;"
              title="Abrir WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>` : ''}
          </div>
          ${l.phone ? `<div class="kanban-card-info">📞 ${escapeHTML(l.phone)}</div>` : ''}
          ${l.email ? `<div class="kanban-card-info" style="font-size:11px;color:#94a3b8;">✉ ${escapeHTML(l.email)}</div>` : ''}
          ${l.notes ? `<div class="kanban-card-info" style="font-size:11px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">📝 ${escapeHTML(l.notes)}</div>` : ''}
          <div class="kanban-card-tags" style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">
            ${l.source ? `<span class="kanban-card-tag">${escapeHTML(l.source)}</span>` : ''}
            ${Array.isArray(l.tags) ? l.tags.map(t => {
              const td = kanbanTagMap[t]
              const c = td?.color || '#0369a1'
              return `<span class="kanban-card-tag" style="background:${c}18;color:${c};border:1px solid ${c}44;">${escapeHTML(t)}</span>`
            }).join('') : ''}
          </div>
        </div>`}).join('')
      : '<div class="kanban-empty-col">Sem leads nesta etapa</div>'

    return `
      <div class="kanban-col" data-stage="${escapeHTML(stage.name)}">
        <div class="kanban-col-header" style="border-bottom-color:${stage.color || '#2563eb'}">
          <div class="kanban-col-title">
            <div class="kanban-stage-dot" style="background:${stage.color || '#2563eb'}"></div>
            ${escapeHTML(stage.name)}
          </div>
          <span class="kanban-col-count">${cards.length}</span>
        </div>
        <div class="kanban-cards" data-stage="${escapeHTML(stage.name)}">${cardsHTML}</div>
        <button class="kanban-add-btn" data-stage="${escapeHTML(stage.name)}">+ Adicionar lead</button>
      </div>`
  }).join('')

  attachKanbanEvents()
  if (window.lucide) lucide.createIcons()
}

function attachKanbanEvents() {
  const board = document.getElementById('kanban-board')
  if (!board) return

  // Add lead per column
  board.querySelectorAll('.kanban-add-btn').forEach(btn => {
    btn.addEventListener('click', () => openLeadModal())
  })

  // Card click → open edit
  board.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('click', () => {
      const lead = kanbanLeads.find(l => String(l.id) === String(card.dataset.id))
      if (lead) openLeadModal(lead)
    })
    card.addEventListener('dragstart', e => {
      dragLeadId = card.dataset.id
      card.classList.add('dragging')
      e.dataTransfer.effectAllowed = 'move'
    })
    card.addEventListener('dragend', () => card.classList.remove('dragging'))
  })

  // Drop zones
  board.querySelectorAll('.kanban-cards').forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.closest('.kanban-col').classList.add('drag-over') })
    zone.addEventListener('dragleave', e => { if (!zone.contains(e.relatedTarget)) zone.closest('.kanban-col').classList.remove('drag-over') })
    zone.addEventListener('drop', async e => {
      e.preventDefault()
      zone.closest('.kanban-col').classList.remove('drag-over')
      const newStage = zone.dataset.stage
      if (!dragLeadId || !newStage) return
      await supabase.from('leads').update({ stage: newStage }).eq('id', dragLeadId)
      const lead = kanbanLeads.find(l => String(l.id) === String(dragLeadId))
      if (lead) lead.stage = newStage
      dragLeadId = null
      renderKanban()
    })
  })
}

// ─── Modal de detalhe / edição de lead no kanban ─────────────────────────────
async function openLeadModal(lead = null) {
  document.getElementById('lead-detail-panel')?.remove()

  const isNew = !lead
  const tid = getSettingsTenantId()
  const { data: tags  } = await supabase.from('crm_tags').select('*').eq('tenant_id', tid).order('name')
  const { data: statuses } = await supabase.from('crm_lead_statuses').select('*').eq('tenant_id', tid).order('sort_order')

  // Determine which pipeline the lead belongs to (or use active)
  const leadPipeId = lead?.pipeline_id
    ? (kanbanPipes.find(p => p.id === lead.pipeline_id)?.id || activePipeId)
    : activePipeId

  function buildStageOptions(pipeId) {
    return kanbanStages
      .filter(s => s.pipeline_id === pipeId)
      .map(s => `<option value="${escapeHTML(s.name)}" ${lead?.stage === s.name ? 'selected' : ''}>${escapeHTML(s.name)}</option>`)
      .join('')
  }

  const pipeOptions = kanbanPipes
    .map(p => `<option value="${p.id}" ${p.id === leadPipeId ? 'selected' : ''}>${escapeHTML(p.name)}</option>`)
    .join('')

  const stageOptions = buildStageOptions(leadPipeId)

  const waNum = (lead?.phone || '').replace(/\D/g,'')

  const panel = document.createElement('div')
  panel.id = 'lead-detail-panel'
  panel.style.cssText = 'position:fixed;top:0;right:0;bottom:0;width:420px;max-width:100vw;background:#fff;box-shadow:-4px 0 32px rgba(0,0,0,.15);z-index:1000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s ease;'
  panel.innerHTML = `
    <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0;">${isNew ? '+ Novo Lead' : '✏️ Editar Lead'}</h3>
      <button id="ldp-close" style="background:none;border:none;cursor:pointer;font-size:22px;color:#94a3b8;line-height:1;">✕</button>
    </div>
    <div style="flex:1;overflow-y:auto;padding:20px 24px;display:flex;flex-direction:column;gap:14px;">
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">NOME *</label>
        <input id="ldp-name" class="form-input" type="text" value="${escapeHTML(lead?.name||'')}" placeholder="Nome do cliente">
      </div>
      <div style="display:flex;gap:10px;">
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">TELEFONE</label>
          <input id="ldp-phone" class="form-input" type="tel" value="${escapeHTML(lead?.phone||'')}" placeholder="(00) 00000-0000">
        </div>
        <div style="flex:1;">
          <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">E-MAIL</label>
          <input id="ldp-email" class="form-input" type="email" value="${escapeHTML(lead?.email||'')}" placeholder="email@...">
        </div>
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ORIGEM</label>
        <input id="ldp-source" class="form-input" type="text" value="${escapeHTML(lead?.source||'')}" placeholder="site, indicação, instagram…">
      </div>
      ${kanbanPipes.length > 1 ? `
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">FUNIL</label>
        <select id="ldp-pipe" class="form-input">${pipeOptions}</select>
      </div>` : ''}
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ETAPA DO FUNIL</label>
        <select id="ldp-stage" class="form-input">${stageOptions}</select>
      </div>
      ${statuses?.length ? `
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">STATUS</label>
        <select id="ldp-status" class="form-input">
          <option value="">— Sem status —</option>
          ${statuses.map(s => `<option value="${s.name}" ${lead?.status===s.name?'selected':''}>${escapeHTML(s.name)}</option>`).join('')}
        </select>
      </div>` : ''}
      <div id="ldp-tags-wrap" class="ldp-tags-section">
        <label class="ldp-field-label">TAGS</label>
        <div class="ldp-tag-badge-area" id="ldp-tag-badge-area">
          ${(lead?.tags||[]).map(name => {
            const td = kanbanTagMap[name]||{}; const c = td.color||'#6366F1';
            return `<span class="ldp-tag-badge" data-tag="${escapeHTML(name)}" style="background:${c}18;color:${c};border-color:${c}55;">${escapeHTML(name)}<span class="ldp-tag-rm" data-tag="${escapeHTML(name)}">×</span></span>`;
          }).join('')||'<span class="ldp-tag-empty">Nenhuma tag — clique em + para adicionar</span>'}
        </div>
        <div class="ldp-tag-add-row">
          <button id="ldp-tag-add-btn" class="ldp-tag-add-btn" type="button">+ Adicionar Tag</button>
          <div id="ldp-tag-dropdown" class="ldp-tag-dropdown hidden">
            <div class="ldp-tag-search-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input id="ldp-tag-search" class="ldp-tag-search" placeholder="Buscar tag…" autocomplete="off" type="text">
            </div>
            <div id="ldp-tag-opt-list" class="ldp-tag-opt-list"></div>
            <div class="ldp-tag-dd-footer">
              <button id="ldp-tag-show-create" class="ldp-tag-show-create" type="button">+ Criar nova tag</button>
            </div>
            <div id="ldp-tag-create-row" class="ldp-tag-create-row hidden">
              <input id="ldp-tag-new-name" class="ldp-tag-new-name" placeholder="Nome da nova tag…" autocomplete="off" type="text">
              <input type="color" id="ldp-tag-new-color" value="#6366F1" class="ldp-tag-new-color" title="Cor da tag">
              <button id="ldp-tag-create-btn" class="ldp-tag-create-btn" type="button">Criar e adicionar</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;display:block;margin-bottom:4px;">ANOTAÇÕES</label>
        <textarea id="ldp-notes" class="form-input" rows="4" placeholder="Observações, interesses, próximos passos…" style="resize:vertical;">${escapeHTML(lead?.notes||'')}</textarea>
      </div>
      ${waNum ? (() => {
        const waTxt = encodeURIComponent(`Olá ${lead?.name ? lead.name.split(' ')[0] : ''}! Aqui é da ${getSetting('company.name','nossa imobiliária')}. Vi seu interesse em imóveis e gostaria de ajudá-lo. Posso falar agora?`)
        return `<a href="https://wa.me/${waNum}?text=${waTxt}" target="_blank" rel="noopener"
          style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25d366;color:#fff;text-decoration:none;border-radius:8px;padding:10px;font-size:13px;font-weight:700;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
          Iniciar conversa no WhatsApp
        </a>`
      })() : ''}
      <div id="ldp-msg" style="font-size:13px;min-height:18px;"></div>
    </div>
    <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;flex-shrink:0;">
      ${!isNew ? `<button id="ldp-delete" style="background:#fee2e2;color:#dc2626;border:none;border-radius:8px;padding:10px 16px;font-size:13px;font-weight:600;cursor:pointer;">🗑️ Excluir</button>` : ''}
      <button id="ldp-save" style="flex:1;background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 16px;font-size:14px;font-weight:700;cursor:pointer;">💾 Salvar</button>
    </div>
  `
  document.body.appendChild(panel)
  requestAnimationFrame(() => { panel.style.transform = 'translateX(0)' })
  _initTagPicker(panel, tags || [], kanbanTagMap)

  // Wire funil → etapa dynamic update
  const _pipeEl  = panel.querySelector('#ldp-pipe')
  const _stageEl = panel.querySelector('#ldp-stage')
  if (_pipeEl && _stageEl) {
    _pipeEl.addEventListener('change', () => {
      const pid = _pipeEl.value
      const stages = kanbanStages.filter(s => s.pipeline_id === pid)
      _stageEl.innerHTML = stages
        .map(s => `<option value="${s.name}">${s.name}</option>`)
        .join('') || '<option value="">— sem etapas —</option>'
    })
  }

  const close = () => {
    panel.style.transform = 'translateX(100%)'
    setTimeout(() => panel.remove(), 250)
  }
  document.getElementById('ldp-close').addEventListener('click', close)

  document.getElementById('ldp-save').addEventListener('click', async () => {
    const btn   = document.getElementById('ldp-save')
    const msgEl = document.getElementById('ldp-msg')
    const name  = document.getElementById('ldp-name').value.trim()
    if (!name) { msgEl.style.color='#ef4444'; msgEl.textContent='Nome é obrigatório.'; return }
    btn.disabled = true; btn.textContent = 'Salvando…'

    const selectedTags = [...panel.querySelectorAll('#ldp-tag-badge-area .ldp-tag-badge[data-tag]')].map(b => b.dataset.tag)
    const _selPipeEl = document.getElementById('ldp-pipe')
    const _selPipeId = _selPipeEl ? _selPipeEl.value : (leadPipeId || activePipeId)
    const row = {
      name,
      phone:       document.getElementById('ldp-phone').value.trim() || null,
      email:       document.getElementById('ldp-email').value.trim() || null,
      source:      document.getElementById('ldp-source').value.trim() || null,
      pipeline_id: _selPipeId || null,
      stage:       document.getElementById('ldp-stage')?.value || null,
      status:      document.getElementById('ldp-status')?.value || null,
      notes:       document.getElementById('ldp-notes').value.trim() || null,
      tags:        selectedTags,
      tenant_id:   getSettingsTenantId(),
    }

    let error
    if (isNew) {
      ;({ error } = await supabase.from('leads').insert(row))
    } else {
      ;({ error } = await supabase.from('leads').update(row).eq('id', lead.id))
    }

    btn.disabled = false; btn.textContent = '💾 Salvar'
    if (error) { msgEl.style.color='#ef4444'; msgEl.textContent='Erro: ' + error.message; return }
    msgEl.style.color='#22c55e'; msgEl.textContent='✅ Salvo!'
    setTimeout(() => { close(); loadKanbanLeads() }, 700)
  })

  document.getElementById('ldp-delete')?.addEventListener('click', async () => {
    if (!confirm(`Excluir o lead "${lead?.name}"?`)) return
    await supabase.from('leads').delete().eq('id', lead.id)
    close(); loadKanbanLeads()
  })
}

// ═══════════════════════════════════════════════════════════════════
// SEÇÃO TAREFAS
// SQL necessário:
// CREATE TABLE IF NOT EXISTS public.tasks (
//   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   tenant_id uuid REFERENCES tenants(id),
//   assigned_to uuid REFERENCES profiles(id),
//   lead_id uuid REFERENCES leads(id),
//   title text NOT NULL,
//   description text,
//   due_date date,
//   priority text DEFAULT 'medium',
//   status text DEFAULT 'pending',
//   created_at timestamptz DEFAULT now()
// );
// ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "tenant_tasks" ON public.tasks USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));
// ═══════════════════════════════════════════════════════════════════

let allTarefas = []
let tarefasInitialized = false
let tarefasFilter = 'pending'

async function initTarefasSection() {
  if (tarefasInitialized) return
  tarefasInitialized = true

  await loadTarefas()

  document.getElementById('btn-nova-tarefa')?.addEventListener('click', () => openTarefaModal())

  document.querySelectorAll('.tarefa-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tarefa-filter-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      tarefasFilter = btn.dataset.filter
      renderTarefas()
    })
  })
}

async function loadTarefas() {
  const list = document.getElementById('tarefas-list')
  if (list) list.innerHTML = '<div class="empty-row" style="padding:40px;text-align:center;color:#94a3b8;">Carregando…</div>'

  let query = supabase.from('tasks').select('*').order('due_date', { ascending: true, nullsFirst: false })
  if (currentProfile?.role === 'corretor') query = query.eq('assigned_to', currentProfile.id)
  else if (currentProfile?.tenant_id)     query = query.eq('tenant_id', currentProfile.tenant_id)

  const { data, error } = await query
  if (error) {
    // Tasks table may not exist yet — show setup message
    const list2 = document.getElementById('tarefas-list')
    if (list2) list2.innerHTML = `
      <div style="text-align:center;padding:40px;color:#94a3b8;">
        <div style="font-size:32px;margin-bottom:8px;">📋</div>
        <p style="margin-bottom:12px;">Para usar Tarefas, execute o SQL abaixo no Supabase:</p>
        <code style="font-size:11px;background:#f1f5f9;padding:8px 12px;border-radius:8px;display:block;text-align:left;white-space:pre;overflow-x:auto;">CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid,
  assigned_to uuid,
  title text NOT NULL,
  description text,
  due_date date,
  priority text DEFAULT 'medium',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tasks_access" ON public.tasks
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);</code>
      </div>`
    return
  }
  allTarefas = data || []
  renderTarefas()
}

function parseTarefaDate(due_date) {
  if (!due_date) return null
  // Handle both YYYY-MM-DD and full timestamps
  const d = due_date.includes('T') ? new Date(due_date) : new Date(due_date + 'T00:00:00')
  return isNaN(d.getTime()) ? null : d
}

function renderTarefas() {
  const list = document.getElementById('tarefas-list')
  if (!list) return

  let filtered = allTarefas
  if (tarefasFilter === 'pending')  filtered = allTarefas.filter(t => t.status !== 'done')
  if (tarefasFilter === 'done')     filtered = allTarefas.filter(t => t.status === 'done')

  if (!filtered.length) {
    list.innerHTML = `<div style="text-align:center;padding:40px;color:#94a3b8;">
      <div style="font-size:32px;margin-bottom:8px;">${tarefasFilter === 'done' ? '✅' : '📋'}</div>
      <p>${tarefasFilter === 'done' ? 'Nenhuma tarefa concluída.' : 'Nenhuma tarefa pendente.'}</p>
    </div>`
    return
  }

  const today = new Date(); today.setHours(0,0,0,0)
  list.innerHTML = filtered.map(t => {
    const dObj = parseTarefaDate(t.due_date)
    const due  = dObj ? dObj.toLocaleDateString('pt-BR') : ''
    const overdue = dObj && t.status !== 'done' && dObj < today
    return `
      <div class="tarefa-item${t.status === 'done' ? ' done' : ''}" data-id="${t.id}" style="cursor:pointer;">
        <input type="checkbox" class="tarefa-check" data-id="${t.id}" ${t.status === 'done' ? 'checked' : ''}>
        <div class="tarefa-body">
          <div class="tarefa-title">${escapeHTML(t.title)}</div>
          <div class="tarefa-meta">
            ${due ? `<span style="${overdue ? 'color:#ef4444;' : ''}">📅 ${due}${overdue ? ' (atrasada)' : ''}</span>` : ''}
            ${t.description ? `<span>${escapeHTML(t.description.substring(0, 60))}${t.description.length > 60 ? '…' : ''}</span>` : ''}
          </div>
        </div>
        <span class="tarefa-priority ${t.priority || 'medium'}">${t.priority === 'high' ? 'Alta' : t.priority === 'low' ? 'Baixa' : 'Média'}</span>
        <button class="tarefa-del-btn" data-id="${t.id}" title="Excluir">🗑️</button>
      </div>`
  }).join('')

  list.querySelectorAll('.tarefa-check').forEach(chk => {
    chk.addEventListener('change', async e => {
      e.stopPropagation()
      const id = chk.dataset.id
      const status = chk.checked ? 'done' : 'pending'
      await supabase.from('tasks').update({ status }).eq('id', id)
      const t = allTarefas.find(x => String(x.id) === id)
      if (t) t.status = status
      renderTarefas()
    })
  })

  list.querySelectorAll('.tarefa-del-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation()
      if (!confirm('Excluir esta tarefa?')) return
      await supabase.from('tasks').delete().eq('id', btn.dataset.id)
      allTarefas = allTarefas.filter(t => String(t.id) !== String(btn.dataset.id))
      renderTarefas()
    })
  })

  list.querySelectorAll('.tarefa-item').forEach(item => {
    item.addEventListener('click', e => {
      if (e.target.closest('.tarefa-check') || e.target.closest('.tarefa-del-btn')) return
      const id = item.dataset.id
      const t  = allTarefas.find(x => String(x.id) === id)
      if (t) openTarefaModal(t)
    })
  })
}

function openTarefaModal(tarefa = null) {
  const existing = document.getElementById('tarefa-modal-root')
  if (existing) existing.remove()

  const isEdit = !!tarefa
  const isDone = tarefa?.status === 'done'
  const dObj   = parseTarefaDate(tarefa?.due_date)
  const dueFmt = dObj ? dObj.toLocaleDateString('pt-BR') : ''
  const dueDateValue = tarefa?.due_date
    ? (tarefa.due_date.includes('T') ? tarefa.due_date.split('T')[0] : tarefa.due_date)
    : ''

  const wrap = document.createElement('div')
  wrap.id = 'tarefa-modal-root'
  wrap.className = 'modal-backdrop'
  wrap.innerHTML = `
    <div class="modal" style="max-width:520px;">
      <div class="modal-header">
        <h3 style="display:flex;align-items:center;gap:10px;">
          ${isDone ? '<span style="color:#22c55e;font-size:18px;">✅</span>' : '<span style="font-size:18px;">📋</span>'}
          ${isEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h3>
        <button class="modal-close" id="tm-close">✕</button>
      </div>
      <div class="modal-body" style="padding:24px;">
        ${isEdit && isDone ? `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 14px;margin-bottom:16px;color:#15803d;font-size:13px;font-weight:600;">✅ Tarefa concluída</div>` : ''}
        <form id="tarefa-form" style="display:flex;flex-direction:column;gap:16px;">
          <div class="form-group">
            <label class="form-label">Título *</label>
            <input name="title" required class="form-control" placeholder="Ex: Ligar para cliente…" value="${escapeHTML(tarefa?.title || '')}">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prazo</label>
              <input name="due_date" type="date" class="form-control" value="${dueDateValue}">
            </div>
            <div class="form-group">
              <label class="form-label">Prioridade</label>
              <select name="priority" class="form-control">
                <option value="low" ${tarefa?.priority === 'low' ? 'selected' : ''}>Baixa</option>
                <option value="medium" ${!tarefa?.priority || tarefa?.priority === 'medium' ? 'selected' : ''}>Média</option>
                <option value="high" ${tarefa?.priority === 'high' ? 'selected' : ''}>Alta</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Descrição</label>
            <textarea name="description" class="form-control" rows="4" placeholder="Detalhes, observações…">${escapeHTML(tarefa?.description || '')}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer" style="display:flex;gap:8px;justify-content:space-between;align-items:center;">
        <div style="display:flex;gap:8px;">
          ${isEdit ? `<button id="tm-toggle-done" style="padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:2px solid ${isDone ? '#94a3b8' : '#22c55e'};background:${isDone ? '#f8fafc' : '#f0fdf4'};color:${isDone ? '#64748b' : '#15803d'};">
            ${isDone ? '↩ Reabrir tarefa' : '✅ Marcar como Concluída'}
          </button>` : ''}
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="tm-cancel">Cancelar</button>
          <button class="btn-primary" id="tm-save" style="margin:0;">${isEdit ? 'Salvar' : 'Criar Tarefa'}</button>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(wrap)
  const close = () => wrap.remove()
  document.getElementById('tm-close')?.addEventListener('click', close)
  document.getElementById('tm-cancel')?.addEventListener('click', close)
  wrap.addEventListener('click', e => { if (e.target === wrap) close() })

  // Toggle concluída / reabrir
  document.getElementById('tm-toggle-done')?.addEventListener('click', async () => {
    const newStatus = isDone ? 'pending' : 'done'
    await supabase.from('tasks').update({ status: newStatus }).eq('id', tarefa.id)
    const t = allTarefas.find(x => String(x.id) === String(tarefa.id))
    if (t) t.status = newStatus
    close()
    // Se marcou como concluída, muda o filtro para "done"
    if (newStatus === 'done') {
      tarefasFilter = 'done'
      document.querySelectorAll('.tarefa-filter-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === 'done')
      })
    }
    renderTarefas()
  })

  document.getElementById('tm-save')?.addEventListener('click', async () => {
    const form = document.getElementById('tarefa-form')
    if (!form.checkValidity()) { form.reportValidity(); return }
    const fd = new FormData(form)
    const btn = document.getElementById('tm-save')
    btn.disabled = true; btn.textContent = 'Salvando…'

    const payload = {
      title:       fd.get('title')?.trim(),
      description: fd.get('description')?.trim() || null,
      due_date:    fd.get('due_date') || null,
      priority:    fd.get('priority') || 'medium',
      status:      tarefa?.status || 'pending',
      assigned_to: currentProfile?.id || null,
      tenant_id:   currentProfile?.tenant_id || null,
    }

    let error
    if (isEdit) {
      ;({ error } = await supabase.from('tasks').update(payload).eq('id', tarefa.id))
      if (!error) {
        const idx = allTarefas.findIndex(t => String(t.id) === String(tarefa.id))
        if (idx >= 0) allTarefas[idx] = { ...allTarefas[idx], ...payload }
      }
    } else {
      const { data, error: e } = await supabase.from('tasks').insert(payload).select()
      error = e
      if (!error && data?.[0]) allTarefas.unshift(data[0])
    }

    btn.disabled = false; btn.textContent = isEdit ? 'Salvar' : 'Criar Tarefa'
    if (error) { alert('Erro: ' + error.message); return }
    close()
    renderTarefas()
  })
}

// ═══════════════════════════════════════════════════════════════════
// PESQUISA GLOBAL
// ═══════════════════════════════════════════════════════════════════

async function runSearch(q) {
  const resultsEl = document.getElementById('search-results')
  if (!resultsEl) return
  if (!q || q.length < 2) {
    resultsEl.innerHTML = '<div class="search-hint">Digite para pesquisar…</div>'
    return
  }
  resultsEl.innerHTML = '<div class="search-hint">Buscando…</div>'

  const like = `%${q}%`
  let tenantFilter = {}
  const role = currentProfile?.role
  const tenantId = currentProfile?.tenant_id

  const [{ data: props }, { data: leads }] = await Promise.all([
    supabase.from('properties').select('id,title,reference,type,city').ilike('title', like).limit(5),
    supabase.from('leads').select('id,name,phone,email').or(`name.ilike.${like},phone.ilike.${like},email.ilike.${like}`).limit(5),
  ])

  const parts = []

  if (props?.length) {
    parts.push(`<div class="search-group-label">Imóveis</div>`)
    parts.push(...props.map(p => `
      <div class="search-result-item" data-type="property" data-id="${p.id}">
        <div class="search-result-icon">🏠</div>
        <div>
          <div class="search-result-title">${escapeHTML(p.title || '—')}</div>
          <div class="search-result-sub">${escapeHTML(p.reference || '')} · ${escapeHTML(p.city || '')}</div>
        </div>
      </div>`))
  }

  if (leads?.length) {
    parts.push(`<div class="search-group-label">Leads / Contatos</div>`)
    parts.push(...leads.map(l => `
      <div class="search-result-item" data-type="lead" data-id="${l.id}">
        <div class="search-result-icon">👤</div>
        <div>
          <div class="search-result-title">${escapeHTML(l.name || '—')}</div>
          <div class="search-result-sub">${escapeHTML(l.email || l.phone || '')}</div>
        </div>
      </div>`))
  }

  resultsEl.innerHTML = parts.length
    ? parts.join('')
    : '<div class="search-no-results">Nenhum resultado encontrado.</div>'

  // Click on result
  resultsEl.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', () => {
      document.getElementById('search-overlay')?.classList.add('hidden')
      if (item.dataset.type === 'lead') navigateToSection('contatos')
      else navigateToSection('properties')
    })
  })
}

// ═══════════════════════════════════════════════════════════════════
// NOTIFICAÇÕES
// ═══════════════════════════════════════════════════════════════════

let notifsRead = JSON.parse(localStorage.getItem('crm_notifs_read') || '[]')

async function loadNotifications() {
  const list = document.getElementById('notif-list')
  if (!list) return
  list.innerHTML = '<div class="notif-empty">Carregando…</div>'

  let query = supabase.from('leads').select('id,name,phone,created_at,source').order('created_at', { ascending: false }).limit(10)
  if (currentProfile?.tenant_id) query = query.eq('tenant_id', currentProfile.tenant_id)

  const { data } = await query
  const leads = data || []

  const unread = leads.filter(l => !notifsRead.includes(String(l.id)))
  const badge = document.getElementById('notif-badge')
  if (badge) {
    badge.textContent = unread.length
    unread.length > 0 ? badge.classList.remove('hidden') : badge.classList.add('hidden')
  }

  if (!leads.length) {
    list.innerHTML = '<div class="notif-empty">Nenhuma notificação.</div>'
    return
  }

  list.innerHTML = leads.map(l => {
    const ago = timeAgo(l.created_at)
    const isUnread = !notifsRead.includes(String(l.id))
    return `
      <div class="notif-item${isUnread ? ' unread' : ''}" data-id="${l.id}">
        <div class="notif-item-icon">👤</div>
        <div class="notif-item-body">
          <div class="notif-item-title">Novo lead: ${escapeHTML(l.name || '—')}</div>
          <div class="notif-item-sub">${escapeHTML(l.phone || l.source || '')} · ${ago}</div>
        </div>
      </div>`
  }).join('')

  list.innerHTML += `<div class="notif-footer"><a href="#" id="notif-see-all">Ver todos os leads</a></div>`
  document.getElementById('notif-see-all')?.addEventListener('click', e => { e.preventDefault(); closeAllDropdowns(); navigateToSection('contatos') })

  list.querySelectorAll('.notif-item').forEach(item => {
    item.addEventListener('click', () => {
      notifsRead.push(item.dataset.id)
      localStorage.setItem('crm_notifs_read', JSON.stringify(notifsRead))
      item.classList.remove('unread')
      closeAllDropdowns()
      navigateToSection('contatos')
    })
  })
}

function markNotifsRead() {
  document.querySelectorAll('.notif-item').forEach(item => notifsRead.push(item.dataset.id))
  notifsRead = [...new Set(notifsRead)]
  localStorage.setItem('crm_notifs_read', JSON.stringify(notifsRead))
  document.getElementById('notif-badge')?.classList.add('hidden')
  document.querySelectorAll('.notif-item').forEach(i => i.classList.remove('unread'))
}

function timeAgo(iso) {
  if (!iso) return ''
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60)    return 'agora'
  if (diff < 3600)  return `${Math.floor(diff/60)}min atrás`
  if (diff < 86400) return `${Math.floor(diff/3600)}h atrás`
  return `${Math.floor(diff/86400)}d atrás`
}

async function initNotifBadge() {
  let query = supabase.from('leads').select('id').order('created_at', { ascending: false }).limit(20)
  if (currentProfile?.tenant_id) query = query.eq('tenant_id', currentProfile.tenant_id)
  const { data } = await query
  const leads = data || []
  const unread = leads.filter(l => !notifsRead.includes(String(l.id)))
  const badge = document.getElementById('notif-badge')
  if (badge) {
    badge.textContent = unread.length
    unread.length > 0 ? badge.classList.remove('hidden') : badge.classList.add('hidden')
  }
}

// ═══════════════════════════════════════════════════════════════════
// SEÇÃO CONTATOS
// SQL necessário (rodar no Supabase SQL Editor):
// ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS company text;
// ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS job_title text;
// ═══════════════════════════════════════════════════════════════════

let allContatos = []
let contatosPage = 1
const CONTATOS_PER_PAGE = 10
let contatosInitialized = false

async function initContatosSection() {
  const sec = document.getElementById('section-contatos')
  if (!sec) return
  if (contatosInitialized) return
  contatosInitialized = true

  await loadContatos()

  document.getElementById('btn-contato-search')?.addEventListener('click', () => {
    contatosPage = 1
    renderContatos()
  })
  document.getElementById('contato-search')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') { contatosPage = 1; renderContatos() }
  })
  document.getElementById('btn-novo-contato')?.addEventListener('click', () => openContatoModal())
  document.getElementById('btn-import-contato')?.addEventListener('click', openImportModal)
  document.getElementById('import-modal-close')?.addEventListener('click', closeImportModal)
  document.getElementById('import-modal-cancel')?.addEventListener('click', closeImportModal)
  document.getElementById('download-template')?.addEventListener('click', e => {
    e.preventDefault()
    const csv = 'nome,email,telefone,empresa,cargo\nJoão Silva,joao@email.com,(47)99999-0000,Imobiliária ABC,Diretor'
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'modelo_contatos.csv'; a.click()
  })
  document.getElementById('import-csv-file')?.addEventListener('change', onCSVSelected)
  document.getElementById('import-modal-confirm')?.addEventListener('click', importCSV)
}

async function loadContatos() {
  const tbody = document.getElementById('contatos-tbody')
  if (tbody) tbody.innerHTML = '<tr><td colspan="8" class="empty-row">Carregando…</td></tr>'

  let query = supabase.from('leads').select('*').order('created_at', { ascending: false })

  const role = currentProfile?.role
  if (role === 'corretor') {
    query = query.eq('assigned_to', currentProfile.id)
  } else {
    if (currentProfile?.tenant_id) query = query.eq('tenant_id', currentProfile.tenant_id)
  }

  const { data } = await query
  allContatos = data || []
  renderContatos()
}

function renderContatos() {
  const search = (document.getElementById('contato-search')?.value || '').toLowerCase()
  const filtered = search
    ? allContatos.filter(c =>
        (c.name || '').toLowerCase().includes(search) ||
        (c.email || '').toLowerCase().includes(search) ||
        (c.phone || '').toLowerCase().includes(search)
      )
    : allContatos

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / CONTATOS_PER_PAGE))
  if (contatosPage > totalPages) contatosPage = totalPages
  const slice = filtered.slice((contatosPage - 1) * CONTATOS_PER_PAGE, contatosPage * CONTATOS_PER_PAGE)

  const tbody = document.getElementById('contatos-tbody')
  if (!tbody) return

  if (!slice.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-row">Nenhum contato encontrado.</td></tr>'
  } else {
    tbody.innerHTML = slice.map(c => `
      <tr>
        <td><input type="checkbox" class="contato-check" data-id="${c.id}"></td>
        <td>
          <a href="#" class="contato-name-link" data-id="${c.id}" style="color:#2563eb;font-weight:500;text-decoration:none;">${escapeHTML(c.name || '—')}</a>
        </td>
        <td>${escapeHTML(c.company || '')}</td>
        <td style="color:#64748b;font-size:13px;">${c.email ? escapeHTML(c.email) : '—'}</td>
        <td style="font-size:13px;">${c.phone ? escapeHTML(c.phone) : '—'}</td>
        <td style="font-size:13px;color:#64748b;">${escapeHTML(c.job_title || '')}</td>
        <td style="text-align:center;">
          <span style="background:#eff6ff;color:#2563eb;border-radius:12px;padding:2px 8px;font-size:12px;font-weight:600;">0</span>
        </td>
        <td style="display:flex;gap:6px;align-items:center;">
          ${(() => {
            const waNum = (c.phone || '').replace(/\D/g, '')
            if (!waNum) return ''
            const waTxt = encodeURIComponent(`Olá ${(c.name||'').split(' ')[0]}! Aqui é da ${getSetting('company.name','nossa imobiliária')}. Podemos conversar sobre seu interesse em imóveis?`)
            return `<a href="https://wa.me/${waNum}?text=${waTxt}" target="_blank" rel="noopener" title="WhatsApp"
              style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
            </a>`
          })()}
          <button class="icon-btn contato-edit-btn" data-id="${c.id}" title="Editar" style="color:#64748b;">
            ✏️
          </button>
        </td>
      </tr>
    `).join('')
  }

  // Pagination
  const pag = document.getElementById('contatos-pagination')
  if (pag) {
    const from = total === 0 ? 0 : (contatosPage - 1) * CONTATOS_PER_PAGE + 1
    const to = Math.min(contatosPage * CONTATOS_PER_PAGE, total)
    pag.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;font-size:13px;color:#64748b;">
        <span>Exibindo <strong>${from}–${to}</strong> de <strong>${total}</strong> contatos</span>
        <div style="display:flex;gap:8px;">
          <button class="btn-cancel" id="pag-prev" ${contatosPage <= 1 ? 'disabled' : ''} style="padding:4px 12px;font-size:13px;">Anterior</button>
          <span style="padding:4px 8px;">${contatosPage} / ${totalPages}</span>
          <button class="btn-cancel" id="pag-next" ${contatosPage >= totalPages ? 'disabled' : ''} style="padding:4px 12px;font-size:13px;">Próxima</button>
        </div>
      </div>
    `
    pag.querySelector('#pag-prev')?.addEventListener('click', () => { contatosPage--; renderContatos() })
    pag.querySelector('#pag-next')?.addEventListener('click', () => { contatosPage++; renderContatos() })
  }

  // Bind edit buttons + name links
  document.querySelectorAll('.contato-edit-btn, .contato-name-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault()
      const id = btn.dataset.id
      const c = allContatos.find(x => String(x.id) === String(id))
      if (c) openContatoModal(c)
    })
  })
}

async function openContatoModal(contato = null) {
  const existing = document.getElementById('contato-modal-root')
  if (existing) existing.remove()

  const isEdit = !!contato
  const tid = getSettingsTenantId()

  // Load pipelines, tags and statuses filtered by tenant
  const [{ data: pipes }, { data: tags }, { data: statuses }] = await Promise.all([
    supabase.from('crm_pipelines').select('*').eq('tenant_id', tid).order('sort_order'),
    supabase.from('crm_tags').select('*').eq('tenant_id', tid).order('name'),
    supabase.from('crm_lead_statuses').select('*').eq('tenant_id', tid).order('sort_order'),
  ])

  const pipeList   = pipes    || []
  const tagList    = tags      || []
  const statusList = statuses  || []

  // Load stages by pipeline IDs to avoid tenant_id NULL mismatch on older rows
  const pipeIds = pipeList.map(p => p.id)
  const { data: allStages } = pipeIds.length
    ? await supabase.from('crm_stages').select('*').in('pipeline_id', pipeIds).order('sort_order')
    : { data: [] }
  const stageList = allStages || []

  // Determine initial pipeline selection
  const initPipeId = contato?.pipeline_id || pipeList[0]?.id || ''

  function buildStageOptions(pipeId) {
    const stages = stageList.filter(s => s.pipeline_id === pipeId)
    if (!stages.length) return '<option value="">— Nenhuma etapa —</option>'
    return '<option value="">— Selecionar etapa —</option>' +
      stages.map(s => `<option value="${escapeHTML(s.name)}" ${contato?.stage === s.name ? 'selected' : ''}>${escapeHTML(s.name)}</option>`).join('')
  }

  const wrap = document.createElement('div')
  wrap.id = 'contato-modal-root'
  wrap.className = 'modal-backdrop'
  wrap.innerHTML = `
    <div class="modal" style="max-width:600px;max-height:90vh;display:flex;flex-direction:column;">
      <div class="modal-header" style="flex-shrink:0;">
        <h3>${isEdit ? 'Editar Contato' : 'Novo Contato'}</h3>
        <button class="modal-close" id="cm-close">✕</button>
      </div>
      <div class="modal-body" style="overflow-y:auto;flex:1;">
        <form id="contato-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nome *</label>
              <input name="name" required class="form-control" placeholder="Nome completo" value="${escapeHTML(contato?.name || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">Empresa</label>
              <input name="company" class="form-control" placeholder="Nome da empresa" value="${escapeHTML(contato?.company || '')}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">E-mail</label>
              <input name="email" type="email" class="form-control" placeholder="email@exemplo.com" value="${escapeHTML(contato?.email || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">Telefone</label>
              <input name="phone" class="form-control" placeholder="(47) 99999-0000" value="${escapeHTML(contato?.phone || '')}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Cargo</label>
              <input name="job_title" class="form-control" placeholder="Ex: Diretor, Investidor…" value="${escapeHTML(contato?.job_title || '')}">
            </div>
            <div class="form-group">
              <label class="form-label">Cidade de Interesse</label>
              <input name="city_interest" class="form-control" placeholder="Ex: Balneário Camboriú" value="${escapeHTML(contato?.city_interest || '')}">
            </div>
          </div>

          ${pipeList.length ? `
          <div style="border-top:1px solid #f1f5f9;margin:8px 0 12px;padding-top:14px;">
            <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.05em;margin-bottom:10px;">FUNIL DE NEGOCIAÇÃO</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Funil</label>
                <select id="cm-pipe" name="pipeline_id" class="form-control">
                  <option value="">— Sem funil —</option>
                  ${pipeList.map(p => `<option value="${p.id}" ${String(contato?.pipeline_id) === String(p.id) ? 'selected' : ''}>${escapeHTML(p.name)}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Etapa</label>
                <select id="cm-stage" name="stage" class="form-control">
                  ${buildStageOptions(initPipeId)}
                </select>
              </div>
            </div>
          </div>` : ''}

          ${statusList.length ? `
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Status</label>
              <select name="status" class="form-control">
                <option value="">— Sem status —</option>
                ${statusList.map(s => `<option value="${escapeHTML(s.name)}" ${contato?.status === s.name ? 'selected' : ''}>${escapeHTML(s.name)}</option>`).join('')}
              </select>
            </div>
          </div>` : ''}

          ${tagList.length ? `
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Tags</label>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;">
                ${tagList.map(t => `
                  <label style="display:flex;align-items:center;gap:5px;cursor:pointer;padding:5px 12px;border-radius:20px;background:${t.color}18;border:1.5px solid ${t.color}55;font-size:12px;font-weight:600;color:${t.color};transition:opacity .15s;">
                    <input type="checkbox" name="tag" value="${escapeHTML(t.name)}" style="margin:0;accent-color:${t.color};" ${(contato?.tags||[]).includes(t.name) ? 'checked' : ''}>
                    ${escapeHTML(t.name)}
                  </label>`).join('')}
              </div>
            </div>
          </div>` : ''}

          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${escapeHTML(contato?.notes || '')}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer" style="flex-shrink:0;">
        ${isEdit ? `<button class="btn-danger" id="cm-delete" style="margin-right:auto;">🗑️ Excluir</button>` : ''}
        <button class="btn-cancel" id="cm-cancel">Cancelar</button>
        <button class="btn-primary" id="cm-save" style="margin:0;">${isEdit ? 'Salvar' : 'Criar Contato'}</button>
      </div>
    </div>
  `
  document.body.appendChild(wrap)
  const close = () => wrap.remove()
  document.getElementById('cm-close')?.addEventListener('click', close)
  document.getElementById('cm-cancel')?.addEventListener('click', close)
  wrap.addEventListener('click', e => { if (e.target === wrap) close() })

  // Pipeline → stage cascade
  document.getElementById('cm-pipe')?.addEventListener('change', e => {
    const stageEl = document.getElementById('cm-stage')
    if (stageEl) stageEl.innerHTML = buildStageOptions(e.target.value)
  })

  document.getElementById('cm-delete')?.addEventListener('click', async () => {
    if (!confirm(`Excluir o contato "${contato?.name}"?`)) return
    await supabase.from('leads').delete().eq('id', contato.id)
    const idx = allContatos.findIndex(c => String(c.id) === String(contato.id))
    if (idx >= 0) allContatos.splice(idx, 1)
    close()
    renderContatos()
  })

  document.getElementById('cm-save')?.addEventListener('click', async () => {
    const form = document.getElementById('contato-form')
    if (!form.checkValidity()) { form.reportValidity(); return }
    const fd = new FormData(form)
    const btn = document.getElementById('cm-save')
    btn.disabled = true; btn.textContent = 'Salvando…'

    const selectedTags = fd.getAll('tag')
    const pipeId = fd.get('pipeline_id') || null

    const payload = {
      name:          fd.get('name')?.trim(),
      company:       fd.get('company')?.trim() || null,
      email:         fd.get('email')?.trim() || null,
      phone:         fd.get('phone')?.trim() || null,
      job_title:     fd.get('job_title')?.trim() || null,
      city_interest: fd.get('city_interest')?.trim() || null,
      notes:         fd.get('notes')?.trim() || null,
      pipeline_id:   pipeId,
      stage:         fd.get('stage') || null,
      status:        fd.get('status') || null,
      tags:          selectedTags,
      assigned_to:   currentProfile?.id || null,
      tenant_id:     currentProfile?.tenant_id || null,
      source:        contato?.source || 'manual',
    }

    let error
    if (isEdit) {
      ;({ error } = await supabase.from('leads').update(payload).eq('id', contato.id))
      if (!error) {
        const idx = allContatos.findIndex(c => String(c.id) === String(contato.id))
        if (idx >= 0) allContatos[idx] = { ...allContatos[idx], ...payload }
      }
    } else {
      const { data, error: e } = await supabase.from('leads').insert(payload).select()
      error = e
      if (!error && data?.[0]) allContatos.unshift(data[0])
    }

    btn.disabled = false; btn.textContent = isEdit ? 'Salvar' : 'Criar Contato'
    if (error) { alert('Erro: ' + error.message); return }
    close()
    renderContatos()
  })
}

let csvRows = []
function onCSVSelected(e) {
  const file = e.target.files[0]; if (!file) return
  const reader = new FileReader()
  reader.onload = ev => {
    const lines = ev.target.result.split('\n').filter(l => l.trim())
    csvRows = lines.slice(1).map(line => {
      const [nome, email, telefone, empresa, cargo] = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''))
      return { name: nome, email, phone: telefone, company: empresa, job_title: cargo }
    }).filter(r => r.name)
    const preview = document.getElementById('import-preview')
    if (preview) preview.textContent = `${csvRows.length} contato(s) encontrados para importar.`
    const btn = document.getElementById('import-modal-confirm')
    if (btn) btn.disabled = csvRows.length === 0
  }
  reader.readAsText(file)
}

async function importCSV() {
  if (!csvRows.length) return
  const btn = document.getElementById('import-modal-confirm')
  if (btn) { btn.disabled = true; btn.textContent = 'Importando…' }
  const rows = csvRows.map(r => ({
    ...r,
    stage: 'novo', source: 'importado',
    assigned_to: currentProfile?.id || null,
    tenant_id: currentProfile?.tenant_id || null,
  }))
  const { error } = await supabase.from('leads').insert(rows)
  if (btn) { btn.disabled = false; btn.textContent = 'Importar' }
  if (error) { alert('Erro na importação: ' + error.message); return }
  closeImportModal()
  await loadContatos()
  alert(`${rows.length} contato(s) importados com sucesso!`)
}

function openImportModal() {
  const m = document.getElementById('import-modal')
  if (m) m.classList.remove('hidden')
  csvRows = []
  const prev = document.getElementById('import-preview'); if (prev) prev.textContent = ''
  const btn = document.getElementById('import-modal-confirm'); if (btn) btn.disabled = true
  const fi = document.getElementById('import-csv-file'); if (fi) fi.value = ''
}
function closeImportModal() {
  const m = document.getElementById('import-modal'); if (m) m.classList.add('hidden')
}

// ─── Edge Function helper ────────────────────────────────────────────────────
const EDGE_FN_URL = 'https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/invite-user'

async function callEdgeFunction(body) {
  const res = await fetch(EDGE_FN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  return res.json()
}

// ─── Settings: profile edit + corretores ─────────────────────────────────────
async function initSettings(profile) {
  const nameInput  = document.getElementById('settings-name')
  const emailInput = document.getElementById('settings-email')
  const avatarImg  = document.getElementById('settings-avatar-preview')
  const avatarInit = document.getElementById('settings-avatar-initial')
  const avatarFile = document.getElementById('settings-avatar-input')
  const saveBtn    = document.getElementById('settings-save-profile')
  if (!nameInput) return

  nameInput.value = profile?.name || ''
  if (emailInput) {
    const { data: { user } } = await supabase.auth.getUser()
    emailInput.value = user?.email || ''
  }

  const initial = (profile?.name || '?')[0].toUpperCase()
  if (avatarInit) avatarInit.textContent = initial
  if (profile?.avatar_url && avatarImg) {
    avatarImg.src = profile.avatar_url; avatarImg.style.display = ''
    if (avatarInit) avatarInit.style.display = 'none'
  }

  avatarFile?.addEventListener('change', e => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    if (avatarImg) { avatarImg.src = url; avatarImg.style.display = '' }
    if (avatarInit) avatarInit.style.display = 'none'
  })

  // Card Alterar Senha
  document.getElementById('btn-change-password')?.addEventListener('click', async () => {
    const nova     = document.getElementById('change-password-new')?.value || ''
    const confirma = document.getElementById('change-password-confirm')?.value || ''
    const msgEl    = document.getElementById('change-password-msg')
    const btn      = document.getElementById('btn-change-password')
    if (msgEl) msgEl.style.display = 'none'
    if (nova.length < 6) {
      if (msgEl) { msgEl.textContent = 'Mínimo 6 caracteres.'; msgEl.style.display = '' }
      return
    }
    if (nova !== confirma) {
      if (msgEl) { msgEl.textContent = 'As senhas não coincidem.'; msgEl.style.display = '' }
      return
    }
    if (btn) { btn.disabled = true; btn.textContent = 'Salvando…' }
    const { error } = await supabase.auth.updateUser({ password: nova })
    if (btn) { btn.disabled = false; btn.textContent = 'Salvar Nova Senha' }
    if (error) {
      if (msgEl) { msgEl.textContent = 'Erro: ' + error.message; msgEl.style.display = '' }
    } else {
      if (msgEl) { msgEl.style.color = '#16a34a'; msgEl.textContent = 'Senha alterada com sucesso!'; msgEl.style.display = '' }
      document.getElementById('change-password-new').value = ''
      document.getElementById('change-password-confirm').value = ''
    }
  })

  saveBtn?.addEventListener('click', async () => {
    const name = nameInput.value.trim()
    let avatar_url = currentProfile?.avatar_url || ''
    const file = avatarFile?.files[0]
    const orig = saveBtn.textContent
    saveBtn.disabled = true; saveBtn.textContent = 'Salvando…'

    if (file) {
      try {
        const blob = await compressToBlob(file, 400, 0.85)
        const path = `avatars/${currentProfile.id}-${Date.now()}.jpg`
        const { error: upErr } = await supabase.storage.from('imoveis')
          .upload(path, blob, { contentType: 'image/jpeg', upsert: true })
        if (!upErr) {
          const { data: { publicUrl } } = supabase.storage.from('imoveis').getPublicUrl(path)
          avatar_url = publicUrl
        }
      } catch (err) { console.error('Avatar upload:', err) }
    }

    const { error } = await supabase.from('profiles').update({ name, avatar_url }).eq('id', currentProfile.id)
    saveBtn.disabled = false; saveBtn.textContent = orig
    if (error) { alert('Erro ao salvar perfil.'); return }
    currentProfile = { ...currentProfile, name, avatar_url }
    renderSidebarUser(currentProfile)
    const sInit = document.getElementById('settings-avatar-initial')
    if (sInit) sInit.textContent = name[0]?.toUpperCase() || '?'
  })

  if (profile?.role === 'admin' || profile?.role === 'super_admin') {
    const section = document.getElementById('settings-corretores-section')
    if (section) section.style.display = ''
    await loadCorretores()
    document.getElementById('btn-invite-corretor')?.addEventListener('click', async () => {
      const email    = document.getElementById('invite-email')?.value.trim()
      const password = document.getElementById('invite-password')?.value.trim()
      const btn      = document.getElementById('btn-invite-corretor')
      const noteEl   = document.getElementById('invite-note')
      if (!email) { alert('Informe o e-mail do corretor.'); return }
      if (!password || password.length < 6) { alert('A senha precisa ter no mínimo 6 caracteres.'); return }
      if (btn) { btn.disabled = true; btn.textContent = 'Criando…' }
      if (noteEl) { noteEl.style.display = 'none' }
      try {
        const result = await callEdgeFunction({
          email,
          password,
          tenant_id: currentProfile?.tenant_id || null,
        })
        if (result.success) {
          const emailInput = document.getElementById('invite-email')
          const passInput  = document.getElementById('invite-password')
          if (emailInput) emailInput.value = ''
          if (passInput)  passInput.value  = ''
          await loadCorretores()

          if (noteEl) {
            if (result.email_sent === false) {
              noteEl.innerHTML = `
                ✅ Acesso criado!
                <span style="color:#ef4444;">⚠️ E-mail não enviado automaticamente.</span><br>
                Compartilhe manualmente:<br>
                <strong>E-mail:</strong> ${escapeHTML(email)}<br>
                <strong>Senha:</strong> ${escapeHTML(password)}`
              noteEl.style.color = '#0f172a'
            } else {
              noteEl.textContent = '✅ Acesso criado! O corretor receberá um e-mail com o login e a senha.'
              noteEl.style.color = '#16a34a'
            }
            noteEl.style.display = ''
          }
        } else {
          alert('Erro: ' + (result.error || 'Falha desconhecida'))
        }
      } catch (err) {
        alert('Erro ao criar acesso: ' + err.message)
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = '+ Criar Acesso' }
      }
    })

    const locSection = document.getElementById('settings-locations-section')
    if (locSection) locSection.style.display = ''
    await renderLocationsSettings()

    document.getElementById('loc-add-city-btn')?.addEventListener('click', async () => {
      const input = document.getElementById('loc-new-city')
      const name  = input?.value.trim()
      if (!name) return
      const { error } = await supabase.from('locations').insert({ type: 'cidade', name })
      if (error) { alert('Erro ao adicionar cidade.'); return }
      if (input) input.value = ''
      await renderLocationsSettings()
      populateAdminCitySelect()
    })

    document.getElementById('loc-add-neighborhood-btn')?.addEventListener('click', async () => {
      const cityId = parseInt(document.getElementById('loc-new-neighborhood-city')?.value, 10)
      const input  = document.getElementById('loc-new-neighborhood')
      const name   = input?.value.trim()
      if (!cityId || !name) { alert('Selecione a cidade e informe o nome do bairro.'); return }
      const { error } = await supabase.from('locations').insert({ type: 'bairro', name, parent_id: cityId })
      if (error) { alert('Erro ao adicionar bairro.'); return }
      if (input) input.value = ''
      await renderLocationsSettings()
    })
  }
}

async function loadCorretores() {
  const listEl = document.getElementById('corretores-list')
  if (!listEl) return
  let query = supabase.from('profiles').select('*').order('created_at')
  if (currentProfile?.tenant_id) query = query.eq('tenant_id', currentProfile.tenant_id)
  const { data, error } = await query
  if (error || !data) { listEl.innerHTML = '<p style="color:#6b7280;font-size:14px">Erro ao carregar.</p>'; return }
  listEl.innerHTML = data.map(p => {
    const initial = (p.name || '?')[0].toUpperCase()
    const avatar  = p.avatar_url
      ? `<img src="${p.avatar_url}" class="corretor-avatar" alt="">`
      : `<div class="corretor-avatar-initial">${escapeHTML(initial)}</div>`
    const isMe   = p.id === currentProfile?.id
    const isActive = p.active !== false
    const activeBadge = isActive
      ? '<span class="badge badge-green">Ativo</span>'
      : '<span class="badge badge-gray">Pausado</span>'
    const roleSelect = isMe
      ? `<span class="corretor-you">Você</span>`
      : `<select class="form-control corretor-role-sel" data-uid="${p.id}" style="width:110px;padding:6px 8px;font-size:13px">
           <option value="corretor"${p.role === 'corretor' ? ' selected' : ''}>Corretor</option>
           <option value="admin"${p.role === 'admin' ? ' selected' : ''}>Admin</option>
         </select>`
    const toggleBtn = isMe ? '' : isActive
      ? `<button class="corretor-toggle-btn" data-uid="${p.id}" data-active="true">Pausar acesso</button>`
      : `<button class="corretor-toggle-btn btn-liberar" data-uid="${p.id}" data-active="false">Liberar acesso</button>`
    const deleteBtn = isMe ? '' :
      `<button class="corretor-del-btn icon-btn" data-uid="${p.id}" title="Excluir corretor">🗑️</button>`
    return `<div class="corretor-item">
      <div class="corretor-info">
        ${avatar}
        <div>
          <div class="corretor-name">${escapeHTML(p.name || '—')}</div>
          <div class="corretor-role-badge">${p.role === 'super_admin' ? '⚡ Super Admin' : p.role === 'admin' ? '👑 Admin' : '🔑 Corretor'}</div>
        </div>
      </div>
      <div class="corretor-actions">
        ${activeBadge}
        ${roleSelect}
        ${toggleBtn}
        ${deleteBtn}
      </div>
    </div>`
  }).join('')
  listEl.querySelectorAll('.corretor-role-sel').forEach(sel => {
    sel.addEventListener('change', async () => {
      await supabase.from('profiles').update({ role: sel.value }).eq('id', sel.dataset.uid)
    })
  })
  listEl.querySelectorAll('.corretor-toggle-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const uid      = btn.dataset.uid
      const isActive = btn.dataset.active === 'true'
      btn.disabled = true
      btn.textContent = 'Aguarde…'
      try {
        const result = await callEdgeFunction({ action: 'toggle', userId: uid, active: !isActive })
        if (!result.success) alert('Erro: ' + (result.error || 'Falha desconhecida'))
      } catch (err) {
        alert('Erro: ' + err.message)
      }
      await loadCorretores()
    })
  })
  listEl.querySelectorAll('.corretor-del-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const uid  = btn.dataset.uid
      const name = btn.closest('.corretor-item')?.querySelector('.corretor-name')?.textContent || 'este corretor'
      if (!confirm(`Excluir "${name}"? Esta ação não pode ser desfeita.`)) return
      btn.disabled = true
      try {
        const result = await callEdgeFunction({ action: 'delete', userId: uid })
        if (!result.success) alert('Erro ao excluir: ' + (result.error || 'Falha desconhecida'))
      } catch (err) {
        alert('Erro: ' + err.message)
      }
      await loadCorretores()
    })
  })
}



// ─── Locations: CRUD no Supabase ─────────────────────────────────────────────
async function loadLocations() {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('name')
  if (error) { console.error('loadLocations:', error); return [] }
  cachedLocations = data || []
  return cachedLocations
}

function getCities() {
  return cachedLocations.filter(l => l.type === 'cidade')
}

function getNeighborhoods(cityId) {
  return cachedLocations.filter(l => l.type === 'bairro' && l.parent_id === cityId)
}

function populateAdminCitySelect() {
  const citySel = document.getElementById('adminCitySelect')
  if (!citySel) return
  const current = citySel.value
  const cities  = getCities()
  citySel.innerHTML = '<option value="">Selecione</option>' +
    cities.map(c => `<option value="${c.name}">${escapeHTML(c.name)}</option>`).join('')
  if (current) citySel.value = current
}

async function renderLocationsSettings() {
  await loadLocations()
  const cities    = getCities()
  const citiesEl  = document.getElementById('loc-cities-list')
  const neighsEl  = document.getElementById('loc-neighborhoods-list')
  const neighCity = document.getElementById('loc-new-neighborhood-city')
  if (!citiesEl || !neighsEl) return

  citiesEl.innerHTML = cities.length
    ? cities.map(c => `
        <div class="loc-item">
          <span class="loc-item-name">${escapeHTML(c.name)}</span>
          <button class="loc-del-btn" data-id="${c.id}" title="Excluir">✕</button>
        </div>`).join('')
    : '<p class="loc-empty">Nenhuma cidade cadastrada.</p>'

  const allNeigh = cachedLocations.filter(l => l.type === 'bairro')
  neighsEl.innerHTML = allNeigh.length
    ? allNeigh.map(n => {
        const city = cities.find(c => c.id === n.parent_id)
        return `
          <div class="loc-item">
            <div>
              <div class="loc-item-name">${escapeHTML(n.name)}</div>
              ${city ? `<div class="loc-item-sub">${escapeHTML(city.name)}</div>` : ''}
            </div>
            <button class="loc-del-btn" data-id="${n.id}" title="Excluir">✕</button>
          </div>`
      }).join('')
    : '<p class="loc-empty">Nenhum bairro cadastrado.</p>'

  if (neighCity) {
    neighCity.innerHTML = '<option value="">Cidade…</option>' +
      cities.map(c => `<option value="${c.id}">${escapeHTML(c.name)}</option>`).join('')
  }

  citiesEl.querySelectorAll('.loc-del-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const name = btn.closest('.loc-item').querySelector('.loc-item-name').textContent
      if (!confirm(`Excluir "${name}" e todos os bairros vinculados?`)) return
      const { error } = await supabase.from('locations').delete().eq('id', btn.dataset.id)
      if (error) { alert('Erro ao excluir.'); return }
      await renderLocationsSettings()
      populateAdminCitySelect()
    })
  })

  neighsEl.querySelectorAll('.loc-del-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Excluir este bairro?')) return
      const { error } = await supabase.from('locations').delete().eq('id', btn.dataset.id)
      if (error) { alert('Erro ao excluir.'); return }
      await renderLocationsSettings()
    })
  })
}

function attachAdminUI() {
  // Filter panel
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-btns')
      const wasActive = btn.classList.contains('active')
      group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
      if (!wasActive) btn.classList.add('active')
    })
  })

  document.getElementById('f-city')?.addEventListener('change', () => {
    const cityName = document.getElementById('f-city')?.value
    const cityObj  = getCities().find(c => c.name === cityName)
    const hoods    = cityObj ? getNeighborhoods(cityObj.id) : []
    const sel      = document.getElementById('f-neighborhood')
    if (sel) {
      sel.innerHTML = '<option value="">Todos</option>' +
        hoods.map(n => `<option value="${n.name}">${escapeHTML(n.name)}</option>`).join('')
    }
  })

  document.getElementById('f-search-btn')?.addEventListener('click', () => {
    renderAdminTable(applyAdminFilters(cachedProperties))
  })

  document.getElementById('f-clear-btn')?.addEventListener('click', () => {
    const panel = document.querySelector('.admin-filter-panel')
    if (panel) {
      // Clear every text/number input inside the filter panel
      panel.querySelectorAll('input[type="text"], input[type="number"]').forEach(el => { el.value = '' })
      // Reset every select to first option
      panel.querySelectorAll('select').forEach(el => { el.selectedIndex = 0 })
      // Rebuild neighborhood options (depends on city select)
      const neigh = document.getElementById('f-neighborhood')
      if (neigh) neigh.innerHTML = '<option value="">Todos</option>'
      // Deactivate toggle buttons (dormitórios, suítes, vagas)
      panel.querySelectorAll('.filter-btn.active').forEach(b => b.classList.remove('active'))
    }
    renderAdminTable(cachedProperties)
  })

  // Top nav navigation — main links and dropdown items
  document.querySelectorAll('.topnav-link[data-section], .topnav-dropdown-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
      navigateToSection(item.dataset.section)
    })
  })

  // Legacy: keep .nav-item[data-section] support in case any are still in DOM
  document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
      navigateToSection(item.dataset.section)
    })
  })

  // Mobile hamburger toggle
  const topnavLinks = document.getElementById('topnav-links')
  const hamburger   = document.getElementById('topnav-hamburger')
  hamburger?.addEventListener('click', () => { topnavLinks?.classList.toggle('open') })

  // Mobile: Configurações dropdown toggle (hover doesn't work on touch)
  document.querySelectorAll('.topnav-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      const dropdown = btn.closest('.topnav-dropdown')
      const isOpen = dropdown?.classList.toggle('open')
      // Close other dropdowns
      document.querySelectorAll('.topnav-dropdown').forEach(d => {
        if (d !== dropdown) d.classList.remove('open')
      })
    })
  })
  // Close dropdown on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.topnav-dropdown').forEach(d => d.classList.remove('open'))
  })

  // Modal close
  document.getElementById('modal-close')?.addEventListener('click', closeModal)
  document.getElementById('modal-cancel')?.addEventListener('click', closeModal)
  document.getElementById('property-modal')?.addEventListener('click', e => {
    if (e.target.id === 'property-modal') closeModal()
  })

  // Novo Imóvel button
  document.getElementById('btn-new-property')?.addEventListener('click', () => {
    editingId = null
    document.getElementById('property-form').reset()
    document.getElementById('adminPublished').value = 'true'
    document.getElementById('adminNeighborhood').innerHTML = '<option value="">Selecione a cidade primeiro</option>'
    document.getElementById('form-submit-btn').textContent = 'Salvar Imóvel'
    selectedCover = ''
    renderCoverPicker([])
    openModal('Novo Imóvel')
  })

  // Logout
  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await supabase.auth.signOut()
    location.reload()
  })

  // View modal — nav arrows
  document.getElementById('view-prev')?.addEventListener('click', () => {
    viewIdx = (viewIdx - 1 + viewImages.length) % viewImages.length
    renderViewGallery()
  })
  document.getElementById('view-next')?.addEventListener('click', () => {
    viewIdx = (viewIdx + 1) % viewImages.length
    renderViewGallery()
  })

  // View modal — close
  document.getElementById('view-modal-close')?.addEventListener('click', closeViewModal)
  document.getElementById('view-modal-close2')?.addEventListener('click', closeViewModal)
  document.getElementById('view-modal')?.addEventListener('click', e => {
    if (e.target.id === 'view-modal') closeViewModal()
  })

  // View modal — Edit button opens edit modal
  // ── Botão Compartilhar ─────────────────────────────────────────────
  document.getElementById('view-modal-share')?.addEventListener('click', () => {
    const sharePanel = document.getElementById('share-panel')
    if (!sharePanel) return
    const isOpen = sharePanel.style.display !== 'none'
    sharePanel.style.display = isOpen ? 'none' : 'block'
  })

  document.getElementById('share-whatsapp')?.addEventListener('click', () => {
    const link = document.getElementById('share-link-input')?.value
    if (!link) return
    const pid = Number(document.getElementById('share-panel')?.dataset.pid)
    const p = cachedProperties.find(x => x.id === pid)
    const title = p?.title || document.getElementById('view-modal-title')?.textContent || 'Imóvel'
    const price = p?.price ? ` — ${formatPrice(p.price, 'pt')}` : ''
    const ref   = p?.reference ? ` | Ref: ${p.reference}` : ''
    const loc   = [p?.neighborhood, p?.city].filter(Boolean).join(', ')
    const locLine = loc ? `\n📍 ${loc}` : ''
    const msg = encodeURIComponent(`Olha esse imóvel que encontrei: *${title}*${price}${ref}${locLine}\n\n${link}`)
    window.open('https://wa.me/?text=' + msg, '_blank')
  })

  document.getElementById('share-instagram')?.addEventListener('click', () => {
    const link = document.getElementById('share-link-input')?.value
    if (!link) return
    navigator.clipboard?.writeText(link)
    alert('Link copiado! Cole na bio ou nos Stories do Instagram.')
  })

  document.getElementById('share-email')?.addEventListener('click', () => {
    const link = document.getElementById('share-link-input')?.value
    if (!link) return
    const title = document.getElementById('view-modal-title')?.textContent || 'Imóvel'
    const subject = encodeURIComponent('Imóvel: ' + title)
    const body = encodeURIComponent('Olá! Segue o link do imóvel:\n\n' + link)
    window.open('mailto:?subject=' + subject + '&body=' + body, '_blank')
  })

  document.getElementById('share-copy')?.addEventListener('click', () => {
    const input = document.getElementById('share-link-input')
    if (!input) return
    navigator.clipboard?.writeText(input.value).then(() => {
      const btn = document.getElementById('share-copy')
      const orig = btn.textContent
      btn.textContent = '✅ Copiado!'
      setTimeout(() => { btn.textContent = orig }, 2000)
    })
  })

  document.getElementById('view-modal-edit')?.addEventListener('click', () => {
    if (currentProfile?.role !== 'admin' && currentProfile?.role !== 'super_admin') return
    const pid = Number(document.getElementById('view-modal-edit').dataset.pid)
    const p = cachedProperties.find(x => x.id === pid)
    if (!p) return
    closeViewModal()
    // simulate edit-btn click
    editingId = p.id
    const form      = document.getElementById('property-form')
    const submitBtn = document.getElementById('form-submit-btn')
    submitBtn.textContent = 'Salvar Alterações'
    form.querySelector('[name="title"]').value       = p.title || ''
    form.querySelector('[name="rua"]').value         = p.rua || ''
    form.querySelector('[name="numero"]').value      = p.numero || ''
    form.querySelector('[name="city"]').value        = p.city || ''
    form.querySelector('[name="price"]').value       = p.price || ''
    form.querySelector('[name="bedrooms"]').value    = p.bedrooms || ''
    form.querySelector('[name="suites"]').value      = p.suites || ''
    form.querySelector('[name="parking"]').value     = p.parking || ''
    form.querySelector('[name="description"]').value = p.description || ''
    form.querySelector('[name="construction_status"]').value = p.construction_status || ''
    form.querySelector('[name="owner_name"]').value  = p.owner_name || ''
    form.querySelector('[name="owner_phone"]').value = p.owner_phone || ''
    form.querySelector('[name="owner_email"]').value = p.owner_email || ''
    form.querySelector('[name="owner_notes"]').value = p.owner_notes || ''
    form.querySelector('[name="condominium"]').value = p.condominium || ''
    const pubSel = document.getElementById('adminPublished')
    if (pubSel) pubSel.value = p.published === true ? 'true' : 'false'
    const citySel = document.getElementById('adminCitySelect')
    if (citySel) {
      citySel.value = p.city || ''
      citySel.dispatchEvent(new Event('change'))
      setTimeout(() => {
        const neighSel = document.getElementById('adminNeighborhood')
        if (neighSel) neighSel.value = p.neighborhood || ''
      }, 50)
    }
    selectedCover = p.cover_image || p.images?.[0] || ''
    renderCoverPicker(p.images || [])
    openModal('Editar Imóvel')
  })

  // View modal — tabs
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'))
      document.getElementById(`tab-${btn.dataset.tab}`)?.classList.remove('hidden')
    })
  })

  // Table row click → open view modal
  document.getElementById('admin-properties')?.addEventListener('click', e => {
    if (e.target.closest('.action-btns')) return
    const row = e.target.closest('tr')
    if (!row) return
    // Usa data-id da linha (funciona para admin e corretor)
    const id = Number(row.dataset.id)
    if (!id) return
    const p = cachedProperties.find(x => x.id === id)
    if (p) openViewModal(p)
  })
}


// ─── DEPOIMENTOS ─────────────────────────────────────────────────────────────
async function initDepoimentosSection() {
  const section = document.getElementById('section-depoimentos')
  if (!section || section.dataset.loaded) return
  section.dataset.loaded = '1'

  // Load saved testimonials
  const { data: rows } = await supabase
    .from('site_content')
    .select('value_pt')
    .eq('key', 'testimonials')
    .eq('tenant_id', getSettingsTenantId())
    .maybeSingle()

  let deps = []
  try { deps = JSON.parse(rows?.value_pt || '[]') } catch(e) { deps = [] }

  function avatarColor(name) {
    const colors = ['#0d2144','#1a3a5c','#0a1628','#164a3c','#2d1b3d','#3d1a1a','#1a2f4a']
    let h = 0; for (const c of (name||'?')) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff
    return colors[Math.abs(h) % colors.length]
  }

  function renderList() {
    const msgEl = section.querySelector('#dep-save-msg')
    section.innerHTML = `
      <div class="section-topbar">
        <div>
          <div class="section-title">Depoimentos</div>
          <div class="section-sub">Gerencie os depoimentos exibidos no site público</div>
        </div>
        <button class="btn-primary" id="dep-add-btn">+ Novo Depoimento</button>
      </div>

      <div id="dep-list" style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;max-width:800px">
        ${deps.length === 0 ? '<p style="color:#94a3b8;font-size:14px">Nenhum depoimento cadastrado ainda.</p>' :
          deps.map((d, i) => `
            <div class="dep-admin-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px">
              <div style="width:40px;height:40px;border-radius:50%;background:${avatarColor(d.name)};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0">${(d.name||'?')[0].toUpperCase()}</div>
              <div style="flex:1;min-width:0">
                <div style="color:#f59e0b;font-size:14px;margin-bottom:4px">${'★'.repeat(d.stars||5)}</div>
                <p style="color:#374151;font-size:14px;line-height:1.5;margin:0 0 6px;font-style:italic">"${escapeHTML(d.text||'')}"</p>
                <div style="font-weight:600;font-size:13px;color:#0f172a">${escapeHTML(d.name||'')}</div>
                <div style="font-size:12px;color:#64748b">${escapeHTML(d.role||'')}</div>
              </div>
              <div style="display:flex;gap:8px;flex-shrink:0">
                <button class="btn-cancel" data-edit="${i}" style="padding:6px 12px;font-size:12px">Editar</button>
                <button class="icon-btn del-btn" data-del="${i}" style="background:#fee2e2;color:#dc2626;border:none" title="Remover"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg></button>
              </div>
            </div>`).join('')
        }
      </div>

      <div id="dep-form-wrap" style="display:none;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:12px;padding:24px;max-width:600px;margin-bottom:24px">
        <h3 id="dep-form-title" style="margin:0 0 16px;font-size:16px;color:#0f172a">Novo Depoimento</h3>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div>
            <label class="form-label">Avaliação</label>
            <select id="dep-stars" class="form-control" style="max-width:180px">
              <option value="5">★★★★★ (5 estrelas)</option>
              <option value="4">★★★★☆ (4 estrelas)</option>
              <option value="3">★★★☆☆ (3 estrelas)</option>
            </select>
          </div>
          <div>
            <label class="form-label">Depoimento <span style="color:#94a3b8;font-size:11px">(sem aspas)</span></label>
            <textarea id="dep-text" class="form-control" rows="3" placeholder="O Isaac foi muito além do esperado..."></textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div>
              <label class="form-label">Nome</label>
              <input id="dep-name" class="form-control" placeholder="Fernando Almeida">
            </div>
            <div>
              <label class="form-label">Cargo / Cidade</label>
              <input id="dep-role" class="form-control" placeholder="Investidor — São Paulo, SP">
            </div>
          </div>
          <div style="display:flex;gap:10px;margin-top:4px">
            <button class="btn-primary" id="dep-form-save">Salvar</button>
            <button class="btn-cancel" id="dep-form-cancel">Cancelar</button>
            <span id="dep-save-msg" class="cfg-save-msg" style="display:none;align-self:center"></span>
          </div>
        </div>
      </div>
    `
    section.dataset.loaded = '1'

    let editIdx = -1

    function openForm(idx = -1) {
      editIdx = idx
      const formWrap = section.querySelector('#dep-form-wrap')
      formWrap.style.display = ''
      section.querySelector('#dep-form-title').textContent = idx >= 0 ? 'Editar Depoimento' : 'Novo Depoimento'
      const d = idx >= 0 ? deps[idx] : {}
      section.querySelector('#dep-stars').value = String(d.stars || 5)
      section.querySelector('#dep-text').value  = d.text || ''
      section.querySelector('#dep-name').value  = d.name || ''
      section.querySelector('#dep-role').value  = d.role || ''
      section.querySelector('#dep-text').focus()
    }

    section.querySelector('#dep-add-btn').addEventListener('click', () => openForm(-1))
    section.querySelector('#dep-form-cancel').addEventListener('click', () => {
      section.querySelector('#dep-form-wrap').style.display = 'none'
      editIdx = -1
    })

    section.addEventListener('click', e => {
      const editBtn = e.target.closest('[data-edit]')
      const delBtn  = e.target.closest('[data-del]')
      if (editBtn) openForm(parseInt(editBtn.dataset.edit))
      if (delBtn) {
        const i = parseInt(delBtn.dataset.del)
        if (confirm('Remover este depoimento?')) {
          deps.splice(i, 1)
          saveDeps().then(() => renderList())
        }
      }
    })

    section.querySelector('#dep-form-save').addEventListener('click', async () => {
      const btn  = section.querySelector('#dep-form-save')
      const msgEl = section.querySelector('#dep-save-msg')
      const text = section.querySelector('#dep-text').value.trim()
      const name = section.querySelector('#dep-name').value.trim()
      const role = section.querySelector('#dep-role').value.trim()
      const stars = parseInt(section.querySelector('#dep-stars').value)
      if (!text || !name) { alert('Preencha o depoimento e o nome.'); return }
      btn.disabled = true; btn.textContent = 'Salvando…'
      const dep = { stars, text, name, role }
      if (editIdx >= 0) { deps[editIdx] = dep } else { deps.push(dep) }
      const ok = await saveDeps()
      btn.disabled = false; btn.textContent = 'Salvar'
      showSaveMsg(msgEl, ok)
      if (ok) { section.querySelector('#dep-form-wrap').style.display = 'none'; editIdx = -1; renderList() }
    })
  }

  async function saveDeps() {
    const json = JSON.stringify(deps)
    return await saveContent('testimonials', { pt: json, en: json, es: json })
  }

  renderList()
}

// ─── Init ─────────────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // Detecta tenant pelo domínio — usa cache local para evitar roundtrip na maioria das visitas
  const _rawHost = window.location.hostname
  const _host    = _rawHost.replace(/^www\./, '')
  if (_host && _host !== 'localhost' && _host !== '127.0.0.1') {
    const _tenantCacheKey = `imobi_tenant_${_host}`
    const _cachedTenant = cacheGet(_tenantCacheKey)
    if (_cachedTenant) {
      setSettingsTenant(_cachedTenant)
    } else {
      let _tenantData = null
      for (const d of [_host, 'www.' + _host]) {
        const { data } = await supabase.from('tenants').select('id').eq('domain', d).maybeSingle()
        if (data?.id) { _tenantData = data; break }
      }
      if (_tenantData?.id) {
        setSettingsTenant(_tenantData.id)
        cacheSet(_tenantCacheKey, _tenantData.id, 24 * 60 * 60 * 1000) // 24h
      }
    }
  }

  // Carrega settings e locations em paralelo
  await Promise.all([loadAllSettings(), loadLocations()])

  // Aplica configurações visuais e de contato
  WHATSAPP_NUMBER = getSetting('company.whatsapp', WHATSAPP_NUMBER)
  WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}`
  applyVisualSettings()

  attachPriceSlider()
  attachFilters()

  // Sincronização cidade → bairro no formulário admin
  const citySel  = document.getElementById('adminCitySelect')
  const neighSel = document.getElementById('adminNeighborhood')
  if (citySel && neighSel) {
    populateAdminCitySelect()
    citySel.addEventListener('change', () => {
      const sel  = getCities().find(c => c.name === citySel.value)
      const list = sel ? getNeighborhoods(sel.id) : []
      neighSel.innerHTML = '<option value="">Selecione a cidade primeiro</option>' +
        list.map(n => `<option value="${n.name}">${escapeHTML(n.name)}</option>`).join('')
    })
  }

  // Fluxo de autenticação admin
  const loginModal = document.getElementById('admin-login')
  const adminRoot  = document.getElementById('admin-root')
  if (loginModal) {
    // ── Detecção de link de convite / recuperação de senha ──────────────
    const hashParams  = new URLSearchParams(window.location.hash.replace('#', ''))
    const urlParams   = new URLSearchParams(window.location.search)
    const linkType    = hashParams.get('type') || urlParams.get('type') || ''
    // Cobre: flag PKCE (evento disparado antes do DOM), hash tokens, code na URL
    const isResetLink = pendingPasswordRecovery
                     || linkType === 'recovery' || linkType === 'invite'
                     || window.location.hash.includes('access_token')
                     || urlParams.has('code')

    const overlay = document.getElementById('password-reset-overlay')

    if (isResetLink) {
      loginModal.style.display = 'none'
      if (adminRoot) adminRoot.classList.add('hidden')
      if (overlay) overlay.style.display = 'flex'

      document.getElementById('password-reset-form')?.addEventListener('submit', async e => {
        e.preventDefault()
        const newPass     = document.getElementById('new-password')?.value || ''
        const confirmPass = document.getElementById('confirm-password')?.value || ''
        const msgEl       = document.getElementById('password-reset-msg')
        const submitBtn   = e.target.querySelector('button[type="submit"]')
        if (msgEl) msgEl.style.display = 'none'

        if (newPass !== confirmPass) {
          if (msgEl) { msgEl.textContent = 'As senhas não coincidem.'; msgEl.style.display = '' }
          return
        }
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Salvando…' }

        const { error } = await supabase.auth.updateUser({ password: newPass })
        if (error) {
          if (msgEl) { msgEl.textContent = 'Erro: ' + error.message; msgEl.style.display = '' }
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Definir Senha' }
          return
        }
        // Redireciona para o painel limpo (sem hash/token na URL)
        window.location.href = window.location.pathname
      })

      // Fluxo PKCE: trocar o code por sessão explicitamente
      // exchangeCodeForSession funciona mesmo que já exista sessão salva
      if (urlParams.has('code')) {
        await supabase.auth.exchangeCodeForSession(urlParams.get('code') ?? '')
      }
      return
    }

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      loginModal.classList.add('hidden')
      if (adminRoot) adminRoot.classList.remove('hidden')
      attachAdminForm()
      attachAdminUI()
      attachSidebarUserClick()
      if (window.lucide) lucide.createIcons()

      currentProfile = await loadProfile(session.user.id)
      if (!currentProfile) {
        // Sessão inválida (usuário deletado ou perfil não encontrado) — faz logout e volta ao login
        await supabase.auth.signOut()
        loginModal.classList.remove('hidden')
        if (adminRoot) adminRoot.classList.add('hidden')
        return
      }
      if (currentProfile.active === false) {
        await supabase.auth.signOut()
        loginModal.classList.remove('hidden')
        if (adminRoot) adminRoot.classList.add('hidden')
        alert('Seu acesso está pausado. Entre em contato com o administrador.')
        return
      }
      // Se o corretor foi convidado e ainda não definiu a senha, mostrar overlay
      if (currentProfile.needs_password_reset) {
        loginModal.style.display = 'none'
        if (adminRoot) adminRoot.classList.add('hidden')
        const overlay = document.getElementById('password-reset-overlay')
        if (overlay) overlay.style.display = 'flex'
        document.getElementById('password-reset-form')?.addEventListener('submit', async e => {
          e.preventDefault()
          const newPass     = document.getElementById('new-password')?.value || ''
          const confirmPass = document.getElementById('confirm-password')?.value || ''
          const msgEl       = document.getElementById('password-reset-msg')
          const submitBtn   = e.target.querySelector('button[type="submit"]')
          if (msgEl) msgEl.style.display = 'none'
          if (newPass !== confirmPass) {
            if (msgEl) { msgEl.textContent = 'As senhas não coincidem.'; msgEl.style.display = '' }
            return
          }
          if (newPass.length < 6) {
            if (msgEl) { msgEl.textContent = 'Mínimo 6 caracteres.'; msgEl.style.display = '' }
            return
          }
          if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Salvando…' }
          const { error } = await supabase.auth.updateUser({ password: newPass })
          if (error) {
            if (msgEl) { msgEl.textContent = 'Erro: ' + error.message; msgEl.style.display = '' }
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Definir Senha' }
            return
          }
          // Marcar que a senha foi definida
          await supabase.from('profiles').update({ needs_password_reset: false }).eq('id', currentProfile.id)
          window.location.href = window.location.pathname
        })
        return
      }
      setSettingsTenant(currentProfile?.tenant_id || null)
      renderSidebarUser(currentProfile)
      updateVerSiteLink(currentProfile)
      applyRolePermissions(currentProfile.role)
      await renderAdmin()
      await initSettings(currentProfile)
      if (window.lucide) lucide.createIcons()
      initNotifBadge()
      navigateToSection('dashboard')
    } else {
      if (adminRoot) adminRoot.classList.add('hidden')
      loginModal.classList.remove('hidden')
      const lf = document.getElementById('login-form')
      if (lf) {
        // Botão "Esqueci minha senha"
        document.getElementById('forgot-password-btn')?.addEventListener('click', async () => {
          const emailVal = lf.querySelector('input[name="email"]')?.value?.trim()
          if (!emailVal) { alert('Digite seu e-mail no campo acima primeiro.'); return }
          const { error } = await supabase.auth.resetPasswordForEmail(emailVal, {
            redirectTo: 'https://omarcorretor.com.br/ios.imobi.html'
          })
          if (error) {
            alert('Erro: ' + error.message)
          } else {
            alert('E-mail de redefinição enviado! Verifique sua caixa de entrada.')
          }
        })

        lf.addEventListener('submit', async e => {
          e.preventDefault()
          const submitBtn = lf.querySelector('button[type="submit"]')
          const fd        = new FormData(lf)
          const email     = fd.get('email')
          const password  = fd.get('password')

          if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Entrando…' }

          try {
            const ok = await loginAdmin(email, password)
            if (ok) {
              loginModal.classList.add('hidden')
              if (adminRoot) adminRoot.classList.remove('hidden')
              attachAdminForm()
              attachAdminUI()
              if (window.lucide) lucide.createIcons()

              const { data: { session: s2 } } = await supabase.auth.getSession()
              currentProfile = s2 ? await loadProfile(s2.user.id) : null
              if (!currentProfile) {
                await supabase.auth.signOut()
                loginModal.classList.remove('hidden')
                if (adminRoot) adminRoot.classList.add('hidden')
                alert('Perfil não encontrado. Entre em contato com o administrador.')
                return
              }
              if (currentProfile.active === false) {
                await supabase.auth.signOut()
                loginModal.classList.remove('hidden')
                if (adminRoot) adminRoot.classList.add('hidden')
                alert('Seu acesso está pausado. Entre em contato com o administrador.')
                return
              }
              attachSidebarUserClick()
              setSettingsTenant(currentProfile?.tenant_id || null)
              renderSidebarUser(currentProfile)
              updateVerSiteLink(currentProfile)
              applyRolePermissions(currentProfile.role)
              await renderAdmin()
              await initSettings(currentProfile)
              if (window.lucide) lucide.createIcons()
              navigateToSection('dashboard')
            } else {
              alert('E-mail ou senha incorretos')
            }
          } catch (err) {
            alert('Erro ao fazer login: ' + (err?.message || String(err)))
          } finally {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Entrar' }
          }
        })
      }
    }
  } else {
    // Página pública
    attachAdminForm()
  }

  await renderPublic()

  // Aplica conteúdo dinâmico do banco (site público)
  const lang = (() => { try { return localStorage.getItem('lang') || 'pt' } catch(e) { return 'pt' } })()
  applyDynamicContent(lang)
  applyWhatsAppLinks(WHATSAPP_NUMBER)

  // Expõe para setLang() no HTML (que é inline, fora do módulo)
  window._applyDynamicContent = applyDynamicContent
  window._applyWhatsAppLinks  = applyWhatsAppLinks

  // ── Dropdown de navegação pública (JS toggle — confiável em touch e desktop) ──
  document.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
    const menu = btn.closest('.nav-dropdown')?.querySelector('.nav-dropdown-menu')
    if (!menu) return
    btn.addEventListener('click', e => {
      e.stopPropagation()
      const isOpen = menu.classList.toggle('js-open')
      // Fecha outros dropdowns
      document.querySelectorAll('.nav-dropdown-menu.js-open').forEach(m => {
        if (m !== menu) m.classList.remove('js-open')
      })
    })
  })
  // Fecha ao clicar fora
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown-menu.js-open').forEach(m => m.classList.remove('js-open'))
  })
})


// ─── Auto: gera referências silenciosamente para imóveis sem referência ──────
async function autoAssignReferences() {
  const props = cachedProperties.filter(p => !p.reference)
  if (!props.length) return

  const existing = cachedProperties
    .map(p => p.reference || '')
    .filter(r => /^IO-\d+$/.test(r))
    .map(r => parseInt(r.replace('IO-', ''), 10))
  let next = existing.length ? Math.max(...existing) + 1 : 1

  const sorted = [...props].sort((a, b) => a.id - b.id)
  for (const p of sorted) {
    const ref = 'IO-' + String(next).padStart(4, '0')
    const { error } = await supabase.from('properties').update({ reference: ref }).eq('id', p.id)
    if (!error) {
      const idx = cachedProperties.findIndex(x => x.id === p.id)
      if (idx >= 0) cachedProperties[idx].reference = ref
      next++
    }
  }
  renderAdminTable(applyAdminFilters(cachedProperties))
}

// ─── Auto: aplica marca d'água silenciosamente nas fotos sem watermark ────────
async function autoApplyWatermarks() {
  // Só processa fotos que NÃO têm "wm-" no path (ainda não foram processadas)
  const props = cachedProperties.filter(p =>
    p.images?.some(url => !url.includes('/wm-'))
  )
  if (!props.length) return

  for (const prop of props) {
    const needsWm = prop.images.some(url => !url.includes('/wm-'))
    if (!needsWm) continue

    const newUrls = []
    let changed = false
    for (const url of prop.images) {
      if (url.includes('/wm-')) {
        newUrls.push(url) // já tem marca d'água
      } else {
        try {
          const newUrl = await applyWatermarkToUrl(url)
          newUrls.push(newUrl)
          changed = true
        } catch(e) {
          newUrls.push(url)
        }
      }
    }
    if (changed) {
      await supabase.from('properties').update({ images: newUrls }).eq('id', prop.id)
      const idx = cachedProperties.findIndex(x => x.id === prop.id)
      if (idx >= 0) cachedProperties[idx].images = newUrls
    }
  }
  renderAdminTable(applyAdminFilters(cachedProperties))
}

// ─── Baixa URL → canvas → aplica watermark → re-upload ───────────────────────
// Usa fetch() para baixar como blob e evitar CORS taint no canvas
async function applyWatermarkToUrl(imageUrl) {
  try {
    // 1. Baixar imagem original como blob (evita CORS taint no canvas)
    const resp = await fetch(imageUrl)
    if (!resp.ok) return imageUrl
    const imgBlob = await resp.blob()
    const blobUrl = URL.createObjectURL(imgBlob)

    // 2. Baixar logo como blob também
    const logoResp = await fetch('/logo.png')
    const logoBlob = logoResp.ok ? await logoResp.blob() : null
    const logoBlobUrl = logoBlob ? URL.createObjectURL(logoBlob) : null

    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        URL.revokeObjectURL(blobUrl)
        const canvas = document.createElement('canvas')
        const maxW = 1200
        let w = img.width, h = img.height
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW }
        canvas.width = w; canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, w, h)

        const drawAndUpload = (logoImg) => {
          if (logoImg) {
            const wmW = Math.round(w * 0.18)
            const wmH = Math.round(logoImg.naturalHeight * wmW / logoImg.naturalWidth)
            const margin = Math.round(w * 0.02)
            ctx.globalAlpha = 0.45
            ctx.drawImage(logoImg, w - wmW - margin, h - wmH - margin, wmW, wmH)
            ctx.globalAlpha = 1.0
          }
          canvas.toBlob(async blob => {
            try {
              const path = `wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
              const { error } = await supabase.storage.from('imoveis').upload(path, blob, {
                contentType: 'image/jpeg', cacheControl: '31536000', upsert: false
              })
              if (error) { console.error('Upload watermark error:', error); resolve(imageUrl); return }
              const { data: { publicUrl } } = supabase.storage.from('imoveis').getPublicUrl(path)
              resolve(publicUrl)
            } catch(e) { console.error('Watermark upload exception:', e); resolve(imageUrl) }
          }, 'image/jpeg', 0.82)
        }

        if (logoBlobUrl) {
          const logo = new Image()
          logo.onload = () => { URL.revokeObjectURL(logoBlobUrl); drawAndUpload(logo) }
          logo.onerror = () => { URL.revokeObjectURL(logoBlobUrl); drawAndUpload(null) }
          logo.src = logoBlobUrl
        } else {
          drawAndUpload(null)
        }
      }
      img.onerror = () => { URL.revokeObjectURL(blobUrl); resolve(imageUrl) }
      img.src = blobUrl
    })
  } catch(e) {
    console.error('applyWatermarkToUrl error:', e)
    return imageUrl
  }
}

// ═══════════════════════════════════════════════════════════════════
// SEÇÕES ADMINISTRATIVAS — renderizadas sob demanda (lazy)
// ═══════════════════════════════════════════════════════════════════

// ─── Helper: feedback de salvamento ──────────────────────────────────────────
function showSaveMsg(el, ok) {
  if (!el) return
  el.textContent = ok ? '✓ Salvo com sucesso!' : '✗ Erro ao salvar.'
  el.className   = 'cfg-save-msg ' + (ok ? 'ok' : 'err')
  el.style.display = ''
  setTimeout(() => { el.style.display = 'none' }, 3000)
}

// ─── Helper: upload de imagem para storage ────────────────────────────────────
async function uploadImageToStorage(file, folder = 'assets') {
  const blob = await compressToBlob(file, 1200, 0.85)
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
  const { error } = await supabase.storage.from('imoveis')
    .upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage.from('imoveis').getPublicUrl(path)
  return publicUrl
}

// ─── 1. EMPRESA ──────────────────────────────────────────────────────────────
async function initEmpresaSection() {
  const section = document.getElementById('section-empresa')
  if (!section || section.dataset.loaded) return
  section.dataset.loaded = '1'

  const { data: rows } = await supabase.from('settings').select('key,value').eq('tenant_id', getSettingsTenantId())
  const v = {}
  rows?.forEach(r => { v[r.key] = r.value || '' })

  const g = k => escapeHTML(String(v[k] || ''))

  section.innerHTML = `
    <div class="section-topbar">
      <div><div class="section-title">Empresa</div><div class="section-sub">Identidade, contatos e redes sociais</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏢</span> Identidade</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Nome da Empresa</label>
          <input id="co-name" class="form-control" value="${g('company.name')}" placeholder="Nome completo">
          <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece no <strong>cabeçalho, rodapé e aba do navegador</strong> do site.</p>
        </div>
        <div class="form-group">
          <label class="form-label">CRECI</label>
          <input id="co-creci" class="form-control" value="${g('company.creci')}" placeholder="Ex: 69965F">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:12px">
        <label class="form-label">Logo</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="co-logo-url" class="form-control" value="${g('company.logo_url')}" placeholder="/logo.png ou https://...">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="co-logo-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece no <strong>topo e rodapé do site</strong>. PNG transparente, mín. 200×60 px.</p>
        <div class="logo-preview-box" style="margin-top:10px">
          <img id="co-logo-preview" src="${g('company.logo_url') || '/logo.png'}" alt="Preview">
          <span style="font-size:12px;color:#9ca3af">Preview do logotipo</span>
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Favicon (URL)</label>
        <input id="co-favicon-url" class="form-control" value="${g('company.favicon_url')}" placeholder="/favicon.ico">
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Ícone exibido na <strong>aba do navegador</strong>.</p>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="co-save-identity">Salvar Identidade</button>
        <span id="co-identity-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📞</span> Contatos</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">WhatsApp <small style="color:#9ca3af">(somente números, com DDI)</small></label>
          <input id="co-whatsapp" class="form-control" value="${g('company.whatsapp')}" placeholder="5547999701743">
          <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Ativa o <strong>botão verde flutuante</strong> no site e no link de cada imóvel.</p>
        </div>
        <div class="form-group">
          <label class="form-label">Telefone (exibição)</label>
          <input id="co-phone" class="form-control" value="${g('company.phone')}" placeholder="(47) 99970-1743">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">E-mail</label>
          <input id="co-email" type="email" class="form-control" value="${g('company.email')}" placeholder="contato@empresa.com">
        </div>
        <div class="form-group">
          <label class="form-label">Endereço (resumido)</label>
          <input id="co-address" class="form-control" value="${g('company.address')}" placeholder="Cidade, UF">
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="co-save-contacts">Salvar Contatos</button>
        <span id="co-contacts-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📱</span> Redes Sociais</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Instagram</label>
          <input id="co-instagram" class="form-control" value="${g('company.instagram_url')}" placeholder="https://instagram.com/...">
        </div>
        <div class="form-group">
          <label class="form-label">Facebook</label>
          <input id="co-facebook" class="form-control" value="${g('company.facebook_url')}" placeholder="https://facebook.com/...">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">YouTube</label>
          <input id="co-youtube" class="form-control" value="${g('company.youtube_url')}" placeholder="https://youtube.com/...">
        </div>
        <div class="form-group">
          <label class="form-label">TikTok</label>
          <input id="co-tiktok" class="form-control" value="${g('company.tiktok_url')}" placeholder="https://tiktok.com/@...">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">LinkedIn</label>
        <input id="co-linkedin" class="form-control" value="${g('company.linkedin_url')}" placeholder="https://linkedin.com/in/...">
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="co-save-social">Salvar Redes Sociais</button>
        <span id="co-social-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `

  // Logo: preview ao digitar URL
  document.getElementById('co-logo-url').addEventListener('input', e => {
    document.getElementById('co-logo-preview').src = e.target.value || '/logo.png'
  })

  // Logo: upload de arquivo
  document.getElementById('co-logo-file').addEventListener('change', async e => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const url = await uploadImageToStorage(file, 'logos')
      document.getElementById('co-logo-url').value = url
      document.getElementById('co-logo-preview').src = url
    } catch(err) { alert('Erro no upload: ' + err.message) }
  })

  // Save: Identidade
  document.getElementById('co-save-identity').addEventListener('click', async () => {
    const btn = document.getElementById('co-save-identity')
    btn.disabled = true; btn.textContent = 'Salvando…'
    const ok = await saveMultipleSettings([
      ['company.name',       document.getElementById('co-name').value.trim()],
      ['company.creci',      document.getElementById('co-creci').value.trim()],
      ['company.logo_url',   document.getElementById('co-logo-url').value.trim()],
      ['company.favicon_url',document.getElementById('co-favicon-url').value.trim()],
    ])
    if (ok) applyVisualSettings()
    btn.disabled = false; btn.textContent = 'Salvar Identidade'
    showSaveMsg(document.getElementById('co-identity-msg'), ok)
  })

  // Save: Contatos
  document.getElementById('co-save-contacts').addEventListener('click', async () => {
    const btn = document.getElementById('co-save-contacts')
    btn.disabled = true; btn.textContent = 'Salvando…'
    const wa = document.getElementById('co-whatsapp').value.trim()
    const ok = await saveMultipleSettings([
      ['company.whatsapp', wa],
      ['company.phone',    document.getElementById('co-phone').value.trim()],
      ['company.email',    document.getElementById('co-email').value.trim()],
      ['company.address',  document.getElementById('co-address').value.trim()],
    ])
    if (ok && wa) { WHATSAPP_NUMBER = wa; WHATSAPP_URL = `https://wa.me/${wa}` }
    btn.disabled = false; btn.textContent = 'Salvar Contatos'
    showSaveMsg(document.getElementById('co-contacts-msg'), ok)
  })

  // Save: Redes Sociais
  document.getElementById('co-save-social').addEventListener('click', async () => {
    const btn = document.getElementById('co-save-social')
    btn.disabled = true; btn.textContent = 'Salvando…'
    const ok = await saveMultipleSettings([
      ['company.instagram_url', document.getElementById('co-instagram').value.trim()],
      ['company.facebook_url',  document.getElementById('co-facebook').value.trim()],
      ['company.youtube_url',   document.getElementById('co-youtube').value.trim()],
      ['company.tiktok_url',    document.getElementById('co-tiktok').value.trim()],
      ['company.linkedin_url',  document.getElementById('co-linkedin').value.trim()],
    ])
    btn.disabled = false; btn.textContent = 'Salvar Redes Sociais'
    showSaveMsg(document.getElementById('co-social-msg'), ok)
  })
}

// ─── 2. VISUAL ────────────────────────────────────────────────────────────────
async function initVisualSection() {
  const section = document.getElementById('section-visual')
  if (!section || section.dataset.loaded) return
  section.dataset.loaded = '1'

  const { data: rows } = await supabase.from('settings').select('key,value').eq('tenant_id', getSettingsTenantId())
  const v = {}
  rows?.forEach(r => { v[r.key] = r.value || '' })

  const accent  = v['visual.accent_color']  || '#b8962e'
  const primBg  = v['visual.primary_bg']    || '#0f1c2e'
  const secBg   = v['visual.secondary_bg']  || '#1a2f4a'
  const heroBg  = v['visual.hero_bg_url']   || ''
  const priceMax = v['visual.price_max_slider'] || 130000000

  section.innerHTML = `
    <div class="section-topbar">
      <div><div class="section-title">Visual</div><div class="section-sub">Cores, identidade visual e imagens</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🎨</span> Preview ao Vivo</div>
      <div class="visual-preview">
        <div class="visual-preview-bar" id="vp-bar"></div>
        <div class="visual-preview-body">
          <div class="visual-preview-dot" id="vp-dot"></div>
          <div class="visual-preview-text">Cor de destaque do sistema</div>
          <div class="visual-preview-btn" id="vp-btn">Botão</div>
        </div>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🖌️</span> Paleta de Cores</div>

      <div class="color-row">
        <div>
          <label class="form-label">Cor de Destaque</label>
          <p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">📍 Botões, links ativos e ícones no <strong>site e no CRM</strong>.</p>
        </div>
        <div class="color-swatch">
          <input type="color" id="col-accent" value="${accent}">
          <input type="text"  id="col-accent-hex" value="${accent}" maxlength="7" placeholder="#b8962e">
        </div>
      </div>
      <div class="color-row">
        <div>
          <label class="form-label">Fundo Principal</label>
          <p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">📍 Cor do <strong>cabeçalho e seções escuras</strong> do site.</p>
        </div>
        <div class="color-swatch">
          <input type="color" id="col-primary" value="${primBg}">
          <input type="text"  id="col-primary-hex" value="${primBg}" maxlength="7">
        </div>
      </div>
      <div class="color-row">
        <div>
          <label class="form-label">Fundo Secundário</label>
          <p style="font-size:12px;color:#94a3b8;margin:2px 0 0;">📍 Cor das <strong>seções intermediárias</strong> do site.</p>
        </div>
        <div class="color-swatch">
          <input type="color" id="col-secondary" value="${secBg}">
          <input type="text"  id="col-secondary-hex" value="${secBg}" maxlength="7">
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-colors">Salvar Cores</button>
        <button class="btn-cancel"  id="visual-reset-colors">Restaurar Padrão</button>
        <span id="visual-colors-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🖼️</span> Imagens do Site</div>
      <div class="form-group" style="margin-bottom:16px">
        <label class="form-label">Imagem de Fundo do Hero (Banner Principal)</label>
        <div style="display:flex;gap:8px">
          <input id="vis-hero-url" class="form-control" value="${escapeHTML(heroBg)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 <strong>Foto de fundo do banner</strong> no topo do site. Recomendado: 1920×1080 px.</p>
        <div id="vis-hero-preview" style="margin-top:10px;display:${heroBg ? '' : 'none'}">
          <img src="${escapeHTML(heroBg)}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Preço Máximo do Slider de Busca</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input id="vis-price-max" type="number" class="form-control" value="${priceMax}" min="100000" step="1000000" style="max-width:200px">
          <span style="font-size:13px;color:#9ca3af">R$</span>
        </div>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="visual-save-images">Salvar Imagens</button>
        <span id="visual-images-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `

  // Sincroniza color picker ↔ hex input e atualiza preview
  function syncColor(pickerId, hexId, previewFn) {
    const picker = document.getElementById(pickerId)
    const hex    = document.getElementById(hexId)
    picker?.addEventListener('input', e => { hex.value = e.target.value; previewFn() })
    hex?.addEventListener('input', e => {
      if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
        picker.value = e.target.value; previewFn()
      }
    })
  }

  function updatePreview() {
    const a = document.getElementById('col-accent-hex')?.value || '#b8962e'
    document.getElementById('vp-bar')?.style.setProperty('background', a)
    document.getElementById('vp-dot')?.style.setProperty('background', a)
    document.getElementById('vp-btn')?.style.setProperty('background', a)
    document.documentElement.style.setProperty('--accent', a)
  }

  syncColor('col-accent',    'col-accent-hex',    updatePreview)
  syncColor('col-primary',   'col-primary-hex',   () => {})
  syncColor('col-secondary', 'col-secondary-hex', () => {})
  updatePreview()

  // Hero file upload
  document.getElementById('vis-hero-file').addEventListener('change', async e => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const url = await uploadImageToStorage(file, 'hero')
      document.getElementById('vis-hero-url').value = url
      const prev = document.getElementById('vis-hero-preview')
      prev.innerHTML = `<img src="${url}" style="max-width:100%;max-height:120px;border-radius:8px;object-fit:cover">`
      prev.style.display = ''
    } catch(err) { alert('Erro no upload: ' + err.message) }
  })

  // Save cores
  document.getElementById('visual-save-colors').addEventListener('click', async () => {
    const btn = document.getElementById('visual-save-colors')
    btn.disabled = true; btn.textContent = 'Salvando…'
    const ok = await saveMultipleSettings([
      ['visual.accent_color', document.getElementById('col-accent-hex').value],
      ['visual.primary_bg',   document.getElementById('col-primary-hex').value],
      ['visual.secondary_bg', document.getElementById('col-secondary-hex').value],
    ])
    if (ok) applyVisualSettings()
    btn.disabled = false; btn.textContent = 'Salvar Cores'
    showSaveMsg(document.getElementById('visual-colors-msg'), ok)
  })

  // Reset cores
  document.getElementById('visual-reset-colors').addEventListener('click', async () => {
    if (!confirm('Restaurar cores padrão?')) return
    document.getElementById('col-accent').value        = '#b8962e'
    document.getElementById('col-accent-hex').value    = '#b8962e'
    document.getElementById('col-primary').value       = '#0f1c2e'
    document.getElementById('col-primary-hex').value   = '#0f1c2e'
    document.getElementById('col-secondary').value     = '#1a2f4a'
    document.getElementById('col-secondary-hex').value = '#1a2f4a'
    updatePreview()
  })

  // Save imagens
  document.getElementById('visual-save-images').addEventListener('click', async () => {
    const btn = document.getElementById('visual-save-images')
    btn.disabled = true; btn.textContent = 'Salvando…'
    const ok = await saveMultipleSettings([
      ['visual.hero_bg_url',       document.getElementById('vis-hero-url').value.trim()],
      ['visual.price_max_slider',  parseInt(document.getElementById('vis-price-max').value, 10) || 130000000],
    ])
    btn.disabled = false; btn.textContent = 'Salvar Imagens'
    showSaveMsg(document.getElementById('visual-images-msg'), ok)
  })
}

// ─── 3. SITE & SEO ────────────────────────────────────────────────────────────
async function initSiteConfigSection() {
  const section = document.getElementById('section-site-config')
  if (!section || section.dataset.loaded) return
  section.dataset.loaded = '1'

  const { data: rows } = await supabase.from('site_content').select('*').eq('tenant_id', getSettingsTenantId())
  const v = {}
  rows?.forEach(r => { v[r.key] = r })
  const g = (key, lang) => escapeHTML(v[key]?.[`value_${lang}`] || '')

  const langs   = ['pt', 'en', 'es']
  const langMap = { pt: '🇧🇷 Português', en: '🇺🇸 English', es: '🇪🇸 Español' }

  const renderLangTabs = (activeLang) => langs.map(l =>
    `<button class="content-tab${l === activeLang ? ' active' : ''}" data-lang="${l}">${langMap[l]}</button>`
  ).join('')

  const renderFields = (lang) => `
    <div class="content-field">
      <label class="form-label">Título do Hero</label>
      <input class="form-control sc-field" data-key="hero.title" data-lang="${lang}" value="${g('hero.title', lang)}">
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto principal em <strong>destaque no banner do site</strong> (frase de impacto).</p>
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${lang}" rows="3">${g('hero.subtitle', lang)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Texto menor abaixo do título, também no <strong>banner principal</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${lang}" rows="4">${g('inst.bio_p1', lang)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Aparece na seção <strong>"Sobre"</strong> do site.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${lang}" rows="3">${g('inst.bio_p2', lang)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Segundo parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${lang}" rows="3">${g('inst.bio_p3', lang)}</textarea>
      <p style="font-size:12px;color:#94a3b8;margin:4px 0 0;">📍 Terceiro parágrafo da seção <strong>"Sobre"</strong>.</p>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat1_num" data-lang="${lang}" value="${g('inst.stat1_num', lang)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat2_num" data-lang="${lang}" value="${g('inst.stat2_num', lang)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Número</label>
        <input class="form-control sc-field" data-key="inst.stat3_num" data-lang="${lang}" value="${g('inst.stat3_num', lang)}">
      </div>
    </div>
    <div class="form-row triple">
      <div class="form-group">
        <label class="form-label">Stat 1 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat1_label" data-lang="${lang}" value="${g('inst.stat1_label', lang)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 2 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat2_label" data-lang="${lang}" value="${g('inst.stat2_label', lang)}">
      </div>
      <div class="form-group">
        <label class="form-label">Stat 3 — Legenda</label>
        <input class="form-control sc-field" data-key="inst.stat3_label" data-lang="${lang}" value="${g('inst.stat3_label', lang)}">
      </div>
    </div>
    <div class="content-field">
      <label class="form-label">Rodapé</label>
      <input class="form-control sc-field" data-key="footer.text" data-lang="${lang}" value="${g('footer.text', lang)}">
    </div>
  `

  section.innerHTML = `
    <div class="section-topbar">
      <div><div class="section-title">Site &amp; SEO</div><div class="section-sub">Textos, conteúdo multilíngue e configurações de SEO</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📝</span> Conteúdo do Site</div>
      <div class="content-tabs" id="sc-tabs">${renderLangTabs('pt')}</div>
      <div id="sc-panels">
        ${langs.map(l => `<div class="content-panel${l === 'pt' ? ' active' : ''}" data-panel="${l}">${renderFields(l)}</div>`).join('')}
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="sc-save-btn">Salvar Conteúdo</button>
        <span id="sc-save-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔍</span> SEO</div>
      <div class="content-field">
        <label class="form-label">Title da Página (PT)</label>
        <input id="seo-title" class="form-control" value="${g('seo.title_pt', 'pt')}" placeholder="Nome — Cargo">
      </div>
      <div class="content-field">
        <label class="form-label">Meta Description (PT)</label>
        <textarea id="seo-desc" class="form-control" rows="2" placeholder="Descrição curta para o Google…">${g('seo.description_pt', 'pt')}</textarea>
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="seo-save-btn">Salvar SEO</button>
        <span id="seo-save-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `

  // Tabs de idioma
  document.getElementById('sc-tabs').addEventListener('click', e => {
    const tab = e.target.closest('.content-tab')
    if (!tab) return
    document.querySelectorAll('#sc-tabs .content-tab').forEach(t => t.classList.remove('active'))
    document.querySelectorAll('#sc-panels .content-panel').forEach(p => p.classList.remove('active'))
    tab.classList.add('active')
    document.querySelector(`#sc-panels [data-panel="${tab.dataset.lang}"]`)?.classList.add('active')
  })

  // Save conteúdo: agrupa campos por key + lang
  document.getElementById('sc-save-btn').addEventListener('click', async () => {
    const btn = document.getElementById('sc-save-btn')
    btn.disabled = true; btn.textContent = 'Salvando…'
    const byKey = {}
    document.querySelectorAll('.sc-field').forEach(el => {
      const key  = el.dataset.key
      const lang = el.dataset.lang
      if (!byKey[key]) byKey[key] = {}
      byKey[key][lang] = el.value
    })
    let ok = true
    for (const [key, vals] of Object.entries(byKey)) {
      const res = await saveContent(key, { pt: vals.pt, en: vals.en, es: vals.es })

      if (!res) ok = false
    }
    btn.disabled = false; btn.textContent = 'Salvar Conteúdo'
    showSaveMsg(document.getElementById('sc-save-msg'), ok)
  })

  // Save SEO
  document.getElementById('seo-save-btn').addEventListener('click', async () => {
    const btn = document.getElementById('seo-save-btn')
    btn.disabled = true; btn.textContent = 'Salvando…'
    const title = document.getElementById('seo-title').value.trim()
    const desc  = document.getElementById('seo-desc').value.trim()
    const ok    = await saveContent('seo.title_pt', { pt: title, en: title, es: title })
                  && await saveContent('seo.description_pt', { pt: desc, en: desc, es: desc })

    btn.disabled = false; btn.textContent = 'Salvar SEO'
    showSaveMsg(document.getElementById('seo-save-msg'), ok)
  })
}

// ─── 4. CRM CONFIG ────────────────────────────────────────────────────────────
async function initCRMConfigSection() {
  const section = document.getElementById('section-crm-config')
  if (!section || section.dataset.loaded) return
  section.dataset.loaded = '1'

  section.innerHTML = `
    <div class="section-topbar">
      <div><div class="section-title">CRM</div><div class="section-sub">Funis, etapas, tags e status de leads</div></div>
    </div>
    <div id="crm-body"><div class="empty-row" style="padding:40px;text-align:center">Carregando…</div></div>
  `
  await renderCRMConfig()
}

async function renderCRMConfig() {
  const body = document.getElementById('crm-body')
  if (!body) return

  const tid = getSettingsTenantId()
  const [{ data: pipes }, { data: stages }, { data: tags }, { data: statuses }] = await Promise.all([
    supabase.from('crm_pipelines').select('*').eq('tenant_id', tid).order('sort_order'),
    supabase.from('crm_stages').select('*').eq('tenant_id', tid).order('sort_order'),
    supabase.from('crm_tags').select('*').eq('tenant_id', tid).order('name'),
    supabase.from('crm_lead_statuses').select('*').eq('tenant_id', tid).order('sort_order'),
  ])

  const pipeList = pipes || []
  const defaultPipe = pipeList.find(p => p.is_default) || pipeList[0]

  const pipeOptions = pipeList.map(p =>
    `<option value="${p.id}"${p.id === defaultPipe?.id ? ' selected' : ''}>${escapeHTML(p.name)}</option>`
  ).join('')

  const stagesForPipe = (stages || []).filter(s => s.pipeline_id === defaultPipe?.id)
  const stageItems = stagesForPipe.map(s => `
    <div class="stage-item" data-id="${s.id}">
      <div class="stage-color-dot" style="background:${s.color}"></div>
      <span class="stage-name">${escapeHTML(s.name)}</span>
      <input type="color" value="${s.color}" data-sid="${s.id}" class="stage-color-pick">
      <button class="icon-btn del-btn stage-del" data-id="${s.id}" title="Remover etapa">🗑️</button>
    </div>`).join('') || '<p style="color:#9ca3af;font-size:14px;margin:0">Nenhuma etapa cadastrada.</p>'

  const tagItems = (tags || []).map(t =>
    `<span class="tag-chip" style="background:${t.color}" data-id="${t.id}">
      ${escapeHTML(t.name)}
      <button class="tag-chip-del" data-id="${t.id}" title="Remover">✕</button>
    </span>`
  ).join('') || '<p style="color:#9ca3af;font-size:13px;margin:0">Nenhuma tag cadastrada.</p>'

  const statusItems = (statuses || []).map(s => `
    <div class="stage-item" data-id="${s.id}">
      <div class="stage-color-dot" style="background:${s.color}"></div>
      <span class="stage-name">${escapeHTML(s.name)}</span>
      <span style="font-size:11px;color:#9ca3af;margin-left:auto;margin-right:8px">${s.is_final ? 'Final' : ''}</span>
      <button class="icon-btn del-btn status-del" data-id="${s.id}" title="Remover">🗑️</button>
    </div>`).join('') || '<p style="color:#9ca3af;font-size:14px;margin:0">Nenhum status cadastrado.</p>'

  body.innerHTML = `
    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔀</span> Funis e Etapas</div>
      <div class="pipeline-header">
        <select class="pipeline-select" id="crm-pipe-sel">${pipeOptions}</select>
        <button class="btn-secondary" id="crm-add-pipeline" style="font-size:13px;padding:7px 14px">+ Novo Funil</button>
      </div>
      <div class="stages-list" id="crm-stages-list">${stageItems}</div>
      <div class="stage-add-row">
        <input id="crm-new-stage" type="text" class="form-control" placeholder="Nome da etapa…">
        <input type="color" id="crm-new-stage-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <button class="btn-primary" id="crm-add-stage">Adicionar Etapa</button>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🏷️</span> Tags de Classificação</div>
      <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Classifique seus leads com tags coloridas personalizadas. Use emojis no nome para identificar visualmente.</p>
      <div class="tm-list" id="crm-tags-list">
        ${!(tags||[]).length ? '<p style="color:#9ca3af;font-size:13px;margin:0;padding:8px 0;">Nenhuma tag criada ainda. Adicione abaixo ou use as sugestões rápidas.</p>' : (tags||[]).map(t => `
        <div class="tm-row" data-id="${t.id}">
          <div class="tm-color-swatch" style="background:${t.color}" onclick="this.nextElementSibling.click()" title="Alterar cor"></div>
          <input type="color" class="tm-color-input" data-id="${t.id}" value="${t.color}" title="Cor da tag">
          <input class="tm-name-input form-control" type="text" value="${escapeHTML(t.name)}" data-id="${t.id}" data-orig="${escapeHTML(t.name)}" placeholder="Nome da tag">
          <button class="btn-primary tm-save-btn" data-id="${t.id}">Salvar</button>
          <button class="icon-btn del-btn tm-del-btn" data-id="${t.id}" title="Excluir tag">🗑️</button>
        </div>`).join('')}
      </div>
      <div class="tm-add-row">
        <input id="crm-new-tag" type="text" class="form-control" placeholder="Nome da nova tag… (ex: 🔴 Quente)">
        <input type="color" id="crm-new-tag-color" value="#6366F1" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px;flex-shrink:0;">
        <button class="btn-primary" id="crm-add-tag">+ Adicionar Tag</button>
      </div>
      <div class="tm-templates">
        <div class="tm-templates-label">⚡ Sugestões rápidas — clique para adicionar:</div>
        <div class="tm-tpl-grid" id="tm-tpl-grid">
          ${[{name:'🔴 Quente',color:'#EF4444'},{name:'🟡 Morno',color:'#F59E0B'},{name:'🔵 Frio',color:'#3B82F6'},{name:'💰 Investidor',color:'#8B5CF6'},{name:'⭐ Alto Padrão',color:'#C9A227'},{name:'🏦 Financiamento',color:'#0EA5E9'},{name:'🔄 Permuta',color:'#374151'},{name:'🏠 Comprador',color:'#10B981'},{name:'📋 Proprietário',color:'#F97316'}]
          .filter(tpl => !(tags||[]).some(t => t.name === tpl.name))
          .map(tpl => `<button class="tm-tpl-btn" data-name="${escapeHTML(tpl.name)}" data-color="${tpl.color}" style="border-color:${tpl.color};color:${tpl.color};background:${tpl.color}15;">${escapeHTML(tpl.name)}</button>`).join('')}
        </div>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📋</span> Status de Leads</div>
      <div class="stages-list" id="crm-status-list">${statusItems}</div>
      <div class="stage-add-row">
        <input id="crm-new-status" type="text" class="form-control" placeholder="Nome do status…">
        <input type="color" id="crm-new-status-color" value="#3b82f6" style="width:44px;height:36px;border:1px solid var(--border);border-radius:6px;cursor:pointer;padding:2px">
        <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text);white-space:nowrap">
          <input type="checkbox" id="crm-new-status-final"> Status final
        </label>
        <button class="btn-primary" id="crm-add-status">Adicionar</button>
      </div>
    </div>
  `

  // Adicionar etapa
  document.getElementById('crm-add-stage').addEventListener('click', async () => {
    const name  = document.getElementById('crm-new-stage').value.trim()
    const color = document.getElementById('crm-new-stage-color').value
    const pipeId = parseInt(document.getElementById('crm-pipe-sel').value, 10)
    if (!name) return
    await supabase.from('crm_stages').insert({ pipeline_id: pipeId, name, color, sort_order: 99, tenant_id: getSettingsTenantId() })
    document.getElementById('crm-new-stage').value = ''
    await renderCRMConfig()
  })

  // Remover etapa
  body.querySelectorAll('.stage-del').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Remover esta etapa?')) return
      await supabase.from('crm_stages').delete().eq('id', btn.dataset.id)
      await renderCRMConfig()
    })
  })

  // Cor da etapa ao vivo
  body.querySelectorAll('.stage-color-pick').forEach(pick => {
    pick.addEventListener('change', async e => {
      await supabase.from('crm_stages').update({ color: e.target.value }).eq('id', pick.dataset.sid)
      const dot = pick.closest('.stage-item').querySelector('.stage-color-dot')
      if (dot) dot.style.background = e.target.value
    })
  })

  // ─── Tag Management ──────────────────────────────────────────────────────
  const _addTagFn = async () => {
    const nameEl = document.getElementById('crm-new-tag')
    const colorEl = document.getElementById('crm-new-tag-color')
    const name = nameEl?.value.trim(); const color = colorEl?.value || '#6366F1'
    if (!name) { nameEl?.focus(); return }
    await supabase.from('crm_tags').insert({ name, color, tenant_id: getSettingsTenantId() })
    if (nameEl) nameEl.value = ''
    await renderCRMConfig()
  }
  document.getElementById('crm-add-tag')?.addEventListener('click', _addTagFn)
  document.getElementById('crm-new-tag')?.addEventListener('keydown', e => { if (e.key === 'Enter') _addTagFn() })

  // Delete tag
  body.querySelectorAll('.tm-del-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Excluir esta tag? Os leads que a possuem não serão afetados.')) return
      await supabase.from('crm_tags').delete().eq('id', btn.dataset.id)
      await renderCRMConfig()
    })
  })

  // Show save button when name changes
  body.querySelectorAll('.tm-name-input').forEach(inp => {
    const row = inp.closest('.tm-row')
    const saveBtn = row?.querySelector('.tm-save-btn')
    if (saveBtn) { saveBtn.style.display = 'none' }
    inp.addEventListener('input', () => {
      const changed = inp.value.trim() !== inp.dataset.orig
      if (saveBtn) saveBtn.style.display = changed ? '' : 'none'
    })
  })

  // Live color swatch preview
  body.querySelectorAll('.tm-color-input').forEach(pick => {
    const row = pick.closest('.tm-row')
    const swatch = row?.querySelector('.tm-color-swatch')
    const saveBtn = row?.querySelector('.tm-save-btn')
    pick.addEventListener('input', e => {
      if (swatch) swatch.style.background = e.target.value
      if (saveBtn) saveBtn.style.display = ''
    })
  })

  // Save edited tag (name + color)
  body.querySelectorAll('.tm-save-btn').forEach(btn => {
    btn.style.display = 'none'
    btn.addEventListener('click', async () => {
      const row = btn.closest('.tm-row')
      const name = row.querySelector('.tm-name-input')?.value.trim()
      const color = row.querySelector('.tm-color-input')?.value
      if (!name) return
      btn.disabled = true; btn.textContent = '✓ Salvando…'
      await supabase.from('crm_tags').update({ name, color }).eq('id', btn.dataset.id)
      await renderCRMConfig()
    })
  })

  // Template tag quick-add buttons
  body.querySelectorAll('.tm-tpl-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const name = btn.dataset.name; const color = btn.dataset.color
      btn.disabled = true; btn.innerHTML = '✓'
      await supabase.from('crm_tags').insert({ name, color, tenant_id: getSettingsTenantId() })
      await renderCRMConfig()
    })
  })

  // Keep old tag-chip-del selector for compatibility
  body.querySelectorAll('.tag-chip-del').forEach(btn => {
    btn.addEventListener('click', async () => {
      await supabase.from('crm_tags').delete().eq('id', btn.dataset.id)
      await renderCRMConfig()
    })
  })

  // Adicionar status
  document.getElementById('crm-add-status').addEventListener('click', async () => {
    const name     = document.getElementById('crm-new-status').value.trim()
    const color    = document.getElementById('crm-new-status-color').value
    const is_final = document.getElementById('crm-new-status-final').checked
    if (!name) return
    await supabase.from('crm_lead_statuses').insert({ name, color, is_final, sort_order: 99, tenant_id: getSettingsTenantId() })
    document.getElementById('crm-new-status').value = ''
    await renderCRMConfig()
  })

  // Remover status
  body.querySelectorAll('.status-del').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!confirm('Remover este status?')) return
      await supabase.from('crm_lead_statuses').delete().eq('id', btn.dataset.id)
      await renderCRMConfig()
    })
  })

  // Novo funil
  document.getElementById('crm-add-pipeline').addEventListener('click', async () => {
    const name = prompt('Nome do novo funil:')?.trim()
    if (!name) return
    const { error } = await supabase.from('crm_pipelines').insert({ name, sort_order: 99, tenant_id: getSettingsTenantId() })
    if (error) { alert('Erro ao criar funil: ' + error.message); return }
    funilInitialized = false  // força recarregar kanban na próxima abertura
    await renderCRMConfig()
  })
}

// ─── 5. INTEGRAÇÕES ───────────────────────────────────────────────────────────
async function initIntegracoesSection() {
  const section = document.getElementById('section-integracoes')
  if (!section || section.dataset.loaded) return
  section.dataset.loaded = '1'

  const { data: rows } = await supabase.from('integrations').select('*')
  const v = {}
  rows?.forEach(r => { v[r.key] = r })
  const val = k => escapeHTML(v[k]?.value || '')
  const en  = k => v[k]?.enabled ? 'checked' : ''

  const integList = [
    { key: 'meta_pixel_id',     icon: '📘', label: 'Meta Pixel', desc: 'ID do Pixel do Facebook/Instagram para rastreamento de conversões', placeholder: '123456789012345' },
    { key: 'ga_measurement_id', icon: '📊', label: 'Google Analytics 4', desc: 'Measurement ID do GA4 (ex: G-XXXXXXXXXX)', placeholder: 'G-XXXXXXXXXX' },
    { key: 'gtm_container_id',  icon: '🏷️', label: 'Google Tag Manager', desc: 'ID do container do GTM (ex: GTM-XXXXXXX)', placeholder: 'GTM-XXXXXXX' },
    { key: 'webhook_new_lead',  icon: '🔔', label: 'Webhook — Novo Lead', desc: 'URL chamada quando um novo lead chega (POST com JSON)', placeholder: 'https://...' },
    { key: 'webhook_new_property', icon: '🏠', label: 'Webhook — Novo Imóvel', desc: 'URL chamada quando um imóvel é publicado', placeholder: 'https://...' },
  ]

  const smtpFields = [
    { key: 'smtp_host', label: 'Host SMTP', placeholder: 'smtp.gmail.com' },
    { key: 'smtp_port', label: 'Porta',      placeholder: '587' },
    { key: 'smtp_user', label: 'Usuário',    placeholder: 'email@dominio.com' },
    { key: 'smtp_from_name', label: 'Nome do remetente', placeholder: 'Omar Corretor' },
  ]

  section.innerHTML = `
    <div class="section-topbar">
      <div><div class="section-title">Integrações</div><div class="section-sub">Analytics, pixels, webhooks e e-mail</div></div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>🔗</span> Analytics &amp; Tracking</div>
      ${integList.map(i => `
        <div class="integration-row">
          <div class="integration-icon">${i.icon}</div>
          <div class="integration-info">
            <div class="integration-label">${i.label}</div>
            <div class="integration-desc">${i.desc}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end">
            <label class="toggle-switch">
              <input type="checkbox" class="intg-toggle" data-key="${i.key}" ${en(i.key)}>
              <span class="toggle-slider"></span>
            </label>
            <input type="text" class="integration-value intg-val" data-key="${i.key}"
              value="${val(i.key)}" placeholder="${i.placeholder}">
          </div>
        </div>
      `).join('')}
      <div class="cfg-save-row">
        <button class="btn-primary" id="intg-save-tracking">Salvar Integrações</button>
        <span id="intg-tracking-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>

    <div class="cfg-card">
      <div class="cfg-card-title"><span>📧</span> Configurações de E-mail (SMTP)</div>
      <p style="font-size:13px;color:#9ca3af;margin:0 0 16px">Configure para enviar e-mails via servidor próprio.</p>
      ${smtpFields.map(f => `
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-label">${f.label}</label>
          <input class="form-control smtp-field" data-key="${f.key}" value="${val(f.key)}" placeholder="${f.placeholder}">
        </div>
      `).join('')}
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Senha SMTP <small style="color:#9ca3af">(salva de forma segura)</small></label>
        <input type="password" id="smtp-pass" class="form-control" placeholder="••••••••••">
      </div>
      <div class="cfg-save-row">
        <button class="btn-primary" id="intg-save-smtp">Salvar SMTP</button>
        <span id="intg-smtp-msg" class="cfg-save-msg" style="display:none"></span>
      </div>
    </div>
  `

  // Save tracking
  document.getElementById('intg-save-tracking').addEventListener('click', async () => {
    const btn = document.getElementById('intg-save-tracking')
    btn.disabled = true; btn.textContent = 'Salvando…'
    let ok = true
    const vals  = document.querySelectorAll('.intg-val')
    const togls = document.querySelectorAll('.intg-toggle')
    for (let i = 0; i < vals.length; i++) {
      const key  = vals[i].dataset.key
      const val  = vals[i].value.trim()
      const enbl = togls[i]?.checked ?? false
      const r = await saveIntegration(key, val, enbl)
      if (!r) ok = false
    }
    btn.disabled = false; btn.textContent = 'Salvar Integrações'
    showSaveMsg(document.getElementById('intg-tracking-msg'), ok)
  })

  // Save SMTP
  document.getElementById('intg-save-smtp').addEventListener('click', async () => {
    const btn = document.getElementById('intg-save-smtp')
    btn.disabled = true; btn.textContent = 'Salvando…'
    const fields = document.querySelectorAll('.smtp-field')
    let ok = true
    for (const f of fields) {
      const r = await saveIntegration(f.dataset.key, f.value.trim(), true)
      if (!r) ok = false
    }
    const pass = document.getElementById('smtp-pass').value
    if (pass) {
      const r = await saveIntegration('smtp_pass', pass, true)
      if (!r) ok = false
    }
    btn.disabled = false; btn.textContent = 'Salvar SMTP'
    showSaveMsg(document.getElementById('intg-smtp-msg'), ok)
  })
}

// ─── 6. MÍDIA ─────────────────────────────────────────────────────────────────
async function initMidiaSection() {
  const section = document.getElementById('section-midia')
  if (!section || section.dataset.loaded) return
  section.dataset.loaded = '1'

  section.innerHTML = `
    <div class="section-topbar">
      <div><div class="section-title">Biblioteca de Mídia</div><div class="section-sub">Gerencie imagens e arquivos do sistema</div></div>
    </div>
    <div class="cfg-card">
      <div class="cfg-card-title"><span>📤</span> Upload de Arquivos</div>
      <div class="media-upload-area" id="media-drop-area">
        <input type="file" id="media-file-input" accept="image/*" multiple>
        <div class="media-upload-icon">🖼️</div>
        <div class="media-upload-text">
          <strong>Clique para selecionar</strong> ou arraste as imagens aqui<br>
          <small style="color:#9ca3af">JPG, PNG, WEBP — máximo 10MB por arquivo</small>
        </div>
      </div>
      <div class="upload-progress" id="media-upload-progress">
        <div class="upload-progress-bar"><div class="upload-progress-fill" id="media-progress-fill"></div></div>
        <div class="upload-progress-text" id="media-progress-text">Enviando…</div>
      </div>
    </div>
    <div class="cfg-card">
      <div class="cfg-card-title" style="margin-bottom:12px"><span>📁</span> Arquivos Enviados</div>
      <div class="media-grid" id="media-grid">
        <div class="media-empty">Carregando…</div>
      </div>
    </div>
  `

  await loadMediaGrid()

  // Upload handler
  document.getElementById('media-file-input').addEventListener('change', async e => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    const progress = document.getElementById('media-upload-progress')
    const fill     = document.getElementById('media-progress-fill')
    const text     = document.getElementById('media-progress-text')
    progress.style.display = ''
    let done = 0
    for (const file of files) {
      text.textContent = `Enviando ${done + 1}/${files.length}…`
      fill.style.width = `${Math.round(done / files.length * 100)}%`
      try {
        const url  = await uploadImageToStorage(file, 'media')
        const name = file.name.replace(/\.[^.]+$/, '').slice(0, 60)
        await supabase.from('media_library').insert({
          name, url, type: 'image', size: file.size, created_by: (await supabase.auth.getUser()).data?.user?.id
        })
      } catch(err) { console.error('Media upload error:', err) }
      done++
    }
    fill.style.width = '100%'
    text.textContent = `✓ ${done} arquivo(s) enviado(s)`
    setTimeout(() => { progress.style.display = 'none'; fill.style.width = '0' }, 2000)
    await loadMediaGrid()
    e.target.value = ''
  })

  // Drag and drop
  const dropArea = document.getElementById('media-drop-area')
  dropArea.addEventListener('dragover', e => { e.preventDefault(); dropArea.classList.add('drag-over') })
  dropArea.addEventListener('dragleave', () => dropArea.classList.remove('drag-over'))
  dropArea.addEventListener('drop', e => {
    e.preventDefault()
    dropArea.classList.remove('drag-over')
    document.getElementById('media-file-input').files = e.dataTransfer.files
    document.getElementById('media-file-input').dispatchEvent(new Event('change'))
  })
}

async function loadMediaGrid() {
  const grid = document.getElementById('media-grid')
  if (!grid) return
  const { data, error } = await supabase.from('media_library')
    .select('*').order('created_at', { ascending: false }).limit(100)
  if (error || !data?.length) {
    grid.innerHTML = '<div class="media-empty">Nenhuma imagem enviada ainda.</div>'
    return
  }
  grid.innerHTML = data.map(item => `
    <div class="media-item" data-id="${item.id}" data-url="${escapeHTML(item.url)}">
      <img src="${escapeHTML(item.url)}" alt="${escapeHTML(item.name || '')}">
      <div class="media-item-overlay">
        <button class="media-copy-btn" data-url="${escapeHTML(item.url)}">📋 Copiar URL</button>
        <button class="media-del-btn" data-id="${item.id}">🗑️ Excluir</button>
      </div>
      <div class="media-item-name">${escapeHTML(item.name || 'imagem')}</div>
    </div>
  `).join('')

  grid.querySelectorAll('.media-copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      navigator.clipboard?.writeText(btn.dataset.url)
        .then(() => { const orig = btn.textContent; btn.textContent = '✓ Copiado!'; setTimeout(() => { btn.textContent = orig }, 1500) })
    })
  })

  grid.querySelectorAll('.media-del-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation()
      if (!confirm('Excluir esta imagem da biblioteca?')) return
      await supabase.from('media_library').delete().eq('id', btn.dataset.id)
      await loadMediaGrid()
    })
  })
}

// ─── Super Admin: Painel Global da Plataforma ─────────────────────────────────
async function initSuperAdminSection() {
  const sec = document.getElementById('section-super-admin')
  if (!sec || sec.dataset.loaded) return
  sec.dataset.loaded = '1'

  sec.innerHTML = `
    <div class="cfg-card">
      <div class="cfg-card-title">⚡ Painel Global da Plataforma</div>
      <div class="sa-tabs">
        <button class="sa-tab active" data-tab="tenants">🏢 Imobiliárias</button>
        <button class="sa-tab" data-tab="plans">📦 Planos</button>
        <button class="sa-tab" data-tab="subscriptions">💳 Assinaturas</button>
        <button class="sa-tab" data-tab="global-users">👥 Usuários Globais</button>
        <button class="sa-tab" data-tab="platform">⚙️ Plataforma</button>
      </div>
      <div id="sa-panel-tenants" class="sa-panel">
        <div class="sa-toolbar">
          <input id="sa-tenant-search" class="sa-search" type="text" placeholder="Buscar imobiliária…">
          <button id="sa-tenant-new" class="btn-primary-sm">+ Nova Imobiliária</button>
        </div>
        <div id="sa-tenants-list" class="sa-list"><div class="sa-loading">Carregando…</div></div>
      </div>
      <div id="sa-panel-plans" class="sa-panel hidden">
        <div id="sa-plans-list" class="sa-list"><div class="sa-loading">Carregando…</div></div>
      </div>
      <div id="sa-panel-subscriptions" class="sa-panel hidden">
        <div class="sa-toolbar">
          <select id="sa-sub-filter" class="sa-select">
            <option value="">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="trialing">Trial</option>
            <option value="past_due">Inadimplente</option>
            <option value="cancelled">Cancelado</option>
            <option value="paused">Pausado</option>
          </select>
        </div>
        <div id="sa-subs-list" class="sa-list"><div class="sa-loading">Carregando…</div></div>
      </div>
      <div id="sa-panel-global-users" class="sa-panel hidden">
        <div class="sa-toolbar">
          <input id="sa-user-search" class="sa-search" type="text" placeholder="Buscar usuário…">
        </div>
        <div id="sa-users-list" class="sa-list"><div class="sa-loading">Carregando…</div></div>
      </div>
      <div id="sa-panel-platform" class="sa-panel hidden">
        <div class="sa-platform-grid">
          <div class="sa-stat-card">
            <div class="sa-stat-label">Total de Imobiliárias</div>
            <div class="sa-stat-value" id="sa-stat-tenants">—</div>
          </div>
          <div class="sa-stat-card">
            <div class="sa-stat-label">Usuários Ativos</div>
            <div class="sa-stat-value" id="sa-stat-users">—</div>
          </div>
          <div class="sa-stat-card">
            <div class="sa-stat-label">Assinaturas Ativas</div>
            <div class="sa-stat-value" id="sa-stat-subs">—</div>
          </div>
          <div class="sa-stat-card">
            <div class="sa-stat-label">Imóveis Publicados</div>
            <div class="sa-stat-value" id="sa-stat-props">—</div>
          </div>
        </div>
        <div class="cfg-card" style="margin-top:16px">
          <div class="cfg-card-title">Configurações Globais da Plataforma</div>
          <div class="form-group">
            <label>Nome da Plataforma</label>
            <input id="sa-plat-name" type="text" class="form-input" placeholder="ImobiPro SaaS">
          </div>
          <div class="form-group">
            <label>Email de Suporte</label>
            <input id="sa-plat-email" type="email" class="form-input" placeholder="suporte@imobipro.com.br">
          </div>
          <div class="form-group">
            <label>Trial padrão (dias)</label>
            <input id="sa-plat-trial" type="number" class="form-input" placeholder="14" min="0" max="90">
          </div>
          <div class="cfg-save-row">
            <button id="sa-plat-save" class="btn-primary-sm">Salvar Configurações</button>
            <span id="sa-plat-msg" class="cfg-save-msg"></span>
          </div>
        </div>
      </div>
    </div>
  `

  // Tab switching
  sec.querySelectorAll('.sa-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      sec.querySelectorAll('.sa-tab').forEach(t => t.classList.remove('active'))
      sec.querySelectorAll('.sa-panel').forEach(p => p.classList.add('hidden'))
      tab.classList.add('active')
      const panel = sec.querySelector(`#sa-panel-${tab.dataset.tab}`)
      if (panel) panel.classList.remove('hidden')
      if (tab.dataset.tab === 'tenants' && !sec.querySelector('#sa-tenants-list').dataset.loaded) loadSATenants()
      if (tab.dataset.tab === 'plans' && !sec.querySelector('#sa-plans-list').dataset.loaded) loadSAPlans()
      if (tab.dataset.tab === 'subscriptions' && !sec.querySelector('#sa-subs-list').dataset.loaded) loadSASubscriptions()
      if (tab.dataset.tab === 'global-users' && !sec.querySelector('#sa-users-list').dataset.loaded) loadSAUsers()
      if (tab.dataset.tab === 'platform') loadSAPlatformStats()
    })
  })

  sec.querySelector('#sa-sub-filter')?.addEventListener('change', loadSASubscriptions)
  sec.querySelector('#sa-tenant-search')?.addEventListener('input', loadSATenants)
  sec.querySelector('#sa-user-search')?.addEventListener('input', loadSAUsers)
  sec.querySelector('#sa-tenant-new')?.addEventListener('click', () => openNewTenantModal())
  sec.querySelector('#sa-plat-save')?.addEventListener('click', savePlatformSettings)

  loadSATenants()
  loadSAPlatformStats()
}

async function loadSATenants() {
  const list   = document.getElementById('sa-tenants-list')
  const search = document.getElementById('sa-tenant-search')?.value?.toLowerCase() || ''
  if (!list) return
  list.dataset.loaded = '1'

  let query = supabase.from('tenants').select('*, plans(name, price_brl)').order('created_at', { ascending: false })
  const { data, error } = await query
  if (error) { list.innerHTML = `<div class="sa-error">Erro ao carregar: ${error.message}</div>`; return }

  const filtered = (data || []).filter(t =>
    !search || t.name?.toLowerCase().includes(search) || t.slug?.toLowerCase().includes(search)
  )

  if (!filtered.length) { list.innerHTML = '<div class="sa-empty">Nenhuma imobiliária encontrada.</div>'; return }

  const statusBadge = t => t.active
    ? '<span class="sa-badge sa-badge-green">Ativo</span>'
    : '<span class="sa-badge sa-badge-red">Inativo</span>'

  list.innerHTML = filtered.map(t => `
    <div class="sa-list-row" data-action="open-panel" data-id="${t.id}" style="cursor:pointer;" title="Clique para gerenciar">
      <div class="sa-list-info">
        ${t.logo_url ? `<img class="sa-tenant-logo" src="${escapeHTML(t.logo_url)}" alt="">` : '<div class="sa-tenant-logo-placeholder">🏢</div>'}
        <div>
          <div class="sa-list-name">${escapeHTML(t.name || '—')}</div>
          <div class="sa-list-sub">${escapeHTML(t.slug || '')} · ${escapeHTML(t.plans?.name || 'Sem plano')}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        ${statusBadge(t)}
        <button class="sa-btn-icon" data-action="toggle-tenant" data-id="${t.id}" data-active="${t.active}" title="${t.active ? 'Desativar' : 'Ativar'}">${t.active ? '⏸️' : '▶️'}</button>
        <span style="font-size:12px;color:#94a3b8;padding:0 4px;">→</span>
      </div>
    </div>
  `).join('')

  list.querySelectorAll('[data-action="toggle-tenant"]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation()
      const active = btn.dataset.active === 'true'
      await supabase.from('tenants').update({ active: !active }).eq('id', btn.dataset.id)
      loadSATenants()
    })
  })

  list.querySelectorAll('[data-action="open-panel"]').forEach(row => {
    row.addEventListener('click', () => {
      const tenant = (filtered || []).find(t => String(t.id) === String(row.dataset.id))
      if (tenant) openTenantPanel(tenant)
    })
  })
}

async function loadSAPlans() {
  const list = document.getElementById('sa-plans-list')
  if (!list) return
  list.dataset.loaded = '1'

  const { data, error } = await supabase.from('plans').select('*').order('price_brl')
  if (error) { list.innerHTML = `<div class="sa-error">Erro: ${error.message}</div>`; return }

  list.innerHTML = (data || []).map(p => `
    <div class="sa-plan-card">
      <div class="sa-plan-name">${escapeHTML(p.name)}</div>
      <div class="sa-plan-price">${p.price_brl === 0 ? 'Gratuito' : 'R$ ' + Number(p.price_brl).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '/mês'}</div>
      <div class="sa-plan-limits">
        <span>👥 ${p.max_users === 999 ? 'Ilimitado' : p.max_users} usuários</span>
        <span>🏠 ${p.max_properties === 9999 ? 'Ilimitado' : p.max_properties} imóveis</span>
        <span>📋 ${p.max_leads === 99999 ? 'Ilimitado' : p.max_leads} leads</span>
      </div>
    </div>
  `).join('')
}

async function loadSASubscriptions() {
  const list   = document.getElementById('sa-subs-list')
  const filter = document.getElementById('sa-sub-filter')?.value || ''
  if (!list) return
  list.dataset.loaded = '1'

  let query = supabase.from('subscriptions')
    .select('*, tenants(name), plans(name, price_brl)')
    .order('created_at', { ascending: false })
  if (filter) query = query.eq('status', filter)

  const { data, error } = await query
  if (error) { list.innerHTML = `<div class="sa-error">Erro: ${error.message}</div>`; return }
  if (!data?.length) { list.innerHTML = '<div class="sa-empty">Nenhuma assinatura encontrada.</div>'; return }

  const statusColor = { active: 'green', trialing: 'blue', past_due: 'orange', cancelled: 'red', paused: 'gray' }
  const statusLabel = { active: 'Ativo', trialing: 'Trial', past_due: 'Inadimplente', cancelled: 'Cancelado', paused: 'Pausado' }

  list.innerHTML = data.map(s => `
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div>
          <div class="sa-list-name">${escapeHTML(s.tenants?.name || '—')}</div>
          <div class="sa-list-sub">${escapeHTML(s.plans?.name || '—')} · R$ ${Number(s.plans?.price_brl || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge sa-badge-${statusColor[s.status] || 'gray'}">${statusLabel[s.status] || s.status}</span>
        <span class="sa-list-date">${s.current_period_end ? new Date(s.current_period_end).toLocaleDateString('pt-BR') : '—'}</span>
      </div>
    </div>
  `).join('')
}

async function loadSAUsers() {
  const list   = document.getElementById('sa-users-list')
  const search = document.getElementById('sa-user-search')?.value?.toLowerCase() || ''
  if (!list) return
  list.dataset.loaded = '1'

  const { data, error } = await supabase.from('profiles')
    .select('*, tenants(name)')
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) { list.innerHTML = `<div class="sa-error">Erro: ${error.message}</div>`; return }

  const filtered = (data || []).filter(u =>
    !search || u.name?.toLowerCase().includes(search) || u.email?.toLowerCase().includes(search)
  )
  if (!filtered.length) { list.innerHTML = '<div class="sa-empty">Nenhum usuário encontrado.</div>'; return }

  const roleLabel = { super_admin: '⚡ Super Admin', admin: '👑 Admin', corretor: '🔑 Corretor' }

  list.innerHTML = filtered.map(u => `
    <div class="sa-list-row">
      <div class="sa-list-info">
        <div class="sa-user-avatar">${(u.name || '?')[0].toUpperCase()}</div>
        <div>
          <div class="sa-list-name">${escapeHTML(u.name || '—')}</div>
          <div class="sa-list-sub">${escapeHTML(u.tenants?.name || 'Sem imobiliária')} · ${roleLabel[u.role] || u.role}</div>
        </div>
      </div>
      <div class="sa-list-actions">
        <span class="sa-badge ${u.active !== false ? 'sa-badge-green' : 'sa-badge-red'}">${u.active !== false ? 'Ativo' : 'Inativo'}</span>
      </div>
    </div>
  `).join('')
}

async function loadSAPlatformStats() {
  const [tenantsRes, usersRes, subsRes, propsRes] = await Promise.all([
    supabase.from('tenants').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('subscriptions').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('properties').select('id', { count: 'exact', head: true }).eq('published', true),
  ])
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val ?? '—' }
  set('sa-stat-tenants', tenantsRes.count)
  set('sa-stat-users',   usersRes.count)
  set('sa-stat-subs',    subsRes.count)
  set('sa-stat-props',   propsRes.count)
}

async function savePlatformSettings() {
  const btn = document.getElementById('sa-plat-save')
  const msg = document.getElementById('sa-plat-msg')
  if (btn) { btn.disabled = true; btn.textContent = 'Salvando…' }
  await saveMultipleSettings([
    { key: 'platform.name',         value: document.getElementById('sa-plat-name')?.value  || '' },
    { key: 'platform.support_email',value: document.getElementById('sa-plat-email')?.value || '' },
    { key: 'platform.trial_days',   value: document.getElementById('sa-plat-trial')?.value || '14' },
  ])
  if (btn) { btn.disabled = false; btn.textContent = 'Salvar Configurações' }
  showSaveMsg(msg, true)
}

function toSlug(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function openNewTenantModal() {
  const existing = document.getElementById('sa-new-tenant-modal')
  if (existing) existing.remove()

  const modal = document.createElement('div')
  modal.id = 'sa-new-tenant-modal'
  modal.className = 'sa-modal-backdrop'
  modal.innerHTML = `
    <div class="sa-modal" style="max-width:540px;">
      <div class="sa-modal-header">
        <h3>Nova Imobiliária</h3>
        <button class="sa-modal-close" id="sa-modal-close-btn">✕</button>
      </div>
      <div class="sa-modal-body">

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:10px;">Dados da Imobiliária</div>
        <div class="form-group"><label>Nome da Imobiliária *</label><input id="nt-name" class="form-input" type="text" placeholder="Ex: Imobiliária ABC"></div>
        <div class="form-group"><label>Slug (URL única) *</label><input id="nt-slug" class="form-input" type="text" placeholder="imobiliaria-abc"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="nt-domain" class="form-input" type="text" placeholder="abc.imobipro.com.br"></div>
        <div class="form-group"><label>Plano</label>
          <select id="nt-plan" class="form-input">
            <option value="">Carregando planos…</option>
          </select>
        </div>

        <div style="height:1px;background:#e2e8f0;margin:16px 0;"></div>
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-bottom:10px;">Login do Administrador</div>
        <p style="font-size:12px;color:#64748b;margin-bottom:12px;">O admin desta imobiliária poderá criar e gerenciar os corretores dela.</p>
        <div class="form-group"><label>E-mail do Admin *</label><input id="nt-admin-email" class="form-input" type="email" placeholder="admin@imobiliariaabc.com.br"></div>
        <div class="form-group"><label>Senha *</label>
          <div style="position:relative;">
            <input id="nt-admin-password" class="form-input" type="password" placeholder="Mínimo 6 caracteres" style="padding-right:38px;">
            <button type="button" id="nt-pwd-toggle" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#94a3b8;font-size:16px;">👁</button>
          </div>
        </div>

        <div id="nt-msg" style="font-size:13px;margin-top:4px;"></div>
      </div>
      <div class="sa-modal-footer">
        <button id="nt-cancel" class="btn-secondary-sm">Cancelar</button>
        <button id="nt-save" class="btn-primary-sm">Criar Imobiliária</button>
      </div>
    </div>
  `
  document.body.appendChild(modal)

  supabase.from('plans').select('id, name').then(({ data }) => {
    const sel = document.getElementById('nt-plan')
    if (sel && data) sel.innerHTML = '<option value="">Sem plano</option>' + data.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('')
  })

  document.getElementById('nt-name')?.addEventListener('input', e => {
    const slug = document.getElementById('nt-slug')
    if (slug && !slug.dataset.manual) slug.value = toSlug(e.target.value)
  })
  document.getElementById('nt-slug')?.addEventListener('input', e => { e.target.dataset.manual = '1' })
  document.getElementById('nt-pwd-toggle')?.addEventListener('click', () => {
    const inp = document.getElementById('nt-admin-password')
    inp.type = inp.type === 'password' ? 'text' : 'password'
  })

  const close = () => modal.remove()
  document.getElementById('sa-modal-close-btn')?.addEventListener('click', close)
  document.getElementById('nt-cancel')?.addEventListener('click', close)
  modal.addEventListener('click', e => { if (e.target === modal) close() })

  document.getElementById('nt-save')?.addEventListener('click', async () => {
    const name       = document.getElementById('nt-name')?.value?.trim()
    const slug       = document.getElementById('nt-slug')?.value?.trim()
    const domain     = document.getElementById('nt-domain')?.value?.trim()
    const planId     = document.getElementById('nt-plan')?.value
    const adminEmail = document.getElementById('nt-admin-email')?.value?.trim()
    const adminPwd   = document.getElementById('nt-admin-password')?.value?.trim()
    const msgEl      = document.getElementById('nt-msg')
    const saveBtn    = document.getElementById('nt-save')

    if (!name || !slug) { msgEl.textContent = '❌ Nome e slug são obrigatórios.'; msgEl.style.color = '#ef4444'; return }
    if (!adminEmail)    { msgEl.textContent = '❌ Informe o e-mail do admin.'; msgEl.style.color = '#ef4444'; return }
    if (!adminPwd || adminPwd.length < 6) { msgEl.textContent = '❌ A senha precisa ter mínimo 6 caracteres.'; msgEl.style.color = '#ef4444'; return }

    saveBtn.disabled = true; saveBtn.textContent = 'Criando…'
    msgEl.textContent = '⏳ Criando imobiliária…'; msgEl.style.color = '#64748b'

    // 1. Create tenant
    const { data: tenantData, error: tenantErr } = await supabase
      .from('tenants')
      .insert({ name, slug, domain: domain || null, plan_id: planId || null, active: true })
      .select()
    if (tenantErr) {
      saveBtn.disabled = false; saveBtn.textContent = 'Criar Imobiliária'
      msgEl.textContent = '❌ ' + tenantErr.message; msgEl.style.color = '#ef4444'; return
    }
    const newTenantId = tenantData?.[0]?.id

    msgEl.textContent = '⏳ Criando usuário admin…'

    // 2. Create admin user via Edge Function
    const result = await callEdgeFunction({ email: adminEmail, password: adminPwd, role: 'admin', tenant_id: newTenantId })
    if (!result?.success) {
      saveBtn.disabled = false; saveBtn.textContent = 'Criar Imobiliária'
      msgEl.innerHTML = '⚠️ Imobiliária criada, mas erro ao criar usuário: ' + escapeHTML(result?.error || 'Desconhecido')
      msgEl.style.color = '#f59e0b'
      setTimeout(() => { close(); loadSATenants() }, 3000)
      return
    }

    // 3. Update tenant_id if needed; edge function handles role (never downgrades super_admin)
    if (newTenantId && result?.user_id && !result?.linked) {
      await supabase.from('profiles').update({ tenant_id: newTenantId }).eq('id', result.user_id)
    }

    saveBtn.disabled = false; saveBtn.textContent = 'Criar Imobiliária'

    if (result.email_sent === false) {
      // Email failed — show credentials in the modal so admin can share manually
      msgEl.innerHTML = `
        ✅ Imobiliária e admin criados!<br>
        <span style="color:#ef4444;">⚠️ E-mail não enviado (${escapeHTML(result.email_error || 'erro desconhecido')}).</span><br>
        <strong>Compartilhe as credenciais manualmente:</strong><br>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-top:8px;font-size:12px;">
          E-mail: <strong>${escapeHTML(adminEmail)}</strong><br>
          Senha: <strong>${escapeHTML(adminPwd)}</strong>
        </div>`
      msgEl.style.color = '#0f172a'
    } else {
      msgEl.textContent = '✅ Imobiliária criada e e-mail enviado com sucesso!'; msgEl.style.color = '#22c55e'
      setTimeout(() => { close(); loadSATenants() }, 1500)
    }
  })
}

// ─── Tenant Panel (painel completo por imobiliária) ──────────────────────────
function openTenantPanel(tenant) {
  document.getElementById('tenant-panel')?.remove()
  const panel = document.createElement('div')
  panel.id = 'tenant-panel'
  panel.style.cssText = 'position:fixed;inset:0;z-index:300;background:#f1f5f9;overflow-y:auto;display:flex;flex-direction:column;'

  const TABS = [
    { id: 'properties', label: '🏠 Imóveis' },
    { id: 'leads',      label: '📋 Leads' },
    { id: 'users',      label: '👥 Corretores' },
    { id: 'api',        label: '🔗 Site & API' },
    { id: 'config',     label: '⚙️ Configurações' },
  ]

  panel.innerHTML = `
    <div style="background:#0a1628;padding:14px 24px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:10;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.3);">
      <button id="tp-back" style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;padding:7px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;">← Imobiliárias</button>
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
        ${tenant.logo_url ? `<img src="${escapeHTML(tenant.logo_url)}" style="width:36px;height:36px;border-radius:8px;object-fit:cover;flex-shrink:0;">` : '<div style="width:36px;height:36px;background:rgba(255,255,255,.1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏢</div>'}
        <div style="min-width:0;">
          <div style="color:#fff;font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHTML(tenant.name)}</div>
          <div style="color:#94a3b8;font-size:12px;">${escapeHTML(tenant.slug||'')} · ${tenant.active !== false ? '<span style="color:#4ade80;">● Ativo</span>' : '<span style="color:#f87171;">● Inativo</span>'}</div>
        </div>
      </div>
      <button id="tp-edit-btn" style="background:#c9a84c;border:none;color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">✏️ Editar dados</button>
    </div>
    <div style="background:#fff;border-bottom:2px solid #e2e8f0;padding:0 24px;display:flex;gap:0;flex-shrink:0;overflow-x:auto;">
      ${TABS.map((t,i) => `<button class="tp-tab" data-tab="${t.id}" style="padding:14px 20px;border:none;background:none;cursor:pointer;font-size:14px;font-weight:${i===0?'700':'500'};color:${i===0?'#2563eb':'#64748b'};border-bottom:2px solid ${i===0?'#2563eb':'transparent'};margin-bottom:-2px;white-space:nowrap;transition:all .15s;">${t.label}</button>`).join('')}
    </div>
    <div id="tp-content" style="padding:24px;flex:1;max-width:1200px;margin:0 auto;width:100%;box-sizing:border-box;"></div>
  `
  document.body.appendChild(panel)

  document.getElementById('tp-back').addEventListener('click', () => panel.remove())
  document.getElementById('tp-edit-btn').addEventListener('click', () => openEditTenantModal(tenant))

  panel.querySelectorAll('.tp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      panel.querySelectorAll('.tp-tab').forEach(t => {
        t.style.fontWeight = '500'; t.style.color = '#64748b'; t.style.borderBottomColor = 'transparent'
      })
      tab.style.fontWeight = '700'; tab.style.color = '#2563eb'; tab.style.borderBottomColor = '#2563eb'
      loadTenantPanelTab(tenant, tab.dataset.tab)
    })
  })

  loadTenantPanelTab(tenant, 'properties')
}

function openTenantPropertyEdit(p, onSaved) {
  const existing = document.getElementById('tp-prop-edit-modal')
  if (existing) existing.remove()

  const modal = document.createElement('div')
  modal.id = 'tp-prop-edit-modal'
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px;'

  const fi = (id, label, val, type='text', extra='') =>
    `<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${label}</label>
      <input id="${id}" type="${type}" value="${escapeHTML(String(val||''))}" ${extra}
        style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;outline:none;">
    </div>`

  const sel = (id, label, opts, cur) =>
    `<div style="display:flex;flex-direction:column;gap:4px;">
      <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">${label}</label>
      <select id="${id}" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;background:#fff;">
        ${opts.map(([v,l]) => `<option value="${v}"${cur===v?' selected':''}>${l}</option>`).join('')}
      </select>
    </div>`

  modal.innerHTML = `
    <div style="background:#fff;border-radius:16px;width:100%;max-width:680px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.25);">
      <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
        <h3 style="margin:0;font-size:17px;font-weight:700;color:#0f172a;">✏️ Editar Imóvel</h3>
        <button id="tpe-close" style="background:none;border:none;font-size:20px;cursor:pointer;color:#94a3b8;line-height:1;">✕</button>
      </div>
      <div style="padding:24px;overflow-y:auto;display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        ${fi('tpe-title', 'TÍTULO *', p.title, 'text', 'style="grid-column:span 2;border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;"')}
        ${fi('tpe-price', 'PREÇO (R$)', p.price)}
        ${fi('tpe-area', 'ÁREA (m²)', p.area)}
        ${fi('tpe-bedrooms', 'DORMITÓRIOS', p.bedrooms, 'number')}
        ${fi('tpe-suites', 'SUÍTES', p.suites, 'number')}
        ${fi('tpe-parking', 'VAGAS', p.parking, 'number')}
        ${fi('tpe-reference', 'REFERÊNCIA', p.reference)}
        ${fi('tpe-city', 'CIDADE', p.city)}
        ${fi('tpe-neighborhood', 'BAIRRO', p.neighborhood)}
        ${fi('tpe-rua', 'RUA', p.rua)}
        ${fi('tpe-numero', 'NÚMERO', p.numero)}
        ${sel('tpe-construction', 'STATUS DA OBRA', [
          ['','Selecione'],['pronto','Pronto'],['pre-lancamento','Pré-lançamento'],['lancamento','Lançamento'],['em-obra','Em obra']
        ], p.construction_status)}
        ${sel('tpe-published', 'PUBLICAÇÃO', [['true','Publicado'],['false','Rascunho']], String(p.published))}
        <div style="grid-column:span 2;display:flex;flex-direction:column;gap:4px;">
          <label style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:.05em;">DESCRIÇÃO</label>
          <textarea id="tpe-description" rows="4" style="border:1px solid #e2e8f0;border-radius:8px;padding:9px 12px;font-size:14px;color:#0f172a;resize:vertical;font-family:inherit;">${escapeHTML(p.description||'')}</textarea>
        </div>
        <div id="tpe-msg" style="grid-column:span 2;font-size:13px;min-height:16px;"></div>
      </div>
      <div style="padding:16px 24px;border-top:1px solid #e2e8f0;display:flex;gap:10px;justify-content:flex-end;flex-shrink:0;">
        <button id="tpe-cancel" style="background:#f1f5f9;color:#475569;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">Cancelar</button>
        <button id="tpe-save" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 24px;cursor:pointer;font-size:14px;font-weight:700;">💾 Salvar</button>
      </div>
    </div>`

  document.body.appendChild(modal)

  const close = () => modal.remove()
  document.getElementById('tpe-close').addEventListener('click', close)
  document.getElementById('tpe-cancel').addEventListener('click', close)
  modal.addEventListener('click', e => { if (e.target === modal) close() })

  document.getElementById('tpe-save').addEventListener('click', async () => {
    const btn   = document.getElementById('tpe-save')
    const msgEl = document.getElementById('tpe-msg')
    const title = document.getElementById('tpe-title').value.trim()
    if (!title) { msgEl.style.color='#ef4444'; msgEl.textContent='Título é obrigatório.'; return }

    btn.disabled = true; btn.textContent = 'Salvando…'
    const payload = {
      title,
      price:               document.getElementById('tpe-price').value.trim() || null,
      area:                document.getElementById('tpe-area').value.trim() || null,
      bedrooms:            document.getElementById('tpe-bedrooms').value || null,
      suites:              document.getElementById('tpe-suites').value || null,
      parking:             document.getElementById('tpe-parking').value || null,
      reference:           document.getElementById('tpe-reference').value.trim() || null,
      city:                document.getElementById('tpe-city').value.trim() || null,
      neighborhood:        document.getElementById('tpe-neighborhood').value.trim() || null,
      rua:                 document.getElementById('tpe-rua').value.trim() || null,
      numero:              document.getElementById('tpe-numero').value.trim() || null,
      construction_status: document.getElementById('tpe-construction').value || null,
      published:           document.getElementById('tpe-published').value === 'true',
      description:         document.getElementById('tpe-description').value.trim() || null,
    }

    const { error } = await supabase.from('properties').update(payload).eq('id', p.id)
    if (error) {
      msgEl.style.color='#ef4444'; msgEl.textContent='Erro: ' + error.message
      btn.disabled = false; btn.textContent = '💾 Salvar'
      return
    }
    msgEl.style.color='#16a34a'; msgEl.textContent='✅ Salvo!'
    setTimeout(() => { close(); if (typeof onSaved === 'function') onSaved() }, 800)
  })
}

async function loadTenantPanelTab(tenant, tab) {
  const content = document.getElementById('tp-content')
  if (!content) return
  content.innerHTML = '<div style="text-align:center;padding:64px;color:#94a3b8;font-size:14px;">Carregando…</div>'

  const reload = () => loadTenantPanelTab(tenant, tab)
  const btnStyle = (bg, color) => `background:${bg};color:${color};border:none;border-radius:6px;padding:5px 12px;cursor:pointer;font-size:12px;font-weight:600;white-space:nowrap;`

  // ── IMÓVEIS ──
  if (tab === 'properties') {
    const { data } = await supabase.from('properties').select('*').eq('tenant_id', tenant.id).order('created_at', { ascending: false })
    if (!data?.length) {
      content.innerHTML = '<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">🏠</div><p style="font-size:14px;">Nenhum imóvel cadastrado ainda.</p></div>'
      return
    }
    content.innerHTML = `
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${data.length} imóvel(is)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:600px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">IMÓVEL</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">CIDADE</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">PREÇO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody id="tp-prop-tbody">${data.map(p => `
            <tr data-pid="${p.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <div style="display:flex;align-items:center;gap:10px;">
                  ${p.images?.[0] ? `<img src="${p.images[0]}" style="width:52px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;">` : '<div style="width:52px;height:38px;background:#e2e8f0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>'}
                  <div><div style="font-weight:600;font-size:13px;color:#0f172a;">${escapeHTML(p.title||'')}</div><div style="font-size:11px;color:#94a3b8;">${escapeHTML(p.reference||'')}</div></div>
                </div>
              </td>
              <td style="padding:12px 16px;font-size:13px;color:#475569;">${escapeHTML([p.neighborhood,p.city].filter(Boolean).join(', '))}</td>
              <td style="padding:12px 16px;font-size:13px;font-weight:700;color:#0f172a;">${escapeHTML(formatPrice(p.price,'pt'))}</td>
              <td style="padding:12px 16px;text-align:center;">${p.published ? '<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Publicado</span>' : '<span style="background:#f1f5f9;color:#64748b;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Rascunho</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-prop-edit" data-pid="${p.id}" style="${btnStyle('#eff6ff','#1d4ed8')}">✏️ Editar</button>
                  <button class="tp-prop-toggle" data-pid="${p.id}" data-pub="${p.published?'1':'0'}" style="${btnStyle(p.published?'#fef3c7':'#dcfce7', p.published?'#92400e':'#15803d')}">${p.published?'Despublicar':'Publicar'}</button>
                  <button class="tp-prop-del" data-pid="${p.id}" style="${btnStyle('#fee2e2','#dc2626')}">Excluir</button>
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table></div>
      </div>`

    content.querySelectorAll('.tp-prop-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = Number(btn.dataset.pid)
        const prop = data.find(p => p.id === pid)
        if (prop) openTenantPropertyEdit(prop, reload)
      })
    })
    content.querySelectorAll('.tp-prop-toggle').forEach(btn => {
      btn.addEventListener('click', async () => {
        const pid = Number(btn.dataset.pid)
        const nowPub = btn.dataset.pub === '1'
        btn.disabled = true; btn.textContent = '…'
        await supabase.from('properties').update({ published: !nowPub }).eq('id', pid)
        reload()
      })
    })
    content.querySelectorAll('.tp-prop-del').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Excluir este imóvel permanentemente?')) return
        btn.disabled = true; btn.textContent = '…'
        await supabase.from('properties').delete().eq('id', Number(btn.dataset.pid))
        reload()
      })
    })
  }

  // ── LEADS ──
  if (tab === 'leads') {
    const { data } = await supabase.from('leads').select('*').eq('tenant_id', tenant.id).order('created_at', { ascending: false }).limit(200)
    if (!data?.length) {
      content.innerHTML = '<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">📋</div><p style="font-size:14px;">Nenhum lead ainda.</p></div>'
      return
    }
    const stageColor = s => ({ novo:'#dbeafe,#1d4ed8', contato:'#fef3c7,#92400e', proposta:'#ede9fe,#6d28d9', fechado:'#dcfce7,#15803d' }[s] || '#f1f5f9,#64748b')
    content.innerHTML = `
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${data.length} lead(s)</h3>
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:560px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">NOME</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">CONTATO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">ETAPA</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">DATA</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody>${data.map(l => {
            const [bg,fg] = stageColor(l.stage||l.status||'').split(',')
            const waNum = (l.phone||'').replace(/\D/g,'')
            return `<tr data-lid="${l.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#0f172a;">${escapeHTML(l.name||'')}</td>
              <td style="padding:12px 16px;">
                <div style="font-size:13px;color:#475569;">${escapeHTML(l.phone||'—')}</div>
                <div style="font-size:11px;color:#94a3b8;">${escapeHTML(l.email||'')}</div>
              </td>
              <td style="padding:12px 16px;"><span style="background:${bg};color:${fg};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${escapeHTML(l.stage||l.status||'Novo')}</span></td>
              <td style="padding:12px 16px;font-size:12px;color:#94a3b8;">${new Date(l.created_at).toLocaleDateString('pt-BR')}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;align-items:center;">
                  ${waNum ? `<a href="https://wa.me/${waNum}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#25d366;border-radius:6px;color:#fff;text-decoration:none;flex-shrink:0;" title="WhatsApp"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.882l6.199-1.625A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-4.992-1.368l-.358-.213-3.685.967.983-3.596-.234-.369A9.79 9.79 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg></a>` : ''}
                  <button class="tp-lead-del" data-lid="${l.id}" style="${btnStyle('#fee2e2','#dc2626')}">Excluir</button>
                </div>
              </td>
            </tr>`
          }).join('')}
          </tbody>
        </table></div>
      </div>`

    content.querySelectorAll('.tp-lead-del').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Excluir este lead permanentemente?')) return
        btn.disabled = true; btn.textContent = '…'
        await supabase.from('leads').delete().eq('id', btn.dataset.lid)
        reload()
      })
    })
  }

  // ── CORRETORES ──
  if (tab === 'users') {
    const { data } = await supabase.from('profiles').select('*').eq('tenant_id', tenant.id).order('created_at', { ascending: false })
    const addBtn = `<button id="tp-add-corretor" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:8px 16px;cursor:pointer;font-size:13px;font-weight:600;">+ Adicionar Usuário</button>`
    if (!data?.length) {
      content.innerHTML = `<div style="text-align:center;padding:64px;color:#94a3b8;"><div style="font-size:48px;margin-bottom:12px;">👥</div><p style="font-size:14px;margin-bottom:16px;">Nenhum corretor cadastrado ainda.</p>${addBtn}</div>`
      content.querySelector('#tp-add-corretor')?.addEventListener('click', () => openAddCorretorModal(tenant.id, reload))
      return
    }
    content.innerHTML = `
      <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.07);">
        <div style="padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0;">${data.length} usuário(s)</h3>
          ${addBtn}
        </div>
        <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:520px;">
          <thead><tr style="background:#f8fafc;">
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">USUÁRIO</th>
            <th style="padding:11px 16px;text-align:left;font-size:11px;color:#64748b;font-weight:700;">FUNÇÃO</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">STATUS</th>
            <th style="padding:11px 16px;text-align:center;font-size:11px;color:#64748b;font-weight:700;">AÇÕES</th>
          </tr></thead>
          <tbody>${data.map(u => `
            <tr data-uid="${u.id}" style="border-top:1px solid #f1f5f9;">
              <td style="padding:12px 16px;"><div style="font-weight:600;font-size:13px;color:#0f172a;">${escapeHTML(u.name||u.email||'—')}</div><div style="font-size:11px;color:#94a3b8;">${escapeHTML(u.email||'')}</div></td>
              <td style="padding:12px 16px;">
                <select class="tp-role-sel" data-uid="${u.id}" style="border:1px solid #e2e8f0;border-radius:6px;padding:4px 8px;font-size:13px;color:#0f172a;background:#fff;cursor:pointer;">
                  <option value="admin" ${u.role==='admin'?'selected':''}>Admin</option>
                  <option value="corretor" ${u.role==='corretor'?'selected':''}>Corretor</option>
                </select>
              </td>
              <td style="padding:12px 16px;text-align:center;">${u.active!==false ? '<span style="background:#dcfce7;color:#16a34a;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Ativo</span>' : '<span style="background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">Pausado</span>'}</td>
              <td style="padding:12px 16px;text-align:center;">
                <div style="display:flex;gap:6px;justify-content:center;">
                  <button class="tp-user-toggle" data-uid="${u.id}" data-active="${u.active!==false?'1':'0'}" style="${btnStyle(u.active!==false?'#fef3c7':'#dcfce7', u.active!==false?'#92400e':'#15803d')}">${u.active!==false?'Pausar':'Ativar'}</button>
                  <button class="tp-user-del" data-uid="${u.id}" style="${btnStyle('#fee2e2','#dc2626')}">Remover</button>
                </div>
              </td>
            </tr>`).join('')}
          </tbody>
        </table></div>
      </div>`

    content.querySelector('#tp-add-corretor')?.addEventListener('click', () => openAddCorretorModal(tenant.id, reload))

    content.querySelectorAll('.tp-role-sel').forEach(sel => {
      sel.addEventListener('change', async () => {
        const uid = sel.dataset.uid
        sel.disabled = true
        await supabase.from('profiles').update({ role: sel.value }).eq('id', uid)
        sel.disabled = false
      })
    })
    content.querySelectorAll('.tp-user-toggle').forEach(btn => {
      btn.addEventListener('click', async () => {
        const uid = btn.dataset.uid
        const nowActive = btn.dataset.active === '1'
        btn.disabled = true; btn.textContent = '…'
        await supabase.from('profiles').update({ active: !nowActive }).eq('id', uid)
        reload()
      })
    })
    content.querySelectorAll('.tp-user-del').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Remover este usuário da imobiliária? O acesso ao sistema será excluído permanentemente.')) return
        btn.disabled = true; btn.textContent = '…'
        await callEdgeFunction({ action: 'delete', userId: btn.dataset.uid })
        reload()
      })
    })
  }

  // ── SITE & API ──
  if (tab === 'api') {
    const base       = 'https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api'
    const rawDomain  = (tenant.domain || '').replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '').trim()
    const siteUrl    = rawDomain ? `https://${rawDomain}` : `https://omarcorretor.com.br/demo.html?key=${tenant.id}`
    const siteLabel  = rawDomain ? `🌐 Site da Imobiliária` : `🌐 Site Demonstração`
    const siteDesc   = rawDomain
      ? `Site oficial da imobiliária integrado ao CRM.`
      : `Mostre ao cliente como o site integrado funciona com os imóveis desta imobiliária.`
    const btnLabel   = rawDomain ? `Abrir site →` : `Abrir site demo →`
    content.innerHTML = `
      <div style="display:grid;gap:20px;max-width:800px;">
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">🔑 Chave de API</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Use para conectar qualquer site externo ao CRM desta imobiliária.</p>
          <div style="display:flex;gap:10px;align-items:center;">
            <input type="text" value="${escapeHTML(tenant.id)}" readonly style="flex:1;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:monospace;font-size:13px;background:#f8fafc;min-width:0;">
            <button id="tp-copy-key" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>
        <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);">
          <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 4px;">${siteLabel}</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 16px;">${siteDesc}</p>
          <a href="${escapeHTML(siteUrl)}" target="_blank" style="display:inline-block;background:#c9a84c;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;">${btnLabel}</a>
          <p style="font-size:11px;color:#94a3b8;margin:10px 0 0;word-break:break-all;">${escapeHTML(siteUrl)}</p>
        </div>
        <div style="background:#0f172a;border-radius:12px;padding:24px;">
          <h3 style="font-size:14px;font-weight:700;color:#e2e8f0;margin:0 0 16px;">📡 Endpoints disponíveis</h3>
          <div style="font-family:monospace;font-size:12px;color:#94a3b8;line-height:2.2;">
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${base}/properties?key=${escapeHTML(tenant.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${base}/properties/{id}?key=${escapeHTML(tenant.id)}</div>
            <div><span style="color:#fb923c;margin-right:8px;">POST</span>${base}/leads?key=${escapeHTML(tenant.id)}</div>
            <div><span style="color:#4ade80;margin-right:8px;">GET</span>${base}/settings?key=${escapeHTML(tenant.id)}</div>
          </div>
        </div>
      </div>`
    document.getElementById('tp-copy-key')?.addEventListener('click', () => {
      navigator.clipboard?.writeText(tenant.id)
      const btn = document.getElementById('tp-copy-key')
      const orig = btn.textContent; btn.textContent = '✅ Copiada!'
      setTimeout(() => { btn.textContent = orig }, 2000)
    })
  }

  // ── CONFIGURAÇÕES ──
  if (tab === 'config') {
    const { data: rows } = await supabase.from('settings').select('key,value').eq('tenant_id', tenant.id)
    const s = {}; rows?.forEach(r => { s[r.key] = r.value })
    const field = (label, val) => `
      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.06em;margin-bottom:4px;">${label}</div>
        <div style="font-size:14px;color:#0f172a;">${escapeHTML(String(val||'—'))}</div>
      </div>`
    content.innerHTML = `
      <div style="background:#fff;border-radius:12px;padding:24px;box-shadow:0 1px 6px rgba(0,0,0,.07);max-width:560px;">
        <h3 style="font-size:15px;font-weight:700;color:#0f172a;margin:0 0 20px;">⚙️ Configurações da imobiliária</h3>
        ${field('NOME DA EMPRESA', s['company.name'] || tenant.name)}
        ${field('TELEFONE', s['company.phone'])}
        ${field('E-MAIL', s['company.email'])}
        ${field('WHATSAPP', s['company.whatsapp'])}
        ${field('CIDADE', s['company.city'])}
        ${field('DOMÍNIO DO SITE', tenant.domain)}
        ${field('PLANO', tenant.plans?.name || 'Sem plano')}
        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e2e8f0;">
          <button id="tp-open-edit" style="background:#0a1628;color:#fff;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:14px;font-weight:600;">✏️ Editar dados completos</button>
        </div>
      </div>`
    document.getElementById('tp-open-edit')?.addEventListener('click', () => openEditTenantModal(tenant))
  }
}

function openEditTenantModal(tenant) {
  const existing = document.getElementById('sa-edit-tenant-modal')
  if (existing) existing.remove()

  const modal = document.createElement('div')
  modal.id = 'sa-edit-tenant-modal'
  modal.className = 'sa-modal-backdrop'
  const BASE_API = 'https://onknpbzdcrhbfozzvxtz.supabase.co/functions/v1/public-api'
  modal.innerHTML = `
    <div class="sa-modal" style="max-width:560px;">
      <div class="sa-modal-header">
        <h3>Editar Imobiliária</h3>
        <button class="sa-modal-close" id="et-close">✕</button>
      </div>

      <!-- Abas -->
      <div style="display:flex;border-bottom:1px solid #e2e8f0;padding:0 20px;gap:4px;flex-shrink:0;">
        <button id="et-tab-dados"   style="padding:10px 16px;font-size:13px;font-weight:600;border:none;background:none;cursor:pointer;border-bottom:2px solid #2563eb;color:#2563eb;">Dados</button>
        <button id="et-tab-config"  style="padding:10px 16px;font-size:13px;font-weight:500;border:none;background:none;cursor:pointer;border-bottom:2px solid transparent;color:#64748b;">⚙️ Contato</button>
        <button id="et-tab-api"     style="padding:10px 16px;font-size:13px;font-weight:500;border:none;background:none;cursor:pointer;border-bottom:2px solid transparent;color:#64748b;">🔑 API</button>
      </div>

      <!-- Aba: Dados -->
      <div id="et-pane-dados" class="sa-modal-body">
        <div style="display:flex;align-items:center;gap:16px;">
          <div id="et-logo-preview" style="width:72px;height:72px;border-radius:12px;border:2px dashed #e2e8f0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#f8fafc;flex-shrink:0;cursor:pointer;" title="Clique para alterar a logo">
            ${tenant.logo_url
              ? `<img src="${escapeHTML(tenant.logo_url)}" style="width:100%;height:100%;object-fit:cover;">`
              : `<span style="font-size:28px;">🏢</span>`}
          </div>
          <div>
            <div style="font-weight:600;font-size:14px;color:#0f172a;margin-bottom:4px;">Logo da Imobiliária</div>
            <label for="et-logo-input" class="btn-secondary-sm" style="cursor:pointer;display:inline-block;">📷 Alterar logo</label>
            <input type="file" id="et-logo-input" accept="image/*" style="display:none;">
            <div style="font-size:12px;color:#94a3b8;margin-top:4px;">PNG ou JPG · 256×256px</div>
          </div>
        </div>
        <div class="form-group"><label>Nome *</label><input id="et-name" class="form-input" type="text" value="${escapeHTML(tenant.name || '')}"></div>
        <div class="form-group"><label>Slug</label><input id="et-slug" class="form-input" type="text" value="${escapeHTML(tenant.slug || '')}"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="et-domain" class="form-input" type="text" value="${escapeHTML(tenant.domain || '')}" placeholder="abc.imobipro.com.br"></div>
        <div class="form-group"><label>Plano</label>
          <select id="et-plan" class="form-input"><option value="">Sem plano</option></select>
        </div>
        <div style="height:1px;background:#e2e8f0;"></div>
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;">Criar / Trocar Admin</div>
        <p style="font-size:12px;color:#64748b;margin:0;">Opcional: cria um novo acesso de administrador.</p>
        <div class="form-group"><label>E-mail do Admin</label><input id="et-admin-email" class="form-input" type="email" placeholder="admin@imobiliaria.com.br"></div>
        <div class="form-group"><label>Senha</label>
          <div style="position:relative;">
            <input id="et-admin-password" class="form-input" type="password" placeholder="Mínimo 6 caracteres" style="padding-right:38px;">
            <button type="button" id="et-pwd-toggle" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#94a3b8;font-size:16px;">👁</button>
          </div>
        </div>
        <div id="et-msg" style="font-size:13px;"></div>
      </div>

      <!-- Aba: Contato -->
      <div id="et-pane-config" class="sa-modal-body" style="display:none;">
        <div id="et-cfg-loading" style="text-align:center;padding:32px;color:#64748b;">⏳ Carregando…</div>
      </div>

      <!-- Aba: API -->
      <div id="et-pane-api" class="sa-modal-body" style="display:none;">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px;">
          <div style="font-size:12px;font-weight:700;color:#1d4ed8;margin-bottom:6px;">🔑 Chave de API desta Imobiliária</div>
          <p style="font-size:12px;color:#1e40af;margin:0 0 10px;">Use esta chave para conectar qualquer site ao CRM.</p>
          <div style="display:flex;gap:8px;align-items:center;">
            <input id="et-api-key" class="form-input" type="text" value="${escapeHTML(tenant.id || '')}" readonly
              style="font-family:monospace;font-size:11px;background:#fff;color:#1e3a5f;flex:1;letter-spacing:.02em;">
            <button id="et-copy-key" class="btn-secondary-sm" style="white-space:nowrap;flex-shrink:0;">📋 Copiar</button>
          </div>
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Endpoints disponíveis</div>

        <div style="display:flex;flex-direction:column;gap:8px;">
          ${[
            ['GET', 'properties', 'Lista imóveis publicados'],
            ['GET', 'properties/ID', 'Detalhe de um imóvel'],
            ['POST', 'leads', 'Registra lead / formulário de contato'],
            ['GET', 'settings', 'Dados da empresa (nome, WhatsApp, logo…)'],
          ].map(([method, path, desc]) => `
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;background:${method==='GET'?'#dcfce7':'#fef9c3'};color:${method==='GET'?'#15803d':'#854d0e'};">${method}</span>
                <code style="font-size:11px;color:#0f172a;">/public-api/${path}?key=CHAVE</code>
              </div>
              <div style="font-size:11px;color:#64748b;">${desc}</div>
            </div>`).join('')}
        </div>

        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:4px;">Exemplo rápido (JavaScript)</div>
        <pre style="background:#0f172a;color:#e2e8f0;border-radius:8px;padding:12px;font-size:11px;overflow-x:auto;margin:0;line-height:1.6;"><code>const KEY = '${escapeHTML(tenant.id)}'
const API = '${BASE_API}'

// Listar imóveis
const res = await fetch(\`\${API}/properties?key=\${KEY}&limit=12\`)
const { data } = await res.json()

// Enviar lead
await fetch(\`\${API}/leads?key=\${KEY}\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'João', phone: '47999001234' })
})</code></pre>
      </div>

      <div class="sa-modal-footer">
        <button id="et-delete" class="btn-danger-sm">🗑️ Excluir</button>
        <button id="et-cancel" class="btn-secondary-sm">Cancelar</button>
        <button id="et-save" class="btn-primary-sm">Salvar</button>
      </div>
    </div>
  `
  document.body.appendChild(modal)

  // Load plans
  supabase.from('plans').select('id, name').then(({ data }) => {
    const sel = document.getElementById('et-plan')
    if (sel && data) {
      sel.innerHTML = '<option value="">Sem plano</option>' + data.map(p =>
        `<option value="${p.id}"${String(p.id) === String(tenant.plan_id) ? ' selected' : ''}>${escapeHTML(p.name)}</option>`
      ).join('')
    }
  })

  // Logo preview
  document.getElementById('et-logo-input')?.addEventListener('change', e => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const preview = document.getElementById('et-logo-preview')
    if (preview) preview.innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:cover;">`
  })
  document.getElementById('et-logo-preview')?.addEventListener('click', () => {
    document.getElementById('et-logo-input')?.click()
  })

  document.getElementById('et-pwd-toggle')?.addEventListener('click', () => {
    const inp = document.getElementById('et-admin-password')
    inp.type = inp.type === 'password' ? 'text' : 'password'
  })

  // API key: copiar
  document.getElementById('et-copy-key')?.addEventListener('click', () => {
    const val = document.getElementById('et-api-key')?.value
    if (!val) return
    navigator.clipboard?.writeText(val)
    const btn = document.getElementById('et-copy-key')
    const orig = btn.textContent
    btn.textContent = '✅ Copiada!'
    setTimeout(() => { btn.textContent = orig }, 2000)
  })

  // Tab switching (3 abas)
  const etTabNames = ['dados', 'config', 'api']
  function etActivateTab(active) {
    etTabNames.forEach(t => {
      document.getElementById(`et-pane-${t}`).style.display = t === active ? '' : 'none'
      const btn = document.getElementById(`et-tab-${t}`)
      btn.style.borderBottomColor = t === active ? '#2563eb' : 'transparent'
      btn.style.color             = t === active ? '#2563eb' : '#64748b'
      btn.style.fontWeight        = t === active ? '600' : '500'
    })
    if (active === 'config') etLoadConfigTab()
  }
  etTabNames.forEach(t => document.getElementById(`et-tab-${t}`)?.addEventListener('click', () => etActivateTab(t)))

  // Config tab — carrega settings do tenant ao abrir pela primeira vez
  let etConfigLoaded = false
  async function etLoadConfigTab() {
    if (etConfigLoaded) return
    etConfigLoaded = true
    const { data: rows } = await supabase.from('settings').select('key,value').eq('tenant_id', tenant.id)
    const s = {}; rows?.forEach(r => { s[r.key] = r.value })
    document.getElementById('et-pane-config').innerHTML = `
      <div class="form-group">
        <label>WhatsApp <span style="font-size:11px;color:#94a3b8;">(DDI+DDD+número, sem espaços ou símbolos)</span></label>
        <input id="et-cfg-wa"     class="form-input" type="text"  value="${escapeHTML(s['company.whatsapp']||'')}" placeholder="5547999701743">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input id="et-cfg-phone"  class="form-input" type="text"  value="${escapeHTML(s['company.phone']||'')}"    placeholder="(47) 9 9970-1743">
      </div>
      <div class="form-group">
        <label>E-mail de contato</label>
        <input id="et-cfg-email"  class="form-input" type="email" value="${escapeHTML(s['company.email']||'')}"    placeholder="contato@nicimobiliaria.com.br">
      </div>
      <div class="form-group">
        <label>Cidade</label>
        <input id="et-cfg-city"   class="form-input" type="text"  value="${escapeHTML(s['company.city']||s['company.address']||'')}" placeholder="Blumenau, SC">
      </div>
      <div class="form-group">
        <label>Slogan</label>
        <input id="et-cfg-slogan" class="form-input" type="text"  value="${escapeHTML(s['company.slogan']||'')}"   placeholder="Os melhores imóveis da região">
      </div>
      <div id="et-cfg-msg" style="font-size:13px;min-height:20px;"></div>
      <button id="et-cfg-save" class="btn-primary-sm" style="width:100%;padding:10px 0;">💾 Salvar configurações</button>
    `
    document.getElementById('et-cfg-save')?.addEventListener('click', async () => {
      const btn   = document.getElementById('et-cfg-save')
      const msgEl = document.getElementById('et-cfg-msg')
      btn.disabled = true; btn.textContent = 'Salvando…'
      msgEl.textContent = ''; msgEl.style.color = '#64748b'

      const wa     = document.getElementById('et-cfg-wa').value.trim().replace(/\D/g,'')
      const phone  = document.getElementById('et-cfg-phone').value.trim()
      const email  = document.getElementById('et-cfg-email').value.trim()
      const city   = document.getElementById('et-cfg-city').value.trim()
      const slogan = document.getElementById('et-cfg-slogan').value.trim()

      const { error } = await supabase.from('settings').upsert(
        [
          { key: 'company.whatsapp', value: wa,     tenant_id: tenant.id },
          { key: 'company.phone',    value: phone,  tenant_id: tenant.id },
          { key: 'company.email',    value: email,  tenant_id: tenant.id },
          { key: 'company.city',     value: city,   tenant_id: tenant.id },
          { key: 'company.address',  value: city,   tenant_id: tenant.id },
          { key: 'company.slogan',   value: slogan, tenant_id: tenant.id },
        ],
        { onConflict: 'tenant_id,key' }
      )

      btn.disabled = false; btn.textContent = '💾 Salvar configurações'
      if (error) { msgEl.textContent = '❌ ' + error.message; msgEl.style.color = '#ef4444' }
      else        { msgEl.textContent = '✅ Configurações salvas!'; msgEl.style.color = '#22c55e' }
    })
  }

  const close = () => modal.remove()
  document.getElementById('et-close')?.addEventListener('click', close)
  document.getElementById('et-cancel')?.addEventListener('click', close)
  modal.addEventListener('click', e => { if (e.target === modal) close() })

  document.getElementById('et-delete')?.addEventListener('click', async () => {
    const confirmed = confirm(`⚠️ Tem certeza que deseja EXCLUIR a imobiliária "${tenant.name}"?\n\nEssa ação é irreversível e removerá o registro da plataforma.`)
    if (!confirmed) return
    const btn = document.getElementById('et-delete')
    btn.disabled = true; btn.textContent = 'Excluindo…'
    const { error } = await supabase.from('tenants').delete().eq('id', tenant.id)
    if (error) { alert('Erro ao excluir: ' + error.message); btn.disabled = false; btn.textContent = '🗑️ Excluir'; return }
    close()
    loadSATenants()
  })

  document.getElementById('et-save')?.addEventListener('click', async () => {
    const name       = document.getElementById('et-name')?.value?.trim()
    const slug       = document.getElementById('et-slug')?.value?.trim()
    const domain     = document.getElementById('et-domain')?.value?.trim()
    const planId     = document.getElementById('et-plan')?.value
    const adminEmail = document.getElementById('et-admin-email')?.value?.trim()
    const adminPwd   = document.getElementById('et-admin-password')?.value?.trim()
    const logoFile   = document.getElementById('et-logo-input')?.files[0]
    const msgEl      = document.getElementById('et-msg')
    const saveBtn    = document.getElementById('et-save')

    if (!name) { msgEl.textContent = '❌ Nome é obrigatório.'; msgEl.style.color = '#ef4444'; return }
    saveBtn.disabled = true; saveBtn.textContent = 'Salvando…'
    msgEl.textContent = '⏳ Salvando…'; msgEl.style.color = '#64748b'

    // Upload logo if selected
    let logo_url = tenant.logo_url
    if (logoFile) {
      try {
        const blob = await compressToBlob(logoFile, 256, 0.85)
        const path = `tenant-logos/${tenant.id}-${Date.now()}.jpg`
        const { error: upErr } = await supabase.storage.from('imoveis').upload(path, blob, { contentType: 'image/jpeg', upsert: true })
        if (!upErr) {
          const { data: { publicUrl } } = supabase.storage.from('imoveis').getPublicUrl(path)
          logo_url = publicUrl
        }
      } catch (err) { console.error('Logo upload:', err) }
    }

    // Update tenant
    const { error: tenantErr } = await supabase.from('tenants').update({
      name, slug: slug || tenant.slug,
      domain: domain || null,
      plan_id: planId || null,
      logo_url,
    }).eq('id', tenant.id)

    if (tenantErr) {
      saveBtn.disabled = false; saveBtn.textContent = 'Salvar'
      msgEl.textContent = '❌ ' + tenantErr.message; msgEl.style.color = '#ef4444'; return
    }

    // Optionally create new admin
    if (adminEmail && adminPwd && adminPwd.length >= 6) {
      msgEl.textContent = '⏳ Criando usuário admin…'
      const result = await callEdgeFunction({ email: adminEmail, password: adminPwd, role: 'admin', tenant_id: tenant.id })
      if (result?.success) {
        // Edge function handles role; only update tenant_id for truly new users
        if (result?.user_id && !result?.linked) {
          await supabase.from('profiles').update({ tenant_id: tenant.id }).eq('id', result.user_id)
        }
        msgEl.textContent = '✅ Salvo e admin criado!'; msgEl.style.color = '#22c55e'
      } else {
        msgEl.textContent = '⚠️ Salvo, mas erro ao criar admin: ' + (result?.error || 'Tente novamente'); msgEl.style.color = '#f59e0b'
      }
    } else {
      msgEl.textContent = '✅ Imobiliária atualizada!'; msgEl.style.color = '#22c55e'
    }

    saveBtn.disabled = false; saveBtn.textContent = 'Salvar'
    setTimeout(() => { close(); loadSATenants() }, 1200)
  })
}

// ══════════════════════════════════════════════════════════
//  IMPORTAR CONTATOS  —  CSV / Excel  →  Leads no Supabase
// ══════════════════════════════════════════════════════════

const IMPORT_FIELDS = [
  { key: 'name',   label: 'Nome',     required: true  },
  { key: 'phone',  label: 'Telefone', required: false },
  { key: 'email',  label: 'E-mail',   required: false },
  { key: 'notes',  label: 'Notas',    required: false },
]

let importRows     = []   // raw rows from file
let importHeaders  = []   // column headers
let importMapping  = {}   // { fieldKey: colIndex }
let importStageId  = null

function initImportLeads() {
  document.getElementById('btn-import-leads')?.addEventListener('click', openImportLeadsModal)
}

function openImportLeadsModal() {
  // reset state
  importRows    = []
  importHeaders = []
  importMapping = {}
  importStageId = null

  const overlay = document.createElement('div')
  overlay.id = 'import-leads-overlay'
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:9000;display:flex;align-items:center;justify-content:center;'
  overlay.innerHTML = `
    <div id="import-leads-modal" style="background:#fff;border-radius:12px;width:min(680px,96vw);max-height:90vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.22);padding:32px 28px 24px;position:relative;">
      <button onclick="document.getElementById('import-leads-overlay').remove()" style="position:absolute;top:14px;right:18px;background:none;border:none;font-size:22px;cursor:pointer;color:#888;">✕</button>
      <h2 style="margin:0 0 6px;font-size:1.2rem;color:#1e293b;">📥 Importar Contatos</h2>
      <p style="margin:0 0 20px;color:#64748b;font-size:.9rem;">Envie um arquivo CSV ou Excel (.xlsx) com sua lista de contatos.</p>

      <!-- Step 1: Upload -->
      <div id="import-step-upload">
        <div id="import-drop-zone" style="border:2px dashed #c7d2e0;border-radius:10px;padding:36px 24px;text-align:center;cursor:pointer;transition:border-color .2s;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" style="margin-bottom:10px;"><path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4M12 3v11M8 7l4-4 4 4"/></svg>
          <p style="margin:0 0 6px;color:#475569;font-weight:600;">Arraste o arquivo aqui</p>
          <p style="margin:0;color:#94a3b8;font-size:.82rem;">ou clique para selecionar &nbsp;·&nbsp; CSV ou XLSX</p>
        </div>
        <input type="file" id="import-file-input" accept=".csv,.xlsx,.xls" style="display:none">
        <div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <button onclick="downloadImportTemplate()" style="background:none;border:none;color:#3b82f6;cursor:pointer;font-size:.85rem;padding:0;text-decoration:underline;">⬇ Baixar modelo CSV</button>
          <span id="import-file-status" style="color:#64748b;font-size:.85rem;"></span>
        </div>
        <p id="import-upload-error" style="color:#ef4444;font-size:.83rem;margin:10px 0 0;display:none;"></p>
      </div>

      <!-- Step 2: Mapping -->
      <div id="import-step-map" style="display:none;">
        <div style="margin-bottom:14px;">
          <label style="font-size:.85rem;font-weight:600;color:#374151;display:block;margin-bottom:4px;">Etapa (estágio) dos leads importados</label>
          <select id="import-stage-sel" style="width:100%;padding:8px 10px;border:1px solid #d1d5db;border-radius:7px;font-size:.9rem;color:#1e293b;">
            <option value="">Carregando etapas…</option>
          </select>
        </div>
        <p style="font-size:.85rem;font-weight:600;color:#374151;margin:0 0 10px;">Mapeie as colunas do arquivo:</p>
        <div id="import-field-rows" style="display:grid;gap:10px;"></div>
        <div style="margin-top:18px;border:1px solid #e2e8f0;border-radius:8px;overflow:auto;">
          <p style="font-size:.78rem;color:#94a3b8;margin:8px 12px 4px;">Pré-visualização (5 primeiras linhas)</p>
          <div id="import-preview-wrap" style="overflow-x:auto;"></div>
        </div>
        <div style="margin-top:20px;display:flex;gap:10px;justify-content:flex-end;">
          <button onclick="resetImportStep()" style="padding:9px 20px;border:1px solid #d1d5db;border-radius:7px;background:#fff;cursor:pointer;font-size:.9rem;color:#374151;">← Voltar</button>
          <button onclick="confirmImportLeads()" id="btn-confirm-import" style="padding:9px 22px;background:#22c55e;color:#fff;border:none;border-radius:7px;cursor:pointer;font-weight:600;font-size:.9rem;">Importar leads</button>
        </div>
      </div>

      <!-- Step 3: Result -->
      <div id="import-step-result" style="display:none;text-align:center;padding:20px 0;">
        <div id="import-result-icon" style="font-size:3rem;margin-bottom:12px;">✅</div>
        <p id="import-result-msg" style="font-size:1rem;font-weight:600;color:#1e293b;margin:0 0 18px;"></p>
        <button onclick="document.getElementById('import-leads-overlay').remove();reloadFunilData()" style="padding:10px 26px;background:#3b82f6;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Ver leads no funil</button>
      </div>
    </div>`

  document.body.appendChild(overlay)
  loadImportStages()

  // Wire up drag/drop and file input via addEventListener (more reliable than inline handlers)
  const _dz  = document.getElementById('import-drop-zone')
  const _fi  = document.getElementById('import-file-input')

  // Prevent browser from opening dragged file at document level
  function _noDefault(e) { e.preventDefault() }
  document.addEventListener('dragover', _noDefault)
  document.addEventListener('drop',     _noDefault)

  // Drop zone events
  _dz.addEventListener('click', () => _fi.click())
  _dz.addEventListener('dragenter', e => { e.preventDefault(); _dz.style.borderColor = '#3b82f6'; _dz.style.background = '#eff6ff' })
  _dz.addEventListener('dragover',  e => { e.preventDefault(); _dz.style.borderColor = '#3b82f6'; _dz.style.background = '#eff6ff' })
  _dz.addEventListener('dragleave', e => { if (!_dz.contains(e.relatedTarget)) { _dz.style.borderColor = '#c7d2e0'; _dz.style.background = '' } })
  _dz.addEventListener('drop', e => {
    e.preventDefault()
    _dz.style.borderColor = '#c7d2e0'
    _dz.style.background  = ''
    const file = e.dataTransfer?.files?.[0]
    if (file) handleImportFile(file)
  })

  // File input change
  _fi.addEventListener('change', e => {
    const file = e.target.files?.[0]
    if (file) handleImportFile(file)
    e.target.value = ''
  })

  // Remove document-level prevention when overlay is removed
  const _observer = new MutationObserver(() => {
    if (!document.getElementById('import-leads-overlay')) {
      document.removeEventListener('dragover', _noDefault)
      document.removeEventListener('drop',     _noDefault)
      _observer.disconnect()
    }
  })
  _observer.observe(document.body, { childList: true })
}

async function loadImportStages() {
  const sel = document.getElementById('import-stage-sel')
  if (!sel) return
  const tid = await getTenantId()
  const { data } = await supabase.from('crm_lead_statuses').select('*').eq('tenant_id', tid).order('position')
  if (data && data.length) {
    sel.innerHTML = data.map(s => `<option value="${s.id}">${escapeHTML(s.name)}</option>`).join('')
    importStageId = data[0].id
    sel.onchange = () => { importStageId = sel.value }
  } else {
    sel.innerHTML = '<option value="">— sem etapas cadastradas —</option>'
  }
}

function handleImportDrop(event) {
  event.preventDefault()
  document.getElementById('import-drop-zone').style.borderColor = '#c7d2e0'
  const file = event.dataTransfer.files[0]
  if (file) handleImportFile(file)
}

function handleImportFile(file) {
  if (!file) return
  const statusEl = document.getElementById('import-file-status')
  const errEl    = document.getElementById('import-upload-error')
  errEl.style.display = 'none'

  const name = file.name.toLowerCase()
  statusEl.textContent = `📄 ${file.name} (${(file.size/1024).toFixed(1)} KB)`

  if (name.endsWith('.csv')) {
    const reader = new FileReader()
    reader.onload = e => {
      const result = parseImportCSV(e.target.result)
      if (result.error) { errEl.textContent = result.error; errEl.style.display = ''; return }
      importHeaders = result.headers
      importRows    = result.rows
      showImportMapStep()
    }
    reader.readAsText(file, 'UTF-8')
  } else if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
    const reader = new FileReader()
    reader.onload = e => parseImportExcel(e.target.result)
    reader.readAsArrayBuffer(file)
  } else {
    errEl.textContent = 'Formato não suportado. Use CSV ou XLSX.'
    errEl.style.display = ''
  }
}

function parseImportCSV(text) {
  // detect separator
  const firstLine = text.split('\n')[0] || ''
  const sep = firstLine.split(';').length > firstLine.split(',').length ? ';' : ','

  const lines = text.split('\n').map(l => l.trimEnd()).filter(l => l.length)
  if (lines.length < 2) return { error: 'Arquivo vazio ou sem dados.' }

  function parseLine(line) {
    const cells = []
    let cur = '', inQuote = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        if (inQuote && line[i+1] === '"') { cur += '"'; i++ }
        else inQuote = !inQuote
      } else if (ch === sep && !inQuote) {
        cells.push(cur.trim()); cur = ''
      } else cur += ch
    }
    cells.push(cur.trim())
    return cells
  }

  const headers = parseLine(lines[0]).map(h => h.replace(/^["']+|["']+$/g, ''))
  const rows = lines.slice(1).map(parseLine)
  return { headers, rows }
}

async function parseImportExcel(buffer) {
  const errEl = document.getElementById('import-upload-error')
  try {
    if (!window.XLSX) {
      await new Promise((res, rej) => {
        const s = document.createElement('script')
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
        s.onload = res; s.onerror = rej
        document.head.appendChild(s)
      })
    }
    const wb = window.XLSX.read(buffer, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const data = window.XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
    if (!data || data.length < 2) { errEl.textContent = 'Planilha vazia.'; errEl.style.display = ''; return }
    importHeaders = data[0].map(String)
    importRows    = data.slice(1)
    showImportMapStep()
  } catch(e) {
    errEl.textContent = 'Erro ao ler o arquivo Excel: ' + e.message
    errEl.style.display = ''
  }
}

function autoDetectColumn(headers, keywords) {
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i].toLowerCase()
    if (keywords.some(k => h.includes(k))) return i
  }
  return ''
}

function showImportMapStep() {
  document.getElementById('import-step-upload').style.display = 'none'
  document.getElementById('import-step-map').style.display = ''

  const container = document.getElementById('import-field-rows')
  const AUTO_DETECT = {
    name:  ['nome','name','contact','cliente','contato'],
    phone: ['tel','fone','celular','whatsapp','phone','mobile'],
    email: ['email','e-mail','mail'],
    notes: ['obs','nota','note','comment','coment','descri'],
  }
  const colOptions = `<option value="">— ignorar —</option>` +
    importHeaders.map((h, i) => `<option value="${i}">${escapeHTML(h)}</option>`).join('')

  container.innerHTML = IMPORT_FIELDS.map(f => {
    const detected = autoDetectColumn(importHeaders, AUTO_DETECT[f.key] || [])
    importMapping[f.key] = detected !== '' ? parseInt(detected) : ''
    return `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;">
        <label style="font-size:.87rem;color:#374151;font-weight:500;">${f.label}${f.required ? ' <span style="color:#ef4444">*</span>' : ''}</label>
        <select id="import-map-${f.key}" onchange="importMapping['${f.key}']=this.value===''?'':parseInt(this.value)"
                style="padding:7px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:.87rem;">
          ${colOptions}
        </select>
      </div>`
  }).join('')

  // Set detected values
  IMPORT_FIELDS.forEach(f => {
    const sel = document.getElementById(`import-map-${f.key}`)
    if (sel && importMapping[f.key] !== '') sel.value = importMapping[f.key]
  })

  renderImportPreview()
  loadImportStages()
}

function renderImportPreview() {
  const wrap = document.getElementById('import-preview-wrap')
  if (!wrap) return
  const preview = importRows.slice(0, 5)
  if (!preview.length) { wrap.innerHTML = '<p style="padding:10px;color:#94a3b8;font-size:.8rem;">Sem dados</p>'; return }
  const thead = `<tr>${importHeaders.map(h => `<th style="padding:6px 10px;background:#f1f5f9;font-size:.78rem;white-space:nowrap;border:1px solid #e2e8f0;">${escapeHTML(h)}</th>`).join('')}</tr>`
  const tbody = preview.map(row =>
    `<tr>${importHeaders.map((_, i) => `<td style="padding:5px 10px;font-size:.78rem;border:1px solid #e2e8f0;white-space:nowrap;max-width:160px;overflow:hidden;text-overflow:ellipsis;">${escapeHTML(String(row[i] ?? ''))}</td>`).join('')}</tr>`
  ).join('')
  wrap.innerHTML = `<table style="border-collapse:collapse;min-width:100%;">${thead}${tbody}</table>`
}

function resetImportStep() {
  document.getElementById('import-step-map').style.display    = 'none'
  document.getElementById('import-step-upload').style.display = ''
  document.getElementById('import-file-status').textContent   = ''
  document.getElementById('import-file-input').value          = ''
}

async function confirmImportLeads() {
  const btn   = document.getElementById('btn-confirm-import')
  const errEl = document.getElementById('import-upload-error')
  errEl.style.display = 'none'

  // Validate name mapping
  if (importMapping['name'] === '' || importMapping['name'] === undefined) {
    errEl.textContent = 'Mapeie ao menos a coluna de Nome antes de importar.'
    errEl.style.display = ''; return
  }

  btn.disabled = true; btn.textContent = 'Importando…'

  const tid    = await getTenantId()
  const stageId = importStageId || document.getElementById('import-stage-sel')?.value || null

  const toInsert = importRows
    .map(row => {
      const name = String(row[importMapping['name']] ?? '').trim()
      if (!name) return null
      return {
        tenant_id: tid,
        name,
        phone:  importMapping['phone'] !== '' ? String(row[importMapping['phone']] ?? '').trim() : null,
        email:  importMapping['email'] !== '' ? String(row[importMapping['email']] ?? '').trim() : null,
        notes:  importMapping['notes'] !== '' ? String(row[importMapping['notes']] ?? '').trim() : null,
        source: 'importação',
        stage:  stageId || null,
        status: 'novo',
      }
    })
    .filter(Boolean)

  if (!toInsert.length) {
    errEl.textContent = 'Nenhum registro válido encontrado (coluna Nome vazia em todas as linhas).'
    errEl.style.display = ''; btn.disabled = false; btn.textContent = 'Importar leads'; return
  }

  // Batch insert in groups of 50
  const BATCH = 50
  let inserted = 0, errors = 0
  for (let i = 0; i < toInsert.length; i += BATCH) {
    const batch = toInsert.slice(i, i + BATCH)
    const { error } = await supabase.from('leads').insert(batch)
    if (error) { console.error('Import batch error:', error); errors += batch.length }
    else inserted += batch.length
  }

  // Show result
  document.getElementById('import-step-map').style.display    = 'none'
  document.getElementById('import-step-result').style.display = ''
  document.getElementById('import-result-icon').textContent   = errors === 0 ? '✅' : '⚠️'
  document.getElementById('import-result-msg').textContent    =
    errors === 0
      ? `${inserted} lead${inserted !== 1 ? 's' : ''} importado${inserted !== 1 ? 's' : ''} com sucesso!`
      : `${inserted} importados, ${errors} com erro. Verifique o console para detalhes.`
}

function downloadImportTemplate() {
  const csv = 'Nome,Telefone,Email,Notas\nJoão Silva,(11) 99999-0001,joao@email.com,Lead do Instagram\nMaria Souza,(11) 99999-0002,maria@email.com,Interesse em 3 quartos\n'
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'modelo-contatos.csv'; a.click()
  URL.revokeObjectURL(url)
}


// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD — initDashboardSection
// ═══════════════════════════════════════════════════════════════════════════

// Lazy loader para Chart.js (CDN)
function _loadChartJS() {
  if (window.Chart) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js'
    s.onload = resolve
    s.onerror = reject
    document.head.appendChild(s)
  })
}


// ─────────────────────────────────────────────────────────────────────────────
// TAG PICKER — modern interactive tag picker for lead modal (Task #9)
// ─────────────────────────────────────────────────────────────────────────────

function _initTagPicker(panel, allTags, tagMap) {
  // allTags: array of {id, name, color} from Supabase
  // tagMap:  object { name -> {id,name,color} } (kanbanTagMap)

  const badgeArea   = panel.querySelector('#ldp-tag-badge-area')
  const addBtn      = panel.querySelector('#ldp-tag-add-btn')
  const dropdown    = panel.querySelector('#ldp-tag-dropdown')
  const searchInput = panel.querySelector('#ldp-tag-search')
  const optList     = panel.querySelector('#ldp-tag-opt-list')
  const showCreate  = panel.querySelector('#ldp-tag-show-create')
  const createRow   = panel.querySelector('#ldp-tag-create-row')
  const newNameInp  = panel.querySelector('#ldp-tag-new-name')
  const newColorInp = panel.querySelector('#ldp-tag-new-color')
  const createBtn   = panel.querySelector('#ldp-tag-create-btn')

  if (!badgeArea || !addBtn || !dropdown) return

  // Collect currently selected tag names from rendered badges
  function getSelected() {
    return [...badgeArea.querySelectorAll('.ldp-tag-badge[data-tag]')].map(b => b.dataset.tag)
  }

  // Re-render the badge area based on selected array
  function renderBadges(selected) {
    if (!selected.length) {
      badgeArea.innerHTML = '<span class="ldp-tag-empty">Nenhuma tag — clique em + para adicionar</span>'
      return
    }
    badgeArea.innerHTML = selected.map(name => {
      const td = tagMap[name] || {}
      const c  = td.color || '#6366F1'
      return `<span class="ldp-tag-badge" data-tag="${escapeHTML(name)}" style="background:${c}18;color:${c};border-color:${c}55;">
        ${escapeHTML(name)}<span class="ldp-tag-rm" data-tag="${escapeHTML(name)}">×</span>
      </span>`
    }).join('')
  }

  // Render dropdown option list
  function renderOpts(filter = '') {
    const selected = getSelected()
    const lower = filter.toLowerCase().trim()
    const visible = allTags.filter(t =>
      (!lower || t.name.toLowerCase().includes(lower))
    )
    if (!visible.length) {
      optList.innerHTML = `<div class="ldp-tag-opt-empty">Nenhuma tag encontrada</div>`
      return
    }
    optList.innerHTML = visible.map(t => {
      const active = selected.includes(t.name)
      return `<div class="ldp-tag-opt${active ? ' active' : ''}" data-tag="${escapeHTML(t.name)}" style="--tc:${t.color}">
        <span class="ldp-tag-opt-dot" style="background:${t.color}"></span>
        <span class="ldp-tag-opt-name">${escapeHTML(t.name)}</span>
        ${active ? '<span class="ldp-tag-opt-check">✓</span>' : ''}
      </div>`
    }).join('')
  }

  // Toggle dropdown
  function openDropdown() {
    dropdown.classList.remove('hidden')
    renderOpts('')
    searchInput.value = ''
    createRow.classList.add('hidden')
    searchInput.focus()
  }
  function closeDropdown() {
    dropdown.classList.add('hidden')
  }

  // Add tag button opens dropdown
  addBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    if (dropdown.classList.contains('hidden')) openDropdown()
    else closeDropdown()
  })

  // Close on outside click
  document.addEventListener('mousedown', function onOutside(e) {
    if (!panel.contains(e.target)) {
      closeDropdown()
      document.removeEventListener('mousedown', onOutside)
    }
  })

  // Click on dropdown stops propagation
  dropdown.addEventListener('mousedown', e => e.stopPropagation())

  // Search filter
  searchInput.addEventListener('input', () => renderOpts(searchInput.value))

  // Click on option toggles tag
  optList.addEventListener('click', e => {
    const opt = e.target.closest('.ldp-tag-opt')
    if (!opt) return
    const tagName = opt.dataset.tag
    const selected = getSelected()
    if (selected.includes(tagName)) {
      renderBadges(selected.filter(n => n !== tagName))
    } else {
      renderBadges([...selected, tagName])
    }
    renderOpts(searchInput.value)
  })

  // Badge removal (×)
  badgeArea.addEventListener('click', e => {
    const rm = e.target.closest('.ldp-tag-rm')
    if (!rm) return
    const name = rm.dataset.tag
    renderBadges(getSelected().filter(n => n !== name))
  })

  // Show/hide create row
  showCreate.addEventListener('click', () => {
    createRow.classList.toggle('hidden')
    if (!createRow.classList.contains('hidden')) newNameInp.focus()
  })

  // Create new tag and add it
  async function doCreateTag() {
    const name = newNameInp.value.trim()
    if (!name) { newNameInp.focus(); return }
    const color = newColorInp.value || '#6366F1'

    // Prevent duplicates
    if (allTags.some(t => t.name.toLowerCase() === name.toLowerCase())) {
      newNameInp.style.borderColor = '#ef4444'
      setTimeout(() => { newNameInp.style.borderColor = '' }, 1500)
      return
    }

    createBtn.disabled = true
    createBtn.textContent = 'Criando…'

    try {
      const { data, error } = await supabase
        .from('crm_tags')
        .insert({ name, color, tenant_id: currentProfile?.tenant_id })
        .select()
        .single()

      if (error) throw error

      // Update local structures
      const newTag = { id: data.id, name: data.name, color: data.color }
      allTags.push(newTag)
      tagMap[newTag.name] = newTag
      if (typeof kanbanTagMap !== 'undefined') kanbanTagMap[newTag.name] = newTag

      // Select it immediately
      renderBadges([...getSelected(), newTag.name])
      renderOpts(searchInput.value)

      // Reset create row
      newNameInp.value = ''
      newColorInp.value = '#6366F1'
      createRow.classList.add('hidden')
    } catch (err) {
      console.error('Error creating tag:', err)
      alert('Erro ao criar tag: ' + (err.message || err))
    } finally {
      createBtn.disabled = false
      createBtn.textContent = 'Criar e adicionar'
    }
  }

  createBtn.addEventListener('click', doCreateTag)
  newNameInp.addEventListener('keydown', e => { if (e.key === 'Enter') doCreateTag() })
}

async function initDashboardSection() {
  const section = document.getElementById('section-dashboard')
  if (!section) return

  const alreadyBuilt = section.dataset.dbInit === '1'

  // Destroy existing chart instances before re-rendering
  if (alreadyBuilt) {
    if (window._dbLeadsChartInstance)  { window.window._dbLeadsChartInstance.destroy();  window._dbLeadsChartInstance  = null }
    if (window._dbOriginChartInstance) { window.window._dbOriginChartInstance.destroy(); window._dbOriginChartInstance = null }
  }

  section.dataset.dbInit = '1'

  // ── 1. Render skeleton HTML (always, so KPI cards show shimmer on refresh) ──
  section.innerHTML = `
<div class="db-wrap">

  <!-- Header -->
  <div class="db-header">
    <div>
      <h1 class="db-greeting">Carregando… <span class="db-greeting-name" id="db-greeting-name"></span></h1>
      <p class="db-subline" id="db-subline">Preparando seu painel…</p>
    </div>
    <div class="db-header-chips" id="db-header-chips"></div>
  </div>

  <!-- KPI Cards -->
  <div class="db-kpis">
    ${['db-kpi-indigo','db-kpi-emerald','db-kpi-amber','db-kpi-sky'].map((cls, i) => `
    <div class="db-kpi ${cls}" id="db-kpi-${i}">
      <div class="db-kpi-icon">
        <div class="db-skeleton" style="width:22px;height:22px;border-radius:4px;"></div>
      </div>
      <div class="db-kpi-body">
        <div class="db-skeleton db-skel-val"></div>
        <div class="db-skeleton db-skel-lbl" style="margin-top:6px;"></div>
        <div class="db-skeleton db-skel-trend" style="margin-top:8px;"></div>
      </div>
    </div>`).join('')}
  </div>

  <!-- Charts Row -->
  <div class="db-row-main">
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Leads Recebidos</div>
          <div class="db-card-sub">Evolução por período</div>
        </div>
        <div class="db-ptabs" id="db-ptabs">
          <button class="db-ptab active" data-p="7">7 dias</button>
          <button class="db-ptab" data-p="30">30 dias</button>
          <button class="db-ptab" data-p="90">3 meses</button>
        </div>
      </div>
      <div class="db-chart-wrap"><canvas id="db-leads-chart"></canvas></div>
    </div>
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Origem dos Leads</div>
          <div class="db-card-sub">Distribuição por canal</div>
        </div>
      </div>
      <div class="db-donut-wrap"><canvas id="db-origin-chart"></canvas></div>
      <div id="db-origin-legend" class="db-origin-legend"></div>
    </div>
  </div>

  <!-- Second Row -->
  <div class="db-row-secondary">
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Leads Recentes</div>
          <div class="db-card-sub" id="db-leads-sub">Últimos contatos recebidos</div>
        </div>
        <button class="db-card-link" onclick="navigateToSection('funil')">Ver todos →</button>
      </div>
      <div class="db-table-scroll">
        <table class="db-table">
          <thead><tr>
            <th>Contato</th>
            <th>Origem</th>
            <th>Status</th>
            <th>Data</th>
            <th></th>
          </tr></thead>
          <tbody id="db-leads-tbody">
            <tr><td colspan="5" class="db-empty"><div class="db-empty-icon">⏳</div><div class="db-empty-text">Carregando leads…</div></td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Imóveis do Portfólio</div>
          <div class="db-card-sub">Mais recentes</div>
        </div>
        <button class="db-card-link" onclick="navigateToSection('properties')">Ver todos →</button>
      </div>
      <div class="db-prop-list" id="db-top-props">
        <div class="db-empty"><div class="db-empty-icon">⏳</div><div class="db-empty-text">Carregando…</div></div>
      </div>
    </div>
  </div>

  <!-- Third Row -->
  <div class="db-row-third">
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Atividade Recente</div>
          <div class="db-card-sub">Histórico do sistema</div>
        </div>
      </div>
      <div class="db-timeline" id="db-timeline">
        <div class="db-empty"><div class="db-empty-icon">⏳</div><div class="db-empty-text">Carregando…</div></div>
      </div>
    </div>
    <div class="db-card">
      <div class="db-card-head">
        <div>
          <div class="db-card-title">Resumo da Carteira</div>
          <div class="db-card-sub">Situação dos imóveis</div>
        </div>
      </div>
      <div class="db-portfolio-grid" id="db-portfolio"></div>
    </div>
  </div>

</div>`

  // ── 2. Greeting ──────────────────────────────────────────────────────────
  const now   = new Date()
  const hour  = now.getHours()
  const greet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'
  const days   = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']
  const months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']
  const dateStr = `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`
  const userName = currentProfile?.name?.split(' ')[0] || 'Corretor'

  const greetEl = section.querySelector('.db-greeting')
  if (greetEl) greetEl.innerHTML = `${greet}, <span class="db-greeting-name">${_dbEsc(userName)}</span> 👋`
  const sublineEl = document.getElementById('db-subline')
  if (sublineEl) sublineEl.textContent = `Aqui está o resumo do seu negócio — ${dateStr}`

  // ── 3. Fetch data in parallel ────────────────────────────────────────────
  let properties = [], leads = []
  try {
    const [propsRes, leadsRes] = await Promise.all([
      getAllProperties(),
      _dbFetchLeads()
    ])
    properties = propsRes || []
    leads      = leadsRes || []
  } catch (e) {
    console.warn('[Dashboard] Erro ao carregar dados:', e)
  }

  // ── 4. KPI Cards ─────────────────────────────────────────────────────────
  _dbRenderKPIs(properties, leads, now)

  // ── 5. Header chips ───────────────────────────────────────────────────────
  const published   = properties.filter(p => p.published).length
  const leadsToday  = leads.filter(l => _dbDateStr(l.created_at) === _dbDateStr(now.toISOString())).length
  const chipsEl = document.getElementById('db-header-chips')
  if (chipsEl) chipsEl.innerHTML = `
    <span class="db-chip db-chip-green">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      ${published} publicados
    </span>
    <span class="db-chip db-chip-blue">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      ${leadsToday} lead${leadsToday !== 1 ? 's' : ''} hoje
    </span>
    <span class="db-chip db-chip-gold">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      ${dateStr.split(',')[0]}
    </span>`

  // ── 6. Recent Leads Table ────────────────────────────────────────────────
  _dbRenderLeadsTable(leads, properties)

  // ── 7. Top Properties ────────────────────────────────────────────────────
  _dbRenderTopProperties(properties)

  // ── 8. Activity Timeline ─────────────────────────────────────────────────
  _dbRenderTimeline(properties, leads, now)

  // ── 9. Portfolio Summary ──────────────────────────────────────────────────
  _dbRenderPortfolio(properties, leads)

  // ── 10. Load Chart.js and render charts ──────────────────────────────────
  try {
    await _loadChartJS()
    _dbRenderLeadsChart(leads, 7)
    _dbRenderOriginChart(leads)
    // Period tab buttons
    document.querySelectorAll('.db-ptab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.db-ptab').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        _dbRenderLeadsChart(leads, parseInt(btn.dataset.p))
      })
    })
  } catch (e) {
    console.warn('[Dashboard] Chart.js não carregou:', e)
  }

  if (window.lucide) lucide.createIcons()
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function _dbEsc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}
function _dbDateStr(iso) {
  return (iso || '').slice(0, 10)
}
function _dbRelTime(iso, now) {
  if (!iso) return '—'
  const diff = now - new Date(iso)
  const mins = Math.floor(diff / 60000)
  if (mins < 2)  return 'agora mesmo'
  if (mins < 60) return `há ${mins}min`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `há ${hrs}h`
  const days = Math.floor(hrs / 24)
  if (days === 1) return 'ontem'
  if (days < 7)  return `há ${days} dias`
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit' })
}
function _dbFmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.', ',') + 'M'
  if (n >= 1000)    return (n / 1000).toFixed(0) + 'k'
  return String(n)
}

async function _dbFetchLeads() {
  // Mirrors loadKanbanLeads tenant logic exactly
  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)
  if (currentProfile?.role === 'corretor') {
    query = query.eq('assigned_to', currentProfile.id)
  } else if (currentProfile?.tenant_id) {
    query = query.eq('tenant_id', currentProfile.tenant_id)
  }
  const { data, error } = await query
  if (error) { console.warn('[Dashboard] leads fetch error:', error.message); return [] }
  return data || []
}

// ── KPI Render ───────────────────────────────────────────────────────────────
function _dbRenderKPIs(properties, leads, now) {
  const total     = properties.length
  const published = properties.filter(p => p.published).length
  const totalL    = leads.length

  // Negociações em andamento = leads com stage != null (no funil)
  const negociando = leads.filter(l => l.stage && l.stage !== 'perdido' && l.stage !== 'fechado').length

  // Calcular variações (últimos 30 dias vs 30 dias anteriores)
  const d30 = new Date(now); d30.setDate(d30.getDate() - 30)
  const d60 = new Date(now); d60.setDate(d60.getDate() - 60)
  const propsThisMonth  = properties.filter(p => p.created_at && new Date(p.created_at) >= d30).length
  const propsLastMonth  = properties.filter(p => p.created_at && new Date(p.created_at) >= d60 && new Date(p.created_at) < d30).length
  const leadsThisMonth  = leads.filter(l => l.created_at && new Date(l.created_at) >= d30).length
  const leadsLastMonth  = leads.filter(l => l.created_at && new Date(l.created_at) >= d60 && new Date(l.created_at) < d30).length

  function trendHtml(curr, prev, suffix) {
    if (prev === 0 && curr === 0) return '<span class="db-kpi-trend db-trend-neu">Sem dados</span>'
    if (prev === 0) return '<span class="db-kpi-trend db-trend-up">▲ Novo</span>'
    const pct = Math.round(((curr - prev) / prev) * 100)
    if (pct === 0) return '<span class="db-kpi-trend db-trend-neu">= Estável</span>'
    if (pct > 0)  return `<span class="db-kpi-trend db-trend-up">▲ +${pct}% ${suffix}</span>`
    return `<span class="db-kpi-trend db-trend-down">▼ ${pct}% ${suffix}</span>`
  }

  const kpis = [
    {
      idx: 0, val: total, label: 'Total de Imóveis',
      trend: trendHtml(propsThisMonth, propsLastMonth, 'este mês'),
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
    },
    {
      idx: 1, val: published, label: 'Publicados no Site',
      trend: published === 0 ? '<span class="db-kpi-trend db-trend-neu">Nenhum publicado</span>' : `<span class="db-kpi-trend db-trend-up">${Math.round((published/Math.max(total,1))*100)}% do total</span>`,
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
    },
    {
      idx: 2, val: totalL, label: 'Leads Recebidos',
      trend: trendHtml(leadsThisMonth, leadsLastMonth, 'vs. mês ant.'),
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'
    },
    {
      idx: 3, val: negociando, label: 'Em Negociação',
      trend: negociando === 0 ? '<span class="db-kpi-trend db-trend-neu">Nenhum ativo</span>' : '<span class="db-kpi-trend db-trend-up">▲ Ativos</span>',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>'
    }
  ]

  kpis.forEach(({ idx, val, label, trend, icon }) => {
    const el = document.getElementById(`db-kpi-${idx}`)
    if (!el) return
    el.innerHTML = `
      <div class="db-kpi-icon">${icon}</div>
      <div class="db-kpi-body">
        <div class="db-kpi-val">${_dbFmt(val)}</div>
        <div class="db-kpi-lbl">${_dbEsc(label)}</div>
        ${trend}
      </div>`
  })
}

// ── Leads Bar Chart ───────────────────────────────────────────────────────────
let _dbLeadsChartInstance = null
function _dbRenderLeadsChart(leads, days) {
  const canvas = document.getElementById('db-leads-chart')
  if (!canvas || !window.Chart) return
  if (window._dbLeadsChartInstance) { window._dbLeadsChartInstance.destroy(); _dbLeadsChartInstance = null }

  const labels = [], counts = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    const shortLabel = days <= 7
      ? d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.','')
      : days <= 30
        ? d.toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit' })
        : d.toLocaleDateString('pt-BR', { day:'2-digit', month:'short' })
    labels.push(shortLabel)
    counts.push(leads.filter(l => _dbDateStr(l.created_at) === key).length)
  }

  const maxVal = Math.max(...counts, 1)
  _dbLeadsChartInstance = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Leads',
        data: counts,
        backgroundColor: counts.map(v => v === maxVal && maxVal > 0 ? 'rgba(201,162,39,0.90)' : 'rgba(201,162,39,0.35)'),
        borderColor: '#C9A227',
        borderWidth: 1.5,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0F172A',
          padding: 10,
          callbacks: { label: ctx => ` ${ctx.parsed.y} lead${ctx.parsed.y !== 1 ? 's' : ''}` }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94A3B8', font: { size: 11 } } },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(226,232,240,0.6)', drawBorder: false },
          ticks: {
            color: '#94A3B8', font: { size: 11 }, precision: 0,
            stepSize: Math.max(1, Math.ceil(maxVal / 4))
          }
        }
      }
    }
  })
}

// ── Origin Doughnut Chart ─────────────────────────────────────────────────────
window._dbOriginChartInstance = null
function _dbRenderOriginChart(leads) {
  const canvas = document.getElementById('db-origin-chart')
  const legendEl = document.getElementById('db-origin-legend')
  if (!canvas || !window.Chart) return
  if (window._dbOriginChartInstance) { window._dbOriginChartInstance.destroy(); _dbOriginChartInstance = null }

  // Count by source
  const sources = {}
  leads.forEach(l => {
    const src = l.source || 'Direto'
    const key = src.charAt(0).toUpperCase() + src.slice(1)
    sources[key] = (sources[key] || 0) + 1
  })

  // ── MOCK COMMENT: Futuramente integrar com Meta Ads API e Google Ads API
  // para preencher automaticamente as origens de leads pagos.
  if (Object.keys(sources).length === 0) {
    // Dados mock comentados para futura implementação
    sources['Site'] = 0; sources['WhatsApp'] = 0; sources['Indicação'] = 0
  }

  const labels = Object.keys(sources)
  const values = Object.values(sources)
  const palette = ['#6366F1','#10B981','#F59E0B','#0EA5E9','#EC4899','#8B5CF6','#14B8A6','#94A3B8']
  const colors  = labels.map((_, i) => palette[i % palette.length])
  const total   = values.reduce((a,b) => a+b, 0)

  window._dbOriginChartInstance = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: colors, borderWidth: 2, borderColor: '#fff', hoverOffset: 4 }]
    },
    options: {
      responsive: true,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0F172A',
          padding: 10,
          callbacks: {
            label: ctx => {
              const pct = total > 0 ? Math.round((ctx.parsed / total) * 100) : 0
              return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`
            }
          }
        }
      }
    }
  })

  // Legend
  if (legendEl) {
    if (total === 0) {
      legendEl.innerHTML = '<div class="db-empty" style="padding:12px 0"><div class="db-empty-text">Nenhum lead ainda<br><span style="font-size:11px;color:#CBD5E1">Os canais aparecerão aqui quando houver leads</span></div></div>'
    } else {
      legendEl.innerHTML = labels.map((lbl, i) => `
        <div class="db-legend-item">
          <div class="db-legend-dot-row">
            <span class="db-legend-dot" style="background:${colors[i]}"></span>
            <span>${_dbEsc(lbl)}</span>
          </div>
          <span class="db-legend-val">${values[i]}</span>
        </div>`).join('')
    }
  }
}

// ── Recent Leads Table ────────────────────────────────────────────────────────
function _dbRenderLeadsTable(leads, properties) {
  const tbody  = document.getElementById('db-leads-tbody')
  const subEl  = document.getElementById('db-leads-sub')
  if (!tbody) return

  const recent = leads.slice(0, 8)
  const now    = new Date()

  if (subEl) subEl.textContent = `${leads.length} lead${leads.length !== 1 ? 's' : ''} no total`

  if (recent.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5"><div class="db-empty"><div class="db-empty-icon">💬</div><div class="db-empty-text">Nenhum lead recebido ainda</div></div></td></tr>'
    return
  }

  const statusMap = {
    'novo': { cls: 'db-status-novo', label: 'Novo' },
    'contatado': { cls: 'db-status-contatado', label: 'Contatado' },
    'negociando': { cls: 'db-status-negociando', label: 'Negociando' },
    'fechado': { cls: 'db-status-fechado', label: 'Fechado' },
    'perdido': { cls: 'db-status-perdido', label: 'Perdido' },
  }

  tbody.innerHTML = recent.map(l => {
    const st    = statusMap[l.status] || { cls: 'db-status-novo', label: l.status || 'Novo' }
    const prop  = l.property_id ? properties.find(p => String(p.id) === String(l.property_id)) : null
    const src   = l.source ? (l.source.charAt(0).toUpperCase() + l.source.slice(1)) : 'Direto'
    return `
    <tr>
      <td>
        <div class="db-lead-name">${_dbEsc(l.name || '—')}</div>
        <div class="db-lead-phone">${_dbEsc(l.phone || l.email || '—')}</div>
        ${prop ? `<div style="font-size:11px;color:#94A3B8;margin-top:1px;">${_dbEsc(prop.title || '')}</div>` : ''}
      </td>
      <td><span class="db-lead-src">${_dbEsc(src)}</span></td>
      <td><span class="db-status-badge ${st.cls}">${_dbEsc(st.label)}</span></td>
      <td style="color:#64748B;font-size:12px;">${_dbRelTime(l.created_at, now)}</td>
      <td><button class="db-btn-view" onclick="navigateToSection('funil')">Ver Lead</button></td>
    </tr>`
  }).join('')
}

// ── Top Properties ────────────────────────────────────────────────────────────
function _dbRenderTopProperties(properties) {
  const el = document.getElementById('db-top-props')
  if (!el) return

  const sorted = [...properties]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6)

  if (sorted.length === 0) {
    el.innerHTML = '<div class="db-empty"><div class="db-empty-icon">🏠</div><div class="db-empty-text">Nenhum imóvel cadastrado ainda</div></div>'
    return
  }

  el.innerHTML = sorted.map((p, i) => {
    const imgs = (() => { try { return Array.isArray(p.images) ? p.images : JSON.parse(p.images || '[]') } catch(e) { return [] } })()
    const thumb = p.cover_image || imgs.find(u => u && u.startsWith('http')) || ''
    const rankCls = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : ''
    const pubCls  = p.published ? 'pub' : 'rascunho'
    const pubLbl  = p.published ? 'Publicado' : 'Rascunho'
    const city    = [p.neighborhood, p.city].filter(Boolean).join(', ') || '—'
    const price   = p.price ? `R$ ${String(p.price).replace(/[^0-9,.]/g, '')}` : '—'
    return `
    <div class="db-prop-item">
      <div class="db-prop-rank ${rankCls}">${i + 1}</div>
      ${thumb
        ? `<img class="db-prop-thumb" src="${_dbEsc(thumb)}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : ''}
      <div class="db-prop-thumb-ph" ${thumb ? 'style="display:none"' : ''}>🏠</div>
      <div class="db-prop-info">
        <div class="db-prop-name" title="${_dbEsc(p.title || '')}">${_dbEsc(p.title || 'Sem título')}</div>
        <div class="db-prop-city">${_dbEsc(city)} · ${_dbEsc(price)}</div>
      </div>
      <span class="db-prop-badge ${pubCls}">${pubLbl}</span>
    </div>`
  }).join('')
}

// ── Activity Timeline ─────────────────────────────────────────────────────────
function _dbRenderTimeline(properties, leads, now) {
  const el = document.getElementById('db-timeline')
  if (!el) return

  // Build event list from real data + some contextual entries
  const events = []

  // Login event (always first)
  events.push({ icon: '👤', cls: 'tl-login', title: 'Você entrou no sistema', meta: `Bem-vindo de volta, ${currentProfile?.name?.split(' ')[0] || 'Corretor'}`, time: now.toISOString() })

  // Recent leads
  leads.slice(0, 3).forEach(l => {
    events.push({ icon: '💬', cls: 'tl-lead', title: `Novo lead: ${l.name || 'Sem nome'}`, meta: `Origem: ${l.source || 'Direto'} · ${l.phone || l.email || ''}`, time: l.created_at })
  })

  // Recent properties
  properties.slice(0, 3).forEach(p => {
    const action = p.published ? 'Imóvel publicado' : 'Imóvel cadastrado'
    events.push({ icon: '🏠', cls: 'tl-prop', title: `${action}: ${p.title || 'Sem título'}`, meta: `${p.city || ''} · ${p.reference || ''}`, time: p.created_at })
  })

  // Sort by time desc
  events.sort((a, b) => new Date(b.time) - new Date(a.time))

  el.innerHTML = events.slice(0, 8).map(ev => `
    <div class="db-tl-item">
      <div class="db-tl-icon ${ev.cls}">${ev.icon}</div>
      <div class="db-tl-body">
        <div class="db-tl-title">${_dbEsc(ev.title)}</div>
        ${ev.meta ? `<div class="db-tl-meta">${_dbEsc(ev.meta)}</div>` : ''}
      </div>
      <div class="db-tl-time">${_dbRelTime(ev.time, now)}</div>
    </div>`).join('')

  if (events.length === 0) {
    el.innerHTML = '<div class="db-empty"><div class="db-empty-icon">📋</div><div class="db-empty-text">Sem atividades recentes</div></div>'
  }
}

// ── Portfolio Summary ─────────────────────────────────────────────────────────
function _dbRenderPortfolio(properties, leads) {
  const el = document.getElementById('db-portfolio')
  if (!el) return

  const total       = properties.length
  const published   = properties.filter(p => p.published).length
  const rascunho    = total - published
  const emNegociacao = leads.filter(l => l.stage && l.stage !== 'perdido' && l.stage !== 'fechado').length

  // Destacados = com collection "alto-padrao" ou "lancamentos"
  const destacados = properties.filter(p => {
    try {
      const cols = Array.isArray(p.collection) ? p.collection : JSON.parse(p.collection || '[]')
      return cols.includes('alto-padrao') || cols.includes('lancamentos') || cols.includes('decorados')
    } catch(e) { return false }
  }).length

  // MOCK: Vendidos — futuramente implementar campo status='vendido' na tabela properties
  // const vendidos = properties.filter(p => p.status === 'vendido').length

  const cards = [
    { icon: '✅', val: published,    lbl: 'Imóveis Ativos' },
    { icon: '📝', val: rascunho,     lbl: 'Em Rascunho' },
    { icon: '🤝', val: emNegociacao, lbl: 'Em Negociação' },
    { icon: '⭐', val: destacados,   lbl: 'Em Coleções' },
  ]

  el.innerHTML = cards.map(c => `
    <div class="db-port-card">
      <div class="db-port-icon">${c.icon}</div>
      <div class="db-port-val">${_dbFmt(c.val)}</div>
      <div class="db-port-lbl">${_dbEsc(c.lbl)}</div>
    </div>`).join('')
}
