class Controller {
    constructor(player) {
      this.player = player;
      this.moveForce = 0.3;   // Reduced horizontal acceleration
      this.jumpForce = 15;    // Reduced jump velocity
      this.runningSpeed = 3;  // Slower constant forward speed
    }
  
    update() {
      // Player constantly runs forward at a slower pace
      //this.player.velocity.x = this.runningSpeed;
      
      // Vertical movement controls
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // W key
        // Jumping is handled in main sketch
      } 

      
      
      if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) { // S key
        this.player.duck();
      } else {
        this.player.stand();
      }
    }
    
    dash(direction, screenWidth) {
        this.player.dash(direction, screenWidth);
    }
}