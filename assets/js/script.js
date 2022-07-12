var container = document.querySelector(".container");
var switchEl = document.querySelector('.hidden-box');
var start = document.querySelector('.start');
var quiz = document.querySelector('.quiz');
var answer = document.querySelector('.choice');
var results = document.querySelector('.results');
var highScore = document.querySelector('.high-score');
var initialsInput = document.querySelector('#initials');
var timerEl = document.getElementById('countdown');
var displayedQuestion = document.getElementById('displayed-question');
var choiceOne = document.getElementById('1');
var choiceTwo = document.getElementById('2');
var choiceThree = document.getElementById('3');
var choiceFour = document.getElementById('4');
var msg = document.getElementById('msg');
var highScoreEl = document.getElementById('high-score-el');
var submitBtn = document.getElementById('submit');
var highScoreList = document.getElementById('high-score-list');
var reset = document.getElementById('reset');
var clearScores = document.getElementById('clear');
var link = document.getElementById('link');

// How many seconds remain in timer
var timeLeft = 75; 

// Object that stores the questions, choices, and the answers
var questions = [
    { 
        question: "Commonly used data types do NOT Include:",
        choiceA: "1. Strings",
        choiceB: "2. Alerts",
        choiceC: "3. Boolean",
        choiceD: "4. Numbers",
        correct: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed with _________.",
        choiceA: "1. Quotes",
        choiceB: "2. Curly Brackets",
        choiceC: "3. Parentesis",
        choiceD: "4. Square Brackets",
        correct: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store ___________.",
        choiceA: "1. Numbers and Strings",
        choiceB: "2. Other Arrays",
        choiceC: "3. Booleans",
        choiceD: "4. All of the Above",
        correct: "4"
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        choiceA: "1. Commas",
        choiceB: "2. Curly Brackets",
        choiceC: "3. Quotes",
        choiceD: "4 Parenthesis",
        correct: "3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choiceA: "1. JavaScript",
        choiceB: "2. Terminal / Bash",
        choiceC: "3. For Loops",
        choiceD: "4 Console.log",
        correct: "4"
    }
];
var questionsLength = questions.length;
var currentQuestion = 0;
var currentScore = 0;

// Holds previous scores
var list = [];

// View highscores link
link.addEventListener("click", function(){
    start.style.display = "none";
    highScore.style.display = "block";
    getHighScores();
})

// Timer that counts down from 75
function countdown() {
    var timeInterval = setInterval(function () {
       if(timeLeft > 0 && currentQuestion<questionsLength) {
        timerEl.textContent = 'Time: ' + timeLeft;
        timeLeft--;
        } else {
            currentScore = timeLeft;
            if(currentScore < 0) currentScore = 0; //Stops currentScore from being a negative value
            timerEl.textContent = 'Time: ' + currentScore;
            clearInterval(timeInterval);
            showResults();
        }
    }, 1000);
};

// Starts the quiz and timer
container.addEventListener("click", function(event){
    var element = event.target;
    if (element.matches("#start-btn")) {
        countdown();
        displayQuestion();
    }
});
    
// Displays the current question and the choices to that qustion
function displayQuestion() {
    if(currentQuestion < questionsLength){
        displayedQuestion.innerHTML = "<h1>" + questions[currentQuestion].question + "</h1>"
        choiceOne.innerHTML =  questions[currentQuestion].choiceA;
        choiceTwo.innerHTML =  questions[currentQuestion].choiceB;
        choiceThree.innerHTML =  questions[currentQuestion].choiceC;
        choiceFour.innerHTML =  questions[currentQuestion].choiceD;
    }

    start.style.display = "none";
    quiz.style.display = "block";

    if(currentQuestion == questionsLength){
        showResults();
    }
};

// Checks to see if answer is correct as long as there is still time left 
// and updates the timer if answer is wrong. Then it 
// updates the current questions
function checkAnswer(answer) {
    if(timeLeft>0) {
        if (answer != questions[currentQuestion].correct){
            msg.textContent="Wrong!";
            timeLeft = timeLeft - 10;
        } else {
            msg.textContent="Correct!";
        }
    }
    currentQuestion++;
    displayQuestion();
};

// Shows the results and final score
function showResults(){
    quiz.style.display = "none";
    results.style.display = "block";
    highScoreEl.textContent= "Your final score is " + currentScore + ".";
};

// Puts initials and score into local storage
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // Checks to see if the input is blank otherwise creates object submitScores
    if(initialsInput.value.trim() === ""){
        return;
    } else {
        var submitScores = {
            initialsInput: initialsInput.value,
            score: currentScore
        };
    }
    localStorage.setItem("submitScores", JSON.stringify(submitScores));
    results.style.display = "none";
    highScore.style.display = "block";
    getHighScores();
});

// Gets highscores from local storage
function getHighScores(){
    var previousScores = JSON.parse(localStorage.getItem("submitScores"));
    if(previousScores !== null) {
        list = previousScores;
        highScoreList.innerHTML = list.initialsInput + " " + list.score;
    }
};

// Reloads the page to put user back to the start div
reset.addEventListener("click", function(event) {
    window.location.reload();
});

// Clears local storage
clearScores.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    if(element.matches("#clear")){
        localStorage.clear();
    }
});
