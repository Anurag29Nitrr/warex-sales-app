const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  const { name, address } = req.body;
  const customer = new Customer({ name, address, user_id: req.user._id });
  await customer.save();
  res.status(201).send(customer);
};

exports.getCustomers = async (req, res) => {
  const customers = await Customer.find({ user_id: req.user._id });
  res.send(customers);
};