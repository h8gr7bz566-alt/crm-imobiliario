// script.js — Supabase Integration
import { supabase } from './lib/supabase.js'

const WHATSAPP_NUMBER = '5547999701743'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

const CITY_NEIGHBORHOODS = {
  'Balneário Camboriú (SC)': ['Centro','Barra Sul','Barra Norte','Pioneiros','Praia dos Amores','Nações','Estados','Ariribá'],
  'Itapema (SC)': ['Meia Praia','Centro','Morretes','Tabuleiro','Ilhota','Alto São Bento'],
  'Itajaí (SC)': ['Praia Brava','Centro','Fazenda','Cabeçudas','Ressacada','Cordeiros'],
  'Porto Belo (SC)': ['Perequê','Centro','Balneário Perequê','Alto Perequê'],
  'Florianópolis (SC)': ['Centro','Jurerê Internacional','Campeche','Trindade','Agronômica','Ingleses'],
  'Curitiba (PR)': ['Batel','Bigorrilho','Ecoville','Centro','Água Verde','Cabral'],
  'Ponta Grossa (PR)': ['Olarias','Estrela','Centro','Jardim América','Uvaranas','Nova Rússia','Oficinas'],
  'Carambeí (PR)': ['Centro','Boqueirão','Novo Horizonte','Jardim Eldorado','AFC','Catanduvas'],
  'Maringá (PR)': ['Zona 01','Zona 02','Zona 03','Zona 04','Zona 05','Zona 06','Zona 07']
}

const SAMPLE_URLS = [
  'https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop'
]

// Cache em memória — necessário para o carousel funcionar sem re-fetch
let cachedProperties = []

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
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('Canvas toBlob falhou')),
        'image/jpeg', quality
      )
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
          <img src="${images[0]}" alt="${escapeHTML(p.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
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
    cityFilter.addEventListener('change', () => {
      const neighborhoods = CITY_NEIGHBORHOODS[cityFilter.value] || []
      neighborhoodFilter.innerHTML = '<option value="">Todos os bairros</option>' +
        neighborhoods.map(n => `<option value="${n}">${n}</option>`).join('')
      renderPublic()
    })
  }
  document.querySelectorAll('[id$="-filter"]').forEach(el => {
    el.addEventListener('change', renderPublic)
  })
}

// ─── Render painel admin ──────────────────────────────────────────────────
async function renderAdmin() {
  const tbody = document.getElementById('admin-properties')
  if (!tbody) return
  const props = await getAllProperties()

  const total     = props.length
  const published = props.filter(p => p.published === true).length
  const elTotal   = document.getElementById('stat-total')
  const elPub     = document.getElementById('stat-published')
  const elLeads   = document.getElementById('stat-leads')
  if (elTotal)  elTotal.textContent  = total
  if (elPub)    elPub.textContent    = published
  if (elLeads)  elLeads.textContent  = '—'

  if (!props.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-row">Nenhum imóvel cadastrado.</td></tr>'
    return
  }

  tbody.innerHTML = props.map(p => {
    const img   = p.images?.[0] || SAMPLE_URLS[0]
    const addr  = [p.rua, p.numero ? `nº ${p.numero}` : '', p.neighborhood, p.city].filter(Boolean).join(', ') || '—'
    const badge = p.published === true
      ? '<span class="badge badge-green">● Publicado</span>'
      : '<span class="badge badge-gray">○ Rascunho</span>'
    return `<tr>
      <td><img src="${img}" class="table-thumb" alt=""></td>
      <td>
        <div class="cell-title">${escapeHTML(p.title)}</div>
        <div class="cell-sub">#${p.id}</div>
      </td>
      <td class="cell-addr col-addr">${escapeHTML(addr)}</td>
      <td class="cell-price">${escapeHTML(p.price || '—')}</td>
      <td>${p.bedrooms ?? '—'}</td>
      <td>${p.parking ?? '—'}</td>
      <td>${badge}</td>
      <td>
        <div class="action-btns">
          <button data-id="${p.id}" class="icon-btn edit-btn" title="Editar">✏️</button>
          <button data-id="${p.id}" class="icon-btn del-btn" title="Remover">🗑️</button>
        </div>
      </td>
    </tr>`
  }).join('')
}

// ─── Formulário admin ─────────────────────────────────────────────────────
let editingId = null

function openModal(title) {
  document.getElementById('modal-title').textContent = title || 'Novo Imóvel'
  document.getElementById('property-modal').classList.remove('hidden')
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  document.getElementById('property-modal').classList.add('hidden')
  document.body.style.overflow = ''
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
      parking:      parseInt(fd.get('parking'), 10) || 0,
      published:    fd.get('published') === 'true',
      images,
      description:  fd.get('description') || '',
      owner_name:   fd.get('owner_name') || '',
      owner_phone:  fd.get('owner_phone') || '',
      owner_email:  fd.get('owner_email') || '',
      owner_notes:  fd.get('owner_notes') || ''
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
      form.querySelector('[name="parking"]').value     = p.parking || ''
      form.querySelector('[name="description"]').value  = p.description || ''
      form.querySelector('[name="owner_name"]').value   = p.owner_name || ''
      form.querySelector('[name="owner_phone"]').value  = p.owner_phone || ''
      form.querySelector('[name="owner_email"]').value  = p.owner_email || ''
      form.querySelector('[name="owner_notes"]').value  = p.owner_notes || ''
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
  document.getElementById('view-modal-title').textContent = p.title || 'Imóvel'

  // Gallery
  viewImages = p.images?.length ? p.images : SAMPLE_URLS
  viewIdx    = 0
  renderViewGallery()

  // Info
  document.getElementById('view-price').textContent   = p.price || ''
  document.getElementById('view-address').textContent =
    [p.rua, p.numero ? `nº ${p.numero}` : '', p.neighborhood, p.city].filter(Boolean).join(', ')
  document.getElementById('view-description').textContent = p.description || ''

  const chips = document.getElementById('view-chips')
  chips.innerHTML = [
    p.bedrooms ? `<span class="view-chip">🛏️ ${p.bedrooms} Dorm${p.bedrooms != 1 ? 's' : ''}</span>` : '',
    p.suites   ? `<span class="view-chip">🛁 ${p.suites} Suíte${p.suites != 1 ? 's' : ''}</span>`    : '',
    p.parking  ? `<span class="view-chip">🚗 ${p.parking} Vaga${p.parking != 1 ? 's' : ''}</span>`   : '',
  ].filter(Boolean).join('')

  // Confidential
  document.getElementById('conf-name').textContent  = p.owner_name  || '—'
  document.getElementById('conf-phone').textContent = p.owner_phone || '—'
  document.getElementById('conf-email').textContent = p.owner_email || '—'
  document.getElementById('conf-notes').textContent = p.owner_notes || '—'

  // Reset to Principal tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
  document.querySelector('.tab-btn[data-tab="principal"]').classList.add('active')
  document.getElementById('tab-principal').classList.remove('hidden')
  document.getElementById('tab-confidencial').classList.add('hidden')

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

function attachAdminUI() {
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
  document.getElementById('view-modal-edit')?.addEventListener('click', () => {
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
    form.querySelector('[name="owner_name"]').value  = p.owner_name || ''
    form.querySelector('[name="owner_phone"]').value = p.owner_phone || ''
    form.querySelector('[name="owner_email"]').value = p.owner_email || ''
    form.querySelector('[name="owner_notes"]').value = p.owner_notes || ''
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
    const editBtn = row.querySelector('.edit-btn')
    if (!editBtn) return
    const id = Number(editBtn.dataset.id)
    const p  = cachedProperties.find(x => x.id === id)
    if (p) openViewModal(p)
  })
}

// ─── Init ─────────────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  attachPriceSlider()
  attachFilters()

  // Sincronização cidade → bairro no formulário admin
  const citySel  = document.getElementById('adminCitySelect')
  const neighSel = document.getElementById('adminNeighborhood')
  if (citySel && neighSel) {
    citySel.addEventListener('change', () => {
      const list = CITY_NEIGHBORHOODS[citySel.value] || []
      neighSel.innerHTML = '<option value="">Selecione a cidade primeiro</option>' +
        list.map(n => `<option value="${n}">${n}</option>`).join('')
    })
  }

  // Fluxo de autenticação admin
  const loginModal = document.getElementById('admin-login')
  const adminRoot  = document.getElementById('admin-root')
  if (loginModal) {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      loginModal.classList.add('hidden')
      if (adminRoot) adminRoot.classList.remove('hidden')
      await renderAdmin()
      attachAdminForm()
      attachAdminUI()
    } else {
      if (adminRoot) adminRoot.classList.add('hidden')
      loginModal.classList.remove('hidden')
      const lf = document.getElementById('login-form')
      if (lf) {
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
