const idUsuario_local = localStorage.getItem('idUsuario');
let med;
if(idUsuario_local) {
  axios.get(`http://localhost:6789/medico/get/${idUsuario_local}`)
  .then((response) => {
    const medicos = response.data;
    const medicoContainers = document.getElementById('contatos');
    medicos.forEach(medico => {
      const container = createMedicoContainer(medico);
      medicoContainers.appendChild(container);
    });
  })
  .catch((error) => {
      console.error("Erro ao buscar dados do médico:", error);
      exibirMensagemErro("Erro ao buscar dados do médico");
  });
}

function createMedicoContainer(medico) {
  const container = document.createElement('div');
  container.classList.add('container');

  const img = document.createElement('img');
  img.src = 'image/Captura de tela 2023-06-29 124924.png';
  img.alt = 'medico';
  container.appendChild(img);

  const nome = document.createElement('h2');
  nome.id = 'nome';
  nome.textContent = medico.descMedico;
  container.appendChild(nome);

  const email = document.createElement('p');
  email.id = 'email';
  email.textContent = `email: ${medico.emailMedico}`;
  container.appendChild(email);

  const telefone = document.createElement('p');
  telefone.id = 'telefone';
  telefone.textContent = `telefone: ${medico.foneMedico}`;
  container.appendChild(telefone);

  const whatsappLink = document.createElement('a');
  whatsappLink.classList.add('whatsapp-link');
  whatsappLink.href = `https://web.whatsapp.com/send?phone=55${medico.foneMedico}`;
  whatsappLink.target = '_blank';
  whatsappLink.innerHTML = '<i class="fa fa-whatsapp"></i>';
  
  const whatsappParagraph = document.createElement('p');
  whatsappParagraph.appendChild(whatsappLink);
  container.appendChild(whatsappParagraph);

  return container;
}





document.getElementById('adicionar-contato').addEventListener('click', function() {
  var nome = document.getElementById('nome_id').value;
  var telefone = document.getElementById('telefone_id').value;
  var email = document.getElementById('email_id').value;
  var foto = document.getElementById('foto').value;

  if (!nome || !telefone || !email || !foto) {
      alert("Preencha todos os campos");
      return;
  }

  const contato = {
      descMedico: nome,
      foneMedico: telefone,
      emailMedico: email,
      idadeMedico: 100, // Valor fixo
      cidadeMedico: "Não informado", // Valor fixo
      enderecoMedico: "Não informado", // Valor fixo
      webMedico: foto,
      idUsuario: idUsuario_local
  };

  axios.post("http://localhost:6789/medico/insert", JSON.stringify(contato), {
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    alert("Médico inserido com sucesso");
    window.location.reload();
  })
  .catch((error) => {
    exibirMensagemErro("Erro ao inserir Médico");
  });
  });


  document.getElementById('button_logout').addEventListener('click', function() {
    setTimeout(function() {
      localStorage.clear();
      window.location.href = "index.html";
    }, 500);
  });

  const isLogged = localStorage.getItem('isLoggedIn');
  if (!isLogged) {
    alert("Nenhuma conta está logada.");
    setTimeout(function() {
      window.location.href = "index.html";
    }, 500);
  }