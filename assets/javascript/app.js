
$(document).ready(function () {

    // start the game when user clicks on Start button
    $("#start-button").on("click", gameState.startTimer);

});

// information about the state of game play
var gameState = {

    // set the time at 60 seconds, and count down by 1 second
    timeRemaining: 60,

    // start the timer, hide the start page, show the questions
    startTimer: function () {
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#start-page").hide();
        trivia.displayQuestions();
    },

    // decrement the timer and update the UI; stop the timer at 0
    countdown: function () {
        gameState.timeRemaining--;
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        if (gameState.timeRemaining === 0) {
            gameState.stopTimer();
            $("#timer").empty();
        }
    },

    // stop the timer and check the answers
    stopTimer: function () {
        clearInterval();
        trivia.checkAnswers();
    },

    // hide the quetions and display the end page with results
    showEndPage: function (numCorrect, numIncorrect, numUnanswered) {
        $("#end-page").show();
        $("#questions-box").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct-answers").text("Correct answers: " + numCorrect);
        $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
        $("#unanswered").text("Skipped questions: " + numUnanswered);
    }
}

// functions to handle the building questions page and scoring
var trivia = {

    // pull questions from the array of questions, loop through them, and append to UI
    displayQuestions: function () {
        var divContainer = $("#questions-box");
        var answerGroup = $(".form-check");
        divContainer.append('<h2>Answer the following questions:</h2>');

        for (var i = 0; i < questionBank.length; i++) {

            divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

            var answer1 = questionBank[i].answers[0];
            var answer2 = questionBank[i].answers[1];
            var answer3 = questionBank[i].answers[2];
            var answer4 = questionBank[i].answers[3];
            var answer5 = questionBank[i].answers[4];


            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer4 + '</label></div>');
            // divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer5 + '</label></div>');
        }
        // myRadioGroup.setOrientation(LinearLayout.HORIZONTAL);

        // add a Done button to the end of the page and register its click handler
        var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
        divContainer.append(doneButton);
        $("#done-button").on("click", gameState.stopTimer);
    },

    // test if the user answers are correct, incorrect, or if there are unanswered questions
    checkAnswers: function () {
        var correctAnswer;
        var userAnswer;
        var numCorrect = 0;
        var numIncorrect = 0;
        var numUnanswered = 0;

        // loop through to compare the text of the label with the user answers
        // increment score counts appropriately
        for (var i = 0; i < questionBank.length; i++) {
            correctAnswer = questionBank[i].correct;
            userAnswer = $('input[id=radio' + i + ']:checked + label').text();

            if (userAnswer === correctAnswer) {
                numCorrect++;
            } else if (userAnswer === "") {
                numUnanswered++;
            } else if (userAnswer !== correctAnswer) {
                {
                    numIncorrect++;
                }
            }
        }

        // show the end page with the score tally
        gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
}

// array of objects with the questions, possible answers, and the correct answer
var questionBank =
    [
        {
            question: "That radiation and matter have properties both of particles and of waves is called what?",
            answers: ["Entanglement", "Mixing", "Wave-particle duality", "Confusion"],
            correct: "Wave-particle duality"
        },

        {
            question: "Max Planck’s great discovery was that radiation energy is emitted in packets that he called what?",
            answers: ["Photons", "Quanta", "Gamma rays", "Wave functions"],
            correct: "Quanta"
        },
        {
            question: "When two particles are entangled and it is observed that one has its spin up, how long does it take for the other’s spin to be down?",
            answers: ["Instantaneously", "1 nanosecond", "1 microsecond", "1 millisecond"],
            correct: "Instantaneously"
        },
        {
            question: "In the Heisenberg uncertainty principle, which two measurable properties of a particle cannot be observed precisely at the same time?",
            answers: ["Spin and color", "Size and speed", "Position and momentum", "Energy and torque"],
            correct: "Position and momentum"
        },
        // {
        //     question: "Niels Bohr used quantum mechanics to describe which element?",
        //     answers: ["Carbon", "Helium", "Zinc", "Hydrogen"],
        //     correct: "Hydrogen"
        // },


    ]
