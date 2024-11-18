
import React, { useEffect, useState } from 'react';
import { fetchStatistics } from '../services/api';

const StatisticsBox = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const response = await fetchStatistics(selectedMonth);
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    getStatistics();
  }, [selectedMonth]);

  return (
    <div>
      <h2>Statistics for {selectedMonth}</h2>
      <div>
        <p>Total Sale Amount: ${statistics.totalSaleAmount}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default StatisticsBox;
