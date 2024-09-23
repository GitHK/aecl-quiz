// script.js

// Pools of questions
const pools = {
    pool1: [
        { question: "What is 2 + 2?", choices: ["3", "4", "5"], correct: 1 },
        { question: "What is the capital of France?", choices: ["Berlin", "Paris", "Rome"], correct: 1 },
        { question: "What is the color of the sky?", choices: ["Blue", "Green", "Red"], correct: 0 }
    ],
    pool2: [
        { question: "What is 3 * 3?", choices: ["6", "9", "12"], correct: 1 },
        { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter"], correct: 1 },
        { question: "How many continents are there?", choices: ["5", "6", "7"], correct: 2 }
    ]
};

// Configuration
const totalQuestions = 10;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// DOM Elements
const menuScreen = document.getElementById('menu');
const quizScreen = document.getElementById('quiz');
const resultScreen = document.getElementById('result');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextQuestionButton = document.getElementById('nextQuestion');
const scoreEl = document.getElementById('score');

// Start Quiz
document.getElementById('startQuiz').addEventListener('click', () => {
    startQuiz();
});

document.getElementById('restartQuiz').addEventListener('click', () => {
    resetQuiz();
});

// Start Quiz Function
function startQuiz() {
    // Reset variables
    score = 0;
    currentQuestionIndex = 0;
    
    // Pick random questions from pools
    questions = generateRandomQuestionsFromPools(pools, totalQuestions);

    // Hide menu and show quiz screen
    menuScreen.style.display = 'none';
    quizScreen.style.display = 'block';

    // Display the first question
    displayQuestion();
}

// Display a question
function displayQuestion() {
    // Get the current question
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update the question text
    questionEl.textContent = currentQuestion.question;
    
    // Clear previous choices
    choicesEl.innerHTML = '';

    // Create choices buttons
    currentQuestion.choices.forEach((choice, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.textContent = choice;
        choiceBtn.addEventListener('click', () => checkAnswer(index));
        choicesEl.appendChild(choiceBtn);
    });

    // Hide the next question button
    nextQuestionButton.style.display = 'none';
}

// Check if the chosen answer is correct
function checkAnswer(choiceIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Check if the answer is correct
    if (choiceIndex === currentQuestion.correct) {
        score++;
    }

    // Show the next question button
    nextQuestionButton.style.display = 'block';
}

// Move to the next question
nextQuestionButton.addEventListener('click', () => {
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < totalQuestions) {
        displayQuestion();
    } else {
        // End quiz and show results
        showResult();
    }
});

// Generate random questions from pools
function generateRandomQuestionsFromPools(pools, totalQuestions) {
    const allQuestions = [];

    // Flatten all pool questions into a single array
    Object.values(pools).forEach(pool => {
        allQuestions.push(...pool);
    });

    // Shuffle and pick the number of required questions
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
    
    return shuffledQuestions.slice(0, totalQuestions);
}

// Show the final result
function showResult() {
    // Hide quiz and show result
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';

    // Display score
    scoreEl.textContent = `You scored ${score} out of ${totalQuestions}`;
}

// Reset Quiz
function resetQuiz() {
    // Hide result and show menu
    resultScreen.style.display = 'none';
    menuScreen.style.display = 'block';
}
