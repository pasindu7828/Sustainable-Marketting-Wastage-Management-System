const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  price: { type: Number, required: true },
  quantityKg: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String }
  },
  items: [OrderItemSchema],
  total: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema); 