import * as React from 'react';
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CopyrightIcon from "@mui/icons-material/Copyright";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Link } from "react-router-dom";
import Dropbox from "../../pages/dropbox/Dropbox";


const Widget = ({ type, selected, data }) => {
  let widgetData;

  React.useEffect(() => {
    // Leer datos del localStorage al iniciar el componente
    const storedData = localStorage.getItem('selectedMachineData');
    if (storedData) {
      const data = JSON.parse(storedData);
      // Aquí puedes filtrar o procesar los datos según tus necesidades
      // Por ejemplo, si deseas obtener la cantidad de litros vendidos, podrías hacer:
      const totalWaterDispensed = data.reduce((sum, item) => sum + item.totalWaterDispensed, 0);
      // Y luego asignar el valor al widgetData
      widgetData = {
        title: "LITROS VENDIDOS",
        isLitros: true,
        link: "View net earnings",
        number: totalWaterDispensed,
      };
    }
  }, []);



  switch (type) {
    case "user":
      data = {
        title: "MAQUINAS",
        isMoney: false,
        link: "See all users",
        icon: (
          <GasMeterIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        number: 5, // Asignar un número único para este caso
      };
      break;
    case "order":
      widgetData = {
        title: "INGRESO DINERO",
        isMoney: true,
        link: "",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        number: "800.000", // Asignar un número único para este caso
      };
      break;


       case "earning":
      // Ya no necesitamos el data && data.length > 0
      // Simplemente usamos el valor de totalWaterDispensed directamente
      widgetData = {
        title: "LITROS VENDIDOS",
        isLitros: true,
        link: "View net earnings",
        number: widgetData?.totalWaterDispensed || "0",
      };
      break;


    case "balance":
      data = {
        title: "GANANCIAS",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        number: "300.000", // Asignar un número único para este caso
      };
      break;
    case "comisiones":
      data = {
        title: "DERECHO DE MARCA",
        isMoney: true,
        link: "View commission details",
        icon: (
          <CopyrightIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
        number: "500.000", // Asignar un número único para este caso
      };
      break;
    default:
      break;
  }

  return (
    <div className={`widget ${type} ${selected ? "selected" : ""}`}>
      <div className="left">
        <span className="title">{widgetData?.title}</span>
        <span className="counter" style={{ fontWeight: "bold" }}>
          {widgetData?.isMoney && "$"} {widgetData?.number}
        </span>
      </div>
      <div className="right">
        <div className=" "></div>
        {widgetData?.icon}
      </div>
    </div>
  );
};

export default Widget;
