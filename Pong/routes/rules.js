const express = require('express');
const router = express.Router();

const rulesController = require('../controllers/rulesController');

/* GET rules page. */
router.get('/', rulesController.displayRules);

module.exports = router;