// script.js — compartilha lógica entre index.html e admin.html com LocalStorage + compressão
(function(){
  const ADMIN_PASSWORD = 'ImobiPro@2026#Seg';
  const WHATSAPP_NUMBER = '5547999701743';
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

  const LS_KEY = 'imobi-properties';

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
  };

  const SAMPLE_URLS = [
    'https://images.unsplash.com/photo-1560184897-e6f6f0d0b1f8?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=3'
  ];

  // ───── LocalStorage (substitui IndexedDB) ─────
  function getAllProperties(){
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    } catch(e){
      return [];
    }
  }

  function saveProperty(prop){
    const all = getAllProperties();
    const idx = all.findIndex(p => p.id === prop.id);
    if(idx >= 0){
      all[idx] = prop;
    } else {
      all.push(prop);
    }
    localStorage.setItem(LS_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('properties:updated'));
  }

  function deleteProperty(id){
    const all = getAllProperties().filter(p => p.id !== id);
    localStorage.setItem(LS_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('properties:updated'));
  }

  // ───── Compressão de Imagem via Canvas (800px max, quality 0.5) ─────
  function compressImage(file, maxW = 800, quality = 0.5){
    return new Promise((resolve, reject)=>{
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = ()=>{
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if(w > maxW){
          h = h * maxW / w;
          w = maxW;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  async function compressMultiple(files){
    const arr = Array.from(files);
    const results = [];
    for(const f of arr){
      if(f.size > 0){
        const b64 = await compressImage(f);
        results.push(b64);
      }
    }
    return results;
  }

  // ───── Render Public (Index) ─────
  function renderPublic(){
    const container = document.getElementById('properties');
    if(!container) return;

    const props = getAllProperties();
    const city = document.getElementById('city-filter')?.value || '';
    const neighborhood = document.getElementById('neighborhood-filter')?.value || '';
    const bedrooms = document.getElementById('bedrooms-filter')?.value || '';
    const parking = document.getElementById('parking-filter')?.value || '';
    const priceMin = parseInt(document.getElementById('price-min-filter')?.value || '10000', 10);
    const priceMax = parseInt(document.getElementById('price-max-filter')?.value || '130000000', 10);

    const filtered = props.filter(p => {
      if(city && p.city !== city) return false;
      if(neighborhood && p.neighborhood !== neighborhood) return false;
      if(bedrooms){
        if(bedrooms === '4+' && Number(p.bedrooms) < 4) return false;
        if(bedrooms !== '4+' && Number(p.bedrooms) !== Number(bedrooms)) return false;
      }
      if(parking){
        if(parking === '4+' && Number(p.parking) < 4) return false;
        if(parking !== '4+' && Number(p.parking) !== Number(parking)) return false;
      }
      const price = parseInt(String(p.price || '').replace(/[^0-9]/g, ''), 10) || 0;
      if(price < priceMin || price > priceMax) return false;
      return true;
    });

    if(!filtered.length){
      container.innerHTML = '<div class="muted" style="padding:20px;text-align:center">Nenhum imóvel encontrado.</div>';
      return;
    }

    container.innerHTML = filtered.map(p => {
      const images = p.imagesCompressed && p.imagesCompressed.length ? p.imagesCompressed : SAMPLE_URLS;
      const total = images.length;
      return `
        <div class="card property-card">
          <div class="carousel-wrap" style="position:relative" data-total="${total}" data-idx="0" data-pid="${p.id}">
            <img src="${images[0]}" alt="${escapeHTML(p.title)}" class="carousel-img" style="width:100%;height:180px;object-fit:cover;border-radius:10px;display:block">
            ${total > 1 ? `
              <button class="carousel-btn carousel-prev" style="position:absolute;left:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1"><</button>
              <button class="carousel-btn carousel-next" style="position:absolute;right:6px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5;line-height:1">></button>
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
      `;
    }).join('');

    // Attach carousel
    document.querySelectorAll('.carousel-btn').forEach(btn => {
      btn.removeEventListener('click', carouselHandler);
      btn.addEventListener('click', carouselHandler);
    });
  }

  function carouselHandler(e){
    e.stopPropagation();
    const wrap = e.currentTarget.closest('.carousel-wrap');
    if(!wrap) return;
    const total = parseInt(wrap.dataset.total, 10);
    if(!total) return;
    let idx = parseInt(wrap.dataset.idx, 10) || 0;
    const dir = e.currentTarget.classList.contains('carousel-next') ? 1 : -1;
    idx = (idx + dir + total) % total;
    wrap.dataset.idx = idx;
    const pid = parseInt(wrap.dataset.pid, 10);
    const all = getAllProperties();
    const prop = all.find(x => x.id === pid);
    if(!prop || !prop.imagesCompressed || !prop.imagesCompressed.length) return;
    wrap.querySelector('.carousel-img').src = prop.imagesCompressed[idx];
  }

  // ───── Hero ─────
  function renderHero(){
    const el = document.getElementById('hero-gallery');
    if(!el) return;
    el.innerHTML = SAMPLE_URLS.map(u => `<img src="${u}" alt="casa">`).join('');
  }

  // ───── Filtros ─────
  function attachContact(){
    const cityFilter = document.getElementById('city-filter');
    const neighborhoodFilter = document.getElementById('neighborhood-filter');
    const filterInputs = document.querySelectorAll('[id$="-filter"]');

    if(cityFilter && neighborhoodFilter){
      cityFilter.addEventListener('change', ()=>{
        const neighborhoods = CITY_NEIGHBORHOODS[cityFilter.value] || [];
        neighborhoodFilter.innerHTML = '<option value="">Todos os bairros</option>' + neighborhoods.map(n => `<option value="${n}">${n}</option>`).join('');
        renderPublic();
      });
    }

    filterInputs.forEach(el => {
      el.addEventListener('change', renderPublic);
      el.addEventListener('input', renderPublic);
    });
  }

  // ───── Bairros no admin ─────
  function attachAdminCityNeighborhood(){
    const citySel = document.getElementById('adminCitySelect');
    const neighSel = document.getElementById('adminNeighborhood');
    if(!citySel || !neighSel) return;
    citySel.addEventListener('change', ()=>{
      const list = CITY_NEIGHBORHOODS[citySel.value] || [];
      neighSel.innerHTML = '<option value="">Selecione o bairro</option>' + list.map(n => `<option value="${n}">${n}</option>`).join('');
    });
  }

  // ───── Render Admin ─────
  function renderAdmin(){
    const el = document.getElementById('admin-properties');
    if(el){
      const props = getAllProperties();
      el.innerHTML = props.length
        ? props.map(p => {
            const images = p.imagesCompressed && p.imagesCompressed.length ? p.imagesCompressed : SAMPLE_URLS;
            return `
              <div class="card">
                <img src="${images[0]}" style="width:100%;height:130px;object-fit:cover;border-radius:8px;border:1px solid rgba(217,178,77,.35)">
                <div class="property-info">
                  <strong>${escapeHTML(p.title)}</strong>
                  <div class="muted">${escapeHTML(p.rua || '')}, ${escapeHTML(p.numero || '')} — ${escapeHTML(p.neighborhood || '')}, ${escapeHTML(p.city || '')}</div>
                  <div><strong>${escapeHTML(p.price)}</strong></div>
                  <div class="muted">🛏️ ${p.bedrooms || '--'} | 🚗 ${p.parking || '--'} | 📸 ${images.length}</div>
                  <p class="muted">${escapeHTML((p.description || '').slice(0, 100))}</p>
                  <div style="margin-top:8px;display:flex;gap:6px">
                    <button data-id="${p.id}" class="btn btn-outline edit-btn" style="flex:1">Editar</button>
                    <button data-id="${p.id}" class="btn btn-outline del-btn" style="flex:1;color:#ff6b6b;border-color:rgba(255,107,107,0.3)">Remover</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')
        : '<div class="muted">Nenhum imóvel cadastrado.</div>';
    }

    const leadsEl = document.getElementById('leads');
    if(leadsEl){
      const leads = (function(){
        try { return JSON.parse(localStorage.getItem('leads') || '[]'); } catch(e){ return []; }
      })();
      leadsEl.innerHTML = leads.length
        ? leads.map(l => `<div class="card"><strong>${escapeHTML(l.name)}</strong><div class="muted">${escapeHTML(l.contact)} • ${new Date(l.created).toLocaleString('pt-BR')}</div><p>${escapeHTML(l.message || '')}</p></div>`).join('')
        : '<div class="muted">Nenhum lead recebido.</div>';
    }
  }

  // ───── Edit State ─────
  let editingId = null;

  // ───── Admin Form ─────
  function attachAdminForm(){
    const form = document.getElementById('property-form');
    if(!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    if(!submitBtn) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fd = new FormData(form);
      const imageFiles = fd.get('images');
      let compressedImages = [];

      // If files selected, compress them; if editing and no files, keep existing
      if(imageFiles && imageFiles instanceof FileList && imageFiles.length > 0){
        compressedImages = await compressMultiple(imageFiles);
      } else if(editingId){
        const all = getAllProperties();
        const orig = all.find(x => x.id === editingId);
        if(orig && orig.imagesCompressed){
          compressedImages = orig.imagesCompressed;
        }
      }

      if(!compressedImages.length){
        compressedImages = [...SAMPLE_URLS];
      }

      const prop = {
        id: editingId || Date.now(),
        title: fd.get('title'),
        rua: fd.get('rua') || '',
        numero: fd.get('numero') || '',
        city: fd.get('city'),
        neighborhood: fd.get('neighborhood'),
        price: fd.get('price'),
        bedrooms: parseInt(fd.get('bedrooms'), 10) || 0,
        parking: parseInt(fd.get('parking'), 10) || 0,
        imagesCompressed: compressedImages,
        description: fd.get('description'),
        createdAt: Date.now()
      };

      saveProperty(prop);
      editingId = null;
      submitBtn.textContent = 'Salvar Imóvel';
      form.reset();
      const neighSel = document.getElementById('adminNeighborhood');
      if(neighSel) neighSel.innerHTML = '<option value="">Selecione o bairro</option>';
      renderAdmin();
      renderPublic();
      alert('Imóvel salvo com sucesso!');
    });

    // Delete handler
    document.addEventListener('click', e => {
      if(e.target.matches('.del-btn')){
        const id = Number(e.target.dataset.id);
        if(!id) return;
        deleteProperty(id);
        renderAdmin();
        renderPublic();
      }
    });

    // Edit handler
    document.addEventListener('click', e => {
      if(e.target.matches('.edit-btn')){
        const id = Number(e.target.dataset.id);
        if(!id) return;
        const all = getAllProperties();
        const p = all.find(x => x.id === id);
        if(!p) return;

        editingId = id;
        submitBtn.textContent = 'Salvar Alterações';

        form.querySelector('[name="title"]').value = p.title || '';
        form.querySelector('[name="rua"]').value = p.rua || '';
        form.querySelector('[name="numero"]').value = p.numero || '';
        form.querySelector('[name="city"]').value = p.city || '';
        form.querySelector('[name="price"]').value = p.price || '';
        form.querySelector('[name="bedrooms"]').value = p.bedrooms || '';
        form.querySelector('[name="parking"]').value = p.parking || '';
        form.querySelector('[name="description"]').value = p.description || '';

        // Trigger neighborhood update
        const citySel = document.getElementById('adminCitySelect');
        if(citySel){
          const evt = new Event('change');
          citySel.dispatchEvent(evt);
          setTimeout(()=>{
            const neighSel = document.getElementById('adminNeighborhood');
            if(neighSel) neighSel.value = p.neighborhood || '';
          }, 50);
        }

        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  function escapeHTML(s){
    if(!s) return '';
    return String(s).replace(/[&<>"']/g, c => ({'&':'&','<':'<','>':'>','"':'"',"'":'&#39;'}[c]));
  }

  window.addEventListener('storage', e => {
    if(e.key === 'leads' || e.key === LS_KEY){
      renderAdmin();
      renderPublic();
    }
  });

  window.addEventListener('properties:updated', ()=>{
    renderPublic();
    renderAdmin();
  });

  // ───── Init ─────
  document.addEventListener('DOMContentLoaded', () => {
    renderPublic();
    renderHero();
    attachContact();
    attachAdminCityNeighborhood();
    renderAdmin();
    attachAdminForm();

    const loginModal = document.getElementById('admin-login');
    const adminRoot = document.getElementById('admin-root');

    if(loginModal){
      const session = sessionStorage.getItem('adminAuth');
      if(session === 'true'){
        loginModal.classList.add('hidden');
        adminRoot.classList.remove('hidden');
        renderAdmin();
      } else {
        adminRoot.classList.add('hidden');
        loginModal.classList.remove('hidden');
        const form = document.getElementById('login-form');
        form.addEventListener('submit', e => {
          e.preventDefault();
          const pw = new FormData(form).get('password');
          if(pw === ADMIN_PASSWORD){
            sessionStorage.setItem('adminAuth', 'true');
            loginModal.classList.add('hidden');
            adminRoot.classList.remove('hidden');
            renderAdmin();
          } else {
            alert('Senha incorreta');
          }
        });
      }
    }
  });
})();