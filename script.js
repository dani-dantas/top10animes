let cardContainer = document.querySelector("main");
const campoBusca = document.querySelector("div input");
const botaoBusca = document.querySelector("#botao-busca");
let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function realizarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    if (termoBusca.trim() === "") {
        renderizarCards(dados);
        return;
    }

    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca) ||
        dado.criador.toLowerCase().includes(termoBusca) ||
        dado.data_lancamento.includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = "";
    for (let dado of dados) {
        const wikipediaUrl = `https://pt.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(dado.nome)}`;
        let article = document.createElement("article");
        article.innerHTML = 
            `<a href="${wikipediaUrl}" target="_blank" class="card-link">
                <video width="500px" height="281px" src="${dado.video}" autoplay muted loop></video>
                <h2>${dado.nome}</h2>
            </a>
            <p>${dado.descricao}</p>
            <p><strong>Criador(a):</strong> ${dado.criador}</p>
            <p><strong>Lançamento:</strong> ${new Date(dado.data_lancamento).toLocaleDateString("pt-BR", {timeZone: 'UTC'})}</p>`;
        cardContainer.appendChild(article);
    }
}

carregarDados();
botaoBusca.addEventListener("click", realizarBusca);