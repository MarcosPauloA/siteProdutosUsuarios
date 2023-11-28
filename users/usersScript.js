class User {
    constructor(id, name, lastName, email, age, photo) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.photo = photo;
    }
}

const pageUsers = []
function displayUsers() { }
function fetchUsers() { }
function addUser() { }
function removeUser(userId) { }
document.addEventListener("DOMContentLoaded", function () {
    // Cria lista de usuários a partir da chamada da API
    fetchUsers();
});

function displayUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "";
    pageUsers.forEach(user => {
        const listItem = document.createElement("li");
        listItem.setAttribute("class", "card");
        // Adiciona todos os campos disponíveis e o botão de remoção
        listItem.innerHTML = `<div class="space"><strong>Nome:</strong> ${user.name}</div>
    <div class="space"><strong>Sobrenome:</strong> ${user.lastName}</div>
    <div class="space"><strong>Email:</strong> ${user.email}</div>
    <div class="space"><strong>Idade:</strong> ${user.age || 'N/A'}</div>
    <div class="space"><img src=${user.photo} width="200" height="200"></div>
    <button onclick="removeUser(${user.id})" class="remove-btn">
    <i class="bi bi-trash"></i>
    </button>`;
        userList.appendChild(listItem);
    });
}

function fetchUsers() {
    // Substitua a URL pela API desejada
    const apiUrl = "https://dummyjson.com/users";
    // Fazendo uma requisição à API
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            // Itera sobre a lista de usuários e cria elementos HTML
            users.users.forEach(user => {
                pageUsers.push(new User(user.id, user.firstName, user.lastName, user.email, user.age, user.image));
            });
            console.log(pageUsers);
            // Mostra lista de usuários
            displayUsers();
        })
        .catch(error => console.error("Erro ao obter dados da API:", error));
}

function addUser() {
    const addUserForm = document.getElementById("add-user-form");
    // Obtem os valores do formulário
    const id = pageUsers[pageUsers.length - 1].id + 1;
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const photo = document.getElementById("photo").value;
    // Verifica se o campo de nome não está vazio
    if (name.trim() !== "") {
        pageUsers.push(new User(id, name, lastName, email, age, photo));
        // Limpa o formulário
        addUserForm.reset();
        // Mostra lista de usuários
        displayUsers();
    }
}

function removeUser(userId) {
    // Apenas checando se é o usuário correto
    console.log("Removendo usuário com ID:", userId);
    // Encontrando índice do usuário que vai ser removido
    const userIndexToRemove = pageUsers.findIndex((user) => user.id === userId);
    // Removendo usuário da lista
    pageUsers.splice(userIndexToRemove, 1);
    // Atualizando lista na tela
    displayUsers();
}

const nome = document.querySelector('#name');
const sobrenome = document.querySelector('#lastName');
const email = document.querySelector('#email');
const idade = document.querySelector('#age');
const imagem = document.querySelector('#photo');
const form = document.querySelector('#add-user-form');

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
const checkFirstName = () => {
    let valid = false;
    const min = 3, max = 50;
    const nomeVal = nome.value.trim();
    if (!isRequired(nomeVal)) {
        showsError(nome, 'Nome não pode ficar em branco.');
        console.log("Nome inválido!");
    } else if (!isBetween(nomeVal.length, min, max)) {
        showsError(nome, `Nome deve ter entre ${min} e ${max} caracteres.`)
        console.log("Nome inválido!");
    } else {
        showsSuccess(nome);
        valid = true;
    }
    return valid;
};

// Valida o campo de sobrenome
const checkLastName = () => {
    let valid = false;
    const min = 3, max = 50;
    const sobrenomeVal = sobrenome.value.trim();
    if (!isRequired(sobrenomeVal)) {
        showsError(sobrenome, 'Sobrenome não pode ficar em branco.');
        console.log("Sobrenome inválido!");
    } else if (!isBetween(sobrenomeVal.length, min, max)) {
        showsError(sobrenome, `Sobrenome deve ter entre ${min} e ${max} caracteres.`)
        console.log("Sobrenome inválido!");
    } else {
        showsSuccess(sobrenome);
        valid = true;
    }
    return valid;
};

// Checa se e-mail é válido
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// Valida o campo de email
const checkEmail = () => {
    let valid = false;
    const emailVal = email.value.trim();
    if (!isRequired(emailVal)) {
        showsError(email, 'E-mail não pode ficar em branco.');
    } else if (!isEmailValid(emailVal)) {
        showsError(email, 'E-mail inválido.')
    } else {
        showsSuccess(email);
        valid = true;
    }
    return valid;
};

// Valida o campo de Idade
const checkAge = () => {
    let valid = false;
    const min = 1, max = 119;
    const idadeNumberVal = parseInt(idade.value);
    if (!isRequired(idade.value)) {
        showsError(idade, 'Idade não pode ficar em branco.');
    } else if (!isBetween(idadeNumberVal, min, max)) {
        showsError(idade, 'Idade deve ser positiva e menor que 120')
        console.log("Idade inválido!");
    } else {
        showsSuccess(idade);
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

// Modifica o manipulador de eventos de envio
form.addEventListener('submit', function (e) {
    // Previne a submissão do formulário
    e.preventDefault();
    const isNameValid = checkFirstName();
    const isLastNameValid = checkLastName();
    const isEmailValid = checkEmail();
    const isAgeValid = checkAge();
    const isUrlValid = checkValidHttpUrl();

    // Submete o formulário, se válido
    if (isNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isAgeValid &&
        isUrlValid) {
        console.log("form aceito");
        addUser();
    }
});