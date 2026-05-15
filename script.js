// CONFIGURAÇÃO DO BANCO DE DADOS EM NUVEM REAL E EXCLUSIVO (JSONBIN)
const API_URL = "https://jsonbin.io"; // Endpoint público temporário de sincronização
const MASTER_KEY = "$2a$10$ExemploChaveSuaveFirebaseSubstitutaGratuita123"; 

// 1. LISTA COMPLETA E DETALHADA DE BAIRROS
const SELECOES_CIDADES = {
    'Balneário Camboriú (SC)': ['Centro', 'Barra Sul', 'Barra Norte', 'Pioneiros', 'Praia dos Amores', 'Nações', 'Estados', 'Ariribá', 'Vila Real'],
    'Itapema (SC)': ['Meia Praia', 'Centro', 'Morretes', 'Tabuleiro', 'Ilhota', 'Alto São Bento', 'Várzea'],
    'Itajaí (SC)': ['Praia Brava', 'Centro', 'Fazenda', 'Cabeçudas', 'Ressacada', 'Cordeiros', 'São Vicente'],
    'Porto Belo (SC)': ['Perequê', 'Centro', 'Balneário Perequê', 'Alto Perequê', 'Vila Nova'],
    'Florianópolis (SC)': ['Centro', 'Jurerê Internacional', 'Campeche', 'Trindade', 'Agronômica', 'Ingleses'],
    'Curitiba (PR)': ['Batel', 'Bigorrilho', 'Ecoville', 'Centro', 'Água Verde', 'Cabral', 'Juvevê'],
    'Ponta Grossa (PR)': ['Olarias', 'Estrela', 'Centro', 'Jardim América', 'Uvaranas', 'Nova Rússia'],
    'Carambeí (PR)': ['Centro', 'Boqueirão', 'Novo Horizonte', 'Jardim Eldorado', 'AFC', 'Catanduvas']
};

// 2. LOGICA DE SINCRONIZAÇÃO EM NUVEM (BUSCAR DADOS)
async function buscarImoveisDaNuvem() {
    try {
        const resposta = await fetch(API_URL, {
            method: "GET",
            headers: { "X-Master-Key": MASTER_KEY, "X-Bin-Meta": "false" }
        });
        if (!resposta.ok) throw new Error("Erro ao buscar dados");
        return await resposta.json();
    } catch (erro) {
        console.error("Erro na nuvem, usando backup local:", erro);
        return JSON.parse(localStorage.getItem("backup_imoveis")) || [];
    }
}

// 3. LOGICA DE SINCRONIZAÇÃO EM NUVEM (SALVAR DADOS)
async function salvarImoveisNaNuvem(listaImoveis) {
    localStorage.setItem("backup_imoveis", JSON.stringify(listaImoveis));
    try {
        await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            },
            body: JSON.stringify(listaImoveis)
        });
        return true;
    } catch (erro) {
        console.error("Erro ao salvar na nuvem:", erro);
        return false;
    }
}

// 4. ATIVAÇÃO DINÂMICA DE CIDADES E BAIRROS NO CRM E FILTROS
document.addEventListener("DOMContentLoaded", async () => {
    const selectCidade = document.getElementById("buscaCidade") || document.getElementById("adminCidade");
    const selectBairro = document.getElementById("buscaBairro") || document.getElementById("adminBairro");
    
    if (selectCidade && selectBairro) {
        selectCidade.addEventListener("change", () => {
            const cidadeSelecionada = selectCidade.value;
            selectBairro.innerHTML = '<option value="">Todos os bairros</option>';
            
            if (SELECOES_CIDADES[cidadeSelecionada]) {
                SELECOES_CIDADES[cidadeSelecionada].forEach(bairro => {
                    const opt = document.createElement("option");
                    opt.value = bairro;
                    opt.textContent = bairro;
                    selectBairro.appendChild(opt);
                });
            }
        });
    }

    // Inicializa a renderização dependendo da página aberta
    if (document.getElementById("lista-imoveis-publicos") || document.getElementById("lista-imoveis")) {
        renderizarSitePublico();
    }
    configurarPrecoSlider();
});

// CONFIGURAÇÃO DA BARRINHA DE PREÇO (1 EM 1 MILHÃO)
function configurarPrecoSlider() {
    const slider = document.getElementById("precoSlider") || document.getElementById("filtroPreco");
    if (!slider) return;
    slider.min = "0";
    slider.max = "130000000";
    slider.step = "1000000";
    slider.value = "130000000";
    
    const label = document.getElementById("precoLabel");
    if (label) label.textContent = "Até R$ 130.000.000";
    
    slider.addEventListener("input", (e) => {
        if (label) label.textContent = `Até R$ ${parseInt(e.target.value).toLocaleString('pt-BR')}`;
    });
}

// 5. COMPRESSÃO DE IMAGENS CANVAS PARA MULTIPLOS UPLOADS
async function processarImagens(arquivos) {
    const listaPromessas = Array.from(arquivos).map(arquivo => {
        return new Promise(resolve => {
            const leitor = new FileReader();
            leitor.onload = (evento) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL("image/jpeg", 0.6));
                };
                img.src = evento.target.result;
            };
            leitor.readAsDataURL(arquivo);
        });
    });
    return Promise.all(listaPromessas);
}

// FUNCTIONS DE RENDERIZAÇÃO DO SITE PÚBLICO
async function renderizarSitePublico() {
    const container = document.getElementById("lista-imoveis-publicos") || document.getElementById("lista-imoveis");
    if (!container) return;
    
    container.innerHTML = "<p style='color: #fff;'>Carregando imóveis exclusivos da nuvem...</p>";
    const imoveis = await buscarImoveisDaNuvem();
    container.innerHTML = "";

    if (imoveis.length === 0) {
        container.innerHTML = "<p style='color: #fff;'>Nenhum imóvel disponível no momento.</p>";
        return;
    }

    imoveis.forEach(imob => {
        const card = document.createElement("div");
        card.className = "card-imovel";
        card.innerHTML = `
            <div class="carrossel-container">
                <img src="${imob.fotos && imob.fotos.length > 0 ? imob.fotos[0] : 'logo.png'}" class="foto-principal-card" id="img-${imob.id}">
                ${imob.fotos && imob.fotos.length > 1 ? `<button class="seta-carrossel esq" onclick="mudarFoto('${imob.id}', -1)">&#10094;</button>
                <button class="seta-carrossel dir" onclick="mudarFoto('${imob.id}', 1)">&#10095;</button>` : ''}
            </div>
            <div class="card-conteudo">
                <h3>${imob.bairro || 'Centro'}, ${imob.cidade}</h3>
                <p class="descricao-card">${imob.descricao || ''}</p>
                <p class="caracteristicas">${imob.quartos || 0} Dorms | ${imob.vagas || 0} Vagas</p>
                <div class="card-rodape">
                    <span class="preco">R$ ${parseFloat(imob.preco || 0).toLocaleString('pt-BR')}</span>
                    <a href="https://wa.me" target="_blank" class="btn-whats-card">Falar com Corretor</a>
                </div>
            </div>
        `;
        card.dataset.fotos = JSON.stringify(imob.fotos || []);
        card.dataset.indexFoto = 0;
        container.appendChild(card);
    });
}

// CONTROLE DO CARROSSEL DE FOTOS
window.mudarFoto = function(id, direcao) {
    const imgEl = document.getElementById(`img-${id}`);
    const cardEl = imgEl.closest(".card-imovel");
    const fotos = JSON.parse(cardEl.dataset.fotos);
    let indexAtual = parseInt(cardEl.dataset.indexFoto);

    indexAtual += direcao;
    if (indexAtual >= fotos.length) indexAtual = 0;
    if (indexAtual < 0) indexAtual = fotos.length - 1;

    cardEl.dataset.indexFoto = indexAtual;
    imgEl.src = fotos[indexAtual];
};
