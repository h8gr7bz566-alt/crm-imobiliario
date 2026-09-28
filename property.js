// property.js — Página de detalhes do imóvel
import { supabase } from './lib/supabase.js'

const WHATSAPP_NUMBER = '5547999701743'

const BRL_TO_USD = 5.70
function formatPrice(rawPrice, lang) {
  if (!rawPrice) return '—'
  const str = String(rawPrice).trim()
  let num
  if (str.includes(',') && str.lastIndexOf(',') > str.lastIndexOf('.')) {
    num = parseFloat(str.replace(/\./g, '').replace(',', '.'))
  } else {
    num = parseFloat(str.replace(/[^\d.]/g, ''))
  }
  if (isNaN(num) || num === 0) return str
  if (lang === 'en') {
    return '$ ' + (num / BRL_TO_USD).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }
  return 'R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const SAMPLE_URLS = [
  'https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop'
]

const params  = new URLSearchParams(window.location.search)
const propId  = params.get('id')

let images     = []
let currentIdx = 0

// ─── Busca o imóvel no Supabase ───────────────────────────────────────────
async function loadProperty() {
  if (!propId) return showError()

  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', propId)
      .maybeSingle()

    if (error) { console.error('Supabase error:', error); return showError() }
    if (!data)  { console.warn('Imóvel não encontrado, id:', propId); return showError() }
    renderProperty(data)
  } catch (e) {
    console.error('loadProperty exception:', e)
    showError()
  }
}

// ─── Preenche a página com os dados do imóvel ─────────────────────────────
function renderProperty(p) {
  document.title = `${p.title} — Isaac Omar Corretor`

  images     = p.images?.length ? p.images : SAMPLE_URLS
  currentIdx = 0
  window._galleryImages = images
  window._lbIdx = 0

  const lang = (() => { try { return localStorage.getItem('lang') || 'pt' } catch(e) { return 'pt' } })()

  // Título e preço
  document.getElementById('prop-title').textContent = p.title || ''
  document.getElementById('prop-price').textContent = formatPrice(p.price, lang)

  // Tag de tipo (ex: APARTAMENTO EM ITAPEMA)
  const typeTag = document.getElementById('pv2-type-tag')
  if (p.type || p.city) {
    const typeLabel = p.type ? p.type.toUpperCase() : ''
    const cityLabel = p.city ? `EM ${p.city.toUpperCase()}` : ''
    typeTag.textContent = [typeLabel, cityLabel].filter(Boolean).join(' ')
    typeTag.classList.remove('hidden')
  }

  // Código de referência
  const refEl = document.getElementById('pv2-ref')
  if (p.reference) {
    refEl.textContent = `CÓD. DO IMÓVEL #${p.reference}`
    refEl.classList.remove('hidden')
  }

  // Stats strip — barra horizontal com todos os dados
  const statsEl = document.getElementById('prop-stats')
  const statItems = [
    p.area      ? { label: 'Área Útil',  value: p.area,      unit: 'm²' } : null,
    p.bedrooms  ? { label: 'Quartos',    value: p.bedrooms,  unit: ''   } : null,
    p.suites    ? { label: 'Suítes',     value: p.suites,    unit: ''   } : null,
    p.bathrooms ? { label: 'Banheiros',  value: p.bathrooms, unit: ''   } : null,
    p.parking   ? { label: 'Garagem',    value: p.parking,   unit: ''   } : null,
  ].filter(Boolean)
  statsEl.innerHTML = statItems.map(s =>
    `<div class="pv2-stat-item">
      <span class="pv2-stat-label">${s.label}</span>
      <span class="pv2-stat-value">${s.value}<span class="pv2-stat-unit">${s.unit}</span></span>
    </div>`
  ).join('')

  // Endereço
  const parts = [p.rua, p.numero ? `nº ${p.numero}` : '', p.neighborhood, p.city]
  const addr  = parts.filter(Boolean).join(', ')
  const addrEl = document.getElementById('prop-address')
  if (addr) {
    addrEl.textContent = addr
    const locBox = document.getElementById('pv2-location')
    locBox.classList.remove('hidden')
  }

  // Mapa — embed OpenStreetMap se tiver lat/lng
  const mapEl = document.getElementById('pv2-map')
  if (p.lat && p.lng && Math.abs(p.lat) > 0.001) {
    const lat = parseFloat(p.lat)
    const lng = parseFloat(p.lng)
    const zoom = 16
    mapEl.innerHTML = `<iframe
      src="https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.005},${lat-0.004},${lng+0.005},${lat+0.004}&amp;layer=mapnik&amp;marker=${lat},${lng}"
      style="width:100%;height:260px;border:none;"
      loading="lazy"
      title="Localização do imóvel"
    ></iframe>
    <a class="pv2-map-link" href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}" target="_blank" rel="noopener">
      Ver mapa maior ↗
    </a>`
  }

  // Descrição
  const descWrap = document.getElementById('prop-desc-wrap')
  const descEl   = document.getElementById('prop-description')
  if (p.description) {
    descEl.textContent = p.description
    descWrap.classList.remove('hidden')
  }

  // Detalhes adicionais
  const detailsBlock = document.getElementById('pv2-details')
  const detailsList  = document.getElementById('pv2-details-list')
  const details = [
    p.city         ? { label: 'Cidade',         value: p.city }         : null,
    p.neighborhood ? { label: 'Bairro',          value: p.neighborhood } : null,
    p.condominium  ? { label: 'Condomínio',       value: `R$ ${parseFloat(p.condominium).toLocaleString('pt-BR', {minimumFractionDigits:0})}/mês` } : null,
    p.furnished    ? { label: 'Mobiliado',        value: p.furnished ? 'Sim' : 'Não' } : null,
    p.construction_status ? { label: 'Status',   value: p.construction_status === 'pronto' ? 'Pronto para morar' : p.construction_status === 'lancamento' ? 'Lançamento' : 'Em obras' } : null,
  ].filter(Boolean)
  if (details.length) {
    detailsList.innerHTML = details.map(d =>
      `<div class="pv2-detail-item">
        <span class="pv2-detail-label">${d.label}</span>
        <span class="pv2-detail-value">${d.value}</span>
      </div>`
    ).join('')
    detailsBlock.classList.remove('hidden')
  }

  // Botão WhatsApp
  const msg = encodeURIComponent(`Olá Isaac, tenho interesse no imóvel *${p.title}* que vi no seu site. Poderia me passar mais informações?`)
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
  document.getElementById('prop-whatsapp').href = waHref
  // share WA direct
  const shareWaBtn = document.getElementById('pv2-share-wa')
  if (shareWaBtn) shareWaBtn.dataset.waHref = waHref

  renderGallery()

  document.getElementById('prop-loading').classList.add('hidden')
  document.getElementById('prop-content').classList.remove('hidden')
}

// ─── Galeria ──────────────────────────────────────────────────────────────
function renderGallery() {
  const mainImg  = document.getElementById('gallery-main-img')
  const counter  = document.getElementById('gallery-counter')
  const prevBtn  = document.getElementById('gallery-prev')
  const nextBtn  = document.getElementById('gallery-next')
  const thumbsEl = document.getElementById('gallery-thumbs')

  mainImg.src = images[currentIdx]
  mainImg.alt = `Foto ${currentIdx + 1}`
  mainImg.style.cursor = 'zoom-in'
  mainImg.onclick = () => openLightbox(currentIdx)

  const hasMany = images.length > 1
  prevBtn.style.display  = hasMany ? 'flex' : 'none'
  nextBtn.style.display  = hasMany ? 'flex' : 'none'
  counter.textContent    = hasMany ? `${currentIdx + 1} / ${images.length}` : ''

  thumbsEl.innerHTML = hasMany
    ? images.map((src, i) =>
        `<img src="${src}" class="gallery-thumb${i === currentIdx ? ' active' : ''}" data-idx="${i}" alt="Foto ${i + 1}">`
      ).join('')
    : ''

  thumbsEl.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      currentIdx = parseInt(thumb.dataset.idx, 10)
      renderGallery()
    })
  })
}

function showError() {
  document.getElementById('prop-loading').classList.add('hidden')
  document.getElementById('prop-error').classList.remove('hidden')
}

// ─── Compartilhar direto no WhatsApp ─────────────────────────────────────
window.shareWhatsAppDirect = function() {
  const waBtn = document.getElementById('pv2-share-wa')
  const waHref = waBtn?.dataset.waHref
  if (waHref) {
    window.open(waHref, '_blank', 'noopener')
  }
}

// ─── Compartilhar com preview OG ─────────────────────────────────────────
window.shareProperty = function() {
  const id  = new URLSearchParams(window.location.search).get('id')
  const url = id
    ? `https://omarcorretor.com.br/property.html?id=${id}`
    : window.location.href
  if (navigator.share) {
    navigator.share({ url }).catch(() => {})
  } else {
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('prop-share')
      const orig = btn.textContent
      btn.textContent = '✅ Link copiado!'
      setTimeout(() => { btn.textContent = orig }, 2500)
    }).catch(() => {
      prompt('Copie o link abaixo:', url)
    })
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadProperty()

  document.getElementById('gallery-prev').addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + images.length) % images.length
    renderGallery()
  })

  document.getElementById('gallery-next').addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % images.length
    renderGallery()
  })
})
