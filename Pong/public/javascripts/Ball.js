import Mobile from "./Mobile.js";
import theGame from "./Game.js";
import ballSrc from '../images/balle.png'

const initialSpeed = 6;

export default class Ball extends Mobile {
    constructor(x, y, dx = initialSpeed, dy = 0){
        super(x, y, dx, dy, ballSrc);
    }

    update(x, y, dx, dy, canvas){
        dx == 0 && dy === 0 ? this.stopBall() :
        (this.x = canvas.width - x - this.img.width,
        this.y = y,
        this.dx = -dx,
        this.dy = dy);
    }

    stopBall(){
        this.dx = 0;
        this.dy = 0; 
        theGame.ballLaunched = false;
    }

    move(canvas) {
        const moitie = canvas.width / 2;
        const quart1 = canvas.width / 4;
        const quart2 = quart1 + moitie;
        const next = this.x + this.dx;
        const actual = this.x;
        if (this.collisionWith(theGame.leftPaddle)){
            this.changeDirectionAfterCollisionWithLeftPaddle();
            this.emitBallState();
        }
        else if (this.collisionWith(theGame.rightPaddle)){
            this.changeDirectionAfterCollisionWithRightPaddle();
            this.emitBallState();
        }
        else if (next + this.img.width > canvas.width) {
            this.stopBall();
            theGame.addPointsLeftPaddle(1);
            theGame.updateScore();
        }
        else if (next < 0){
            this.stopBall();
            theGame.addPointsRightPaddle(1);
            theGame.updateScore();
        }
        else if (this.crossLine(quart1) || this.crossLine(quart2) || this.crossLine(moitie)) {
            this.emitBallState();
        }
        if (this.y + this.dy + this.img.height > canvas.height || this.y + this.dy < 0) {
            this.dy = - this.dy;
        }
        super.move(canvas);
    }

    crossLine(line){
        return (this.x <= line && this.x + this.dx > line) || (this.x >= line && this.x + this.dx < line);
    }

    emitBallState() {
        theGame.firstPlayer ? theGame.socket.emit("ball_state", this.x, this.y, this.dx, this.dy) : null;
    }

    changeDirectionAfterCollisionWithLeftPaddle(){
        const y = this.y + this.img.height / 2;
        const tranche = theGame.leftPaddle.img.height / 10;
        const py = theGame.leftPaddle.y;
        const dy = -4 + (Math.floor((y - py) / tranche));
        const dx =  initialSpeed - Math.abs(dy);
        this.dx = dx;
        this.dy = dy;
    }

    changeDirectionAfterCollisionWithRightPaddle(){
        const y = this.y + this.img.height / 2;
        const tranche = theGame.rightPaddle.img.height / 8;
        const py = theGame.rightPaddle.y;
        const dy = -4 + (Math.floor((y - py) / tranche));
        const dx =  -(initialSpeed - Math.abs(dy));
        this.dx = dx;
        this.dy = dy;
    }

    collisionWith(paddle){
        return paddle.isInside(this.x, this.y) ||
                paddle.isInside(this.x + this.img.width, this.y) ||
                paddle.isInside(this.x, this.y + this.img.height) ||
                paddle.isInside(this.x + this.img.width, this.y + this.img.height);
      }
}