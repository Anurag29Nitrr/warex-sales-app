const cron = require('node-cron');
const HourlyReport = require('../models/HourlyReport');
const Order = require('../models/Order');

async function generateHourlyReport() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 1);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
  const orders = await Order.find({ timestamp: { $gte: start, $lt: end } });
  const total_orders = orders.length;
  const total_amount = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const report = new HourlyReport({ hour: start, total_orders, total_amount });
  await report.save();
}

cron.schedule('0 * * * *', generateHourlyReport);

exports.getHourlyReports = async (req, res) => {
  const reports = await HourlyReport.find({}).sort({ hour: -1 });
  res.send(reports);
};

exports.manualGenerateReport = async (req, res) => {
  await generateHourlyReport();
  res.send({ message: 'Hourly report generated' });
};