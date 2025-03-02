const Order = require('../models/Order');
const SKU = require('../models/SKU');
const Customer = require('../models/Customer');
const Counter = require('../models/Counter');
const socket = require('../socket'); // Import socket.js

async function getNextOrderId() {
  const counter = await Counter.findOneAndUpdate(
    { _id: 'order_id' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return `OD-${String(counter.sequence_value).padStart(5, '0')}`;
}

exports.createOrder = async (req, res) => {
  const { customer_id, sku_id, quantity, rate } = req.body;
  const customer = await Customer.findOne({ _id: customer_id, user_id: req.user._id });
  if (!customer) return res.status(404).send({ error: 'Customer not found or not yours' });
  const sku = await SKU.findOne({ _id: sku_id, user_id: req.user._id });
  if (!sku) return res.status(404).send({ error: 'SKU not found or not yours' });
  const total_amount = quantity * rate * (1 + sku.tax_rate / 100);
  const order_id = await getNextOrderId();
  const order = new Order({
    order_id,
    customer_id,
    customer_name: customer.name,
    sku_id,
    sku_name: sku.sku_name,
    quantity,
    rate,
    total_amount,
    user_id: req.user._id,
    username: req.user.username,
  });
  await order.save();

  const io = socket.getIo(); // Get socket.io instance
  io.emit('new_order', {
    message: 'New order placed',
    order_id,
    user: req.user.username,
    customer: customer.name,
    sku: sku.sku_name,
    total_amount,
    timestamp: order.timestamp,
  });

  res.status(201).send({
    order_id,
    customer: customer.name,
    sku: sku.sku_name,
    total_amount,
    timestamp: order.timestamp,
  });
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ user_id: req.user._id });
  res.send(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
};
