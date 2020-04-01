const Ressources = require('../models/ressource').model;

// define an REST like API  

// controller for GET /
const all =
  (req,res) =>
        Ressources.find()
             .then( allRessources => res.status(200).json(allRessources));

// controller for GET /id/:id
const getRessource =
  (req,res) =>
    Ressources.findById( (req.params.id) )
         .then( ressource => res.status(200).json(ressource) );

// controller for PUT /modify/:id
const updatePrice =
  (req, res) => {
    let updatedRessource = { ...req.body };
    Ressources.findByIdAndUpdate( req.params.id, updatedRessource, { new : true } )
         .then( ressource => res.status(200).json(ressource) );
  }

module.exports.all = all;
module.exports.getRessource = getRessource;
module.exports.updatePrice = updatePrice;
