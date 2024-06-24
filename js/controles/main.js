import { produtosServicos } from "./servicos/produtos.js";

const produtosContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function criacaoElemento(nome, preco, imagem, id) {
    const card = document.createElement("div");
    card.classList.add("container_infos_item");

    card.innerHTML = `
        <div class="container_infos">
            <div class="container_infos_item">
                <div class="container_infos_sansPapyrus">
                    <img src="${imagem}" alt="">
                    <p>${nome}</p>
                    <div class="container_infos_valor">
                        <p>${preco}</p>
                        <button class="botaoDeletar" data-id="${id}">
                            <img src="img/lixeira.png" alt="lixeira">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    card.querySelector(".botaoDeletar").addEventListener("click", (event) => {
        const button = event.target.closest(".botaoDeletar");
        const id = button.dataset.id;
        produtosServicos.deletarProduto(id)
            .then(() => {
                card.remove();
            })
            .catch((err) => console.log(err));
    });

    produtosContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listaProdutos = await produtosServicos.listaProdutos();

        listaProdutos.forEach(produto => {
            produtosContainer.appendChild(
                criacaoElemento(
                    produto.nome,
                    produto.preco,
                    produto.imagem,
                    produto.id
                )
            );
        });
    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;

    produtosServicos.adicionarProduto({ nome, preco, imagem })
        .then((produto) => {
            produtosContainer.appendChild(
                criacaoElemento(produto.nome, produto.preco, produto.imagem, produto.id)
            );
            form.reset();
        })
        .catch((err) => console.log(err));
});

render();
