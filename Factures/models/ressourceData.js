const mongoose = require('mongoose');

const ressourceDataSchema = new mongoose.Schema(
    {
        energy : mongoose.ObjectId,
        data : [Number]
    }
);

module.exports = ressourceDataSchema;

const dbConnection = require('../controllers/db');
const Clients = dbConnection.model('RessourceData', ressourceDataSchema,'ressourcesData');

// export the model
module.exports.model = Clients;

  