
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPieChartData } from '../services/api';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const PieChart = ({ selectedMonth }) => {
  const [pieChartData, setPieChartData] = useState(null);

  useEffect(() => {
    const getPieChartData = async () => {
      try {
        const response = await fetchPieChartData(selectedMonth);
        const data = response.data;
        setPieChartData({
          labels: data.categories,
          datasets: [
            {
              data: data.itemCounts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };
    getPieChartData();
  }, [selectedMonth]);

  return (
    <div>
      {pieChartData && <Pie data={pieChartData} />}
    </div>
  );
};

export default PieChart;
