import React, { useState, useEffect } from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const Featured = () => {
  const [selectedId, setSelectedId] = useState("");
  const [machineData, setMachineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleIdChange = (event) => {
    setSelectedId(event.target.value);
  };

  const getMonthName = (monthNumber) => {
    return monthNames[monthNumber];
  };

  useEffect(() => {
    // Obtener el token del Local Storage
    const token = localStorage.getItem("jwtToken");

    // Si no hay token, no continuar
    if (!token) return;

    // Hacer la solicitud al endpoint con el token
    fetch("https://iotcoremt-production.up.railway.app/machines/statsWidgetUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMachineData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title"></h1>
        <Select
          value={selectedId}
          onChange={handleIdChange}
          style={{
            backgroundColor: "green",
            color: "white",
            width: "150px",
            marginRight:"25vw",
            borderRadius: "5px",
          }}
        >
          {machineData.map((machine) => (
            <MenuItem key={machine.machineId} value={machine.machineId}>
              {machine.machineId}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="bottom">


        {isLoading ? (
          <p>Loading...</p>
        ) : (
          machineData.map((machine) => (
            selectedId === machine.machineId && (
              <div className="featuredChart" key={machine.machineId}>
                <CircularProgressbar
                  styles={buildStyles({
                    textColor: "black",
                    pathColor: "turquoise",
                    trailColor: "white",
                  })}
                  value={machine.daysPercen}
                  text={`${machine.daysPercen}%`}
                  strokeWidth={8}
                />
              </div>
            )
          ))
        )}
        <p className="title">Dias para finalizar el ciclo de facturacion</p>
        <p className="amount">{selectedId ? "15" : ""}</p>
        <p className="desc">Historial de ventas</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          machineData.map((machine) => (
            selectedId === machine.machineId && (
              <div className="featuredChart" key={machine.machineId}>
                <CircularProgressbar
                  styles={buildStyles({
                    textColor: "black",
                    pathColor: "turquoise",
                    trailColor: "white",
                  })}
                  value={machine.percentageToFilterChange}
                  text={`${machine.percentageToFilterChange}%`}
                  strokeWidth={8}
                />
              </div>
            )
          ))
        )}
        <p className="title">Proximo cambio de filtro</p>
        <p className="amount">
          {selectedId ? (
            getMonthName(
              machineData.find((machine) => machine.machineId === selectedId).filterChangeMonth
            ))
         : (
            ""
          )}
        </p>
      </div>
    </div>
  );
};

export default Featured;
