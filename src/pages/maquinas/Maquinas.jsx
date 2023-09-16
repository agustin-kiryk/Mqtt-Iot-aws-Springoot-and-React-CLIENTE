import "./maquinas.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource3";
import { UserTable, fetchUserData } from '../../datatablesource3';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver"; // Import file-saver to save the Excel file
import * as ExcelJS from "exceljs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the ArrowBack icon

const Datatable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState('');
  const [monthNumber, setMonthNumber] = useState(1);


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
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleDelete = (machineId) => {
    if (window.confirm("¿Estás seguro de que quieres borrar esta máquina?")) {
      axios
        .delete(`https://iotcoremt-production.up.railway.app/machines/delete/${machineId}`)
        .then(() => {
          setData(data.filter((item) => item.machineId !== machineId));
        })
        .catch((error) => console.log(error));
    }
  };

  // Obtener la machineId de la URL
  const { machineId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Pasa la machineId a la función fetchUserData
      const rows = await fetchUserData(machineId);
      setData(rows);
    };
    fetchData();
  }, [machineId]); // Agrega la machineId como dependencia de useEffect para que se vuelva a ejecutar cada vez que cambia

  const actionColumn = [
    {
      field: "action",
      headerName: "Accion",
      width: 190,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/maquinas/${params.row.machineId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Detalles</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.machineId)}
            >
              Borrar
            </div>
          </div>
        );
      },
    },
  ];
 
  // Filtrar los datos en función del término de búsqueda
  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="datatable">
      <div className="back">
        <span>
          <a href="/home"><ArrowBackIcon /></a>
        </span>
      </div>
      <div className="datatableTitle">
        <h1>Lista de Maquinas</h1>
      </div>
      <div className="searchBarWrapper">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="tableWrapper">
        <DataGrid
          className="datagrid"
          rows={filteredData}
          columns={userColumns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          rowHeight={140}
          autoHeight
        />
        <button onClick={exportToExcel}>Exportar a Excel</button>
      </div>
    </div>
  );
};

export default Datatable;