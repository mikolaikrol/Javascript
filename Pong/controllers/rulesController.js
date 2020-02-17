class RulesController {
    constructor(){}

    displayRules(req, res){
        res.render('rules');
    }
}

module.exports = new RulesController();