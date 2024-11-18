const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const fetchAndSeedData = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch data from API');
    }

    const transactions = response.data;

    if (transactions.length === 0) {
      console.log('No data to insert');
      return;
    }

    const insertedData = await Transaction.insertMany(transactions);
    console.log(`${insertedData.length} records inserted successfully.`);
  } catch (error) {
    console.error('Error fetching or seeding data: ', error.message);
  }
};

module.exports = fetchAndSeedData;
