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

// ─── Compressão de Imagem via Canvas ─────────────────────────────────────
function compressImage(file, maxW = 800, quality = 0.5) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      let w = img.width, h = img.height
      if (w > maxW) { h = h * maxW / w; w = maxW }
      canvas.width = w; canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = reject
    img.src = url
  })
}

async function compressMultiple(files) {
  const results = []
  for (const f of Array.from(files)) {
    if (f.size > 0) results.push(await compressImage(f))
  }
  return results
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
    const price = parseInt(String(p.price || '').replace(/[^0-9]/g, ''), 10) || 0
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
          <a class="btn hero-whatsapp-btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener" style="width:100%;justify-content:center;margin-top:6px">Falar sobre este imóvel</a>
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
  const el = document.getElementById('admin-properties')
  if (!el) return
  const props = await getAllProperties()
  el.innerHTML = props.length
    ? props.map(p => {
        const images   = p.images?.length ? p.images : SAMPLE_URLS
        const pubLabel = p.published === true
          ? '<span style="color:#4caf50;font-weight:700">✔ Publicado</span>'
          : '<span style="color:#ff6b6b;font-weight:600">✖ Não publicado</span>'
        return `
          <div class="card">
            <img src="${images[0]}" style="width:100%;height:130px;object-fit:cover;border-radius:8px;border:1px solid rgba(217,178,77,.35)">
            <div class="property-info">
              <strong>${escapeHTML(p.title)}</strong>
              <div class="muted">${escapeHTML(p.rua || '')}, ${escapeHTML(p.numero || '')} — ${escapeHTML(p.neighborhood || '')}, ${escapeHTML(p.city || '')}</div>
              <div><strong>${escapeHTML(p.price)}</strong> · ${pubLabel}</div>
              <div class="muted">🛏️ ${p.bedrooms || '--'} | 🚗 ${p.parking || '--'} | 📸 ${images.length}</div>
              <p class="muted">${escapeHTML((p.description || '').slice(0, 100))}</p>
              <div style="margin-top:8px;display:flex;gap:6px">
                <button data-id="${p.id}" class="btn btn-outline edit-btn" style="flex:1">Editar</button>
                <button data-id="${p.id}" class="btn btn-outline del-btn" style="flex:1;color:#ff6b6b;border-color:rgba(255,107,107,0.3)">Remover</button>
              </div>
            </div>
          </div>`
      }).join('')
    : '<div class="muted">Nenhum imóvel cadastrado.</div>'
}

// ─── Formulário admin ─────────────────────────────────────────────────────
let editingId = null

function attachAdminForm() {
  const form      = document.getElementById('property-form')
  if (!form) return
  const submitBtn = form.querySelector('button[type="submit"]')

  form.addEventListener('submit', async e => {
    e.preventDefault()
    const fd         = new FormData(form)
    const imageFiles = fd.getAll('images')
    let images       = []

    if (imageFiles.length && imageFiles[0].size > 0) {
      images = await compressMultiple(imageFiles)
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
      parking:      parseInt(fd.get('parking'), 10) || 0,
      published:    fd.get('published') === 'true',
      images,
      description:  fd.get('description') || ''
    }

    try {
      await saveProperty(prop)
      editingId = null
      submitBtn.textContent = 'Salvar Imóvel'
      form.reset()
      const pubSel = document.getElementById('adminPublished')
      if (pubSel) pubSel.value = 'true'
      const neighSel = document.getElementById('adminNeighborhood')
      if (neighSel) neighSel.innerHTML = '<option value="">Selecione o bairro</option>'
      await renderAdmin()
      alert('✅ Imóvel salvo no Supabase!')
    } catch (err) {
      console.error(err)
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
      form.querySelector('[name="parking"]').value     = p.parking || ''
      form.querySelector('[name="description"]').value = p.description || ''
      const pubSel = document.getElementById('adminPublished')
      if (pubSel) pubSel.value = p.published === true ? 'true' : 'false'
      const citySel = document.getElementById('adminCitySelect')
      if (citySel) {
        citySel.dispatchEvent(new Event('change'))
        setTimeout(() => {
          const neighSel = document.getElementById('adminNeighborhood')
          if (neighSel) neighSel.value = p.neighborhood || ''
        }, 50)
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

// ─── Init ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  attachPriceSlider()
  attachFilters()

  // Sincronização cidade → bairro no formulário admin
  const citySel  = document.getElementById('adminCitySelect')
  const neighSel = document.getElementById('adminNeighborhood')
  if (citySel && neighSel) {
    citySel.addEventListener('change', () => {
      const list = CITY_NEIGHBORHOODS[citySel.value] || []
      neighSel.innerHTML = '<option value="">Selecione o bairro</option>' +
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
