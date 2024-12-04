// Blocks to pop
let ballons = [];
// Is true only when the game is running
let gameActive = false;
// Is true when the start menu should be showing
let startMenu = true;
// Is true when the result screen should be showing
let resultScreen = false;
// Is true when the mouse is within the respective button hitbox
let startHitbox = false;
let retryHitbox = false;
let quitHitbox = false;
// Keeps track of your points and when the game ends (at 40 points)
let finishCounter = 0;
// Scale up
let s = 2;

function setup() {
  createCanvas(500 * s, 500 * s);
  background(190);

  // Initialize ballons (bricks)
  for (let a = 0; a < width; a += 50) {
    for (let b = 0; b < 80; b += 20) {
      ballons.push({
        x: a,
        y: b,
        destroyed: false,
      });
    }
  }
}

// Paddle
let positionrect = { x: 0, y: 100, z: 200 };
let rectmax = { x: 400 };
let rectmin = { x: 0 };

// Ball
let ballradius = 5;
let positionball = { x: 100, y: 100 };
let ballspeed = { x: 3, y: 3 };

// Paddle
function bottomStick() {
  fill(0);
  rect(positionrect.x, positionrect.y + 350, 100, 20);
}

// Ball
function ball() {
  fill(0);
  ellipse(positionball.x, positionball.y, ballradius * 2);
}

let ballon = {
  width: 50,
  height: 20,
  rows: 4,
  cols: 10, // Reduced columns for better fit
};

//Start menu
function backgroundBricks(brickX, brickY) {
  fill(255, 128, 0);
  strokeWeight(2.2);
  stroke(0);
  rect(brickX, brickY, 50, 100);
}

//Draws the full start screen
function startButton() {
  push();
  background(190);
  strokeWeight(6);
  stroke(0);
  fill(255, 128, 0);
  rect(125, 230, 250, 125);
  noStroke();
  fill(0);
  textSize(70);
  text("PLAY", 165, 320);
  textSize(42);
  text("THEMIS BREAKOUT", 50, 190);

  backgroundBricks(0, 0);
  backgroundBricks(50, 0);
  backgroundBricks(100, 0);
  backgroundBricks(150, 0);
  backgroundBricks(200, 0);
  backgroundBricks(250, 0);
  backgroundBricks(300, 0);
  backgroundBricks(350, 0);
  backgroundBricks(400, 0);
  backgroundBricks(450, 0);

  backgroundBricks(0, 400);
  backgroundBricks(50, 400);
  backgroundBricks(100, 400);
  backgroundBricks(150, 400);
  backgroundBricks(200, 400);
  backgroundBricks(250, 400);
  backgroundBricks(300, 400);
  backgroundBricks(350, 400);
  backgroundBricks(400, 400);
  backgroundBricks(450, 400);
  pop();
}

//What happens when you press the buttons
function mousePressed() {
  //Start button that loads the game.
  if (startHitbox === true && startMenu === true) {
    finishCounter = 0;
    startMenu = false;
    gameActive = true;
    positionball = { x: 100, y: 100 };
    ballspeed = { x: 3, y: 3 };
    positionrect = { x: 400, y: 100, z: 200 };
    ballons = [];
    for (let a = 0; a < width; a += 50) {
      for (let b = 0; b < 80; b += 20) {
        ballons.push({
          x: a,
          y: b,
          destroyed: false, // Reset to unpopped state
        });
      }
    } //to fix we need to cleat ballons[] array and re install the loop
  }
  //Retry button that restarts the game
  else if (retryHitbox === true && gameActive === false) {
    resultScreen = false;
    finishCounter = 0;
    gameActive = true;
    startMenu = false;
    positionball = { x: 100, y: 100 };
    ballspeed = { x: 3, y: 3 };
    positionrect = { x: 400, y: 100, z: 200 };
    ballons = [];
    for (let a = 0; a < width; a += 50) {
      for (let b = 0; b < 80; b += 20) {
        ballons.push({
          x: a,
          y: b,
          destroyed: false, // Reset to unpopped state
        });
      }
    } //to fix we need to cleat ballons[] array and re install the loop
  }
  //quit button that take you back to the start menu
  else if (quitHitbox === true && gameActive === false) {
    resultScreen = false;
    finishCounter = 0;
    resultScreen = false;
    startMenu = true;
  }
}

//Draws the full result screen
function resultButtons() {
  push();
  background(160);
  strokeWeight(5);
  stroke(0);
  fill(190);
  rect(100, 100, 300, 300);
  strokeWeight(3);
  stroke(0);
  fill(255, 128, 0);
  rect(100, 330, 150, 70);
  rect(250, 330, 150, 70);
  noStroke();

  if (finishCounter === 1) {
    textSize(20);
    fill(255, 128, 0);
    text("Score: " + finishCounter + " point", 110, 320);
    fill(0);
    textSize(40);
    text("Retry", 125, 380);
    text("Quit", 280, 380);
    textSize(60);
    text("GAME", 170, 140, 200, 200);
    text("OVER", 170, 205, 200, 200);
  }
  else if (finishCounter === 40) {
    textSize(20);
    fill(255, 128, 0);
    text("Score: " + finishCounter + " points!!!", 110, 320);
    fill(0);
    textSize(40);
    text("Again", 125, 380);
    text("Quit", 280, 380);
    textSize(60);
    text("YOU", 180, 140, 200, 200);
    text("WIN!", 180, 205, 200, 200);
  }
  else {
    textSize(20);
    fill(255, 128, 0);
    text("Score: " + finishCounter + " points", 110, 320);
    fill(0);
    textSize(40);
    text("Retry", 125, 380);
    text("Quit", 280, 380);
    textSize(60);
    text("GAME", 170, 140, 200, 200);
    text("OVER", 170, 205, 200, 200);
  }
  pop();
}

function draw() {
  scale(s);
  frameRate(60);
  background(190);
  textSize(20);
  text("Points: " + finishCounter, 10, 110);

  //Hitbox for the "Play" button.
  if (mouseX >= 125 * s && mouseX <= 375 * s && mouseY >= 230 * s && mouseY <= 355 * s) {
    startHitbox = true;
  } else {
    startHitbox = false;
  }

  //Hitbox for the "Retry" button.
  if (mouseX >= 100 * s && mouseX <= 250 * s && mouseY >= 330 * s && mouseY <= 400 * s) {
    retryHitbox = true;
  } else {
    retryHitbox = false;
  }

  //Hitbox for the "Quit" button.
  if (mouseX >= 250 * s && mouseX <= 400 * s && mouseY >= 330 * s && mouseY <= 400 * s) {
    quitHitbox = true;
  } else {
    quitHitbox = false;
  }

  //Calls the start menu
  if (startMenu === true) {
    startButton();
  }

  //Calls the result screen
  if (resultScreen === true) {
    resultButtons();
  }

  if (gameActive === true) {

    // Draw paddle
    bottomStick();

    // Draw ball
    ball();

    // Ball movement
    positionball.x += ballspeed.x;
    positionball.y += ballspeed.y;

    // Paddle movement
    if (keyIsDown(37)) {
      positionrect.x -= 3; // Move left
    }
    if (keyIsDown(39)) {
      positionrect.x += 3; // Move right
    }

    //borrder for the paddle
    if (positionrect.x >= rectmax.x) {
      positionrect.x = 400;
    }

    if (positionrect.x <= rectmin.x) {
      positionrect.x = 0;
    }

    //border for ball
    if (
      positionball.x - ballradius <= 0 ||
      positionball.x + ballradius >= 500
    ) {
      ballspeed.x *= -1; // change the direction
    }

    if (positionball.y - ballradius <= 0) {
      ballspeed.y *= -1; // change the direction
    }

    //detects if you miss the ball and send you to the result screen
    if (positionball.y - ballradius >= 480) {
      gameActive = false;
      resultScreen = true;
    } else {
      resultScreen = false;
    }

    // ball and paddle
    if (
      positionball.y + ballradius >= positionrect.y + 350 &&
      positionball.x >= positionrect.x &&
      positionball.x <= positionrect.x + 100
    ) {
      ballspeed.y *= -1;

      //add angle
      let offset = (positionball.x - (positionrect.x + 50)) / 50;
      ballspeed.x += offset * 2;
    }

    ballons.some((bricks) => {
      if (!bricks.destroyed) {
        fill(255, 128, 0);
        rect(bricks.x, bricks.y, ballon.width, ballon.height);

        if (
          positionball.x + ballradius >= bricks.x &&
          positionball.x - ballradius <= bricks.x + ballon.width &&
          positionball.y + ballradius >= bricks.y &&
          positionball.y - ballradius <= bricks.y + ballon.height
        ) {
          ballspeed.y *= -1;
          bricks.destroyed = true; // Mark brick as destroyed
          finishCounter += 1;
          return true; // loop exir
        }
      }
      return false; //prevents poping multiple bricks at same time
    });
  }
  //Detects when you have popped all bricks and won
  if (finishCounter >= 40) {
    gameActive = false;
    resultScreen = true;
  }
}
