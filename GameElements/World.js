class World {
  constructor() {
    this.groundHeight = 20;
    this.scrollSpeed = 4;
    this.lastPlatformTime = 0;
    this.bats = this.createBats(6); // 🦇 flying bats
  }

  createWorld() {
    // 🌑 Dark purple Halloween sky gradient
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(15, 10, 30), color(60, 20, 40), inter);
      stroke(c);
      line(0, y, width, y);
    }

    noStroke();

    // 🌕 Glowing moon
    let moonX = width - 150;
    let moonY = 100;
    for (let r = 80; r > 0; r -= 5) {
      fill(255, 255, 200, map(r, 80, 0, 10, 255));
      ellipse(moonX, moonY, r * 2);
    }

    // ✨ Flickering stars
    for (let i = 0; i < 60; i++) {
      let x = (frameCount * 0.2 + i * 60) % (width + 100);
      let y = (sin(frameCount * 0.03 + i) * 40) + 60;
      let flicker = random(180, 255);
      fill(flicker, flicker, 220);
      ellipse(x, y, random(1, 3));
    }

    // 🦇 Flying bats
    for (let bat of this.bats) {
      bat.update();
      bat.show();
    }
  }

  getScrollSpeed() {
    return this.scrollSpeed;
  }

  increaseSpeed(amount) {
    this.scrollSpeed += amount;
  }

  // 🎃 Generate platforms near bottom
  generatePlatforms(lands) {
    if (frameCount - this.lastPlatformTime > 60) {
      let rightmostX = 0;
      for (let land of lands) {
        if (land.pos.x + land.width > rightmostX) {
          rightmostX = land.pos.x + land.width;
        }
      }

      if (rightmostX < width + 400) {
        let platformWidth = random(250, 400);
        let thickness = random(20, 25);
        let x = rightmostX + random(40, 80);
        let y = random(height - 120, height - 60);
        y = constrain(y, height - 140, height - 60);

        let newLand = new Land(thickness, platformWidth, { x: x, y: y });
        lands.push(newLand);

        this.generateObstacleOnLand(newLand);
        this.lastPlatformTime = frameCount;
      }
    }
  }

  // 🧱 Obstacle grounded on platform
  generateObstacleOnLand(land) {
    if (random() < 0.5) {
      let obstacleType = random() > 0.5 ? "wall" : "spike";
      let obstacleWidth = random(30, 50);
      let obstacleHeight = obstacleType === "wall" ? random(60, 120) : 30;
      let obstacleX = land.pos.x + random(30, land.width - obstacleWidth - 30);
      let obstacleY = land.pos.y - obstacleHeight;
      if (obstacleY < height - 250) obstacleY = height - 250;
      obstacles.push(new Obstacle(obstacleX, obstacleY, obstacleWidth, obstacleHeight, obstacleType));
    }
  }

  // 🦇 Create a few bat objects
  createBats(count) {
    let bats = [];
    for (let i = 0; i < count; i++) {
      bats.push(new Bat(random(width), random(50, 200), random(1, 2)));
    }
    return bats;
  }
}
