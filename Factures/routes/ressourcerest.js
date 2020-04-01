const express = require('express');
const router = express.Router();

// import controller for ressources
const controller = require('../controllers/ressourcerest');

// use different method to provide REST operations
router.get('/all', controller.all );
router.get( '/id/:id', controller.getRessource );
router.put( '/modify/:id', controller.updatePrice );

module.exports = router;
