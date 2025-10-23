// Quiz Application State
let quizData = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval = null;
let timeRemaining = 0;
let quizStarted = false;

// DOM Elements
const loadingOverlay = document.getElementById('loading');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const timerElement = document.getElementById('timer');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progressBar = document.getElementById('progress');
const currentQuestionNumber = document.getElementById('current-question-number');
const totalQuestionsElement = document.getElementById('total-questions');
const quizTitle = document.getElementById('quiz-title');
const restartBtn = document.getElementById('restart-btn');

// Initialize the application
async function init() {
    try {
        showLoading();
        await loadQuizData();
        initializeQuiz();
        hideLoading();
        startTimer();
    } catch (error) {
        console.error('Error initializing quiz:', error);
        alert('Σφάλμα φόρτωσης του quiz. Παρακαλώ ανανεώστε τη σελίδα.');
    }
}

// Load quiz data from JSON file
async function loadQuizData() {
    try {
        const response = await fetch('data/quiz_data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
        }
        quizData = await response.json();

        // Shuffle ALL questions first
        const allQuestions = shuffleArray(quizData.questions);

        // Select only the number of questions specified in total_questions
        quizData.questions = allQuestions.slice(0, quizData.total_questions);

        // Shuffle options for each selected question
        quizData.questions.forEach(question => {
            const correctAnswer = question.options[question.correct_answer_index];
            question.options = shuffleArray(question.options);
            question.correct_answer_index = question.options.indexOf(correctAnswer);
        });

        return quizData;
    } catch (error) {
        console.error('Error loading quiz data:', error);
        throw error;
    }
}

// Initialize quiz state
function initializeQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(quizData.questions.length).fill(null);
    timeRemaining = quizData.time_limit_seconds;
    quizStarted = true;

    // Set quiz title
    quizTitle.textContent = quizData.quiz_title;
    totalQuestionsElement.textContent = quizData.total_questions;

    // Display first question
    displayQuestion();
    updateNavigationButtons();
    updateProgressBar();
}

// Display current question
function displayQuestion() {
    const question = quizData.questions[currentQuestionIndex];

    // Update question text
    questionText.textContent = question.question;
    currentQuestionNumber.textContent = currentQuestionIndex + 1;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.dataset.index = index;

        // Check if this option was previously selected
        if (userAnswers[currentQuestionIndex] === index) {
            button.classList.add('selected');
        }

        // Add click event listener
        button.addEventListener('click', () => selectOption(index));

        optionsContainer.appendChild(button);
    });
}

// Handle option selection
function selectOption(optionIndex) {
    const question = quizData.questions[currentQuestionIndex];

    // Save user's answer
    userAnswers[currentQuestionIndex] = optionIndex;

    // Update UI to show selection
    const optionButtons = optionsContainer.querySelectorAll('.option-btn');
    optionButtons.forEach((btn, index) => {
        if (index === optionIndex) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });

    updateProgressBar();
}

// Start the countdown timer
function startTimer() {
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        // Check if time has expired
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }

        // Add warning class when 5 minutes or less remain
        if (timeRemaining <= 300) {
            timerElement.classList.add('warning');
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update progress bar
function updateProgressBar() {
    const answeredQuestions = userAnswers.filter(answer => answer !== null).length;
    const progress = (answeredQuestions / quizData.total_questions) * 100;
    progressBar.style.width = `${progress}%`;
}

// Update navigation buttons
function updateNavigationButtons() {
    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;

    // Next/Submit button logic
    const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

    if (isLastQuestion) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// Navigation: Previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateNavigationButtons();

        // If previous question was answered, show the feedback
        if (userAnswers[currentQuestionIndex] !== null) {
            showPreviousAnswerFeedback();
        }
    }
}

// Show feedback for previously answered questions (in view-only mode)
function showPreviousAnswerFeedback() {
    const question = quizData.questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    const correctAnswerIndex = question.correct_answer_index;

    const optionButtons = optionsContainer.querySelectorAll('.option-btn');

    // Disable all buttons for previously answered questions
    optionButtons.forEach(btn => btn.disabled = true);

    optionButtons.forEach((btn, index) => {
        if (index === correctAnswerIndex) {
            // Show correct answer in green
            btn.classList.remove('selected');
            btn.classList.add('correct');
        } else if (index === userAnswer && userAnswer !== correctAnswerIndex) {
            // Show user's incorrect answer in red
            btn.classList.remove('selected');
            btn.classList.add('incorrect');
        }
    });
}

// Navigation: Next question
function nextQuestion() {
    // Show correct/incorrect feedback before moving to next question
    if (userAnswers[currentQuestionIndex] !== null) {
        showAnswerFeedback();

        // Wait 1 second before moving to next question
        setTimeout(() => {
            if (currentQuestionIndex < quizData.questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
                updateNavigationButtons();
            }
        }, 1000);
    } else {
        // If no answer selected, just move to next question
        if (currentQuestionIndex < quizData.questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
            updateNavigationButtons();
        }
    }
}

// Show answer feedback (correct in green, incorrect in red)
function showAnswerFeedback() {
    const question = quizData.questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    const correctAnswerIndex = question.correct_answer_index;

    const optionButtons = optionsContainer.querySelectorAll('.option-btn');

    // Disable all buttons during feedback
    optionButtons.forEach(btn => btn.disabled = true);

    optionButtons.forEach((btn, index) => {
        if (index === correctAnswerIndex) {
            // Always show correct answer in green
            btn.classList.remove('selected');
            btn.classList.add('correct');
        } else if (index === userAnswer && userAnswer !== correctAnswerIndex) {
            // Show user's incorrect answer in red
            btn.classList.remove('selected');
            btn.classList.add('incorrect');
        }
    });
}

// End quiz and show results
function endQuiz() {
    clearInterval(timerInterval);
    quizStarted = false;

    // Calculate score
    let correctAnswers = 0;
    const results = quizData.questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct_answer_index;

        if (isCorrect) {
            correctAnswers++;
        }

        return {
            question: question.question,
            userAnswer: userAnswer !== null ? question.options[userAnswer] : 'Δεν απαντήθηκε',
            correctAnswer: question.options[question.correct_answer_index],
            isCorrect: isCorrect,
            wasAnswered: userAnswer !== null
        };
    });

    const passed = correctAnswers >= quizData.passing_score;
    const percentage = ((correctAnswers / quizData.total_questions) * 100).toFixed(1);

    // Hide quiz container, show results
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    // Display results summary
    const resultsSummary = document.getElementById('results-summary');
    const passFailClass = passed ? 'pass' : 'fail';
    const passFailText = passed ? '✓ Επιτυχία!' : '✗ Αποτυχία';

    resultsSummary.className = `results-summary ${passFailClass}`;
    resultsSummary.innerHTML = `
        <div style="font-size: 1.5rem; margin-bottom: 10px;">${passFailText}</div>
        <div>Σωστές απαντήσεις: ${correctAnswers} / ${quizData.total_questions}</div>
        <div>Ποσοστό επιτυχίας: ${percentage}%</div>
        <div style="margin-top: 10px; font-size: 1rem;">Απαιτούμενες σωστές απαντήσεις: ${quizData.passing_score}</div>
    `;

    // Display detailed results
    const resultsDetails = document.getElementById('results-details');
    resultsDetails.innerHTML = results.map((result, index) => {
        const itemClass = result.isCorrect ? 'correct' : 'incorrect';
        const statusIcon = result.isCorrect ? '✓' : '✗';

        return `
            <div class="result-item ${itemClass}">
                <div class="result-question">
                    ${statusIcon} Ερώτηση ${index + 1}: ${result.question}
                </div>
                <div class="result-answer user-answer">
                    <strong>Η απάντησή σας:</strong> ${result.userAnswer}
                </div>
                ${!result.isCorrect ? `
                    <div class="result-answer correct-answer">
                        <strong>Σωστή απάντηση:</strong> ${result.correctAnswer}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Restart quiz
function restartQuiz() {
    resultsContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    timerElement.classList.remove('warning');

    // Reload and reinitialize
    init();
}

// Utility: Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Show loading overlay
function showLoading() {
    loadingOverlay.classList.remove('hidden');
}

// Hide loading overlay
function hideLoading() {
    loadingOverlay.classList.add('hidden');
}

// Event Listeners
prevBtn.addEventListener('click', previousQuestion);
nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', () => {
    const unanswered = userAnswers.filter(answer => answer === null).length;

    if (unanswered > 0) {
        const confirmSubmit = confirm(
            `Έχετε ${unanswered} αναπάντητες ερωτήσεις. Θέλετε να υποβάλετε τις απαντήσεις σας;`
        );
        if (!confirmSubmit) return;
    }

    endQuiz();
});
restartBtn.addEventListener('click', restartQuiz);

// Prevent accidental page refresh during quiz
window.addEventListener('beforeunload', (event) => {
    if (quizStarted) {
        event.preventDefault();
        event.returnValue = '';
    }
});

// Start the application
init();
