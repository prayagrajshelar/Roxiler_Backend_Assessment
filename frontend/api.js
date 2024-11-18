import axios from 'axios';

// Base URL for your backend API
const BASE_URL = 'http://localhost:5000'; 

// Fetch transactions based on month and search parameters
export const fetchTransactions = (month, searchQuery, page = 1, perPage = 10) => {
  return axios.get(`${BASE_URL}/transactions`, {
    params: {
      month,
      search: searchQuery,
      page,
      perPage,
    },
  });
};

// Fetch statistics for the selected month
export const fetchStatistics = (month) => {
  return axios.get(`${BASE_URL}/statistics`, {
    params: { month },
  });
};

// Fetch bar chart data for the selected month
export const fetchBarChartData = (month) => {
  return axios.get(`${BASE_URL}/bar-chart`, {
    params: { month },
  });
};

// Fetch pie chart data for the selected month
export const fetchPieChartData = (month) => {
  return axios.get(`${BASE_URL}/pie-chart`, {
    params: { month },
  });
};
