function jogos(jogo) {
    if (jogo == "Tetris") {
        open_modal("https://tetris.com/play-tetris", "Esse jogo estimula a velocidade do pensamento e a coordenação motora")
    } else if (jogo == "Sudoku") {
        open_modal("https://sudoku.com/pt", "Esse jogo estimula a matemática e o raciocínio lógico")
    } else if (jogo == "Candy Crush") {
        open_modal("https://www.king.com/pt_BR/game/candycrush", "Esse jogo estimula o pensamento rápido e o controle")
    } else if (jogo == "Jogo dos 7 erros") {
        open_modal("https://www.escolagames.com.br/jogos/jogoDos7Erros/", "Esse jogo estimula a memória e a capacidade de memorização de imagens")
    }
}
function open_modal(link, text) {
    var texto = document.getElementById("numsei")
    texto.textContent = text
    var linkjogo = document.getElementById("linkjogo")
    linkjogo.setAttribute("href", `${link}`)
    var modal = document.getElementById("g")
    modal.style.display = "block"
}
function close_modal() {
    var modal = document.getElementById("g")
    modal.style.display = "none"
}
document.getElementById("botao").addEventListener("click", function(){   
    close_modal()
})