const express = require('express');
const router = express.Router();
const { getAirStats, getEpisodeStats } = require('../controllers/airController');

router.get('/air', getAirStats);
router.get('/episode', getEpisodeStats);

module.exports = router;
