const mongoose = require('mongoose');

const skuSchema = new mongoose.Schema({
  sku_name: { type: String, required: true },
  unit_of_measurement: { type: String, required: true },
  tax_rate: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('SKU', skuSchema);