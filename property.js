// property.js — Página de detalhes do imóvel
import { supabase } from './lib/supabase.js'

const WHATSAPP_NUMBER = '5547999701743'

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

  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', propId)
    .eq('published', true)
    .maybeSingle()

  if (error || !data) return showError()
  renderProperty(data)
}

// ─── Preenche a página com os dados do imóvel ─────────────────────────────
function renderProperty(p) {
  document.title = `${p.title} — Isaac Omar Corretor`

  images     = p.images?.length ? p.images : SAMPLE_URLS
  currentIdx = 0
  window._galleryImages = images
  window._lbIdx = 0

  document.getElementById('prop-title').textContent = p.title || ''
  document.getElementById('prop-price').textContent = p.price || ''

  // Stats — renderiza apenas campos com valor
  const statsEl = document.getElementById('prop-stats')
  statsEl.innerHTML = [
    p.bedrooms ? `<div class="stat-item">🛏️ <strong>${p.bedrooms}</strong> Dormitório${p.bedrooms != 1 ? 's' : ''}</div>` : '',
    p.suites   ? `<div class="stat-item">🛁 <strong>${p.suites}</strong> Suíte${p.suites   != 1 ? 's' : ''}</div>` : '',
    p.parking  ? `<div class="stat-item">🚗 <strong>${p.parking}</strong> Vaga${p.parking  != 1 ? 's' : ''}</div>` : '',
  ].filter(Boolean).join('')

  // Endereço completo
  const parts  = [p.rua, p.numero ? `nº ${p.numero}` : '', p.neighborhood, p.city]
  const addr   = parts.filter(Boolean).join(', ')
  const addrEl = document.getElementById('prop-address')
  addrEl.textContent = addr ? `📍 ${addr}` : ''

  // Descrição
  const descWrap = document.getElementById('prop-desc-wrap')
  const descEl   = document.getElementById('prop-description')
  if (p.description) {
    descEl.textContent = p.description
    descWrap.classList.remove('hidden')
  }

  // Botão WhatsApp com mensagem pré-preenchida
  const msg = encodeURIComponent(`Olá, tenho interesse no imóvel *${p.title}* que vi no seu site. Poderia me passar mais informações?`)
  document.getElementById('prop-whatsapp').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`

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
