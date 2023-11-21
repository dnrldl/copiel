document.addEventListener('DOMContentLoaded', () => {
  const questionContainer = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const resultContainer = document.getElementById('result');
  const progressContainer = document.getElementById('progress');
  const currentScoreDisplay = document.getElementById('currentScore');
  const gameSetupDiv = document.getElementById('game-setup');
  const quizDiv = document.getElementById('quiz');
  const categorySelect = document.getElementById('category');
  const startButton = document.getElementById('start-btn');
  const highScoreDisplay = document.getElementById('highScore');

  let currentQuestions = [];
  let score = 0;
  let questionIndex = 0;
  let questionStartTime;

  const baseScorePerQuestion = 1000;
  const penaltyPerSecond = 10;

  startButton.disabled = true;

  function fetchCategories() {
    const categoryJsonFilePath = '../categories/categories.json';

    fetch(categoryJsonFilePath)
      .then((response) => response.json())
      .then((data) => {
        data.categories.forEach((category) => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      });
  }

  async function startGame() {
    const category = categorySelect.value;
    fetchQuestions(category);
    try {
      const res = await fetch('/getLoggedUserScore', {
        method: 'POST',
        body: JSON.stringify({
          category: categorySelect.value,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      var userHighScore = 'score' + category;
      if (data.user[userHighScore] == 0) highScoreDisplay.innerText == '';
      else
        highScoreDisplay.innerText = `나의 최고 점수: ${data.user[userHighScore]} 점`;
    } catch (err) {
      console.log(err);
    }
    gameSetupDiv.style.display = 'none';
    quizDiv.style.display = 'block';
  }

  function fetchQuestions(category) {
    var questionJsonFilePath = '../questions';
    if (category == 1) questionJsonFilePath += '/stage1.json';
    else if (category == 2) questionJsonFilePath += '/stage2.json';
    else if (category == 3) questionJsonFilePath += '/stage3.json';
    else if (category == 4) questionJsonFilePath += '/stage4.json';
    else if (category == 5) questionJsonFilePath += '/stage5.json';
    else if (category == 6) questionJsonFilePath += '/stage6.json';

    fetch(questionJsonFilePath)
      .then((response) => response.json())
      .then((data) => {
        currentQuestions = data;
        questionIndex = 0;
        score = 0;
        displayQuestion();
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  async function displayQuestion() {
    if (questionIndex < currentQuestions.length) {
      let currentQuestion = currentQuestions[questionIndex];
      questionContainer.innerHTML = decodeHTML(currentQuestion.question);
      displayAnswers(currentQuestion);
      updateProgress();
      questionStartTime = Date.now();
    } else {
      try {
        const res = await fetch('/sendUserScore', {
          method: 'POST',
          body: JSON.stringify({
            score: score,
            category: categorySelect.value,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
      } catch (err) {
        console.log(err);
      }
      showResults();
    }
  }

  function displayAnswers(question) {
    answersContainer.innerHTML = '';
    const answers = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(answers);

    answers.forEach((answer) => {
      const button = document.createElement('button');
      button.innerHTML = decodeHTML(answer);
      button.className = 'answer-btn';
      button.addEventListener('click', () =>
        selectAnswer(button, question.correct_answer, answers)
      );
      answersContainer.appendChild(button);
    });
  }

  function selectAnswer(selectedButton, correctAnswer, answers) {
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    let scoreForThisQuestion = Math.max(
      baseScorePerQuestion - Math.floor(timeTaken) * penaltyPerSecond,
      0
    );

    disableButtons();
    let correctButton;
    answers.forEach((answer) => {
      if (decodeHTML(answer) === decodeHTML(correctAnswer)) {
        correctButton = [...answersContainer.childNodes].find(
          (button) => button.innerHTML === decodeHTML(correctAnswer)
        );
      }
    });

    if (decodeHTML(selectedButton.innerHTML) === decodeHTML(correctAnswer)) {
      score += scoreForThisQuestion;
      selectedButton.classList.add('correct');
      resultContainer.innerText = `정답! + ${scoreForThisQuestion} 점`;
    } else {
      selectedButton.classList.add('incorrect');
      correctButton.classList.add('correct');
      resultContainer.innerHTML = `오답! 정답은:   <b>${decodeHTML(
        correctAnswer
      )}</b>  이었어요`;
    }

    updateCurrentScore();
    setTimeout(() => {
      questionIndex++;
      displayQuestion();
      resultContainer.innerText = '';
    }, 3000);
  }

  function updateCurrentScore() {
    currentScoreDisplay.innerText = `현재 점수: ${score}`;
  }

  function disableButtons() {
    const buttons = answersContainer.getElementsByClassName('answer-btn');
    for (let button of buttons) {
      button.disabled = true;
    }
  }

  function showResults() {
    questionContainer.innerText = '완료!';
    answersContainer.innerHTML = '';
    resultContainer.innerText = `최종 점수는 "${score}점" 입니다!`;
    progressContainer.innerText = '';
    const restartButton = document.createElement('button');
    restartButton.textContent = '재시작';
    restartButton.addEventListener('click', () => {
      quizDiv.style.display = 'none';
      gameSetupDiv.style.display = 'block';
    });
    answersContainer.appendChild(restartButton);
  }

  function updateProgress() {
    progressContainer.innerText = `문제 ${questionIndex + 1}/${
      currentQuestions.length
    }`;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function decodeHTML(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  fetchCategories();

  categorySelect.addEventListener('change', function () {
    var selectedCategory = categorySelect.value;

    if (selectedCategory !== '') {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
    }
  });

  startButton.addEventListener('click', startGame);
});
