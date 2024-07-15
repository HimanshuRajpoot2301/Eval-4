const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/export-orders', adminController.exportOrdersToCSV);
router.get('/stream-logs', adminController.streamLogs);

module.exports = router;
