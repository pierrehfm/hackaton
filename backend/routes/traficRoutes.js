const express = require('express');
const router = express.Router();
const { getTraficStats, getTraficDaysStats } = require('../controllers/traficController');

router.get('/trafic', getTraficStats);
router.get('/traficDay', getTraficDaysStats);
module.exports = router;
