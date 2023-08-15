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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";

const Chart = ({ aspect, title }) => {
  const [selectedId, setSelectedId] = useState("");
  const [data, setData] = useState([]);
  const [machineIds, setMachineIds] = useState([]);

  const handleIdChange = (event) => {
    setSelectedId(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");

        if (!jwtToken) {
          console.error("Token no encontrado en el localStorage.");
          return;
        }

        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        const response = await axios.get(
          "https://iotcoremt-production.up.railway.app/transactions/monthlySummaryByUserLogin",
          {
            headers,
          }
        );

        setData(response.data);

        // Obtener las machineId únicas del conjunto de datos
        const uniqueMachineIds = Array.from(
          new Set(response.data.map((item) => item.machineId))
        );
        setMachineIds(uniqueMachineIds);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Función para obtener el nombre del mes a partir del número del mes (1 a 12)
  const getMonthName = (monthNumber) => {
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
    return months[monthNumber - 1] || "";
  };

  // Generar un array con todos los nombres de los meses
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

  // Filtrar los datos según la machineId seleccionada
  const filteredData = data.filter((item) => item.machineId === selectedId);

  // Crear un objeto que contenga el total de cada mes en 0 por defecto
  const monthlyData = allMonths.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {}); 
 
  // Llenar los datos con el total de cada mes en base a los datos filtrados
  filteredData.forEach((item) => {
    const monthName = getMonthName(item.month);
    monthlyData[monthName] = item.totalAmount;
  });

  // Transformar los datos en el formato requerido por Recharts
  const chartData = Object.entries(monthlyData).map(([name, Total]) => ({
    name,
    Total,
  }));

  return (
    <div className="chart">
<Select
  value={selectedId}
  onChange={handleIdChange}
  style={{
    backgroundColor: "green",
    color: "white",
    borderRadius: "5px",
    width: "20%", // Ancho del 20% por defecto
    boxSizing: "border-box", // Incluir el padding en el ancho total
  }}
  className="custom-select" // Agrega una clase para identificar el componente
>
  {machineIds.map((id) => (
    <MenuItem key={id} value={id}>
      Maquina {id}
    </MenuItem>
  ))}
</Select>



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
