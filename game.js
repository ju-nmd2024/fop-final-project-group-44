// Blocks to pop
let bricks = [];
// Is true only when the game is running
let gameActive = false;
// Is true when the start menu should be showing
let startMenu = true;
// Is true when the result screen should be showing
let resultScreen = false;
// Keeps track of the type of result screen: 'win' or 'lose'
let resultType = '';
// Is true when the mouse is within the respective button hitbox
let startHitbox = false;
let retryHitbox = false;
let quitHitbox = false;
// Keeps track of your points and when the game ends (at 1 point for testing)
let finishCounter = 0;

// Ball class
class Ball {
  constructor(x, y, speedX, speedY) {
    this.position = { x: x, y: y };
    this.speed = { x: speedX, y: speedY };
    this.radius = 5;
  }

  draw() {
    fill(0);
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  move() {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }

  checkBoundaries() {
    // Border for ball
    if (this.position.x - this.radius <= 0 || this.position.x + this.radius >= 500) {
      this.speed.x *= -1; // Change the direction
    }

    if (this.position.y - this.radius <= 0) {
      this.speed.y *= -1; // Change the direction
    }
  }

  checkPaddleCollision() {
    // Ball and paddle
    if (
      this.position.y + this.radius >= positionrect.y + 350 &&
      this.position.x >= positionrect.x &&
      this.position.x <= positionrect.x + 100
    ) {
      this.speed.y *= -1;

      // Add angle
      let offset = (this.position.x - (positionrect.x + 50)) / 50;
      this.speed.x += offset * 2;
    }
  }
}

// Paddle
let positionrect = { x: 0, y: 100, z: 200 };
let rectmax = { x: 400 };
let rectmin = { x: 0 };

// Ball
let ball = new Ball(100, 100, 3, 3);

function setup() {
  createCanvas(500, 500);
  background(190);

  // Initialize bricks
  for (let a = 0; a < width; a += 50) {
    for (let b = 0; b < 80; b += 20) {
      bricks.push(new Brick(a, b));
    }
  }
}

// Paddle
function bottomStick() {
  fill(0);
  rect(positionrect.x, positionrect.y + 350, 100, 20);
}

// Brick class
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 20;
    this.destroyed = false;
  }

  draw() {
    if (!this.destroyed) {
      fill(255, 128, 0);
      rect(this.x, this.y, this.width, this.height);
    }
  }

  checkCollision(ball) {
    if (
      !this.destroyed &&
      ball.position.x + ball.radius >= this.x &&
      ball.position.x - ball.radius <= this.x + this.width &&
      ball.position.y + ball.radius >= this.y &&
      ball.position.y - ball.radius <= this.y + this.height
    ) {
      ball.speed.y *= -1;
      this.destroyed = true;
      finishCounter += 1;
      return true;
    }
    return false;
  }
}

// Start menu
function backgroundBricks(brickX, brickY) {
  fill(255, 128, 0);
  strokeWeight(2.2);
  stroke(0);
  rect(brickX, brickY, 50, 100);
}

// Draws the full start screen
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

// What happens when you press the buttons
function mousePressed() {
  // Start button that loads the game.
  if (startHitbox === true && startMenu === true) {
    resetGame();
  }
  // Retry button that restarts the game
  else if (retryHitbox === true && gameActive === false && resultScreen === true) {
    resetGame();
  }
  // Quit button that takes you back to the start menu
  else if (quitHitbox === true && gameActive === false && resultScreen === true) {
    resultScreen = false;
    finishCounter = 0;
    startMenu = true;
  }
}

function resetGame() {
  finishCounter = 0;
  startMenu = false;
  resultScreen = false;
  gameActive = true;
  resultType = '';
  ball = new Ball(100, 100, 3, 3);
  positionrect = { x: 400, y: 100, z: 200 };
  bricks = [];
  for (let a = 0; a < width; a += 50) {
    for (let b = 0; b < 80; b += 20) {
      bricks.push(new Brick(a, b));
    }
  }
}

// Draws the full result screen
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

  if (resultType === 'lose') {
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
  } else if (resultType === 'win') {
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
  pop();
}

function draw() {
  frameRate(60);
  background(190);

  textSize(20);
  text("Points: " + finishCounter, 10, 110);

  // Hitbox for the "Play" button.
  if (mouseX >= 125 && mouseX <= 375 && mouseY >= 230 && mouseY <= 355) {
    startHitbox = true;
  } else {
    startHitbox = false;
  }

  // Hitbox for the "Retry" button.
  if (mouseX >= 100 && mouseX <= 250 && mouseY >= 330 && mouseY <= 400) {
    retryHitbox = true;
  } else {
    retryHitbox = false;
  }

  // Hitbox for the "Quit" button.
  if (mouseX >= 250 && mouseX <= 400 && mouseY >= 330 && mouseY <= 400) {
    quitHitbox = true;
  } else {
    quitHitbox = false;
  }

  // Calls the start menu
  if (startMenu === true) {
    startButton();
  }

  // Calls the result screen
  if (resultScreen === true) {
    resultButtons();
    return; // Stop further drawing if result screen is active
  }

  if (gameActive === true) {
    // Draw paddle
    bottomStick();

    // Draw ball
    ball.draw();

    // Ball movement
    ball.move();
    ball.checkBoundaries();
    ball.checkPaddleCollision();

    // Paddle movement
    if (keyIsDown(37)) {
      positionrect.x -= 3; // Move left
    }
    if (keyIsDown(39)) {
      positionrect.x += 3; // Move right
    }

    // Border for the paddle
    if (positionrect.x >= rectmax.x) {
      positionrect.x = 400;
    }

    if (positionrect.x <= rectmin.x) {
      positionrect.x = 0;
    }

    // Draw bricks and check collisions
    for (let brick of bricks) {
      brick.draw();
      if (brick.checkCollision(ball)) {
        break; // Prevent popping multiple bricks at the same time
      }
    }

    // Detects if the ball goes below the paddle and triggers game over
    if (ball.position.y - ball.radius > height) {
      gameActive = false;
      resultScreen = true;
      resultType = 'lose';
    }
  }

  // Detects when you have popped all bricks and won
  if (finishCounter >= bricks.length) {
    gameActive = false;
    resultScreen = true;
    resultType = 'win';
  }
}
