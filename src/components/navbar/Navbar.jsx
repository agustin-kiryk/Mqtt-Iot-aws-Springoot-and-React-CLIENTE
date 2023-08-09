import "./navbar.scss";
import Boton from "../boton/boton";
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
          <div className="login">
            <Link to="/login" style={{ textDecoration: "none" }}>
            <Boton></Boton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
