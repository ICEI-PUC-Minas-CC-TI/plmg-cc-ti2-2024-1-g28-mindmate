let questionsData;
let totalScore = 0;
let currentQuestionIndex = 0;

function getInfoBasedOnScore() {
  let score_info;
  if (totalScore < 2) {
    score_info = "Parece que você <strong>NÃO</strong> possuí Alzheimer, procure um médico para mais informações";
  } else if (totalScore < 5) {
    score_info = "Parece que você tem um grau <strong>LEVE</strong> de Alzheimer, procure um médico para mais informações";
  } else if (totalScore === 5) {
    score_info = "Parece que você tem um grau entre <strong>LEVE e MODERADO</strong> de Alzheimer, procure um médico para mais informações";
  } else if (totalScore < 10) {
    score_info = "Parece que você tem um grau <strong>MODERADO</strong> de Alzheimer, procure um médico para mais informações";
  } else if (totalScore === 11) {
    score_info = "Parece que você tem um grau entre <strong>MODERADO e GRAVE</strong> de Alzheimer, procure um médico para mais informações";
  } else if (totalScore < 16) {
    score_info = "Parece que você tem um grau <strong>GRAVE</strong> de Alzheimer, procure um médico para mais informações";
  }
  document.getElementById('printscoreinfo').innerHTML = score_info;
}

function growProgressBar(percentage_width) {
  var bar = document.getElementById("progress_bar");
  bar.style.width = percentage_width + "%";
}

document.addEventListener("DOMContentLoaded", function () {
    growProgressBar(0);
    axios.get(`http://localhost:6789/questoes/getAll`)
        .then((response) => {
        questionsData = response.data;
        renderQuestion(currentQuestionIndex);
        console.log(questionsData);
        })
        .catch((error) => {
        console.error("Erro ao buscar perguntas:", error);
        alert("Erro ao buscar perguntas");
        });

});

function nextQuestion() {
  const selectedAnswer = document.querySelector(`input[name="question-${questionsData[currentQuestionIndex].id_pergunta}"]:checked`);
  if (selectedAnswer) {
    totalScore += parseFloat(selectedAnswer.value);
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
      renderQuestion(currentQuestionIndex);
      growProgressBar((currentQuestionIndex / questionsData.length) * 100);
    } else {
      growProgressBar((currentQuestionIndex / questionsData.length) * 100);
      showResults();
    }
  } else {
    alert("Por favor, selecione uma resposta antes de continuar.");
  }
}

function renderQuestion(index) {
  let questionHtml = `
    <div id="question-${questionsData[index].id_pergunta}">
      <h2>Pergunta ${index + 1}</h2>
      <h3><strong>${questionsData[index].desc_pergunta}</strong></h3>
      <hr>`;
  questionsData[index].respostas.forEach(resposta => {
    questionHtml += `
      <input id="question-${questionsData[index].id_pergunta}-answer-${resposta.idResposta}" type="radio" name="question-${questionsData[index].id_pergunta}" value="${resposta.valor}"> ${resposta.descResposta}<br>`;
  });
  questionHtml += `<hr><div class="clearfix"></div></div>`;

  console.log(questionHtml);
  document.getElementById('questions').innerHTML = questionHtml;
}

function showResults() {
    document.querySelector('.questions_box').style.display = 'none';
    document.getElementById('question-6').style.display = 'block';
    document.getElementById('printtotalscore').textContent = totalScore;
    getInfoBasedOnScore();
}

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