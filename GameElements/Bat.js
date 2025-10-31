class Bat {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.wingAngle = 0;
  }

  update() {
    this.x -= this.speed;
    this.wingAngle += 0.3;

    if (this.x < -50) {
      this.x = width + random(100, 400);
      this.y = random(50, 200);
    }
  }

  show() {
    push();
    translate(this.x, this.y);
    fill(0);
    noStroke();
    let wingOffset = sin(this.wingAngle) * 10;
    triangle(-15, 0, -25, -10 - wingOffset, -25, 10 + wingOffset);
    triangle(15, 0, 25, -10 - wingOffset, 25, 10 + wingOffset);
    ellipse(0, 0, 15, 10); // body
    pop();
  }
}
