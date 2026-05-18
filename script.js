// script.js — Supabase Integration
import { supabase } from './lib/supabase.js'

const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const WHATSAPP_NUMBER = '5547999701743'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

const SAMPLE_URLS = [
  'https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop'
]

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
  const container = document.getElementById('properties')
  if (!container) return

  const all = await getPublishedProperties()
  cachedProperties = all

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
    // Remove símbolo, espaços e centavos (,XX) antes de extrair o número
    const priceStr = String(p.price || '').replace(/,\d{0,2}$/, '').replace(/[^0-9]/g, '')
    const price = parseInt(priceStr, 10) || 0
    if (price < 0 || price > priceMaxVal) return false
    return true
  })

  if (!filtered.length) {
    container.innerHTML = '<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>'
    return
  }

  container.innerHTML = filtered.map(p => {
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
          <div><strong>${escapeHTML(p.price)}</strong></div>
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
      <td><img src="${img}" class="table-thumb" alt=""></td>
      <td>
        ${p.reference ? `<div class="cell-ref">${escapeHTML(p.reference)}</div>` : ''}
        <div class="cell-title">${escapeHTML(p.title)}</div>
        <div class="cell-sub">#${p.id}${p.condominium ? ' · ' + escapeHTML(p.condominium) : ''}</div>
      </td>
      <td class="cell-addr col-addr">${escapeHTML(addr)}</td>
      <td class="cell-price">${escapeHTML(p.price || '—')}</td>
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
  document.getElementById('view-price').textContent    = p.price    || '—'
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
  // Usa página OG estática gerada no build (omarcorretor.com.br/og/[id].html)
  const shareUrl = 'https://omarcorretor.com.br/og/' + p.id + '.html'
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

// ─── Profile: load, sidebar, permissions ─────────────────────────────────────
async function loadProfile(userId) {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()
  return data
}

function renderSidebarUser(profile) {
  const imgEl     = document.getElementById('sidebar-avatar')
  const initEl    = document.getElementById('sidebar-avatar-initial')
  const nameEl    = document.getElementById('sidebar-name')
  const roleEl    = document.getElementById('sidebar-role')
  if (!nameEl) return
  const name = profile?.name || 'Sem nome'
  nameEl.textContent = name
  roleEl.textContent = profile?.role === 'admin' ? 'Administrador' : 'Corretor'
  if (initEl) initEl.textContent = name[0]?.toUpperCase() || '?'
  if (imgEl && profile?.avatar_url) {
    imgEl.src = profile.avatar_url; imgEl.style.display = ''
    if (initEl) initEl.style.display = 'none'
  }
}

function applyRolePermissions(role) {
  const root = document.getElementById('admin-root')
  if (root) root.dataset.role = role || 'corretor'
}

// Clicar no avatar/nome da sidebar abre Configurações
function attachSidebarUserClick() {
  const sidebarUser = document.getElementById('sidebar-user')
  if (!sidebarUser) return
  sidebarUser.addEventListener('click', () => {
    // Ativa a seção de configurações
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'))
    const settingsBtn = document.querySelector('.nav-item[data-section="settings"]')
    if (settingsBtn) settingsBtn.classList.add('active')
    document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'))
    const settingsSection = document.getElementById('section-settings')
    if (settingsSection) settingsSection.classList.remove('hidden')
    // Fechar sidebar no mobile
    document.getElementById('admin-sidebar')?.classList.remove('open')
    document.getElementById('sidebar-overlay')?.classList.remove('active')
  })
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
          <div class="corretor-role-badge">${p.role === 'admin' ? '👑 Admin' : '🔑 Corretor'}</div>
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

  // Sidebar navigation
  document.querySelectorAll('.nav-item[data-section]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'))
      item.classList.add('active')
      document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'))
      document.getElementById(`section-${item.dataset.section}`)?.classList.remove('hidden')
    })
  })

  // Mobile sidebar toggle
  const sidebar  = document.getElementById('admin-sidebar')
  const overlay  = document.getElementById('sidebar-overlay')
  const toggle   = document.getElementById('sidebar-toggle')
  const closeSb  = () => { sidebar?.classList.remove('open'); overlay?.classList.remove('open') }
  toggle?.addEventListener('click', () => { sidebar?.classList.toggle('open'); overlay?.classList.toggle('open') })
  overlay?.addEventListener('click', closeSb)

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
  await loadLocations()
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
})


// ─── Migração: gerar referências para imóveis existentes ─────────────────────
async function migrateReferences() {
  const props = cachedProperties.filter(p => !p.reference)
  if (!props.length) { alert('Todos os imóveis já têm referência!'); return }

  // Pega o maior número existente
  const existing = cachedProperties
    .map(p => p.reference || '')
    .filter(r => /^IO-\d+$/.test(r))
    .map(r => parseInt(r.replace('IO-', ''), 10))
  let next = existing.length ? Math.max(...existing) + 1 : 1

  // Ordena por id para atribuir em ordem cronológica
  const sorted = [...props].sort((a, b) => a.id - b.id)
  let count = 0
  for (const p of sorted) {
    const ref = 'IO-' + String(next).padStart(4, '0')
    const { error } = await supabase.from('properties').update({ reference: ref }).eq('id', p.id)
    if (!error) {
      const idx = cachedProperties.findIndex(x => x.id === p.id)
      if (idx >= 0) cachedProperties[idx].reference = ref
      next++; count++
    }
  }
  alert(`✅ ${count} referências criadas!`)
  renderAdminProperties()
}

// ─── Migração: aplicar marca d'água em imóveis existentes ───────────────────
async function migrateWatermarks() {
  const props = cachedProperties.filter(p => p.images?.length)
  if (!props.length) { alert('Nenhum imóvel com fotos encontrado.'); return }

  const total = props.reduce((s, p) => s + (p.images?.length || 0), 0)
  if (!confirm(`Aplicar marca d'água em ${total} fotos de ${props.length} imóveis?\n\nIsso pode levar alguns minutos.`)) return

  let done = 0
  const progressEl = document.getElementById('migration-progress')
  if (progressEl) progressEl.style.display = 'block'

  for (const prop of props) {
    const newUrls = []
    for (const url of prop.images) {
      try {
        const newUrl = await applyWatermarkToUrl(url)
        newUrls.push(newUrl)
        done++
        if (progressEl) progressEl.textContent = `Processando… ${done}/${total}`
      } catch(e) {
        newUrls.push(url) // mantém original se falhar
      }
    }
    await supabase.from('properties').update({ images: newUrls }).eq('id', prop.id)
    const idx = cachedProperties.findIndex(x => x.id === prop.id)
    if (idx >= 0) cachedProperties[idx].images = newUrls
  }

  if (progressEl) progressEl.style.display = 'none'
  alert(`✅ Marca d'água aplicada em ${done} fotos!`)
  renderAdminProperties()
}

// ─── Baixa URL → canvas → aplica watermark → re-upload ───────────────────────
async function applyWatermarkToUrl(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const maxW = 1200
      let w = img.width, h = img.height
      if (w > maxW) { h = Math.round(h * maxW / w); w = maxW }
      canvas.width = w; canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)

      const logo = new Image()
      logo.crossOrigin = 'anonymous'
      logo.onload = () => {
        const wmW = Math.round(w * 0.18)
        const wmH = Math.round(logo.naturalHeight * wmW / logo.naturalWidth)
        const margin = Math.round(w * 0.02)
        ctx.globalAlpha = 0.45
        ctx.drawImage(logo, w - wmW - margin, h - wmH - margin, wmW, wmH)
        ctx.globalAlpha = 1.0

        canvas.toBlob(async blob => {
          try {
            const path = `wm-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
            const { error } = await supabase.storage.from('imoveis').upload(path, blob, {
              contentType: 'image/jpeg', cacheControl: '31536000', upsert: false
            })
            if (error) { resolve(imageUrl); return }
            const { data: { publicUrl } } = supabase.storage.from('imoveis').getPublicUrl(path)
            resolve(publicUrl)
          } catch(e) { resolve(imageUrl) }
        }, 'image/jpeg', 0.82)
      }
      logo.onerror = () => resolve(imageUrl)
      logo.src = '/logo.png'
    }
    img.onerror = () => resolve(imageUrl)
    img.src = imageUrl
  })
}
