function cadastrar() {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const confirmSenha = document.getElementById('confirmSenha').value;


  if(senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  if (senha !== confirmSenha) {
    alert("As senhas não coincidem.");
    return;
  }



  const usuario = {
    nomeCompleto: nome,
    email: email,
    senha: senha
  };

  console.log(usuario);


  axios.post("http://localhost:6789/usuario/insert", JSON.stringify(usuario), {
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then((response) => { 
      window.location.href = "index.html";
  })
}
