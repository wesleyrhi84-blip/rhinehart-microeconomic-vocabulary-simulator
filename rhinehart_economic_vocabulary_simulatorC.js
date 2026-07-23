const vocabulary = [
  { term: 'Economics', definition: 'study of how individuals and societies deal with scarcity; study of choices' },
  { term: 'Scarcity', definition: 'unlimited wants but limited resources' },
  { term: 'Microeconomics', definition: 'study of small economic units such as individuals, firms, and industries' },
  { term: 'Theoretical Economics', definition: 'use scientific method to make generalizations and abstractions to develop theories' },
  { term: 'Policy Economics', definition: 'theories are applied to fix problems or meet economic goals' },
  { term: 'Positive Statements', definition: 'based on facts; avoid value judgments (what is)' },
  { term: 'Normative Statement', definition: 'includes value judgments (what ought to be)' },
  { term: 'Marginal Analysis', definition: 'thinking on the margin; decisions based on the additional benefit vs. the additional costs' },
  { term: 'Trade-offs', definition: 'all the alternatives that we give up whenever we choose one course of action over others' },
  { term: 'Opportunity Cost', definition: 'most desirable alternative given up as a result of a decision' },
  { term: 'Shortage', definition: 'when producers will not or cannot offer goods or services at current prices; it is temporary' },
  { term: 'Price', definition: 'amount buyer pays' },
  { term: 'Cost', definition: 'amount seller pays to produce a good' },
  { term: 'Investment', definition: 'the money spent by businesses to improve their production' },
  { term: 'Goods', definition: 'physical objects that satisfy needs and wants' },
  { term: 'Consumer Goods', definition: 'created for direct consumption (ex. pizza)' },
  { term: 'Capital Goods', definition: 'created for indirect consumption; goods used to make consumer goods (ex. oven, blenders, knives...)' },
  { term: 'Services', definition: 'actions or activities that one person performs for another (ex. teaching, cleaning, cooking)' },
  { term: 'Explicit Costs', definition: 'traditional out-of-pocket costs of decision making' },
  { term: 'Implicit Costs', definition: 'opportunity costs (ex. forgone time and forgone income)' },
  { term: 'Land', definition: 'all natural resources that are used to produce goods and services' },
  { term: 'Labor', definition: 'any effort a person devotes to a task for which that person is paid' },
  { term: 'Physical Capital', definition: 'any human-made resource that is used to create other goods and services' },
  { term: 'Human Capital', definition: 'any skills or knowledge gained by a worker through education and experience' },
  { term: 'Entrepreneurship', definition: 'ambitious leaders that combine the other factors of production to create goods and services' },
  { term: 'Profit', definition: 'Revenue - Costs' },
  { term: 'Production Possibilities Curve (PPC)', definition: 'model that shows alternative ways that an economy can use its scarce resources' },
  { term: 'Constant Opportunity Cost', definition: 'resources are easily adaptable for producing either good; straight line PPC (not common)' },
  { term: 'Law of Increasing Opportunity Cost', definition: 'as you produce more of any good, the opportunity cost will increase; bowed out (concave) PPC' },
  { term: 'PER UNIT Opportunity Cost', definition: 'How much each marginal unit costs = (opportunity cost)/(units gained)' },
  { term: 'Productive Efficiency', definition: 'products are being produced in the least costly way; any point on the PPC' },
  { term: 'Allocative Efficiency', definition: 'products being produced are the ones most desired by society; optimal point on the PPC depends on society needs' },
  { term: 'Absolute Advantage', definition: 'producer that can produce the most output or requires the least amount of inputs' },
  { term: 'Comparative Advantage', definition: 'producer with the lowest opportunity cost' },
  { term: 'Economic System', definition: 'method used by a society to produce and distribute goods and services' },
  { term: 'Centrally-Planned Economy', definition: 'Command Economy or Communism; government owns all resources' },
  { term: 'Free Market Economy', definition: 'Capitalism; laissez faire; individuals own resources' },
  { term: 'Invisible Hand', definition: 'concept that society\'s goals will be met as individuals seek their own self-interest' },
  { term: 'Product Market', definition: 'place where goods and services produced by businesses are sold to households' },
  { term: 'Resource Market', definition: 'factor market; place where resources are sold to businesses' },
  { term: 'Perfect Competitive Labor Market', definition: 'many small firms hiring workers; many workers with identical skills; wage constant' },
  { term: 'Derived Demand', definition: 'demand for resources is determined by the products they help produce' },
  { term: 'Marginal Resource Cost (MRC)', definition: 'additional cost of an additional resource (worker)' },
  { term: 'Marginal Revenue Product (MRP)', definition: 'additional revenue generated by an additional worker (resource)' },
  { term: 'Demand for Labor', definition: 'different quantities of workers that businesses are willing and able to hire at different wages' },
  { term: 'Supply for Labor', definition: 'different quantities of individuals that are willing and able to sell their labor at different wages' },
  { term: 'Demand Curve for Resources', definition: 'MRP = Demand' },
  { term: 'Labor Market Imperfections', definition: 'insufficient or misleading job information, geographical immobility, unions, wage discrimination' },
  { term: 'Glass Ceiling', definition: 'keeps labor down' },
  { term: 'Resource Demand Shifters', definition: 'demand of the product, productivity of the resources, price of related resources' },
  { term: 'Monopsony', definition: 'one firm hiring workers; workers are relatively immobile; firm is wage maker' },
  { term: 'Labor Unions', definition: 'goal is to increase wages and benefits' },
  { term: 'Outsourcing', definition: 'when firms send jobs overseas' },
  { term: 'Globalization', definition: 'result of firms seeking lower costs and greater profits' },
  { term: 'Utility = Satisfaction', definition: 'Utility = Satisfaction' },
  { term: 'Marginal = Additional', definition: 'Marginal = Additional' },
  { term: 'Allocate = Distribute', definition: 'Allocate = Distribute' }
];

const MAX_QUESTIONS = 10;
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const summaryScreen = document.getElementById('summary-screen');
const beginBtn = document.getElementById('begin-btn');
const restartBtn = document.getElementById('restart-btn');
const questionCount = document.getElementById('question-count');
const scoreCount = document.getElementById('score-count');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const feedback = document.getElementById('feedback');
const summaryText = document.getElementById('summary-text');

let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let isWaitingForNext = false;
let quizStarted = false;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shouldUseDefinitionPrompt(item) {
  const termWordCount = item.term.trim().split(/\s+/).length;
  const isLongTerm = termWordCount > 5;
  const isLengthyDefinition = item.definition.length > 90;

  return !isLongTerm && !isLengthyDefinition;
}

function buildQuizQuestions() {
  const pool = shuffle(vocabulary);
  const selected = pool.slice(0, MAX_QUESTIONS);

  return selected.map((item, index) => {
    const distractors = shuffle(vocabulary.filter((entry) => entry.term !== item.term)).slice(0, 4);
    const promptType = shouldUseDefinitionPrompt(item) ? 'definition' : 'term';

    const answerPool = promptType === 'definition'
      ? shuffle([
          item.term,
          ...distractors.map((entry) => entry.term)
        ])
      : shuffle([
          item.definition,
          ...distractors.map((entry) => entry.definition)
        ]);

    return {
      promptType,
      correctAnswer: promptType === 'definition' ? item.term : item.definition,
      promptText: promptType === 'definition' ? item.definition : item.term,
      answerPool,
      questionNumber: index + 1,
      term: item.term,
      definition: item.definition
    };
  });
}

function setScreen(screen) {
  startScreen.classList.add('hidden');
  quizScreen.classList.add('hidden');
  summaryScreen.classList.add('hidden');

  screen.classList.remove('hidden');
}

function resetIntro() {
  startScreen.classList.add('hidden');
  startScreen.style.display = 'none';
}

function updateScore() {
  scoreCount.textContent = `Score: ${correctAnswers} / ${MAX_QUESTIONS}`;
}

function buildPromptText(question) {
  const definitionTemplates = [
    `Which term best fits this idea: "${question.promptText}"?`,
    `Select the vocabulary term that matches this description: "${question.promptText}".`,
    `Which economic term goes with this clue: "${question.promptText}"?`
  ];

  const termTemplates = [
    `Which explanation best describes the term "${question.promptText}"?`,
    `Choose the definition that correctly matches "${question.promptText}".`,
    `Which description fits the vocabulary term "${question.promptText}"?`
  ];

  const templates = question.promptType === 'definition' ? definitionTemplates : termTemplates;
  return templates[Math.floor(Math.random() * templates.length)];
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showSummary();
    return;
  }

  const question = questions[currentQuestionIndex];
  questionCount.textContent = `Question ${question.questionNumber} of ${MAX_QUESTIONS}`;
  updateScore();
  feedback.textContent = '';
  feedback.className = 'feedback';

  questionText.textContent = buildPromptText(question);

  answerOptions.innerHTML = '';
  question.answerPool.forEach((choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-btn';
    button.textContent = choice;
    button.addEventListener('click', () => handleAnswer(button, choice, question));
    answerOptions.appendChild(button);
  });
}

function handleAnswer(button, selectedChoice, question) {
  if (isWaitingForNext) {
    return;
  }

  isWaitingForNext = true;
  const optionButtons = Array.from(answerOptions.querySelectorAll('button'));
  optionButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === question.correctAnswer) {
      btn.style.background = '#dff5e8';
    }
  });

  if (selectedChoice === question.correctAnswer) {
    correctAnswers += 1;
    feedback.textContent = 'Correct!';
    feedback.className = 'feedback correct';
  } else {
    feedback.textContent = `Wrong. The correct answer is: ${question.correctAnswer}`;
    feedback.className = 'feedback wrong';
    button.style.background = '#f8d8d8';
  }

  updateScore();

  window.setTimeout(() => {
    currentQuestionIndex += 1;
    isWaitingForNext = false;
    showQuestion();
  }, 1100);
}

function showSummary() {
  setScreen(summaryScreen);
  const wrongAnswers = MAX_QUESTIONS - correctAnswers;
  summaryText.textContent = `You got ${correctAnswers} correct and ${wrongAnswers} wrong out of ${MAX_QUESTIONS}.`;
}

function startQuiz() {
  if (!quizStarted) {
    quizStarted = true;
    resetIntro();
  }

  questions = buildQuizQuestions();
  currentQuestionIndex = 0;
  correctAnswers = 0;
  isWaitingForNext = false;
  setScreen(quizScreen);
  showQuestion();
}

beginBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
