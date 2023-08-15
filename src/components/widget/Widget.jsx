import "./widget.scss";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CopyrightIcon from "@mui/icons-material/Copyright";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch("https://iotcoremt-production.up.railway.app/transactions/statsAdmin", {
          headers: {
            "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
            
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();

        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (!data) {
    // Loading state
    return <div>Loading...</div>;
  }

  let widgetData;

  switch (type) {
    case "user":
      widgetData = {
        title: "MAQUINAS",
        isMoney: false,
        link: "See all users",
        icon: (
          <Link to="/maquinas" style={{ textDecoration: "none" }}>
            <GasMeterIcon
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          </Link>
        ),
        number: data.machinesTotals,
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
        number: data.amount,
      };
      break;
    case "earning":
      widgetData = {
        title: "LITROS VENDIDOS",
        isLitros: true,
        link: "View net earnings",
        icon: (
          <WaterDropIcon
            className="icon"
            style={{ backgroundColor: "rgba(51, 89, 212, 0.651)", color: "blue" }}
          />
        ),
        number: data.dispensedWater,
      };
      break;
    case "balance":
      widgetData = {
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
        number: data.revenue,
      };
      break;
    case "comisiones":
      widgetData = {
        title: "FRANQUICIADOS",
        isMoney: false,
        link: "View commission details",
        icon: (
          <AccountCircleIcon
            className="icon"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
        number: data.userTotals,
      };
      break;
    default:
      break;
  }

  return (
    <div className={`widget ${type}`}>
      <div className="left">
        <span className="title">{widgetData.title}</span>
        <span className="counter" style={{ fontWeight: "bold" }}>
          {widgetData.isMoney && "$"} {widgetData.number}
        </span>
      </div>
      <div className="right">
        <div className=" "></div>
        {widgetData.icon}
      </div>
    </div>
  );
};

export default Widget;
