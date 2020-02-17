/**
 * Sébastien Bart
 * Mikolaï Krol
 * Groupe 6
 */

import saucerSrc from  '../images/flyingSaucer-petit.png';

export default class Mobile {

    constructor(x, y, dx = 0, dy = 0, src = saucerSrc){
        this.y = y;
        this.x = x;
        this.dx = dx;
        this.dy = dy;
        this.img = new Image();
        this.img.src = src; 
    }

    draw(context){
        context.drawImage(this.img, this.x, this.y);
    }

    move(canvas){
        this.x += this.dx;
        this.y += this.dy;
    }

    isInside(x, y){
        let xInside = x >= this.x && x <= this.x + this.img.width;
        let yInside = y >= this.y && y <= this.y + this.img.height;
        return xInside && yInside;
    }
    
}