const express = require('express');
const router = express.Router();

const rulesController = require('../controllers/aboutController');

/* GET rules page. */
router.get('/', rulesController.displayRules);

module.exports = router;