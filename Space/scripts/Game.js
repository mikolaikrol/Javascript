/**
 * Sébastien Bart
 * Mikolaï Krol
 * Groupe 6
 */

import Starship from "./Starship.js";
import Saucer from "./Saucer.js";
import Shoot from "./Shoot.js";

class Game {

    constructor(){
        this.canvas = null;
        this.saucers = [];
        this.shoots = [];
        this.score = 0;
        this.interval = null;
        
        this.moveAndDraw = this.moveAndDraw.bind(this);
    }

    update(canvas){
        this.canvas = canvas;
        this.starship = new Starship(40, this.canvas.height / 2);
    }

    addSaucer(){
        this.saucers.push(new Saucer(this.canvas.width, Math.random() * this.canvas.height));
    }

    removeSaucer(saucer){
        this.saucers.splice(this.saucers.indexOf(saucer), 1);
    }

    addShoot(){
        this.shoots.push(new Shoot(this.starship));
    }

    removeShoot(shoot){
        this.shoots.splice(this.shoots.indexOf(shoot), 1);
    }

    addPoints(n){
        this.score += n;
        const scoreSpan = document.getElementById("score");
        scoreSpan.textContent = this.score;
    }

    moveAndDrawElement(element){
        element.move(this.canvas);
        element.draw(this.canvas.getContext("2d"));
    }

    moveAndDraw(){
        this.canvas.getContext("2d").clearRect(0,0,this.canvas.width,this.canvas.height);
        this.saucers.forEach((saucer)=>{
          this.moveAndDrawElement(saucer);
        }, this);
        this.shoots.forEach((shoot)=>{
            this.moveAndDrawElement(shoot);
          }, this);
        this.moveAndDrawElement(this.starship);
        this.anim = window.requestAnimationFrame(this.moveAndDraw);
      }

      keyDownActionHandler(event) {
        switch (event.key) {
              case "ArrowUp":
              case "Up":
                  this.starship.moveUp();
                  break;
              case "ArrowDown":
              case "Down":
                  this.starship.moveDown();
                  break;
              case " ":
                  this.addShoot(this.starship);
                  break;
              default: return;
          }
          event.preventDefault();
        }
      
        keyUpActionHandler(event) {
          switch (event.key) {
                case "ArrowLeft":
                case "Left":
                case "ArrowRight":
                case "Right":
                case "ArrowUp":
                case "Up":
                case "ArrowDown":
                case "Down":
                  this.starship.stopMoving();
                  break;
              default: return;
          }
          event.preventDefault();
        }
        
}

const theGame = new Game();
export default theGame;