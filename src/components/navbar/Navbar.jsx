import "./navbar.scss";
import Boton from "../boton/boton";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [userImage, setUserImage] = useState(null); // Estado para almacenar la imagen del usuario

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(
          'https://iotcoremt-production.up.railway.app/user/userLogin',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserImage(data.image); // Asignar la URL de la imagen a la variable de estado
        } else {
          console.error('Error fetching user data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {!isMobile && userImage && (
            <div className="item">
              <Link to="/perfil" style={{ textDecoration: "none" }}>
                <Avatar alt="Travis Howard" src={userImage} />
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
