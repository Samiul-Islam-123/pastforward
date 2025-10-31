class Ghost {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.radius = 20;
    this.baseSpeed = 2; // Constant base chase speed
    this.speed = this.baseSpeed;
    this.targetDistance = 250; // Desired chase distance from player
  }

  showGhost() {
    fill(128, 0, 128); // Purple ghost
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    
    // Eyes
    fill(255);
    ellipse(this.pos.x - 6, this.pos.y - 4, 6, 6);
    ellipse(this.pos.x + 6, this.pos.y - 4, 6, 6);
    
    fill(0);
    ellipse(this.pos.x - 6, this.pos.y - 4, 3, 3);
    ellipse(this.pos.x + 6, this.pos.y - 4, 3, 3);
  }

  updateGhost(playerPos) {
    // Compute direction to player
    let direction = p5.Vector.sub(playerPos, this.pos);
    let distance = direction.mag();
    direction.normalize();

    // Ghost only moves if it's farther than target distance
    if (distance > this.targetDistance) {
      this.pos.add(direction.mult(this.speed));
    }

    // Smooth floaty movement
    this.pos.y += sin(frameCount * 0.1) * 0.5;
  }

  // 👻 Ghost comes closer when player hits an obstacle
  moveCloser() {
    this.targetDistance = max(80, this.targetDistance - 40); 
    // Each hit reduces safe distance, but never less than 80
  }

  // 🔄 Reset ghost when restarting game
  reset() {
    this.pos.set(0, height / 2);
    this.speed = this.baseSpeed;
    this.targetDistance = 250;
  }
}
