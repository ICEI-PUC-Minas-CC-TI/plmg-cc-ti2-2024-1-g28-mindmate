document.addEventListener("DOMContentLoaded", function () {
  function togglePasswordVisibility(id, eyeIconId) {
    const passwordField = document.getElementById(id);
    const eyeIcon = document.getElementById(eyeIconId);

    eyeIcon.addEventListener("click", function () {
      if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
      } else {
        passwordField.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
      }
    });
  }

  togglePasswordVisibility("senha", "verSenha");
  togglePasswordVisibility("confirmSenha", "verConfirmSenha");

  function cadastrar() {
    const idUsuario = localStorage.getItem("idUsuario");
    if (!idUsuario) {
      document.getElementById("msgError").innerText = "ID de usuário não encontrado no localStorage.";
      return;
    }
    console.log(idUsuario);

    const nome = document.getElementById("username").value;
    const email = document.getElementById("emailUsuario").value;
    const senha = document.getElementById("senhaNew").value;
    const confirmSenha = document.getElementById("confirmSenhaNew").value;

    console.log(nome, email, senha, confirmSenha);

    if (senha !== confirmSenha) {
      document.getElementById("msgError").innerText = "As senhas não coincidem.";
      return;
    }

    const userData = {
      nomeCompleto: nome,
      email: email,
      senha: senha
    };

    axios.put(`http://localhost:6789/usuario/put/${idUsuario}`, userData)
      .then(response => {
        alert("Dados atualizados com sucesso.");
        window.location.href = "index.html";
        document.getElementById("msgError").innerText = "";
      })
      .catch(error => {
        alert("Erro ao atualizar dados.");
        console.error("Erro ao atualizar dados: ", error);
      });
  }

  const atualizarBtn = document.getElementById("atualizarBtn");
  if (atualizarBtn) {
    atualizarBtn.addEventListener("click", function (event) {
      event.preventDefault();
      cadastrar();
    });
  }
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
