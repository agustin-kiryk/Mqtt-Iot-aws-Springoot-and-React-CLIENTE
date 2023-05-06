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
          <div className="item">
            <ShowChartIcon></ShowChartIcon>
          </div>
          <div className="item">
            <Link to="/perfil" style={{ textDecoration: "none" }}>
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </Link>
          </div>
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
