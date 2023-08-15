import React from 'react';
import { Textfit } from 'react-textfit';
import { Bar } from 'react-chartjs-2';

// Text Widget
const TextWidget = ({ data }) => {
  return <Textfit mode="single">{data}</Textfit>;
};

// Table Widget
const TableWidget = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Chart Widget
const ChartWidget = ({ data }) => {
  // Assuming the data is an array of objects with 'label' and 'value' properties
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Values',
        data: values,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export { TextWidget, TableWidget, ChartWidget };
