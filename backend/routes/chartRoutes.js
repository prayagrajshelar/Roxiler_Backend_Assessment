const express = require('express');
const { getPriceRangeStats, getCategoryStats } = require('../controllers/chartController');  // Ensure correct import
const router = express.Router();

// Route for price range statistics
router.get('/:month/price-range', getPriceRangeStats);

// Route for category statistics
router.get('/:month/category-stats', getCategoryStats);

module.exports = router;
