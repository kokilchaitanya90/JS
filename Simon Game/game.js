var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
  userClickedPattern = [];
  level++;
    $("#level-title").html("Level "+level);
  var randomNumber = Math.floor((Math.random()*4));
  console.log(randomNumber);
  var randomChoseColor = buttonColours[randomNumber];
  console.log(randomChoseColor);
  gamePattern.push(randomChoseColor);
  $("#"+randomChoseColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoseColor);

}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length-1);

});

function playSound(key){
    var audio = new Audio("sounds/"+key+".mp3");
    audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass('pressed');
}, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass('game-over');
    }, 100);
    startOver();
    $("h1").html("Game Over, Press Any Key to Restart");

    }
}

function startOver(){
  level = 0;
  gamePattern = [];
}

$(document).keypress(function(){
  nextSequence();
});
