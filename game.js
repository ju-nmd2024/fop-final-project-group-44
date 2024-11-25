function setup() {
  createCanvas(700, 500);
  background(190);
}
//rect
let positionrect = { x: 0, y: 100, z: 200 };
let rectmax = { x: 600 };
let rectmin = { x: 0 };

function bottomStick() {
  fill(0);
  rect(positionrect.x, positionrect.y + 350, 100, 20);
}

function draw() {
  frameRate(60);
  background(190);
  translate();
  bottomStick(); //

  if (keyIsDown(65)) {
    positionrect.x -= 15;
  }
  if (keyIsDown(68)) {
    positionrect.x += 15;
  }

  //rigt limit
  if (positionrect.x >= rectmax.x) {
    positionrect.x = 600;
  }
  //left limit
  if (positionrect.x <= rectmin.x) {
    positionrect.x = 0;
  }
}

