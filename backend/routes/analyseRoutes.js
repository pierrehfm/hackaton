const express = require('express');
const router = express.Router();
const { getAnalyseStats } = require('../controllers/analyseController');

router.get('/analyse', getAnalyseStats);

module.exports = router;
