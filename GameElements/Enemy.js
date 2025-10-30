class Enemy {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.size = 15;
        this.speed = 2;
        this.chaseSpeed = 2.5;
        this.distanceToPlayer = 0;
        this.color = [255, 50, 50]; // Red color
    }

    showEnemy() {
        // Render enemy as a red circle with eyes
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size * 2, this.size * 2);
        
        // Eyes
        fill(255);
        ellipse(this.pos.x - 5, this.pos.y - 3, 6, 6);
        ellipse(this.pos.x + 5, this.pos.y - 3, 6, 6);
        
        fill(0);
        ellipse(this.pos.x - 5, this.pos.y - 3, 3, 3);
        ellipse(this.pos.x + 5, this.pos.y - 3, 3, 3);
    }

    updateEnemy(playerPos) {
        // Calculate distance to player
        this.distanceToPlayer = dist(this.pos.x, this.pos.y, playerPos.x, playerPos.y);
        
        // Chase player with increasing speed based on proximity
        let chaseFactor = map(this.distanceToPlayer, 50, 500, 1.5, 0.8);
        chaseFactor = constrain(chaseFactor, 0.8, 1.5);
        
        // Move towards player
        let direction = createVector(playerPos.x - this.pos.x, playerPos.y - this.pos.y);
        direction.normalize();
        this.velocity = direction.copy();
        this.velocity.mult(this.chaseSpeed * chaseFactor);
        
        // Update position
        this.pos.add(this.velocity);
    }
    
    getDistanceToPlayer() {
        return this.distanceToPlayer;
    }
    
    reset(x, y) {
        this.pos.set(x, y);
        this.velocity.set(0, 0);
    }
}