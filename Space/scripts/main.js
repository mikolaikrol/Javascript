/**
 * Sébastien Bart
 * Mikolaï Krol
 * Groupe 6
 */

import theGame from './Game.js';

import '../style/style.css';

const setup = () => {
    const theCanvas = document.getElementById("stars");
    theGame.update(theCanvas);

    const nouvelleSoucoupe = document.getElementById("nouvelleSoucoupe");
    nouvelleSoucoupe.addEventListener("click", theGame.addSaucer.bind(theGame));
    nouvelleSoucoupe.addEventListener("click", nouvelleSoucoupe.blur);

    const addContinuous = document.getElementById("flotteSoucoupes");
    addContinuous.addEventListener("click", addSaucers);
    addContinuous.addEventListener("click", addContinuous.blur);

    window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
    window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));
    theGame.moveAndDraw();
}

let intervalLaunched = false;

const addSaucers = () => {
    if (!intervalLaunched){
        intervalLaunched = true;
        theGame.interval = window.setInterval( () => {
            if (Math.random()>0.5)
                    theGame.addSaucer();
            }, 750 )}
    else {
        intervalLaunched = false;
        window.clearInterval(theGame.interval);
    }
}

window.addEventListener("DOMContentLoaded",setup);

