const express = require('express');
const { getStatistics } = require('../controllers/statisticsController');
const router = express.Router();

router.get('/:month', getStatistics);

module.exports = router;
