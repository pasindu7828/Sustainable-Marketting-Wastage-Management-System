const express = require('express');
const router = express.Router();
const OrderController = require('../Controllers/OrderController');

// Create order
router.post('/', OrderController.createOrder);
// Get all orders
router.get('/', OrderController.getAllOrders);
// Get order by ID
router.get('/:id', OrderController.getOrderById);
// Delete order
router.delete('/:id', OrderController.deleteOrder);
// Update order status
router.patch('/:id/status', OrderController.updateOrderStatus);

module.exports = router; 