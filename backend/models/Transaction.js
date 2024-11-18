const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productTitle: String,
  productDescription: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  quantitySold: Number
});

module.exports = mongoose.model('Transaction', transactionSchema);
