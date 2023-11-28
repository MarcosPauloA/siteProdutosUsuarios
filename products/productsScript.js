
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
function addProduct() { }
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
    const tituloVal = document.getElementById("titulo").value;
    const descricaoVal = document.getElementById("descricao").value;
    const marcaVal = document.getElementById("marca").value;
    const precoVal = document.getElementById("preco").value;
    const photoVal = document.getElementById("photo").value;
    const categoriaVal = document.getElementById("categoria").value;
    // Verifica se o campo de nome não está vazio
    if (tituloVal.trim() !== "") {
        console.log("teste");
        pageProducts.push(new Product(id, tituloVal, descricaoVal, marcaVal, precoVal, [photoVal], categoriaVal));
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

const titulo = document.querySelector('#titulo');
const descricao = document.querySelector('#descricao');
const marca = document.querySelector('#marca');
const preco = document.querySelector('#preco');
const imagem = document.querySelector('#photo');
const categoria = document.querySelector('#categoria');
const form = document.querySelector('#add-product-form');

//Mostra mensagem de erro
const showsError = (input, message) => {
    // Obtem o elemento campo-formulario
    const formField = input.parentElement;
    // Adiciona a class de erro
    formField.classList.remove('success');
    formField.classList.add('error');
    // Mostra a mensagem de erro
    const error = formField.querySelector('small');
    error.textContent = message;
};

//Mostra mensagem de sucesso
const showsSuccess = (input) => {
    // Obtem o elemento do campo-formulario
    const formField = input.parentElement;
    // Remove a class de erro
    formField.classList.remove('error');
    formField.classList.add('success');
    // Oculta a mensagem de erro
    const error = formField.querySelector('small');
    error.textContent = '';
};

// Checa entrada obrigatória
const isRequired = value => value === '' ? false : true;

// Checa tamanho da entrada
const isBetween = (length, min, max) => length < min || length > max ? false : true;


// Valida o campo do nome
const checkTitle = () => {
    let valid = false;
    const min = 3, max = 50;
    const tituloVal = titulo.value.trim();
    if (!isRequired(tituloVal)) {
        showsError(titulo, 'Título não pode ficar em branco.');
        console.log("Título inválido!");
    } else if (!isBetween(tituloVal.length, min, max)) {
        showsError(titulo, `Nome deve ter entre ${min} e ${max} caracteres.`)
        console.log("Título inválido!");
    } else {
        showsSuccess(titulo);
        valid = true;
    }
    return valid;
};

// Valida o campo do descricao
const checkDescription = () => {
    let valid = false;
    const min = 3, max = 50;
    const descricaoVal = descricao.value.trim();
    if (!isRequired(descricaoVal)) {
        showsError(descricao, 'Descrição não pode ficar em branco.');
        console.log("Descrição inválida!");
    } else if (!isBetween(descricaoVal.length, min, max)) {
        showsError(descricao, `Descrição deve ter entre ${min} e ${max} caracteres.`)
        console.log("Descrição inválida!");
    } else {
        showsSuccess(descricao);
        valid = true;
    }
    return valid;
};

// Valida o campo de marca
const checkBrand = () => {
    let valid = false;
    const min = 3, max = 50;
    const marcaVal = marca.value.trim();
    if (!isRequired(marcaVal)) {
        showsError(marca, 'Marca não pode ficar em branco.');
        console.log("Marca inválida!");
    } else if (!isBetween(marcaVal.length, min, max)) {
        showsError(marca, `Marca deve ter entre ${min} e ${max} caracteres.`)
        console.log("Marca inválida!");
    } else {
        showsSuccess(marca);
        valid = true;
    }
    return valid;
};

// Valida o campo de preço
const checkPrice = () => {
    let valid = false;
    const min = 1, max = 119;
    const precoNumberVal = parseInt(preco.value);
    if (!isRequired(preco.value)) {
        showsError(preco, 'Preço não pode ficar em branco.');
    } else if (!isBetween(precoNumberVal, min, max)) {
        showsError(preco, 'Preço deve ser positiva e menor que 120')
        console.log("Preço inválido!");
    } else {
        showsSuccess(preco);
        valid = true;
    }
    return valid;
}

function checkValidHttpUrl() {
    const imagemVal = imagem.value.trim();
    var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    if (regex.test(imagemVal) || imagemVal ===  ""){
        console.log("url aceita");
        showsSuccess(imagem);
        return true;
    } else {
        showsError(imagem, 'URL inválida.');
        console.log("URL inválida!");
    }
  }

// Valida o campo do categoria
const checkCategory = () => {
    let valid = false;
    const min = 3, max = 50;
    const categoriaVal = categoria.value.trim();
    if (!isRequired(categoriaVal)) {
        showsError(categoria, 'Categoria não pode ficar em branco.');
        console.log("Categoria inválida!");
    } else if (!isBetween(categoriaVal.length, min, max)) {
        showsError(categoria, `Categoria deve ter entre ${min} e ${max} caracteres.`)
        console.log("Categoria inválida!");
    } else {
        showsSuccess(categoria);
        valid = true;
    }
    return valid;
};

// Modifica o manipulador de eventos de envio
form.addEventListener('submit', function (e) {
    // Previne a submissão do formulário
    e.preventDefault();
    const isNameValid = checkTitle();
    const isDescriptionValid = checkDescription();
    const isBrandValid = checkBrand();
    const isCategoryValid = checkCategory();
    const isPriceValid = checkPrice();
    const isUrlValid = checkValidHttpUrl();

    // Submete o formulário, se válido
    if (isNameValid &&
        isDescriptionValid &&
        isBrandValid &&
        isCategoryValid &&
        isPriceValid &&
        isUrlValid) {
        console.log("form aceito");
        addProduct(); 
    }
});