class AboutController {
    constructor(){}

    displayRules(req, res){
        res.render('about');
    }
}

module.exports = new AboutController();