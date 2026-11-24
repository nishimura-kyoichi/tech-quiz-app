const quizData = [
  {
    question: "AIの学習データに現実の偏見が含まれることで、差別的な出力をしてしまう問題を何と呼ぶ？",
    choices: ["アルゴリズム・バイアス", "ムーアの法則", "シンギュラリティ"],
    answer: 0
  },
  {
    question: "研究設計に生物学的・社会的性差の視点を組み込み、新たな発見を目指す取り組みは？",
    choices: ["マチルダ効果", "ジェンダード・イノベーション", "デジタル・デバイド"],
    answer: 1
  },
  {
    question: "2007年に登場し、携帯電話からスマートフォンへの急速な移行のきっかけとなった端末は？",
    choices: ["iMode", "iPhone", "Walkman"],
    answer: 1
  }
];

let currentIndex = 0;
let score = 0;

const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const commentText = document.getElementById("comment-text");
const restartBtn = document.getElementById("restart-btn");

function loadQuiz() {
  const current = quizData[currentIndex];
  progressEl.textContent = `第 ${currentIndex + 1} 問 / 全 ${quizData.length} 問`;
  questionEl.textContent = current.question;
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");

  current.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.classList.add("choice-btn");
    button.addEventListener("click", () => selectAnswer(index, button));
    choicesEl.appendChild(button);
  });
}

function selectAnswer(selectedIndex, selectedBtn) {
  const current = quizData[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === current.answer) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === current.answer) {
    score++;
    feedbackEl.textContent = "正解！素晴らしいです！";
    feedbackEl.style.color = "#2f855a";
  } else {
    selectedBtn.classList.add("wrong");
    feedbackEl.textContent = "残念！正解は緑色の選択肢です。";
    feedbackEl.style.color = "#c53030";
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.textContent = `${quizData.length} 問中 ${score} 問正解！`;

  if (score === quizData.length) {
    commentText.textContent = "全問正解！テクノロジーと社会の知識がバッチリ身についています！";
  } else {
    commentText.textContent = "お疲れさまでした！もう一度挑戦して全問正解を目指しましょう。";
  }
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuiz();
});

loadQuiz();