const path = require('path');

class PlayController {
    constructor(){}

    play(req, res){
        const root = __dirname.substr(0, __dirname.length - 12);
        const options = {root: root};
        res.sendFile('/public/dist/play.html', options);
    }
}

module.exports = new PlayController();