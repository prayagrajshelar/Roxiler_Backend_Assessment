
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchBarChartData } from '../services/api';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = ({ selectedMonth }) => {
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    const getBarChartData = async () => {
      try {
        const response = await fetchBarChartData(selectedMonth);
        const data = response.data;
        setBarChartData({
          labels: data.priceRanges,
          datasets: [
            {
              label: 'Items in Price Range',
              data: data.counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };
    getBarChartData();
  }, [selectedMonth]);

  return (
    <div>
      {barChartData && <Bar data={barChartData} />}
    </div>
  );
};

export default BarChart;
