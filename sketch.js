// Game elements
let world;
let player;
let ghost;
let physics;
let controller;
let gravityVector;

// Game objects
let lands = [];
let obstacles = [];
let coins = [];

// Game state
let gameOver = false;
let score = 0;
let coinsCollected = 0;
let gameSpeed = 3; // Slower initial speed
let lastObstacleTime = 0;
let lastCoinTime = 0;
let ghostProximity = 0; // How close the ghost is to the player (0-100)

// Timing
let lastTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize game systems
  world = new World();
  gravityVector = createVector(0, 0.5);
  player = new Player(100, height / 2, 25);
  ghost = new Ghost(0, height / 2);
  controller = new Controller(player);
  physics = new Physics();

  // Create initial ground
  createInitialLands();

  // Set frame rate for consistent timing
  frameRate(60);
}

function createInitialLands() {
  // Create initial ground platforms (multiple shorter platforms)
  let platformCount = 5;
  let platformWidth = width / platformCount;

  for (let i = 0; i < platformCount; i++) {
    lands.push(new Land(20, platformWidth - 20, { x: i * platformWidth, y: height - 90 }));
  }

  // Create some initial platforms
  // lands.push(new Land(15, 150, { x: 300, y: height - 150 }));
  // lands.push(new Land(15, 120, { x: 500, y: height - 200 }));
  // lands.push(new Land(15, 180, { x: 700, y: height - 250 }));
  // lands.push(new Land(15, 100, { x: 900, y: height - 180 }));
  // lands.push(new Land(15, 160, { x: 1100, y: height - 220 }));
}

function draw() {
  if (gameOver) {
    showGameOverScreen();
    return;
  }

  // Draw world background
  world.createWorld();

  // Update game systems
  controller.update();
  physics.applyGravity(player, gravityVector);
  player.updatePlayer();

  // Update ghost
  ghost.updateGhost(player.pos);

  // Generate new obstacles and coins
  generateObstacles();
  generateCoins();

  // Generate new platforms to ensure player always has somewhere to land
  world.generatePlatforms(lands);

  // Reset onGround status before checking collisions
  player.onGround = false;

  // Update and draw lands
  for (let i = lands.length - 1; i >= 0; i--) {
    lands[i].updateLand(world.getScrollSpeed());
    lands[i].createLand();

    // Remove offscreen lands
    if (lands[i].isOffscreen()) {
      lands.splice(i, 1);
    } else {
      // Check collision with player
      if (physics.CheckCollision(player, lands[i])) {
        player.onGround = true;
      }
    }
  }

  // Update and draw obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].updateObstacle(world.getScrollSpeed());
    obstacles[i].showObstacle();

    // Check collision
    if (obstacles[i].collidesWith(player)) {
      ghostProximity = min(ghostProximity + 10, 100);
      ghost.moveCloser(); // 👻 Ghost moves nearer instead of increasing speed
      obstacles.splice(i, 1);
      continue;
    }


    // Remove offscreen obstacles
    if (obstacles[i].isOffscreen()) {
      obstacles.splice(i, 1);
    }
  }

  // Update and draw coins
  for (let i = coins.length - 1; i >= 0; i--) {
    coins[i].updateCoin(world.getScrollSpeed());
    coins[i].showCoin();

    // Check collection
    if (coins[i].collidesWith(player)) {
      if (coins[i].collect()) {
        coinsCollected++;
        score += 10;
        coins.splice(i, 1);
        continue;
      }
    }

    // Remove offscreen or collected coins
    if (coins[i].isOffscreen() || coins[i].collected) {
      coins.splice(i, 1);
    }
  }

  // Draw player
  player.showPlayer();

  // Draw ghost
  ghost.showGhost();

  // Check ghost collision
  if (physics.checkGhostCollision(player, ghost)) {
    gameOver = true;
  }


  if (player.pos.y > height + 40)
    gameOver = true;

  // Increase difficulty over time
  if (frameCount % 1200 === 0) { // Every 20 seconds (slower increase)
    world.increaseSpeed(0.1);
  }

  // Update score
  score += 0.05; // Slower score increase

  // Draw UI
  drawUI();
}

function generateObstacles() {
  // Generate obstacles randomly (less frequently now)
  if (frameCount - lastObstacleTime > 150) { // Roughly every 2.5 seconds
    if (random() < 0.2) { // 20% chance to generate obstacle
      let obstacleType = random() > 0.5 ? "wall" : "spike";
      let height = obstacleType === "wall" ? random(50, 150) : 30;
      let y = obstacleType === "wall" ? height / 2 : height - 15;

      obstacles.push(new Obstacle(
        width + 20,
        height - y,
        random(20, 40),
        height,
        obstacleType
      ));

      lastObstacleTime = frameCount;
    }
  }
}

function generateCoins() {
  // Generate coins randomly
  if (frameCount - lastCoinTime > 60) { // Roughly every 1 second
    if (random() < 0.3) { // 30% chance to generate coin
      coins.push(new Coin(
        width + 20,
        random(height / 2, height - 50)
      ));

      lastCoinTime = frameCount;
    }
  }
}

function drawUI() {
  // Score display
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + Math.floor(score), 20, 20);
  text("Coins: " + coinsCollected, 20, 50);

  // Ghost proximity indicator
  fill(255);
  textSize(16);
  text("Ghost Proximity:", 20, height - 60);

  // Proximity bar
  fill(50);
  rect(20, height - 40, 200, 20);

  // Fill based on proximity
  if (ghostProximity < 50) {
    fill(0, 255, 0); // Green
  } else if (ghostProximity < 80) {
    fill(255, 255, 0); // Yellow
  } else {
    fill(255, 0, 0); // Red
  }

  rect(20, height - 40, map(ghostProximity, 0, 100, 0, 200), 20);

  // Dash cooldown indicator
  fill(255);
  textSize(14);
  text("Dash Cooldown:", 20, height - 80);

  fill(50);
  rect(20, height - 70, 100, 10);

  if (player.dashCooldown <= 0) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }

  let cooldownWidth = map(player.dashCooldown, 45, 0, 0, 100);
  rect(20, height - 70, cooldownWidth, 10);

  // Controls help
  fill(200);
  textSize(12);
  text("Controls: W/S - Jump/Duck, A/D - Dash, R - Restart", width / 2, 20);
}

function showGameOverScreen() {
  background(0);
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 50);

  textSize(24);
  text("Final Score: " + Math.floor(score), width / 2, height / 2);
  text("Coins Collected: " + coinsCollected, width / 2, height / 2 + 40);

  textSize(18);
  text("Press R to Restart", width / 2, height / 2 + 100);
}

function keyPressed() {
  // Handle jumping
  if ((keyCode === UP_ARROW || key === 'w' || key === 'W') && !player.isDucking) {
    player.jump(controller.jumpForce);
  }

  // Handle dashing
  if (key === 'a' || key === 'A') {
    controller.dash(-1, windowWidth); // Dash left
  } else if (key === 'd' || key === 'D') {
    controller.dash(1, windowWidth); // Dash right
  }

  // Restart game
  if (key === 'r' || key === 'R') {
    restartGame();
  }
}

function restartGame() {
  // Reset game state
  gameOver = false;
  score = 0;
  coinsCollected = 0;
  ghostProximity = 0;
  gameSpeed = 3; // Reset to slower speed
  obstacles = [];
  coins = [];

  // Reset player
  player.pos.set(100, height / 2);
  player.velocity.set(0, 0);
  player.acceleration.set(0, 0);
  player.onGround = false;
  player.stand();

  // Reset ghost
  ghost.pos.set(0, height / 2);
  ghost.resetSpeed(); // Reset ghost speed

  // Reset world
  world = new World();

  // Recreate initial lands
  lands = [];
  createInitialLands();
}