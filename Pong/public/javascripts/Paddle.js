import Mobile from "./Mobile.js";
import MoveState from "./MoveState.js";

export default class Paddle extends Mobile{
    constructor(x,y){
        super(x, y, 0);
        this.moving = null;
        this.score = 0;
    }

    get up() {
        return this.moving === MoveState.UP;
    }

    get down() {
        return this.moving === MoveState.DOWN;
    }

    move(canvas) {
        if (this.down) {
          this.y = Math.min(canvas.height - this.img.height, this.y + this.dy);
        }
        if (this.up) {
          this.y = Math.max(0, this.y + this.dy);
        }
    }

    isInside(x, y){
        const xInside = x >= this.x && x <= this.x + this.img.width;
        const yInside = y >= this.y && y <= this.y + this.img.height;
        return xInside && yInside;
      }
}