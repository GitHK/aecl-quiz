let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Load the questions from the JSON file
fetch('topics/geography.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        startQuiz();
    });

// Initialize the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Show a random question from the list
function showQuestion() {
    // Randomize the question
    let randomIndex = Math.floor(Math.random() * questions.length);
    let currentQuestion = questions[randomIndex];

    // Show the question
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerText = currentQuestion.question;

    // Show options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach(option => {
        let optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.classList.add('option-button');
        optionButton.onclick = () => checkAnswer(option, currentQuestion.answer);
        optionsContainer.appendChild(optionButton);
    });
}

// Check if the selected answer is correct
function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        alert('Correct!');
    } else {
        alert(`Incorrect! The correct answer was: ${correct}`);
    }

    // Save the score to local storage
    localStorage.setItem('quizScore', score);

    // Load the next question
    showQuestion();
}

// Add an event listener to the Next button
document.getElementById('next-button').addEventListener('click', showQuestion);

// Display the final score from local storage
const scoreContainer = document.getElementById('score-container');
const savedScore = localStorage.getItem('quizScore');
if (savedScore) {
    scoreContainer.innerText = `Previous Score: ${savedScore}`;
}
