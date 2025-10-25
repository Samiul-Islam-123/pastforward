class Land{
    constructor(thickness, width, pos){
        this.thickness = thickness;
        this.width = width;
        this.pos = pos;
    }

    createLand(){
        rect(this.pos.x ,this.pos.y, this.width, this.thickness)
    }
}