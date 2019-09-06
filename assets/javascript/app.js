

/* Psuedo Code - Trivia Game
Page/Site Loads
Main content area shows Title and Start Button. 
    
//player presses key to start game

//start button hidden after button presses and game displayed

//timer starts after game starts

//mulitple choice questions function

//create and array of 4 questions

//create correct answers, incorrect answers, and unanswered

//if question answered correctly 

//timer value//
*/


var timer = 20
var correct  = 0
var incorrect = 0;
var unanswered = 0;
var questions = ["q1", "q2", "q3","q4"];
var answers = [["a1","a2", "a3", "a4"],["a1","a2", "a3", "a4"],["a1","a2", "a3", "a4"],["a1","a2", "a3", "a4"]]

$("#start").click(function(){
    start()
  });

function start(){
     setInterval(countDown, 1000);  
     displayQuestion()
}

function countDown(){
    $("#timer").text(timer);
    timer--;
}

function displayQuestion(){
    for (var i = 0; i < questions.length; i++) { 
        var quesElement = $("<span>");
        quesElement.addClass("question_" + i);
        quesElement.text(questions[i]);

      
    }
}
