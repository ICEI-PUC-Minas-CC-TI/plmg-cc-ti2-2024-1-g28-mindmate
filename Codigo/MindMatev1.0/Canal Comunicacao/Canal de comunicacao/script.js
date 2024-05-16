// Seleciona o botão "Adicionar contato" e o formulário
const botaoAdicionarContato = document.getElementById("adicionar-contato");
const formContato = document.getElementById("form-contato");

// Seleciona a div onde os contatos serão adicionados
const divContatos = document.getElementById("contatos");

// Adiciona um listener ao botão "Adicionar contato"
botaoAdicionarContato.addEventListener("click", function(event) {
  event.preventDefault(); // Previne o comportamento padrão do botão

  // Obtém os valores inseridos no formulário
  const nome = formContato.nome.value;
  const telefone = formContato.telefone.value;
  const email = formContato.email.value;

  // Verifica se os campos estão vazios
  if (nome === '' || telefone === '' || email === '') {
    return; // Se algum campo estiver vazio, interrompe a execução
  }

  // Cria os elementos HTML para o novo contato
  const container = document.createElement("div");
  container.classList.add("container");

  const img = document.createElement("img");
  img.src = "icone usuario.png";
  img.alt = nome;

  const h2 = document.createElement("h2");
  h2.textContent = nome;

  const pEmail = document.createElement("p");
  pEmail.textContent = "email: " + email;

  const pTelefone = document.createElement("p");
  pTelefone.textContent = "telefone: " + telefone;

  const linkWhatsapp = document.createElement("a");
  linkWhatsapp.classList.add("whatsapp-link");
  linkWhatsapp.href = "https://web.whatsapp.com/send?phone=" + telefone;
  linkWhatsapp.target = "_blank";

  const iconeWhatsapp = document.createElement("i");
  iconeWhatsapp.classList.add("fa", "fa-whatsapp");

  // Adiciona os elementos ao DOM
  linkWhatsapp.appendChild(iconeWhatsapp);
  container.appendChild(img);
  container.appendChild(h2);
  container.appendChild(pEmail);
  container.appendChild(pTelefone);
  container.appendChild(linkWhatsapp);
  divContatos.appendChild(container);

  // Limpa o formulário
  formContato.reset();

  // Armazena os dados no Local Storage
  const contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  contatos.push({
    nome: nome,
    telefone: telefone,
    email: email
  });
  localStorage.setItem("contatos", JSON.stringify(contatos));
});

// Carrega os contatos do localStorage e adiciona-os ao DOM
const contatos = JSON.parse(localStorage.getItem("contatos")) || [];
contatos.forEach(function(contato) {
  // Verifica se os campos do contato estão vazios
  if (contato.nome === '' || contato.telefone === '' || contato.email === '') {
    return; // Se algum campo estiver vazio, interrompe a execução
  }

  const container = document.createElement("div");
  container.classList.add("container");

  const img = document.createElement("img");
  img.src = "icone usuario.png";
  img.alt = contato.nome;

  const h2 = document.createElement("h2");
  h2.textContent = contato.nome;

  const pEmail = document.createElement("p");
  pEmail.textContent = "email: " + contato.email;

  const pTelefone = document.createElement("p");
  pTelefone.textContent = "telefone: " + contato.telefone;

  const linkWhatsapp = document.createElement("a");
  linkWhatsapp.classList.add("whatsapp-link");
  linkWhatsapp.href = "https://web.whatsapp.com/send?phone=" + contato.telefone;
  linkWhatsapp.target = "_blank";

  const iconeWhatsapp = document.createElement("i");
  iconeWhatsapp.classList.add("fa", "fa-whatsapp");

  // Adiciona os elementos ao DOM
  linkWhatsapp.appendChild(iconeWhatsapp);
  container.appendChild(img);
  container.appendChild(h2);
  container.appendChild(pEmail);
  container.appendChild(pTelefone);
  container.appendChild(linkWhatsapp);
  divContatos.appendChild(container);
});


function removerContato(nome) {
  const contatos = JSON.parse(localStorage.getItem("contatos")) || [];
  
  // Filtra os contatos mantendo apenas aqueles que não correspondem ao nome fornecido
  const contatosFiltrados = contatos.filter(function(contato) {
    return contato.nome !== nome;
  });
  
  // Atualiza o Local Storage com a lista filtrada de contatos
  localStorage.setItem("contatos", JSON.stringify(contatosFiltrados));
}

removerContato("ddd");