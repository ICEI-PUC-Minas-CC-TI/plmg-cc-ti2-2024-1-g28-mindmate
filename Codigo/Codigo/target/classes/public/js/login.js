document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;

    var usuarioLogin = {
        email: email,
        senha: senha
    };

    axios.post("http://localhost:6789/usuario/authenticate", JSON.stringify(usuarioLogin), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        localStorage.setItem("isLoggedIn", "true"); 
        localStorage.setItem("nomeUsuario", response.data.nomeCompleto);
        localStorage.setItem("idUsuario", response.data.id);
        window.location.href = "homepage.html";
    })
    .catch((error) => {
        exibirMensagemErro("Nome de usuário ou senha incorretos");
    });
});

function exibirMensagemErro(mensagem) {
    var msgError = document.getElementById("msgError");
    msgError.innerHTML = mensagem;
    msgError.style.color = "red";
}


