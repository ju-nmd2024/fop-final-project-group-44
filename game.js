// Blocks to pop
let ballons = [];

function setup() {
  createCanvas(500, 500);
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

function draw() {
  frameRate(60);
  background(190);

  // Draw paddle
  bottomStick();

  // Draw ball
  ball();

  // Ball movement
  positionball.x += ballspeed.x;
  positionball.y += ballspeed.y;

  // Paddle movement
  if (keyIsDown(65)) {
    positionrect.x -= 15; // Move left
  }
  if (keyIsDown(68)) {
    positionrect.x += 15; // Move right
  }

  //borrder for the paddle
  if (positionrect.x >= rectmax.x) {
    positionrect.x = 400;
  }

  if (positionrect.x <= rectmin.x) {
    positionrect.x = 0;
  }

  //border for ball
  if (positionball.x - ballradius <= 0 || positionball.x + ballradius >= 500) {
    ballspeed.x *= -1; // change the direction
  }

  if (positionball.y - ballradius <= 0 || positionball.y - ballradius >= 480) {
    ballspeed.y *= -1; // change the direction
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
        return true; // loop exir
      }
    }
    return false; //prevents poping multiple bricks at same time
  });
}

