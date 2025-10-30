class Coin {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.radius = 8;
        this.collected = false;
        this.animationOffset = random(TWO_PI); // For floating animation
    }

    showCoin() {
        if (!this.collected) {
            // Yellow coin with shine effect
            fill(255, 215, 0); // Gold color
            ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
            
            // Shine effect
            fill(255, 255, 200);
            ellipse(this.pos.x - 3, this.pos.y - 3, this.radius / 2, this.radius / 2);
        }
    }

    updateCoin(speed) {
        // Move coin to the left to simulate player moving right
        this.pos.x -= speed;
        
        // Floating animation
        this.pos.y += sin(frameCount * 0.1 + this.animationOffset) * 0.5;
    }
    
    isOffscreen() {
        return this.pos.x + this.radius < 0;
    }
    
    collidesWith(player) {
        if (this.collected) return false;
        
        // Check distance between player and coin
        let distance = dist(player.pos.x, player.pos.y, this.pos.x, this.pos.y);
        return distance < (player.radius + this.radius);
    }
    
    collect() {
        this.collected = true;
        return true;
    }
}