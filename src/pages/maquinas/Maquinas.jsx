import "./maquinas.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource3";
import UserTable, { userRows } from "../../datatablesource3";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect  } from "react";
import axios from "axios";
import Boton2 from "../../components/boton3/boton"

const Datatable = () => {
  const [data, setData] = useState([]);

  const { id } = useParams(); // Obtener la ID de la URL

  useEffect(() => {
    const fetchData = async () => {
      const rows = await userRows(id); // Pasar la ID a la función userRows
      setData(rows);
    };
    fetchData();
  }, [id]);
  

  return (
    <div className="datatable">
       <Link to="/" style={{ textDecoration: "none" }}>
      <Boton2 />
      </Link>
      <div className="datatableTitle">
        <h1> Maquinas</h1>
      </div>
      <div className="tableWrapper">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        rowHeight={140}
        autoHeight
      />
    </div>
    </div>
  );
};



export default Datatable;
