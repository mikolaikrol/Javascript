/**
 * Sébastien Bart
 * Mikolaï Krol
 * Groupe 6
 */

import Mobile from "./Mobile.js";
import MoveState from "./MoveState.js";
import starshipSrc from "../images/vaisseau-ballon-petit.png";

export default class Starship extends Mobile {

    constructor(x, y){
        super(x, y, 0, 8, starshipSrc);
        this.moving = MoveState.NONE;
    }

    get up() {
        return this.moving === MoveState.UP;
    }

    get down() {
        return this.moving === MoveState.DOWN;
    }

    moveUp(){
        this.dy = - Math.abs(this.dy);
        this.moving = MoveState.UP;
    }

    moveDown(){
        this.dy = Math.abs(this.dy);
        this.moving = MoveState.DOWN;
    }

    stopMoving() {
        this.moving = MoveState.NONE;
    }

    move(canvas) {
        if (this.down) {
          this.y = Math.min(canvas.height - this.img.height, this.y + this.dy);
        }
        if (this.up) {
          this.y = Math.max(0, this.y + this.dy);
        }
    }

}