let buttonColor = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

//game level and game started point
let started = false;
let level = 0;


//Error Sound
let errorSound = new Audio("sounds/" + "wrong" + ".mp3");

//check user click any keywoboard, Game start
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
    checkAnswer()
  }
});

//check answer of user and game patter
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    errorSound.play();
    $(document.body).addClass("game-over");
    setTimeout(function(){
    $(document.body).removeClass("game-over");
    }, 200)

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//target the button class triggerd the click event

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// this function is used to generate random number of 4 and convert it into a random color 
//  also it is used for animation fadeIn and fadeout
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// this is used for play sound 
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// this function is used for animation when the user click button its show flash 
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//this function is used for start over the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
