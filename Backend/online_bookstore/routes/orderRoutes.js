const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.get('/customer/:customerId', orderController.getOrdersByCustomerId);
router.post('/', orderController.createOrder);

module.exports = router;
