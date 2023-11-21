document.addEventListener('DOMContentLoaded', () => {
  const questionContainer = document.getElementById('question');
  const hintContainer = document.getElementById('hint');
  const answersContainer = document.getElementById('answers');
  const resultContainer = document.getElementById('result');
  const progressContainer = document.getElementById('progress');
  const currentScoreDisplay = document.getElementById('currentScore');
  const gameSetupDiv = document.getElementById('game-setup');
  const quizDiv = document.getElementById('quiz');
  const categorySelect = document.getElementById('category');
  const startButton = document.getElementById('start-btn');
  const hintButton = document.getElementById('hint-btn');
  const highScoreDisplay = document.getElementById('highScore');

  let currentQuestions = [];
  let score = 0;
  let hint = '';
  let questionIndex = 0;
  let questionStartTime;
  let useHint = false;
  let selectedCategory;

  const baseScorePerQuestion = 1000;
  const penaltyPerSecond = 10;
  const penaltyHint = 100;

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
      selectedCategory = 'score' + category;
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
      useHint = false;
      let currentQuestion = currentQuestions[questionIndex];
      hint = currentQuestion.hint;
      hintButton.addEventListener('click', () => {
        useHint = true;
        displayHints(hint);
        score = penaltyForHint(score);
      });
      questionContainer.innerHTML = decodeHTML(currentQuestion.question);
      displayAnswers(currentQuestion);
      updateProgress();
      questionStartTime = Date.now();
    } else {
      let user;
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
    hintContainer.innerHTML = '';
    var hint = hint;

    const string = document.createElement('div');
    string.innerHTML = decodeHTML(hint);
    string.className = 'hint-str';
    hintContainer.appendChild(string);
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
      if (useHint) {
        scoreForThisQuestion = penaltyForHint(scoreForThisQuestion);
      }
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
      hintButton.disabled = false;
    }, 1750);
  }

  function updateCurrentScore() {
    currentScoreDisplay.innerText = `현재 점수: ${score}점`;
  }

  function disableButtons() {
    const buttons = answersContainer.getElementsByClassName('answer-btn');
    for (let button of buttons) {
      button.disabled = true;
    }
    hintButton.disabled = true;
  }

  function showResults(categorySelect) {
    questionContainer.innerHTML = `<b>스테이지 ${categorySelect}</b> 클리어!`;
    answersContainer.innerHTML = '';
    resultContainer.innerText = `최종 점수는 "${score}점" 입니다!`;
    progressContainer.innerText = '';
    hintContainer.innerHTML = '';
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

  function updateProgress() {
    progressContainer.innerText = `문제 ${questionIndex + 1}/${
      currentQuestions.length
    }`;
    hintContainer.innerHTML = '';
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
    if (score < 100) return 0;
    else return (score -= penaltyHint);
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
