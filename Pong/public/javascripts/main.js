import theGame from './Game.js';

import '../stylesheets/style.css';

const setup = () => {
    const theCanvas = document.getElementById("field");
    const theChat = document.getElementById("chat");
    theChat.addEventListener("click", () => {theChat.focus(); theCanvas.blur()});
    theGame.update(theCanvas);
    theGame.moveAndDraw();
    theCanvas.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
    theCanvas.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));
}

window.addEventListener("DOMContentLoaded",setup);