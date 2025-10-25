class Controller {
    constructor(player) {
      this.player = player;
      this.moveForce = 6;   // horizontal acceleration
      this.jumpForce = 8.5;    // jump velocity
      this.friction = 0.9;    // slows down player
    }
  
    update() {
      // Horizontal movement
      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // A
        this.player.velocity.x = -this.moveForce;
      } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // D
        this.player.velocity.x = this.moveForce;
      } else {
        this.player.acceleration.x = 0;
        this.player.velocity.x *= this.friction; // apply friction
      }
    }
  
    
  }
  