
import React, { useState } from 'react';
import TransactionsTable from '/components/TransactionsTable';  
import StatisticsBox from '/components/StatisticsBox';
import BarChart from '/components/BarChart';
import PieChart from '/components/PieChart';
import './assets/styles.css'; 



const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <div>
        <label>Choose Month: </label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <StatisticsBox selectedMonth={selectedMonth} />
      <TransactionsTable selectedMonth={selectedMonth} />
      <BarChart selectedMonth={selectedMonth} />
      <PieChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
