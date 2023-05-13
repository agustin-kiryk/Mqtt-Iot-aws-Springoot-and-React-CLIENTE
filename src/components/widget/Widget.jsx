import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CopyrightIcon from '@mui/icons-material/Copyright';
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 10000;
  const diff = 20;
  

  switch (type) {
    case "user":
      data = {
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
        number: 60 // Asignar un número único para este caso
      };
      break;
      case "order":
        data = {
          
          title: "INGRESO DINERO",
          isMoney: true,
          link: "",
          icon: (
            <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
          ),
          number: 800000 // Asignar un número único para este caso
        };
      break;
    case "earning":
      data = {
        title: "LITROS VENDIDOS",
        isLitros: true,
        link: "View net earnings",
        icon: (
          <WaterDropIcon
            className="icon"
            style={{ backgroundColor: "rgba(51, 89, 212, 0.651)", color: "blue" }}
          />
        ),
        number: 5000 // Asignar un número único para este caso
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
        number: 300000 // Asignar un número único para este caso
      };
      break;
    case "comisiones":
      data = {
        title: "Clientes",
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
        number: 50 // Asignar un número único para este caso
      };
      break;
    default:
      break;
  }

  return (
    <div className={`widget ${type}`}>
<div className="left">
  <span className="title">{data.title}</span>
  <span className="counter" style={{fontWeight: 'bold'}}>
  {data.isMoney && "$"} {data.number}
</span>

</div>
      <div className="right">
        <div className=" "></div>
        {data.icon}
      </div>
    </div>
  );
  
};

export default Widget;
