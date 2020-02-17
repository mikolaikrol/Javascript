/**
 * Sébastien Bart
 * Mikolaï Krol
 * Groupe 6
 */

import Mobile from "./Mobile.js";
import theGame from "./Game.js";
import shootSrc from "../images/tir.png"

export default class Shoot extends Mobile {

    constructor(starship){
        super(starship.x, starship.y + starship.img.height/2, 8, 0, shootSrc);
    }

    move(canvas){
        if (this.x + this.dx > canvas.width){
          theGame.removeShoot(this);
          return;
        }  
        this.listCollision(theGame.saucers);
        super.move(canvas);
    }

    listCollision(saucers) {
        // const res = saucers.filter(saucer => this.collisionWith(saucer) && saucer.dy === 0, this);
        // if (res.length !== 0) {
        //     theGame.addPoints(200);
        //     res.map(saucer => { saucer.dx = 0; saucer.dy = 3; });
        //     theGame.removeShoot(this);
        // }
        saucers.forEach(saucer => {
            if (this.collisionWith(saucer) && saucer.dy === 0) {
                theGame.removeShoot(this);
                theGame.addPoints(200);
                saucer.dx = 0;
                saucer.dy = 3;
            }
        });
    }

    collisionWith(mobile){
        return mobile.isInside(this.x, this.y) ||
        mobile.isInside(this.x+this.img.width, this.y) ||
        mobile.isInside(this.x, this.y+this.img.height) ||
        mobile.isInside(this.x+this.img.width, this.y+this.img.height);
    }
    
}