const questions = [
  {
    type: "single",
    question: "🌍 What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    type: "fill",
    question: "📊 Fill in the blank: What is the square root of 64?",
    answer: "8"
  },
  {
    type: "multi",
    question: "🌟 Which of the following are planets in our solar system?",
    options: ["Mars", "Moon", "Venus", "Pluto"],
    answer: ["Mars", "Venus"]
  },
  {
    type: "single",
    question: "🎬 Who directed the movie 'Inception'?",
    options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Quentin Tarantino"],
    answer: "Christopher Nolan"
  },
  {
    type: "fill",
    question: "📐 Fill in the blank: The sum of angles in a triangle is ____ degrees.",
    answer: "180"
  },
  {
    type: "multi",
    question: "🎨 Which are primary colors?",
    options: ["Red", "Green", "Blue", "Yellow"],
    answer: ["Red", "Blue", "Yellow"]
  }
];


let currentIndex = 0;
let score = 0;

const welcomeScreen = document.getElementById("welcome-screen");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultMessage = document.getElementById("result-message");

function startQuiz() {
  welcomeScreen.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.disabled = false;

  if (q.type === "single") {
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => selectSingleAnswer(btn, q.answer);
      optionsEl.appendChild(btn);
    });
  } else if (q.type === "multi") {
    q.options.forEach(opt => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = opt;
      label.appendChild(checkbox);
      label.append(" " + opt);
      optionsEl.appendChild(label);
      optionsEl.appendChild(document.createElement("br"));
    });
  } else if (q.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "fill-answer";
    input.placeholder = "Type your answer here...";
    input.style.padding = "10px";
    input.style.fontSize = "1em";
    input.style.marginTop = "10px";
    optionsEl.appendChild(input);
  }
}

function selectSingleAnswer(button, correct) {
  const allButtons = optionsEl.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  if (button.textContent === correct) {
    score++;
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
    allButtons.forEach(btn => {
      if (btn.textContent === correct) btn.classList.add("correct");
    });
  }
}

nextBtn.onclick = () => {
  const q = questions[currentIndex];

  if (q.type === "multi") {
    const selected = Array.from(optionsEl.querySelectorAll("input:checked")).map(cb => cb.value);
    const correct = q.answer.sort().toString();
    const selectedStr = selected.sort().toString();
    if (selectedStr === correct) score++;
  } else if (q.type === "fill") {
    const userAnswer = document.getElementById("fill-answer").value.trim().toLowerCase();
    if (userAnswer === q.answer.toLowerCase()) score++;
  }

  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
};

function showFinalResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  let emoji = "🤔";
  if (score === questions.length) emoji = "🏆";
  else if (score >= questions.length * 0.7) emoji = "🎉";
  else if (score >= questions.length * 0.4) emoji = "👍";
  else emoji = "😅";

  resultMessage.textContent = `${emoji} You scored ${score} out of ${questions.length}!`;

  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultBox.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");
}
