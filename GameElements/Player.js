class Player {
    constructor(x, y, radius) {
        this.pos = createVector(x, y);
        this.radius = radius;
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.onGround = false;
        this.isDucking = false;
        this.dashCooldown = 0;
        this.dashPower = 0;
    }

    showPlayer() {
        // Render as circle instead of sprite
        fill(0, 255, 0); // Green player
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
        
        // Show ducking state
        if (this.isDucking) {
            fill(0, 200, 0);
            ellipse(this.pos.x, this.pos.y + 5, this.radius, this.radius / 2);
        }
    }

    updatePlayer() {
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.acceleration.mult(0); // reset acceleration after update
        
        // Apply friction
        this.velocity.x *= 0.9;
        this.velocity.y *= 0.99;
        
        // Update dash cooldown
        if (this.dashCooldown > 0) {
            this.dashCooldown--;
        }
    }
    
    jump(force) {
        if (this.onGround) {
            this.velocity.y = -force;
            this.onGround = false;
        }
    }
    
    duck() {
        this.isDucking = true;
        // Make player smaller when ducking
        this.radius = 7;
    }
    
    stand() {
        this.isDucking = false;
        this.radius = 10;
    }
    
    dash(direction) {
        if (this.dashCooldown <= 0) {
            this.velocity.x += direction * 10; // Reduced dash power
            this.dashCooldown = 45; // Longer cooldown
        }
    }
}