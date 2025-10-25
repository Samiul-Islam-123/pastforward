let world;
let player;
let physics;
let controller;
let gravityVector;
let lands = [];

let playersprite;
let playerspriteData;
let animationFrames = [];

function preload(){
  playersprite = loadImage("./assets/sprite.png")
  playerspriteData = loadJSON("./assets/sprite_data.json")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //prepare animation frames
  let frames = playerspriteData.frames;
  for(let i=0 ;i<frames.length ;i++){
    let pos = frames[i].position;
    let img = playersprite.get(pos.x, pos.y, pos.w, pos.h);
    animationFrames.push(img);
  }
  world = new World();
  gravityVector = createVector(0, 0.3);
  player = new Player(50, 100, 10, 10, animationFrames);
  controller = new Controller(player);
  physics = new Physics();

  // LEVEL PATTERN (array of lands)
  // Each land: thickness, width, position {x, y}
  lands.push(new Land(20, 400, { x: 50, y: 500 }));
  lands.push(new Land(20, 200, { x: 500, y: 400 }));
  lands.push(new Land(20, 300, { x: 800, y: 300 }));
  lands.push(new Land(20, 150, { x: 1200, y: 450 }));
  lands.push(new Land(20, 250, { x: 1600, y: 350 }));
  lands.push(new Land(20, 500, { x: 0, y: height - 20 })); // ground

  

}

function draw() {
  background(30);
  world.createWorld();

  // update controller & player
  controller.update();
  physics.applyGravity(player, gravityVector);
  player.updatePlayer();

  // draw and check collisions for all lands
  for (let land of lands) {
    land.createLand();
    physics.CheckCollision(player, land);
  }

  // draw player
  player.showPlayer();
  ///console.log(frameCount)
}

// Jump on key press
function keyPressed() {
  if (keyCode === UP_ARROW || key === 'w' || key === 'W') {
    if (player.onGround) {
      player.velocity.y = -controller.jumpForce;
      player.onGround = false;
    }
  }
}
