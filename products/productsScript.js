
class Product {
    constructor(id, titulo, descricao, marca, preco, fotos, categoria) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.marca = marca;
        this.preco = preco;
        this.fotos = fotos;
        this.categoria = categoria;
    }
}

const pageProducts = []
function displayProducts() { }
function fetchProducts() { }
function addProducts() { }
function removeProduct(productId) { }
document.addEventListener("DOMContentLoaded", function () {
    // Cria lista de usuários a partir da chamada da API
    fetchProducts();
});

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    pageProducts.forEach(product => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `<div class="space"><strong>Título:</strong> ${product.titulo}</div>
    <div class="space"><strong>Descrição:</strong> ${product.descricao}</div>
    <div class="space"><strong>Marca:</strong> ${product.marca}</div>
    <div class="space"><strong>Preço: ${product.preco}R$</strong></div>
    <div class="space"><img src=${product.fotos[0]} width="300" height="200"></div>
    <button onclick="removeProduct(${product.id})" class="remove-btn">
    <i class="bi bi-trash"></i>
    </button>`;
        productList.appendChild(listItem);
    });
}

function fetchProducts() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://dummyjson.com/products";
    // Fazendo uma requisição à API
    fetch(apiUrl)
        .then(response => response.json())
        .then(products => {
            // Itera sobre a lista de usuários e cria elementos HTML
            products.products.forEach(products => {
                pageProducts.push(new Product(products.id, products.title, products.description, products.brand, products.price, products.images, products.category));
            });
            console.log(pageProducts);
            // Mostra lista de usuários
            displayProducts();
        })
        .catch(error => console.error("Erro ao obter dados da API:", error));
}

function addProduct() {
    const addProductForm = document.getElementById("add-product-form");
    // Obtem os valores do formulário
    const id = pageProducts[pageProducts.length - 1].id + 1;
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const marca = document.getElementById("marca").value;
    const preco = document.getElementById("preco").value;
    const photo = document.getElementById("photo").value;
    const categoria = document.getElementById("categoria").value;
    // Verifica se o campo de nome não está vazio
    if (titulo.trim() !== "") {
        pageProducts.push(new Product(id, titulo, descricao, marca, preco, photo, categoria));
        // Limpa o formulário
        addProductForm.reset();
        // Mostra lista de usuários
        displayProducts();
    }
}

function removeProduct(productId) {
    // Apenas checando se é o produto correto
    console.log("Removendo produto com ID:", productId);
    // Encontrando índice do produto que vai ser removido
    const productIndexToRemove = pageProducts.findIndex((product) => product.id === productId);
    // Removendo produto da lista
    pageProducts.splice(productIndexToRemove, 1);
    // Atualizando lista na tela
    displayProducts();
}