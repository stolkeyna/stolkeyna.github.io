//Walidacja formularza
const inputName = form.querySelector("input[name=name]");
const inputEmail = form.querySelector("input[name=email]");
const formMessage = form.querySelector(".form-message");

function testFieldName() {
    return inputName.value.length >= 3
}

function testFieldEmail() {
    const regEmail = /\S+@\S+\.\S+/;
    return regEmail.test(inputEmail.value);
}

//dynamiczne podpowiedzi na pól
inputName.addEventListener("input", () => {
    inputName.classList.toggle("is-invalid", !testFieldName());
});

inputEmail.addEventListener("input", () => {
    inputEmail.classList.toggle("is-invalid", !testFieldEmail());
});

form.addEventListener("submit", e => {
    e.preventDefault();

    let formErrors = [];

    //usuwam domyślnie wszystkie zaznaczenia błędów
    for (let field of [inputName, inputEmail]) {
        field.classList.remove("is-invalid");
    }

    if (!testFieldName()) {
        formErrors.push("Wypełnij poprawnie pole z imieniem");
        inputName.classList.add("is-invalid");
    }

    if (!testFieldEmail()) {
        formErrors.push("Wypełnij poprawnie pole z emailem");
        inputEmail.classList.add("is-invalid");
    }

    if (!formErrors.length) {
        form.submit();
    } else {
        formMessage.innerHTML = `
            <h3 class="form-error-title">Proszę poprawić błędy:</h3>
            <ul class="form-error-list">
                ${formErrors.map(el => `<li>${el}</li>`).join("")}
            </ul>
        `;
    }
});

//Quiz
const questions = [
    {
        question:"Example question 1",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: true},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 2",
        answers: [
            { text: "Example answer 1", correct: true},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 3",
        answers: [
            { text: "Example answer 1", correct: true},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 4",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: true},
        ]
    },
    {
        question:"Example question 5",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: true},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 6",
        answers: [
            { text: "Example answer 1", correct: true},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: true},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 7",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: true},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 8",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: true},
        ]
    },
    {
        question:"Example question 9",
        answers: [
            { text: "Example answer 1", correct: true},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 10",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 11",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: true},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 12",
        answers: [
            { text: "Example answer 1", correct: true},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 13",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: true},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 14",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: true},
            { text: "Example answer 4", correct: false},
        ]
    },
    {
        question:"Example question 15",
        answers: [
            { text: "Example answer 1", correct: false},
            { text: "Example answer 2", correct: false},
            { text: "Example answer 3", correct: false},
            { text: "Example answer 4", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer() {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton () {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

//Gallery
function myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg");
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }