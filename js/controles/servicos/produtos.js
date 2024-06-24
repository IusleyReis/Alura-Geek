const listaProdutos = () => {
    return fetch("http://localhost:3000/cards")
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const adicionarProduto = (produto) => {
    return fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const deletarProduto = (id) => {
    return fetch(`http://localhost:3000/cards/${id}`, {
        method: "DELETE"
    })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const produtosServicos = {
    listaProdutos,
    adicionarProduto,
    deletarProduto
};
