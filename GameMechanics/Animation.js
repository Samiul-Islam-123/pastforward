class Animation{
    constructor(animationData, pos, speed){
        console.log(animationData)
        this.animationData = animationData;
        this.pos = pos;
        this.speed = speed;
        this.index = 0;
        this.len = animationData.length;
    }

    show(){
        let index = floor(this.index) % this.len;
        //console.log(this.animationData[0])
         image(this.animationData[index], this.pos.x- this.animationData[index].width/2+25, this.pos.y - this.animationData[index].height+25)
         //console.log(this.animationData[index])
    }

    animate(){
        this.index += this.speed;
    }

}