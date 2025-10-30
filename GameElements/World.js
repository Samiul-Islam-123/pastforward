class World{
    constructor(){
        this.groundHeight = 20;
        this.scrollSpeed = 3; // Slower initial speed
        this.lastPlatformTime = 0;
    }

    createWorld(){
        background(50, 50, 100); // Dark blue background
        
        // Draw some stars for atmosphere
        fill(255, 255, 200);
        noStroke();
        for (let i = 0; i < 50; i++) {
            let x = (frameCount * 0.5 + i * 50) % (width + 100);
            let y = (sin(frameCount * 0.02 + i) * 30) + 50;
            ellipse(x, y, 2, 2);
        }
    }
    
    getScrollSpeed() {
        return this.scrollSpeed;
    }
    
    increaseSpeed(amount) {
        this.scrollSpeed += amount;
    }
    
    // Generate new platforms as old ones move off screen
    generatePlatforms(lands) {
        // Generate new platforms periodically
        if (frameCount - this.lastPlatformTime > 60) { // Every second at 60fps
            // Find the rightmost platform
            let rightmostX = 0;
            for (let land of lands) {
                if (land.pos.x + land.width > rightmostX) {
                    rightmostX = land.pos.x + land.width;
                }
            }
            
            // Only generate if we need more platforms
            if (rightmostX < width + 500) {
                // Create a new platform
                let width = random(100, 300);
                let thickness = random(15, 25);
                let x = rightmostX + random(50, 150);
                let y = random(height - 300, height - 50);
                
                // Ensure platform isn't too high or low
                y = constrain(y, height - 300, height - 50);
                
                lands.push(new Land(thickness, width, { x: x, y: y }));
                this.lastPlatformTime = frameCount;
            }
        }
    }
}