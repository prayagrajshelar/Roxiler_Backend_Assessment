const Transaction = require('../models/Transaction');

const getStatistics = async (req, res) => {
  const { month } = req.params;

  const startDate = new Date(`2024-${month}-01`);
  const endDate = new Date(`2024-${month}-31`);

  try {
    const salesData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$price' },
          totalItemsSold: { $sum: '$quantitySold' },
          totalNotSold: {
            $sum: {
              $cond: [{ $eq: ['$quantitySold', 0] }, 1, 0]
            }
          }
        }
      }
    ]);

    res.json(salesData[0] || { totalSales: 0, totalItemsSold: 0, totalNotSold: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStatistics };
