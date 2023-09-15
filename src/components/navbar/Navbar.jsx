import "./navbar.scss";
import Boton56 from "../boton/boton";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ShowChartIcon from '@mui/icons-material/ShowChart';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Boton56>Cerrar Sesion</Boton56>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
