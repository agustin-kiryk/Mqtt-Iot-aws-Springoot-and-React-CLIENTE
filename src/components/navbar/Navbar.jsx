import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
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
          </div>
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
            <h1>Login</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
