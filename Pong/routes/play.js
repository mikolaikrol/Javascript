const express = require('express');
const router = express.Router();

const playController = require('../controllers/playController');

/* GET play page. */
router.get('/', playController.play);

module.exports = router;