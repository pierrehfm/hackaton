const express = require('express');
const router = express.Router();
const { getTraficStats, getRoutesStats } = require('../controllers/traficController');

router.get('/trafic', getTraficStats);
router.get('/route', getRoutesStats);

module.exports = router;
