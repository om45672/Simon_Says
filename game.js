let col = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

// button press
$(".btn").on("click", function () {
    let userChosenColor = $(this).attr("id");
    userPattern.push(userChosenColor);
    Press(userChosenColor);

    check(userPattern.length - 1); // check last input
});

// keypress starts the game
$(document).on("keydown", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function Press(s) {
    let audio = new Audio("sounds/" + s + ".mp3");
    audio.play();
    $("#" + s).addClass("pressed");
    setTimeout(function () {
        $("#" + s).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userPattern = []; // reset user input for new level
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = col[randomNumber];
    gamePattern.push(randomColor);

    // show the whole sequence again with delays
    gamePattern.forEach((color, i) => {
        setTimeout(() => {
            Press(color);
        }, i * 600); // each step 600ms apart
    });
}


function check(currentIndex) {
    if (userPattern[currentIndex] === gamePattern[currentIndex]) {
        // if last input is correct and user finished sequence
        if (userPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameEnd();
    }
}

function gameEnd() {
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // reset game
    started = false;
    level = 0;
    gamePattern = [];
}
