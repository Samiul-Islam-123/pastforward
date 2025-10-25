class Player {

    constructor(x, y, length, width, animationData) {
        this.pos = createVector(x,y);
        this.length = length;
        this.width = width;
        this.velocity = createVector(0,0);
        this.acceleration  = createVector(0,0);
        this.onGround = true;
        this.animation = new Animation(animationData, this.pos, 0.2)
    }

    showPlayer() {
        //ellipse(this.pos.x, this.pos.y, this.length, this.width)
        this.animation.show()
        this.animation.animate()
    }

    updatePlayer() {
        
        this.velocity.add(this.acceleration);
        this.pos.add(this.velocity);
        this.acceleration.mult(0); // reset acceleration after update
    }

}