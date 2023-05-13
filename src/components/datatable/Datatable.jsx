import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import UserTable, { userRows } from "../../datatablesource";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect  } from "react";
import axios from "axios";


const Datatable = () => {
  
  
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres borrar este cliente?")) {
      axios
        .delete(`https://disfracesrosario.up.railway.app/clients/${id}`)
        .then(() => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => console.log(error));
    }
  };
  
  
  // Obtener la ID de la URL
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Pasa la ID a la función userRows
      const rows = await userRows(id);
      setData(rows);
    };
    fetchData();
  }, [id]); // Agrega la ID como dependencia de useEffect para que se vuelva a ejecutar cada vez que cambia

  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link  to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Detalles</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Borrar
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        <h1> Lista de Clientes</h1>
      </div>
      <div className="tableWrapper">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        autoHeight
      />
    </div>
    </div>
  );
};



export default Datatable;
