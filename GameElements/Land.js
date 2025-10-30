class Land{
    constructor(thickness, width, pos){
        this.thickness = thickness;
        this.width = width;
        this.pos = pos;
    }

    createLand(){
        fill(100, 100, 255); // Blue platforms
        rect(this.pos.x, this.pos.y, this.width, this.thickness);
        
        // Add some detail to the platform
        fill(80, 80, 200);
        rect(this.pos.x, this.pos.y, this.width, 5); // Top highlight
    }
    
    updateLand(speed) {
        // Move land to the left to simulate player moving right
        this.pos.x -= speed;
    }
    
    isOffscreen() {
        return this.pos.x + this.width < 0;
    }
    
    // Get the top surface y-coordinate for collision detection
    getTopSurface() {
        return this.pos.y;
    }
}