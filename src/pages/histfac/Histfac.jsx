import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource4";
import { UserTable, fetchUserData } from '../../datatablesource4';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./histfac.scss";
import Widget from "../../components/widget3/Widget";
import { saveAs } from "file-saver"; // Import file-saver to save the Excel file
import * as ExcelJS from "exceljs";

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

  const { id } = useParams(); // Obtener la ID de la URL

  useEffect(() => {
    const fetchData = async () => {
      const rows = await fetchUserData(id); // Pasar la ID a la función userRows
      setData(rows);
    };
    fetchData();
  }, [id]);


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
          <a href="/home">Volver</a>
        </span>
      </div>
      <div className="datatableTitle">
        <h1>Historial de Facturacion</h1>
      </div>
      <Widget></Widget>
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
          columns={userColumns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          rowHeight={80}
          autoHeight
        />
      </div>
      <button onClick={exportToExcel}>Exportar a Excel</button>
    </div>
  );
};

export default Datatable;
