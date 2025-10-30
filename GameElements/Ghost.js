class Ghost {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.radius = 15;
        this.speed = 2;
        this.chaseSpeed = 3;
        this.distanceToPlayer = 0;
    }

    showGhost() {
        // Render ghost as a purple rectangle/circle
        fill(128, 0, 128); // Purple ghost
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
        
        // Eyes
        fill(255);
        ellipse(this.pos.x - 5, this.pos.y - 3, 6, 6);
        ellipse(this.pos.x + 5, this.pos.y - 3, 6, 6);
        
        fill(0);
        ellipse(this.pos.x - 5, this.pos.y - 3, 3, 3);
        ellipse(this.pos.x + 5, this.pos.y - 3, 3, 3);
    }

    updateGhost(playerPos) {
        // Calculate distance to player
        this.distanceToPlayer = dist(this.pos.x, this.pos.y, playerPos.x, playerPos.y);
        
        // Chase player with increasing speed based on proximity
        let chaseFactor = map(this.distanceToPlayer, 0, 500, 1.5, 0.5);
        chaseFactor = constrain(chaseFactor, 0.5, 1.5);
        
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
}