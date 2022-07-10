var container = document.querySelector(".container");
var switchEl = document.querySelector('.hidden-box');
var timerEl = document.getElementById('countdown');
var start = document.querySelector('.start');
var quiz = document.querySelector('.quiz');
var displayedQuestion = document.getElementById('displayed-question');
var choiceOne = document.getElementById('1');
var choiceTwo = document.getElementById('2');
var choiceThree = document.getElementById('3');
var choiceFour = document.getElementById('4');
var answer = document.querySelector('choice');
var msg = document.getElementById('msg');
var results = document.getElementById('results');

// How many seconds remain in timer
var timeLeft = 3; 
// Object that stores the questions, and answers
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
        choiceD: "All of the Above",
        correct: "4"
    },
    {
        question: "String values must be enclosed withing _______ when being assigned to variables.",
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
var currentQuestion = 0;



// Timer that counts down from 75
function countdown() {
    
    var timeInterval = setInterval(function () {
       if(timeLeft > 0) {
        timerEl.textContent = 'Time: ' + timeLeft;
        timeLeft--;
        } else {
            timerEl.textContent = 'Time: ' + timeLeft;
            clearInterval(timeInterval);
            // showResults();
        }
    }, 1000);
}

container.addEventListener("click", function(event){
    var element = event.target;
    if (element.matches("button")) {
        countdown();
        displayQuestion();
    }
});

function displayQuestion() {
    
    // displays the current question and choices
    displayedQuestion.innerHTML = "<h1>" + questions[currentQuestion].question + "</h1>"
    choiceOne.innerHTML =  questions[currentQuestion].choiceA;
    choiceTwo.innerHTML =  questions[currentQuestion].choiceB;
    choiceThree.innerHTML =  questions[currentQuestion].choiceC;
    choiceFour.innerHTML =  questions[currentQuestion].choiceD;
    
    start.style.display = "none";
    quiz.style.display = "block";
}

// Checks to see if answer is correct and updates the timer if answer is wrong
// and updates the current questions
function checkAnswer(answer) {
    if (answer != questions[currentQuestion].correct){
        msg.textContent="Wrong!";
        timeLeft = timeLeft - 10;
    }else {
        msg.textContent="Correct!";
    }
    currentQuestion++;
    displayQuestion();
};

function showResults(){
    results.style.display = "block";
}


