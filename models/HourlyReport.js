const mongoose = require('mongoose');

const hourlyReportSchema = new mongoose.Schema({
  hour: { type: Date, required: true },
  total_orders: { type: Number, required: true },
  total_amount: { type: Number, required: true },
});

module.exports = mongoose.model('HourlyReport', hourlyReportSchema);