const mongoose = require('mongoose');

// definition of schema for ressource
const ressourceSchema = new mongoose.Schema({
  name : { type : String, required : true },        // a name must be given
  price : {type: Number, required : true, min : 1}
});

// export the schema
module.exports = ressourceSchema;

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../controllers/db');
const Ressources = dbConnection.model('Ressource', ressourceSchema,'ressources');

// export the model
module.exports.model = Ressources;
