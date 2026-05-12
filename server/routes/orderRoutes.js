const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  updateOrderToPaid, 
  getMyOrders, 
  getVendorOrders, 
  updateOrderStatus 
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createOrder);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/vendor')
  .get(protect, getVendorOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

router.route('/:id/status')
  .put(protect, updateOrderStatus);

module.exports = router;
