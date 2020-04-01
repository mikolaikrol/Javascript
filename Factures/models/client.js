const mongoose = require('mongoose');
const ressourceDataSchema = require('./ressourceData');

// definition of schema for client
const clientSchema = new mongoose.Schema({
  name : { type : String, required : true },        // a name must be given
  datas : { type : [ressourceDataSchema], required : true}
});


// export the schema
module.exports = clientSchema;

// schema must be "compiled" into a model and "bound" to a collection of a database managed by a connection
const dbConnection = require('../controllers/db');
const Clients = dbConnection.model('Client', clientSchema,'clients');

// export the model
module.exports.model = Clients;
