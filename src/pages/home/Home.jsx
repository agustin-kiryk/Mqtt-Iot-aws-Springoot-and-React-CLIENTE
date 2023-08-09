import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Estatus from "../../pages/config/config"
import Datatable from "../../components/datatable/Datatable";
import Widget from "../../components/widget/Widget";
import BackDrop from "../../components/backdrop/backdrop";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Boton from "../../components/botones/botones";
import ProgressBar from "../progress/ProgressBar";
import Dropbox from "../dropbox/Dropbox";
import "react-circular-progressbar/dist/styles.css";



const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <div className="ingreso"> 
        <Widget type="order" />
        </div>
        <div className="widgets">
        <div className="widgetU">
         <Widget type="user" />
        </div>
        <div className="widgetE">
          <Widget type="earning" />
        </div>
        <div className="widgetB">
          <Widget type="balance" />
        </div>
        <div className="widgetC">
          <Widget type="comisiones" />
        </div>
        </div>
        <div>
          <Boton></Boton>
        </div>
        <div className="charts">
          <Chart title="Last 6 Months (Revenue)" aspect={3/1} />
        </div>

        
        <div className="estatus">
          <Estatus></Estatus>
        </div>
        <div className="listContainer">
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default Home;
