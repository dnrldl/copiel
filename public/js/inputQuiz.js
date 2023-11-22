document.addEventListener('DOMContentLoaded', () => {
  const questionContainer = document.getElementById('question'),
    answersContainer = document.getElementById('answers'),
    resultContainer = document.getElementById('result'),
    progressContainer = document.getElementById('progress'),
    currentScoreDisplay = document.getElementById('currentScore'),
    highScoreDisplay = document.getElementById('highScore'),
    gameSetupDiv = document.getElementById('game-setup'),
    quizDiv = document.getElementById('quiz'),
    categorySelect = document.getElementById('category'),
    startButton = document.getElementById('start-btn'),
    hintButton = document.getElementById('hint-btn');

  let currentQuestions = [];
  let score = 0;
  let hint = '';
  let questionIndex = 0;
  let questionStartTime;
  let useHint = false;
  let isHintPushed = false;
  let selectedCategory;
  // let highScore = parseInt(localStorage.getItem('HighScoreTrivia')) || 0;

  const gameType = 'input';
  const baseScorePerQuestion = 1000,
    penaltyPerSecond = 10,
    penaltyHint = 100;

  startButton.disabled = true;

  // highScoreDisplay.innerText = `최고 점수: ${highScore}`;

  function fetchCategories() {
    const categoryJsonFilePath = '../categories/categories.json';

    fetch(categoryJsonFilePath)
      .then(response => response.json())
      .then(data => {
        data.categories.forEach(category => {
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
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      selectedCategory = gameType + 'score' + category;
      if (data.user[selectedCategory] == 0) highScoreDisplay.innerText == '';
      else
        highScoreDisplay.innerText = `나의 최고 점수: ${data.user[selectedCategory]} 점`;
    } catch (err) {
      console.log(err);
    }

    gameSetupDiv.style.display = 'none';
    quizDiv.style.display = 'block';
    hintButton.style.display = 'block';
  }

  function fetchQuestions(category) {
    if (category == '1') currentQuestions = inputStage1;
    if (category == '2') currentQuestions = inputStage2;
    if (category == '3') currentQuestions = inputStage3;
    if (category == '4') currentQuestions = inputStage4;
    if (category == '5') currentQuestions = inputStage5;
    if (category == '6') currentQuestions = inputStage6;

    questionIndex = 0;
    score = 0;

    hintButton.addEventListener('click', () => {
      useHint = true;
      displayHints();
      score = penaltyForHint(score);
    });
    displayQuestion();
  }

  async function displayQuestion() {
    if (questionIndex < currentQuestions.length) {
      useHint = false;
      let currentQuestion = currentQuestions[questionIndex];
      questionContainer.innerHTML = decodeHTML(currentQuestion.question);
      if (questionIndex === 0) displayAnswers(currentQuestion);
      updateProgress();
      questionStartTime = Date.now();
    } else {
      // updateHighScore();
      let user;
      try {
        const res = await fetch('/sendUserScore', {
          method: 'POST',
          body: JSON.stringify({
            score: score,
            category: categorySelect.value,
            gameType: gameType,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        user = data;
      } catch (err) {
        console.log(err);
      }
      if (score > user.user[selectedCategory])
        highScoreDisplay.innerHTML = `나의 최고 점수: ${score}점`;
      else
        highScoreDisplay.innerHTML = `나의 최고 점수: ${user.user[selectedCategory]}점`;
      showResults(categorySelect.value);
    }
  }

  function displayHints(hint) {
    let currentQuestion = currentQuestions[questionIndex];
    hint = currentQuestion.hint;
    if (!isHintPushed) {
      isHintPushed = true;
      var hint = hint;
      hintButton.innerHTML = decodeHTML(hint);
      return;
    } else {
      isHintPushed = false;
      hintButton.innerHTML = '?';
    }
  }

  function displayAnswers(question) {
    answersContainer.innerHTML = '';
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = 'inputText';
    inputText.placeholder = '정답을 입력하세요';
    inputText.autocomplete = 'off';

    const submit = document.createElement('button');
    submit.innerText = '확인';
    submit.id = 'submit';

    inputText.addEventListener('keydown', event => {
      if (event.key === 'Enter') submitEnter(event);
    });

    submit.addEventListener('click', () => submitEnter());

    answersContainer.appendChild(inputText);
    answersContainer.appendChild(submit);
  }

  function submitEnter(event) {
    if (event) event.preventDefault();
    let result = null;
    if (inputText.value === currentQuestions[questionIndex].correct_answer) {
      result = 'correct';
      inputAnswer(result, currentQuestions[questionIndex].correct_answer);
    } else {
      if (event === undefined || event.key === 'Enter') {
        if (inputText.value.trim() == '') {
          alert('공백은 사용할 수 없습니다.');
          inputText.value = '';
        } else {
          var pattern = /\s/g; // /[\s]/g;
          if (inputText.value.match(pattern)) {
            alert('공백은 사용할 수 없습니다.');
            inputText.value = '';
          } else {
            result = 'incorrect';
            inputAnswer(result, currentQuestions[questionIndex].correct_answer);
          }
        }
      }
    }
  }

  function inputAnswer(result, correctAnswer) {
    submit.disabled = true;
    hintButton.disabled = true;
    inputText.disabled = true;
    inputText.value = '';
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    let scoreForThisQuestion = Math.max(
      baseScorePerQuestion - Math.floor(timeTaken) * penaltyPerSecond,
      0
    );
    if (result === 'correct') {
      if (useHint) {
        scoreForThisQuestion = penaltyForHint(scoreForThisQuestion);
      }
      score += scoreForThisQuestion;
      resultContainer.innerText = `정답입니다!! + ${scoreForThisQuestion} 점`;
    } else {
      resultContainer.innerHTML = `오답! 정답은: &nbsp;&nbsp; <b>${decodeHTML(
        correctAnswer
      )}</b> &nbsp;&nbsp;이었어요`;
    }

    updateCurrentScore();
    setTimeout(() => {
      questionIndex++;
      displayQuestion();
      resultContainer.innerText = '';
      hintButton.innerHTML = '?';
      hintButton.disabled = false;
      isHintPushed = false;
      submit.disabled = false;
      inputText.disabled = false;
    }, 1750);
  }

  function updateCurrentScore() {
    currentScoreDisplay.innerText = `현재 점수: ${score}점`;
  }

  function showResults(categorySelect) {
    questionContainer.innerHTML = `<b>스테이지 ${categorySelect}</b> 클리어!`;
    answersContainer.innerHTML = '';
    resultContainer.innerText = `최종 점수는 "${score}점" 입니다!`;
    progressContainer.innerText = '';
    const restartButton = document.createElement('button');
    restartButton.textContent = '재시작';
    restartButton.addEventListener('click', () => {
      quizDiv.style.display = 'none';
      gameSetupDiv.style.display = 'block';
      hintButton.style.display = 'none';
      resultContainer.innerHTML = '';
    });
    answersContainer.appendChild(restartButton);
    hintButton.style.display = 'none';
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
    progressContainer.innerText = `STAGE ${categorySelect.value} 문제 ${
      questionIndex + 1
    }/${currentQuestions.length}`;
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

  function penaltyForHint(score) {
    if (score < 100) {
      return 0;
    } else return (score -= penaltyHint);
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
