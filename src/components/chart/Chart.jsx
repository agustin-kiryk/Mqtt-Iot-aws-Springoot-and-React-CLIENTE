import React, { useState, useEffect } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        if (!jwtToken) {
          console.error("Token no encontrado en el localStorage.");
          return;
        }

        const headers = {
          "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${jwtToken}`,
        };

        const response = await axios.get(
          "https://iotcoremt-production.up.railway.app/transactions/monthlySummaryAllMachines",
          {
            headers,
          }
        );

        setData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const getMonthName = (month) => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return months[month - 1] || "";
  };

  const allMonths = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const monthlyData = allMonths.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {});
  
  data.forEach((item) => {
    const monthName = getMonthName(item.month); // Sin restar 1 al número de mes
    monthlyData[monthName] += item.totalAmount;
  });
  
  const chartData = allMonths.map((month) => ({
    name: month,
    Total: monthlyData[month],
  }));
  
  return (
    <div className="chart">
      <div className="title">Ganancias Generales</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ffaa" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#26bfda" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#000"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
