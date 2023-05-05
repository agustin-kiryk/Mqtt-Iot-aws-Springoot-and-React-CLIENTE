import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {CircularProgressbar,CircularProgressbarWithChildren, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
        <CircularProgressbar   styles={buildStyles({
          textColor: "black",
          pathColor: "turquoise",
          trailColor: "lightgreen"
        })} value={70} text={"70%"} strokeWidth={8} />
         
        </div>
        <p className="title">Dias para finalizar el ciclo de facturacion</p>
        <p className="amount">15</p>
        <p className="desc">
          Historial de ventas
        </p>
        <div className="featuredChart">
        <CircularProgressbar   styles={buildStyles({
          textColor: "black",
          pathColor: "turquoise",
          trailColor: "lightgreen"
        })} value={50} text={"50%"} strokeWidth={8} />
         </div>
         <p className="title">Proximo cambio de filtro</p>
        <p className="amount">Febrero</p>
      </div>
    </div>
  );
};

export default Featured;
