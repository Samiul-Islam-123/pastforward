class Obstacle {
    constructor(x, y, width, height, type) {
        this.pos = createVector(x, y);
        this.width = width;
        this.height = height;
        this.type = type; // "wall", "spike", etc.
        this.passed = false;
    }

    showObstacle() {
        if (this.type === "wall") {
            fill(150, 75, 0); // Brown wall
            rect(this.pos.x, this.pos.y, this.width, this.height);
        } else if (this.type === "spike") {
            fill(255, 0, 0); // Red spike
            triangle(
                this.pos.x, this.pos.y + this.height,
                this.pos.x + this.width, this.pos.y + this.height,
                this.pos.x + this.width/2, this.pos.y
            );
        }
    }

    updateObstacle(speed) {
        // Move obstacle to the left to simulate player moving right
        this.pos.x -= speed;
    }
    
    isOffscreen() {
        return this.pos.x + this.width < 0;
    }
    
    collidesWith(player) {
        // Player edges
        let playerLeft = player.pos.x - player.radius;
        let playerRight = player.pos.x + player.radius;
        let playerTop = player.pos.y - player.radius;
        let playerBottom = player.pos.y + player.radius;
        
        // Obstacle edges
        let obstacleLeft = this.pos.x;
        let obstacleRight = this.pos.x + this.width;
        let obstacleTop = this.pos.y;
        let obstacleBottom = this.pos.y + this.height;
        
        // Check collision
        return (
            playerRight > obstacleLeft &&
            playerLeft < obstacleRight &&
            playerBottom > obstacleTop &&
            playerTop < obstacleBottom
        );
    }
}