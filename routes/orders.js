const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/', auth, ordersController.createOrder);
router.get('/', auth, ordersController.getOrders);
router.get('/all', auth, isAdmin, ordersController.getAllOrders);

module.exports = router;