const express = require('express');
const router = express.Router();

// import controller for clients
const controller = require('../controllers/clientrest');

// use different method to provide REST operations
router.get('/', controller.all );
router.get( '/:id', controller.getClient );
router.put( '/:id', controller.updateClient );
router.post( '/', controller.createClient );
router.delete( '/:id', controller.deleteClient );

module.exports = router;
