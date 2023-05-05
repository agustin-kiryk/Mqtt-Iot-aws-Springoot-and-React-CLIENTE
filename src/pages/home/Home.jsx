import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import ProgressBar from "../progress/ProgressBar";
import Dropbox from "../dropbox/Dropbox";
import "react-circular-progressbar/dist/styles.css";



const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <div className="botondrop"><Dropbox></Dropbox></div>
        <div className="ingreso"> 
        <Widget type="order" />
        </div>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="earning" />
          <Widget type="balance" />
          <Widget type="comisiones" />
          </div>
      
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
