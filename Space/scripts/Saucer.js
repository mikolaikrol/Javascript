/**
 * Sébastien Bart
 * Mikolaï Krol
 * Groupe 6
 */

import Mobile from "./Mobile.js";
import theGame from "./Game.js";

export default class Saucer extends Mobile {

    constructor(x, y){
        super(x, y, -3);
    }

    move(canvas){
      if (this.x + this.dx < 0){
        theGame.removeSaucer(this);
        theGame.addPoints(-1000);
      }  
      else if (this.y + this.dy > canvas.height){
        theGame.removeSaucer(this);
      }
      else super.move(canvas);
    }

}