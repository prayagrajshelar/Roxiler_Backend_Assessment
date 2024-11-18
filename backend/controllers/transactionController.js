const Transaction = require('../models/Transaction');

const listTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = '' } = req.query;
  const skip = (page - 1) * perPage;

  try {
    const transactions = await Transaction.find({
      $or: [
        { productTitle: { $regex: search, $options: 'i' } },
        { productDescription: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ]
    })
    .skip(skip)
    .limit(Number(perPage));

    const total = await Transaction.countDocuments({
      $or: [
        { productTitle: { $regex: search, $options: 'i' } },
        { productDescription: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ]
    });

    res.json({ transactions, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listTransactions };
