import "./navbar.scss";
import Boton from "../boton/boton";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  // Verifica si el ancho de la pantalla es menor que 768 píxeles
  const isMobile = window.innerWidth < 768;

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {/* Mostrar el enlace "Perfil" solo si no estamos en un dispositivo móvil */}
          {!isMobile && (
            <div className="item">
              <Link to="/perfil" style={{ textDecoration: "none" }}>
              <Avatar alt="Travis Howard" src="https://cdn.discordapp.com/attachments/1061404202498277458/1105998913749667880/image.png" />
              </Link>
            </div>
          )}
          <div className="login">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Boton />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
