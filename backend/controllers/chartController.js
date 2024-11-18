const Transaction = require('../models/Transaction');

// Get statistics for price ranges
const getPriceRangeStats = async (req, res) => {
  const { month } = req.params;

  const startDate = new Date(`2024-${month}-01`);
  const endDate = new Date(`2024-${month}-31`);

  try {
    const priceRanges = [
      { range: '0-100', min: 0, max: 100 },
      { range: '101-200', min: 101, max: 200 },
      { range: '201-300', min: 201, max: 300 },
      { range: '301-400', min: 301, max: 400 },
      { range: '401-500', min: 401, max: 500 },
      { range: '501-600', min: 501, max: 600 },
      { range: '601-700', min: 601, max: 700 },
      { range: '701-800', min: 701, max: 800 },
      { range: '801-900', min: 801, max: 900 },
      { range: '901-above', min: 901, max: Infinity }
    ];

    const result = await Promise.all(priceRanges.map(async (range) => {
      const count = await Transaction.countDocuments({
        dateOfSale: { $gte: startDate, $lte: endDate },
        price: { $gte: range.min, $lte: range.max }
      });
      return { range: range.range, count };
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get statistics for categories
const getCategoryStats = async (req, res) => {
  const { month } = req.params;

  const startDate = new Date(`2024-${month}-01`);
  const endDate = new Date(`2024-${month}-31`);

  try {
    const categories = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPriceRangeStats, getCategoryStats };
