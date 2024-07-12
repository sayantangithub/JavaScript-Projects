const quesJSON = [
  {
    correctAnswer: "Three",
    options: ["Two", "Three", "Four", "Five"],
    question: "How many pieces of bun are in a Mcdonald's Big Mac?",
  },
  {
    correctAnswer: "L. Frank Baum",
    options: [
      "Suzane Collins",
      "James Fenimore Cooper",
      "L. Frank Baum",
      "Donna Leon",
    ],
    question: "Which author wrote 'The Wonderful Wizard of Oz'?",
  },
  {
    correctAnswer: "Atlanata United",
    options: [
      "Atlanata United",
      "Atlanta Impact",
      "Atlanta Bulls",
      "Atlanta Stars",
    ],
    question: "Which of these is a soccar team based in Atlanta?",
  },
  {
    correctAnswer: "A Nanny",
    options: ["A Sow", "A Lioness", "A Hen", "A Nanny"],
    question: "A female goat is known as what?",
  },
  {
    correctAnswer: "P. L. Travers",
    options: [
      "J. R. R. Tolkein",
      "P. L. Travers",
      "Lewis Carroll",
      "Enid Blyton",
    ],
    question: "Which author wrote 'Mary Poppins'?",
  },
];

let score = 0;
let currentQuestion = 0;
const totalScore = quesJSON.length;

//Accessing All the e elements
const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const nextEl = document.getElementById("next");

showQuestion();

nextEl.addEventListener("click", () => {
  nextQuestion();
  scoreEl.textContent = `Score: ${score}/${totalScore}`;
});

function showQuestion() {
  //Destructuring the object
  const { correctAnswer, options, question } = quesJSON[currentQuestion];

  // Setting up the text Content
  questionEl.textContent = question;

  const shuffledOption = shuffleOptions(options);

  shuffledOption.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    optionEl.appendChild(button);

    button.addEventListener("click", () => {
      if (option === correctAnswer) {
        score++;
      } else {
        score -= 0.25;
      }

      scoreEl.textContent = `Score: ${score}/${totalScore}`;
      nextQuestion();
    });
  });
}

function nextQuestion() {
  currentQuestion++;
  optionEl.textContent = "";
  if (currentQuestion >= quesJSON.length) {
    questionEl.textContent = "Quiz Completed";
    nextEl.remove();
  } else {
    showQuestion();
  }
}

//Shuffle the options

function shuffleOptions(options) {
  for (let i = options.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}
// shuffleOptions([1, 2, 3, 4, 5]);
