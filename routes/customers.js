const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');
const { auth } = require('../middleware/auth');

router.post('/', auth, customersController.createCustomer);
router.get('/', auth, customersController.getCustomers);

module.exports = router;