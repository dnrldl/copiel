document.addEventListener('DOMContentLoaded', () => {
  const questionContainer = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const resultContainer = document.getElementById('result');
  const progressContainer = document.getElementById('progress');
  const currentScoreDisplay = document.getElementById('currentScore');
  const highScoreDisplay = document.getElementById('highScore');
  const gameSetupDiv = document.getElementById('game-setup');
  const quizDiv = document.getElementById('quiz');
  const categorySelect = document.getElementById('category');
  const startButton = document.getElementById('start-btn');

  let currentQuestions = [];
  let score = 0;
  let questionIndex = 0;
  let highScore = parseInt(localStorage.getItem('HighScoreTrivia')) || 0;
  let questionStartTime;

  const baseScorePerQuestion = 1000;
  const penaltyPerSecond = 10;

  startButton.disabled = true;
  highScoreDisplay.innerText = `최고 점수: ${highScore}점`;

  function fetchCategories() {
    const categoryJsonFilePath = '../categories/categories.json';

    fetch(categoryJsonFilePath)
      .then(response => response.json())
      .then(data => {
        data.trivia_categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      });
  }

  function startGame() {
    const category = categorySelect.value;
    fetchQuestions(category);
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
      .then(response => response.json())
      .then(data => {
        currentQuestions = data;
        questionIndex = 0;
        score = 0;
        displayQuestion();
      })
      .catch(error => {
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
      updateHighScore();
      showResults();
      try {
        const res = await fetch('/sendUserScore', {
          method: 'POST',
          body: JSON.stringify({
            score: score,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();

        if (data.errors) {
        }
        if (data.user) {
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  function displayAnswers(question) {
    answersContainer.innerHTML = '';
    const answers = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(answers);

    answers.forEach(answer => {
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
    answers.forEach(answer => {
      if (decodeHTML(answer) === decodeHTML(correctAnswer)) {
        correctButton = [...answersContainer.childNodes].find(
          button => button.innerHTML === decodeHTML(correctAnswer)
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
    resultContainer.innerText = `최종 점수는 ${score}점 입니다!`;
    updateHighScoreDisplay();
    progressContainer.innerText = '';
    const restartButton = document.createElement('button');
    restartButton.textContent = '재시작';
    restartButton.addEventListener('click', () => {
      quizDiv.style.display = 'none';
      gameSetupDiv.style.display = 'block';
    });
    answersContainer.appendChild(restartButton);
  }

  function updateHighScore() {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('HighScoreTrivia', highScore.toString());
      updateHighScoreDisplay();
    }
  }

  function updateHighScoreDisplay() {
    highScoreDisplay.innerText = `최고 점수: ${highScore}`;
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
    // 선택된 난이도 값
    var selectedCategory = categorySelect.value;

    // 난이도가 선택되었는지 확인
    if (selectedCategory !== '') {
      // 선택되었으면 버튼 활성화
      startButton.disabled = false;
    } else {
      // 선택되지 않았으면 버튼 비활성화
      startButton.disabled = true;
    }
  });

  startButton.addEventListener('click', startGame);
});
