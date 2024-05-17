// src/components/ChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Value',
        data: data.map(item => item.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartComponent;
