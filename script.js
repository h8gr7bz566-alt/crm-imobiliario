// script.js — Supabase Integration
import { supabase } from './lib/supabase.js'
import {
  loadAllSettings, getSetting, getContent,
  saveMultipleSettings, saveSetting, saveContent, saveIntegration,
  applyVisualSettings, applyDynamicContent, applyWhatsAppLinks
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

// ─── Supabase: buscar imóveis publicados (listagem pública) ───────────────
async function getPublishedProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) { console.error('Supabase select error:', error); return [] }
  return data || []
}

// ─── Supabase: buscar todos os imóveis (painel admin) ────────────────────
async function getAllProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error('Supabase select error:', error); return [] }
  cachedProperties = data || []
  // Auto-assign references silently in background
  autoAssignReferences()
  // Auto-apply watermarks to unprocessed images in background
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
    // Gera referência automática IO-XXXX se não tiver
    if (!prop.reference) {
      const refs = cachedProperties
        .map(p => p.reference || '')
        .filter(r => /^IO-\d+$/.test(r))
        .map(r => parseInt(r.replace('IO-', ''), 10))
      const next = refs.length ? Math.max(...refs) + 1 : 1
      prop.reference = 'IO-' + String(next).padStart(4, '0')
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
  const slider       = document.getElementById('price-slider')
  const priceMaxVal  = slider ? parseInt(slider.value, 10) : 130000000

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
    if (price < 0 || price > priceMaxVal) return false
    return true
  })

  // ── Modo carrossel (homepage) ─────────────────────────────────────────
  if (vendasCarousel) {
    if (!filtered.length) {
      vendasCarousel.innerHTML = '<div style="padding:20px;text-align:center;color:#6b7280">Nenhum imóvel encontrado.</div>'
      return
    }
    vendasCarousel.innerHTML = filtered.map(p => {
      const img = p.cover_image || p.images?.[0] || SAMPLE_URLS[0]
      const loc = [p.neighborhood, p.city].filter(Boolean).join(', ')
      return `
        <div class="selecao-card">
          <img src="${img}" alt="${escapeHTML(p.title)}" class="selecao-card-img">
          <div class="selecao-card-body">
            <div class="selecao-card-title">${escapeHTML(p.title)}</div>
            <div class="selecao-card-loc">${escapeHTML(loc)}</div>
            <div class="selecao-card-price">${escapeHTML(formatPrice(p.price, window.currentLang || 'pt'))}</div>
            <div class="selecao-card-actions">
              <a href="property.html?id=${p.id}" class="btn-det">Ver Detalhes</a>
              <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
            </div>
          </div>
        </div>
      `
    }).join('')
    return
  }

  // ── Modo grid (imoveis.html) ──────────────────────────────────────────
  if (!filtered.length) {
    gridContainer.innerHTML = '<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>'
    return
  }

  gridContainer.innerHTML = filtered.map(p => {
    const images = p.images?.length ? p.images : SAMPLE_URLS
    const total = images.length
    return `
      <div class="card property-card">
        <div class="carousel-wrap" style="position:relative" data-total="${total}" data-idx="0" data-pid="${p.id}">
          <img src="${p.cover_image || images[0]}" alt="${escapeHTML(p.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
          ${total > 1 ? `
            <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&lt;</button>
            <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">&gt;</button>
          ` : ''}
        </div>
        <div class="property-info">
          <strong>${escapeHTML(p.title)}</strong>
          <div class="muted">${escapeHTML(p.neighborhood || '')}, ${escapeHTML(p.city || '')}</div>
          <div><strong>${escapeHTML(formatPrice(p.price, window.currentLang || 'pt'))}</strong></div>
          <div class="muted">🛏️ ${p.bedrooms || '--'} | 🚗 ${p.parking || '--'} ${total > 1 ? '| 📸 ' + total : ''}</div>
          <p class="muted">${escapeHTML((p.description || '').slice(0, 110))}</p>
          <div style="display:flex;gap:8px;margin-top:6px">
            <a class="btn btn-outline" href="property.html?id=${p.id}" style="flex:1;justify-content:center">Ver Detalhes</a>
            <a class="btn hero-whatsapp-btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener" style="flex:1;justify-content:center">WhatsApp</a>
          </div>
        </div>
      </div>
    `
  }).join('')

  document.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.removeEventListener('click', carouselHandler)
    btn.addEventListener('click', carouselHandler)
  })
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
  carousel.innerHTML = featured.map(p => {
    const img = p.cover_image || p.images?.[0] || SAMPLE_URLS[0]
    const loc = [p.neighborhood, p.city].filter(Boolean).join(', ')
    return `
      <div class="selecao-card">
        <img src="${img}" alt="${escapeHTML(p.title)}" class="selecao-card-img">
        <div class="selecao-card-body">
          <div class="selecao-card-title">${escapeHTML(p.title)}</div>
          <div class="selecao-card-loc">${escapeHTML(loc)}</div>
          <div class="selecao-card-price">${escapeHTML(formatPrice(p.price, window.currentLang || 'pt'))}</div>
          <div class="selecao-card-actions">
            <a href="property.html?id=${p.id}" class="btn-det">Ver Detalhes</a>
            <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" class="btn-wa">WhatsApp</a>
          </div>
        </div>
      </div>
    `
  }).join('')

  // Navegação do carousel
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
  e.stopPropagation()
  const wrap = e.currentTarget.closest('.carousel-wrap')
  if (!wrap) return
  const total = parseInt(wrap.dataset.total, 10)
  if (!total) return
  let idx = parseInt(wrap.dataset.idx, 10) || 0
  const dir = e.currentTarget.classList.contains('carousel-next') ? 1 : -1
  idx = (idx + dir + total) % total
  wrap.dataset.idx = idx
  const pid = parseInt(wrap.dataset.pid, 10)
  const prop = cachedProperties.find(x => x.id === pid)
  if (!prop?.images?.length) return
  wrap.querySelector('.carousel-img').src = prop.images[idx]
}

// ─── Slider de Preço ─────────────────────────────────────────────────────
function attachPriceSlider() {
  const slider = document.getElementById('price-slider')
  const label  = document.getElementById('price-label')
  if (!slider || !label) return
  slider.min   = '0'
  slider.max   = '130000000'
  slider.step  = '1000000'
  slider.value = '130000000'
  label.textContent = 'Até R$ 130.000.000'
  slider.addEventListener('input', () => {
    const val = parseInt(slider.value, 10)
    label.textContent = 'Até R$ ' + val.toLocaleString('pt-BR')
    renderPublic()
  })
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
          ${currentProfile?.role === 'admin' ? `<button data-id="${p.id}" class="icon-btn edit-btn" title="Editar">✏️</button>` : ''}
          ${currentProfile?.role === 'admin' ? `<button data-id="${p.id}" class="icon-btn del-btn" title="Remover">🗑️</button>` : ''}
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
      condominium:  fd.get('condominium') || ''
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
      alert('Erro ao salvar imóvel. Verifique o console.')
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
      if (currentProfile?.role !== 'admin') return
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

let viewImages = []
let viewIdx    = 0

function openViewModal(p) {
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
  // Usa property.html?id=[id] — sempre disponível para qualquer imóvel
  const shareUrl = 'https://omarcorretor.com.br/property.html?id=' + p.id
  const shareLinkInput = document.getElementById('share-link-input')
  if (shareLinkInput) shareLinkInput.value = shareUrl
  // Fechar share panel ao abrir novo modal
  const sharePanel = document.getElementById('share-panel')
  if (sharePanel) sharePanel.style.display = 'none'

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
  // Updated to use topnav IDs (sidebar-* IDs removed)
  const initEl    = document.getElementById('topnav-avatar-initial')
  const nameEl    = document.getElementById('topnav-name')
  const roleEl    = document.getElementById('topnav-role')
  if (!nameEl) return
  const name = profile?.name || 'Sem nome'
  nameEl.textContent = name
  if (roleEl) roleEl.textContent = profile?.role === 'super_admin' ? 'Super Admin' : profile?.role === 'admin' ? 'Administrador' : 'Corretor'
  if (initEl) initEl.textContent = name[0]?.toUpperCase() || '?'
}

// Helper: navigate to a section by name
function navigateToSection(sectionName) {
  document.querySelectorAll('.topnav-link, .topnav-dropdown-item').forEach(b => b.classList.remove('active'))
  const btn = document.querySelector(`.topnav-link[data-section="${sectionName}"], .topnav-dropdown-item[data-section="${sectionName}"]`)
  if (btn) btn.classList.add('active')
  document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'))
  document.getElementById(`section-${sectionName}`)?.classList.remove('hidden')
  // Close mobile menu
  document.getElementById('topnav-links')?.classList.remove('open')
  if (sectionName === 'contatos') initContatosSection()
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

// Clicking on topnav user area opens Settings
function attachSidebarUserClick() {
  const topnavUser = document.getElementById('topnav-user')
  if (!topnavUser) return
  topnavUser.addEventListener('click', () => navigateToSection('settings'))
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
        <td>
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

function openContatoModal(contato = null) {
  const existing = document.getElementById('contato-modal-root')
  if (existing) existing.remove()

  const isEdit = !!contato
  const wrap = document.createElement('div')
  wrap.id = 'contato-modal-root'
  wrap.className = 'modal-backdrop'
  wrap.innerHTML = `
    <div class="modal" style="max-width:560px;">
      <div class="modal-header">
        <h3>${isEdit ? 'Editar Contato' : 'Novo Contato'}</h3>
        <button class="modal-close" id="cm-close">✕</button>
      </div>
      <div class="modal-body">
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
          <div class="form-row single">
            <div class="form-group">
              <label class="form-label">Observações</label>
              <textarea name="notes" class="form-control" rows="3" placeholder="Notas sobre o contato…">${escapeHTML(contato?.notes || '')}</textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
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

  document.getElementById('cm-save')?.addEventListener('click', async () => {
    const form = document.getElementById('contato-form')
    if (!form.checkValidity()) { form.reportValidity(); return }
    const fd = new FormData(form)
    const btn = document.getElementById('cm-save')
    btn.disabled = true; btn.textContent = 'Salvando…'

    const payload = {
      name:          fd.get('name')?.trim(),
      company:       fd.get('company')?.trim() || null,
      email:         fd.get('email')?.trim() || null,
      phone:         fd.get('phone')?.trim() || null,
      job_title:     fd.get('job_title')?.trim() || null,
      city_interest: fd.get('city_interest')?.trim() || null,
      notes:         fd.get('notes')?.trim() || null,
      stage:         contato?.stage || 'novo',
      assigned_to:   currentProfile?.id || null,
      tenant_id:     currentProfile?.tenant_id || null,
      source:        'manual',
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

  if (profile?.role === 'admin') {
    const section = document.getElementById('settings-corretores-section')
    if (section) section.style.display = ''
    await loadCorretores()
    document.getElementById('btn-invite-corretor')?.addEventListener('click', async () => {
      const email    = document.getElementById('invite-email')?.value.trim()
      const password = document.getElementById('invite-password')?.value.trim()
      const btn      = document.getElementById('btn-invite-corretor')
      if (!email) { alert('Informe o e-mail do corretor.'); return }
      if (!password || password.length < 6) { alert('A senha precisa ter no mínimo 6 caracteres.'); return }
      if (btn) { btn.disabled = true; btn.textContent = 'Criando…' }
      try {
        const result = await callEdgeFunction({ email, password })
        if (result.success) {
          alert('Acesso criado! O corretor receberá um e-mail com o login e a senha que você definiu.')
          const emailInput = document.getElementById('invite-email')
          const passInput  = document.getElementById('invite-password')
          if (emailInput) emailInput.value = ''
          if (passInput)  passInput.value  = ''
          await loadCorretores()
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
  const { data, error } = await supabase.from('profiles').select('*').order('created_at')
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
    const ids = ['f-title','f-condominium','f-price-min','f-price-max','f-area-min','f-area-max']
    ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = '' })
    const sels = ['f-type','f-city','f-construction','f-published']
    sels.forEach(id => { const el = document.getElementById(id); if (el) el.value = '' })
    const neigh = document.getElementById('f-neighborhood')
    if (neigh) neigh.innerHTML = '<option value="">Todos</option>'
    document.querySelectorAll('.filter-btn.active').forEach(b => b.classList.remove('active'))
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
    const title = document.getElementById('view-modal-title')?.textContent || 'Imóvel'
    const msg = encodeURIComponent('Olha esse imóvel que encontrei: ' + title + '\n' + link)
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
    if (currentProfile?.role !== 'admin') return
    const title = document.getElementById('view-modal-title').textContent
    const p = cachedProperties.find(x => x.title === title)
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

// ─── Init ─────────────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
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
      await renderAdmin()
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
      renderSidebarUser(currentProfile)
      applyRolePermissions(currentProfile.role)
      await initSettings(currentProfile)
      if (window.lucide) lucide.createIcons()
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
            redirectTo: 'https://omarcorretor.com.br/admin.html'
          })
          if (error) {
            alert('Erro: ' + error.message)
          } else {
            alert('E-mail de redefinição enviado! Verifique sua caixa de entrada.')
          }
        })

        lf.addEventListener('submit', async e => {
          e.preventDefault()
          const fd       = new FormData(lf)
          const email    = fd.get('email')
          const password = fd.get('password')
          const ok = await loginAdmin(email, password)
          if (ok) {
            loginModal.classList.add('hidden')
            if (adminRoot) adminRoot.classList.remove('hidden')
            await renderAdmin()
            attachAdminForm()
            attachAdminUI()
            if (window.lucide) lucide.createIcons()

            const { data: { session: s2 } } = await supabase.auth.getSession()
            currentProfile = s2 ? await loadProfile(s2.user.id) : null
            if (!currentProfile) {
              await supabase.auth.signOut()
              return
            }
            if (currentProfile.active === false) {
              await supabase.auth.signOut()
              loginModal.classList.remove('hidden')
              if (adminRoot) adminRoot.classList.add('hidden')
              alert('Seu acesso está pausado. Entre em contato com o administrador.')
              return
            }
            renderSidebarUser(currentProfile)
            applyRolePermissions(currentProfile.role)
            await initSettings(currentProfile)
            if (window.lucide) lucide.createIcons()
          } else {
            alert('E-mail ou senha incorretos')
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

  const { data: rows } = await supabase.from('settings').select('key,value')
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
        <div class="logo-preview-box" style="margin-top:10px">
          <img id="co-logo-preview" src="${g('company.logo_url') || '/logo.png'}" alt="Preview">
          <span style="font-size:12px;color:#9ca3af">Preview do logotipo</span>
        </div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label">Favicon (URL)</label>
        <input id="co-favicon-url" class="form-control" value="${g('company.favicon_url')}" placeholder="/favicon.ico">
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

  const { data: rows } = await supabase.from('settings').select('key,value')
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
        <label class="form-label">Cor de Destaque (Dourado)</label>
        <div class="color-swatch">
          <input type="color" id="col-accent" value="${accent}">
          <input type="text"  id="col-accent-hex" value="${accent}" maxlength="7" placeholder="#b8962e">
        </div>
      </div>
      <div class="color-row">
        <label class="form-label">Fundo Principal (Site Público)</label>
        <div class="color-swatch">
          <input type="color" id="col-primary" value="${primBg}">
          <input type="text"  id="col-primary-hex" value="${primBg}" maxlength="7">
        </div>
      </div>
      <div class="color-row">
        <label class="form-label">Fundo Secundário (Seções)</label>
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
        <label class="form-label">Imagem de Fundo do Hero (URL)</label>
        <div style="display:flex;gap:8px">
          <input id="vis-hero-url" class="form-control" value="${escapeHTML(heroBg)}" placeholder="https://... ou deixe vazio para padrão">
          <label class="btn-secondary" style="cursor:pointer;white-space:nowrap;padding:8px 14px;font-size:13px">
            <input id="vis-hero-file" type="file" accept="image/*" style="display:none"> Upload
          </label>
        </div>
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

  const { data: rows } = await supabase.from('site_content').select('*')
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
    </div>
    <div class="content-field">
      <label class="form-label">Subtítulo do Hero</label>
      <textarea class="form-control sc-field" data-key="hero.subtitle" data-lang="${lang}" rows="3">${g('hero.subtitle', lang)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 1 <small style="color:#9ca3af">(suporta &lt;strong&gt;)</small></label>
      <textarea class="form-control sc-field" data-key="inst.bio_p1" data-lang="${lang}" rows="4">${g('inst.bio_p1', lang)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 2</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p2" data-lang="${lang}" rows="3">${g('inst.bio_p2', lang)}</textarea>
    </div>
    <div class="content-field">
      <label class="form-label">Bio — Parágrafo 3</label>
      <textarea class="form-control sc-field" data-key="inst.bio_p3" data-lang="${lang}" rows="3">${g('inst.bio_p3', lang)}</textarea>
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

  const [{ data: pipes }, { data: stages }, { data: tags }, { data: statuses }] = await Promise.all([
    supabase.from('crm_pipelines').select('*').order('sort_order'),
    supabase.from('crm_stages').select('*').order('sort_order'),
    supabase.from('crm_tags').select('*').order('name'),
    supabase.from('crm_lead_statuses').select('*').order('sort_order'),
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
      <div class="cfg-card-title"><span>🏷️</span> Tags</div>
      <div class="tags-grid" id="crm-tags-grid">${tagItems}</div>
      <div class="tag-add-row">
        <input id="crm-new-tag" type="text" class="form-control" placeholder="Nome da tag…">
        <input type="color" id="crm-new-tag-color" value="#b8962e">
        <button class="btn-primary" id="crm-add-tag">Adicionar</button>
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
    await supabase.from('crm_stages').insert({ pipeline_id: pipeId, name, color, sort_order: 99 })
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

  // Adicionar tag
  document.getElementById('crm-add-tag').addEventListener('click', async () => {
    const name  = document.getElementById('crm-new-tag').value.trim()
    const color = document.getElementById('crm-new-tag-color').value
    if (!name) return
    await supabase.from('crm_tags').insert({ name, color })
    document.getElementById('crm-new-tag').value = ''
    await renderCRMConfig()
  })

  // Remover tag
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
    await supabase.from('crm_lead_statuses').insert({ name, color, is_final, sort_order: 99 })
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
    await supabase.from('crm_pipelines').insert({ name, sort_order: 99 })
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
    <div class="sa-list-row">
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
        <button class="sa-btn-icon" data-action="edit-tenant" data-id="${t.id}" title="Editar">✏️</button>
      </div>
    </div>
  `).join('')

  list.querySelectorAll('[data-action="toggle-tenant"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const active = btn.dataset.active === 'true'
      await supabase.from('tenants').update({ active: !active }).eq('id', btn.dataset.id)
      loadSATenants()
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

function openNewTenantModal() {
  const existing = document.getElementById('sa-new-tenant-modal')
  if (existing) existing.remove()

  const modal = document.createElement('div')
  modal.id = 'sa-new-tenant-modal'
  modal.className = 'sa-modal-backdrop'
  modal.innerHTML = `
    <div class="sa-modal">
      <div class="sa-modal-header">
        <h3>Nova Imobiliária</h3>
        <button class="sa-modal-close" id="sa-modal-close-btn">✕</button>
      </div>
      <div class="sa-modal-body">
        <div class="form-group"><label>Nome da Imobiliária *</label><input id="nt-name" class="form-input" type="text" placeholder="Ex: Imobiliária ABC"></div>
        <div class="form-group"><label>Slug (URL única) *</label><input id="nt-slug" class="form-input" type="text" placeholder="imobiliaria-abc"></div>
        <div class="form-group"><label>Domínio personalizado</label><input id="nt-domain" class="form-input" type="text" placeholder="abc.imobipro.com.br"></div>
        <div class="form-group"><label>Plano</label>
          <select id="nt-plan" class="form-input">
            <option value="">Carregando planos…</option>
          </select>
        </div>
      </div>
      <div class="sa-modal-footer">
        <button id="nt-cancel" class="btn-secondary-sm">Cancelar</button>
        <button id="nt-save" class="btn-primary-sm">Criar Imobiliária</button>
        <span id="nt-msg" class="cfg-save-msg"></span>
      </div>
    </div>
  `
  document.body.appendChild(modal)

  supabase.from('plans').select('id, name').then(({ data }) => {
    const sel = document.getElementById('nt-plan')
    if (sel && data) sel.innerHTML = data.map(p => `<option value="${p.id}">${escapeHTML(p.name)}</option>`).join('')
  })

  document.getElementById('nt-name')?.addEventListener('input', e => {
    const slug = document.getElementById('nt-slug')
    if (slug && !slug.dataset.manual) {
      slug.value = e.target.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    }
  })
  document.getElementById('nt-slug')?.addEventListener('input', e => { e.target.dataset.manual = '1' })

  const close = () => modal.remove()
  document.getElementById('sa-modal-close-btn')?.addEventListener('click', close)
  document.getElementById('nt-cancel')?.addEventListener('click', close)
  modal.addEventListener('click', e => { if (e.target === modal) close() })

  document.getElementById('nt-save')?.addEventListener('click', async () => {
    const name   = document.getElementById('nt-name')?.value?.trim()
    const slug   = document.getElementById('nt-slug')?.value?.trim()
    const domain = document.getElementById('nt-domain')?.value?.trim()
    const planId = document.getElementById('nt-plan')?.value
    const msgEl  = document.getElementById('nt-msg')
    const saveBtn= document.getElementById('nt-save')
    if (!name || !slug) { showSaveMsg(msgEl, false); msgEl.textContent = 'Nome e slug são obrigatórios.'; return }
    if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Criando…' }
    const { error } = await supabase.from('tenants').insert({ name, slug, domain: domain || null, plan_id: planId || null, active: true })
    if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Criar Imobiliária' }
    if (error) { showSaveMsg(msgEl, false); msgEl.textContent = error.message; return }
    showSaveMsg(msgEl, true)
    setTimeout(() => { close(); loadSATenants() }, 800)
  })
}
