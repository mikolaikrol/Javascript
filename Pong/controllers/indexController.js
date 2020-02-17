class IndexController {
    constructor(){}

    displayIndex(req, res){
        res.render('index');
    }
}

module.exports = new IndexController();