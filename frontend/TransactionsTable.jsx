
import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetchTransactions(selectedMonth, searchQuery, page);
        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    getTransactions();
  }, [selectedMonth, searchQuery, page]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title, description, or price"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(Math.max(1, page - 1))}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(Math.min(totalPages, page + 1))}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
