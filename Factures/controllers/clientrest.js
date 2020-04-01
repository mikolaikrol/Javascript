const Clients = require('../models/client').model;

// define an REST like API  

// controller for GET /
const all =
  (req,res) =>
        Clients.find()
             .then( allClients => res.status(200).json(allClients) );

// controller for GET /:id
const getClient =
  (req,res) =>
    Clients.findById( req.params.id )
         .then( client => res.status(200).json(client) );

// controller for POST /
const createClient =
  (req,res) => {
    let newClient = { ...req.body };
    Clients.create(newClient)
         .then( client => res.status(200).json(client) );
  }

// controller for PUT /:id
const updateClient =
  (req, res) => {
    let updatedClient = { ...req.body };
    Clients.findByIdAndUpdate( req.params.id, updatedClient, { new : true } )
         .then( client => res.status(200).json(client) );
  }

// controller for DELETE /:id
const deleteClient =
  (req,res) =>
      Clients.findByIdAndRemove( req.params.id )
           .then( () => res.status(200).end() );


module.exports.all = all;
module.exports.getClient = getClient;
module.exports.createClient = createClient;
module.exports.updateClient = updateClient;
module.exports.deleteClient = deleteClient;
