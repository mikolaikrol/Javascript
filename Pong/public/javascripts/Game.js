import Paddle from "./Paddle.js";
import Ball from "./Ball.js";
import MoveState from "./MoveState.js";
import Chat from "./Chat.js";

class Game {
    constructor(){
        this.chat = null;
        this.firstPlayer = null;
        this.canvas = null;
        this.leftPaddle = null;
        this.rightPaddle = null;
        this.ball = null;
        this.anim = null;
        this.ballLaunched = false;
            this.moveAndDraw = this.moveAndDraw.bind(this);
        // Partie socket
        this.socket = io();
        this.socket.on("reset", () => this.reset());
        
        this.socket.on("become", (n, num) =>{
            this.socket.emit('join', num, n.toString());
            let message = document.getElementById("message");
            switch (n) {
                case 1:
                    this.firstPlayer = true;
                    message.textContent = "You are player one."
                    break;
                case 2:
                    this.firstPlayer = false;
                    message.textContent = "You are player two."
                    this.socket.emit("opponent_online");
                    break;
                default:
                    this.socket.close();
                    alert("You have been deconnected, please try later.");
                    message.textContent = "Please try later."
                    break;
            }
        });

        this.socket.on("opponent_online", () => {
            this.opponent_online(true);
        });

        this.socket.on("opponent_offline", () => {
            this.opponent_online(false);
        });

        this.socket.on("ball_launched", (x, y, dx, dy) => {
            this.ball = new Ball(x, y, dx, dy);
            this.ballLaunched = true;
        });
        this.socket.on("ball_state", (x,y,dx,dy) => {
            this.ball.update(x, y, dx, dy, this.canvas);
        });
        this.socket.on("rightPaddleUp", () => this.rightPaddleUp());
        this.socket.on("rightPaddleDown", () => this.rightPaddleDown());
        this.socket.on("rightPaddleStop", (y) => {
            this.rightPaddleStopMoving(y);
        });
    }

    update(canvas){
        this.canvas = canvas;
        this.leftPaddle = new Paddle(40, canvas.height / 2);
        this.leftPaddle.img.addEventListener("load", () => this.rightPaddle = new Paddle(canvas.width - 40 - this.leftPaddle.img.width, canvas.height / 2));
        this.chat = new Chat(this);
    }

    reset(){
        this.leftPaddle.x = 40;
        this.leftPaddle.y = this.canvas.height / 2;
        this.rightPaddle.x = this.canvas.width - 40 - this.rightPaddle.img.width;
        this.rightPaddle.y = this.canvas.height / 2;
        this.ball = null;
        this.leftPaddle.score = 0;
        this.rightPaddle.score = 0;
        this.updateScore();
        this.chat.ul.textContent = "";
    }

    updateScore(){
        const span1 = document.getElementById("p1");
        span1.textContent = this.leftPaddle.score;
        const span2 = document.getElementById("p2");
        span2.textContent = this.rightPaddle.score;
    }

    opponent_online(bool){
        let opponent = document.getElementById("opponent");
        if (bool) {
            opponent.textContent = "Opponent online";
            opponent.classList.remove("offline");
            opponent.classList.add("online");
        }
        else {
            opponent.textContent = "Opponent offline";
            opponent.classList.remove("online");
            opponent.classList.add("offline");
        }
    }

    addPointsLeftPaddle(n){
        this.leftPaddle.score += n;
    }

    addPointsRightPaddle(n){
        this.rightPaddle.score += n;
    }

    moveAndDrawList(list){
        list.forEach(element => {
            element.move(this.canvas);
            element.draw(this.canvas.getContext("2d"));
        });
    }

    moveAndDraw(){
        this.canvas.getContext("2d").clearRect(0,0,this.canvas.width,this.canvas.height);
        this.moveAndDrawList([this.leftPaddle, this.rightPaddle, this.ball].filter(element => element !== null));
        this.anim = window.requestAnimationFrame(this.moveAndDraw);
    }

    launchBall(){
        if (!this.ballLaunched && this.firstPlayer){
            this.ball = new Ball(this.leftPaddle.x + this.leftPaddle.img.width + 1, this.leftPaddle.y + this.leftPaddle.img.width / 2.5);
            this.ballLaunched = true;
            this.socket.emit("ball_launched", this.canvas.width - this.leftPaddle.x - this.ball.img.width - this.rightPaddle.img.width - 1 , this.ball.y, -this.ball.dx, this.ball.dy)
        }
    }

    rightPaddleUp(){ 
        this.rightPaddle.dy = -8;
        this.rightPaddle.moving = MoveState.UP;
    }
    rightPaddleDown(){
        this.rightPaddle.dy = +8;
        this.rightPaddle.moving = MoveState.DOWN;
    }

    rightPaddleStopMoving(y) {
        this.rightPaddle.moving = MoveState.NONE;
        this.rightPaddle.y = y;
    }

    leftPaddleUp(){ 
        this.leftPaddle.dy = -8;
        this.leftPaddle.moving = MoveState.UP;
        this.socket.emit("rightPaddleUp");
    }
    leftPaddleDown(){
        this.leftPaddle.dy = +8;
        this.leftPaddle.moving = MoveState.DOWN;
        this.socket.emit("rightPaddleDown");
    }

    leftPaddleStopMoving() {
        this.leftPaddle.moving = MoveState.NONE;
        this.socket.emit("rightPaddleStop", this.leftPaddle.y);
    }

    keyDownActionHandler(event) {
        switch (event.key) {
              case "ArrowUp":
              case "Up":
                  this.leftPaddleUp();
                  break;
              case "ArrowDown":
              case "Down":
                  this.leftPaddleDown();
                  break;
              case " ":
                  this.launchBall();
                  break;
              default: return;
          }
          event.preventDefault();
        }
      
        keyUpActionHandler(event) {
          switch (event.key) {
              case "ArrowUp":
              case "Up":
              case "ArrowDown":
              case "Down":
                  this.leftPaddleStopMoving();
                  break;
              default: return;
          }
          event.preventDefault();
        }
}

const theGame = new Game();
export default theGame;