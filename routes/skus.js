const express = require('express');
const router = express.Router();
const skusController = require('../controllers/skus');
const { auth } = require('../middleware/auth');

router.post('/', auth, skusController.createSKU);
router.get('/', auth, skusController.getSKUs);

module.exports = router;