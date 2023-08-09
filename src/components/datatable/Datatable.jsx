import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import UserTable, { userRows } from "../../datatablesource";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect  } from "react";
import axios from "axios";
import { saveAs } from "file-saver"; // Import file-saver to save the Excel file
import * as ExcelJS from "exceljs";

const Datatable = () => {
  
  
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres borrar este cliente?")) {
      axios
        .delete(`https://iotcoremt-production.up.railway.app/clients/${id}`)
        .then(() => {
          setData(data.filter((item) => item.id !== id));
        })
        .catch((error) => console.log(error));
    }
  };
  const exportToExcel = async () => {
    // Create a new Workbook
    const workbook = new ExcelJS.Workbook();

    // Add a new worksheet to the workbook
    const worksheet = workbook.addWorksheet("Maquinas");

    // Extract the column headers from userColumns
    const columnHeaders = userColumns.map((column) => column.headerName);

    // Set the headers as the first row in the worksheet
    worksheet.addRow(columnHeaders);

    // Extract the data rows from the DataGrid rows prop
    const rows = data.map((rowData) => {
      return userColumns.map((column) => rowData[column.field]);
    });

    // Add the data rows to the worksheet
    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    // Generate a buffer for the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Save the buffer as a file using FileSaver
    saveAs(new Blob([buffer]), "maquinas.xlsx");
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
    <div className="excel">
  <a
    href="#"
    onClick={exportToExcel}
    style={{
      display: "inline-block",
      textDecoration: "none",
      background: "rgba(0,128,0,255)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "14px",
    }}
  >
    Exportar tabla a Excel
  </a>
</div>

    </div>
  );
};



export default Datatable;
