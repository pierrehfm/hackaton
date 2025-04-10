const express = require('express');
const router = express.Router();
const { getAirStats } = require('../controllers/airController');

router.get('/air', getAirStats);

module.exports = router;
