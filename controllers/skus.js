const SKU = require('../models/SKU');

exports.createSKU = async (req, res) => {
  const { sku_name, unit_of_measurement, tax_rate } = req.body;
  const sku = new SKU({ sku_name, unit_of_measurement, tax_rate, user_id: req.user._id });
  await sku.save();
  res.status(201).send(sku);
};

exports.getSKUs = async (req, res) => {
  const skus = await SKU.find({ user_id: req.user._id });
  res.send(skus);
};