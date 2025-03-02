const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reports');
const { auth, isAdmin } = require('../middleware/auth');

router.get('/hourly', auth, isAdmin, reportsController.getHourlyReports);
router.post('/generate-hourly', auth, isAdmin, reportsController.manualGenerateReport);

module.exports = router;