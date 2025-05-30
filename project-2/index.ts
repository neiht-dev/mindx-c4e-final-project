const questions = [
  {
    question: "HTML là viết tắt của từ gì?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Markdown Language"],
    answer: 0
  },
  {
    question: "Thẻ nào dùng để chèn hình ảnh vào trang web?",
    options: ["<img>", "<image>", "<src>", "<picture>"],
    answer: 0
  },
  {
    question: "CSS viết tắt của từ gì?",
    options: ["Creative Style Sheet", "Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
    answer: 1
  },
  {
    question: "Thẻ nào dùng để tạo liên kết trong HTML?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: 0
  },
  {
    question: "Thuộc tính nào dùng để đổi màu chữ trong CSS?",
    options: ["font-color", "text-color", "color", "font-style"],
    answer: 2
  },
  {
    question: "Cách viết comment trong HTML là gì?",
    options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
    answer: 3
  },
  {
    question: "Trong JavaScript, kiểu dữ liệu nào sau đây là kiểu số?",
    options: ["'42'", "true", "42", "null"],
    answer: 2
  },
  {
    question: "Hàm nào dùng để in ra console trong JavaScript?",
    options: ["print()", "log()", "console.log()", "echo()"],
    answer: 2
  },
  {
    question: "Câu lệnh nào dùng để khai báo biến trong JavaScript?",
    options: ["int", "var", "define", "value"],
    answer: 1
  },
  {
    question: "Sự kiện nào xảy ra khi người dùng nhấp chuột vào phần tử?",
    options: ["onhover", "onload", "onclick", "onchange"],
    answer: 2
  }
];

let currentIndex = 0
let score = 0;
let isAnswered = false;

const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const question = document.getElementById("question");

const scoreDisplay = document.getElementById("score-display") as HTMLDivElement;
const questionNumber = document.getElementById("question-number") as HTMLDivElement;

const answer1 = document.getElementById("answer-1") as HTMLButtonElement;
const answer2 = document.getElementById("answer-2") as HTMLButtonElement;
const answer3 = document.getElementById("answer-3") as HTMLButtonElement;
const answer4 = document.getElementById("answer-4") as HTMLButtonElement;

const yourScore = document.getElementById("your-score") as HTMLSpanElement;
const totalScore = document.getElementById("total-score") as HTMLSpanElement;

const nextButton = document.getElementById("next-button") as HTMLButtonElement;
const restartButton = document.getElementById("restart-button") as HTMLButtonElement;


function renderQuestion(){
  questionNumber!.textContent = `Câu hỏi ${currentIndex + 1} / ${questions.length}`;
  question!.textContent = questions[currentIndex].question;
  let answerArray = [answer1, answer2, answer3, answer4];
  answerArray.forEach((answer, index) => {
    answer!.textContent = questions[currentIndex].options[index];
    answer?.classList.remove("bg-red-100", "border-red-500", "bg-green-100", "border-green-500");
    answer!.onclick = () => selectAnswer(index);
  });

  nextButton.classList.remove("bg-red-600");
  nextButton.classList.add("bg-gray-400");
  nextButton.disabled = true;

  isAnswered = false;
}

function selectAnswer(selectedIndex: number) {
  if (isAnswered) return;

  let currentQuestion = questions[currentIndex];
  let selectedAnswer = document.getElementById(`answer-${selectedIndex + 1}`) as HTMLButtonElement;
  let correctAnswer = document.getElementById(`answer-${currentQuestion.answer + 1}`) as HTMLButtonElement;

  if (selectedIndex === currentQuestion.answer) {
    score++;
    correctAnswer.classList.add("bg-green-100", "border-green-500");
    scoreDisplay!.textContent = `Điểm ${score}/${questions.length}`;
  } else {
    selectedAnswer.classList.add("bg-red-100", "border-red-500");
    correctAnswer.classList.add("bg-green-100", "border-green-500");
  }
  isAnswered = true;
  nextButton.classList.add("bg-red-600");
  nextButton.classList.remove("bg-gray-400");
  nextButton.disabled = false;
}


function renderResult(){
  yourScore!.textContent = score.toString();
  totalScore!.textContent = questions.length.toString();
  result!.classList.remove("hidden");
  quiz!.classList.add("hidden");
  isAnswered = false;
}

function nextQuestion() {
  if (!isAnswered) return;
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    renderResult();
  }
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  isAnswered = false;
  scoreDisplay!.textContent = `Điểm ${score}/${questions.length}`;
  result!.classList.add("hidden");
  renderQuestion();
  quiz?.classList.remove("hidden");
}


// Init Quiz
renderQuestion();
scoreDisplay!.textContent = `Điểm ${score}/${questions.length}`;
quiz?.classList.remove("hidden");

// Add function to Next Button and Restart Button
nextButton.onclick = nextQuestion;
restartButton.onclick = restartQuiz;
