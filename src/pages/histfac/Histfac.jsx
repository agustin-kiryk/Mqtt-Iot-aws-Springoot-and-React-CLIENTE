import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource4";
import { UserTable, fetchUserData } from '../../datatablesource4';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./histfac.scss";
import { saveAs } from "file-saver";
import * as ExcelJS from "exceljs";
import Boton2 from "../../components/boton3/boton"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the ArrowBack icon

const Datatable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState('');
  const [monthNumber, setMonthNumber] = useState(1);


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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Maquinas");

    const columnHeaders = userColumns.map((column) => column.headerName);
    worksheet.addRow(columnHeaders);

    const rows = data.map((rowData) => {
      return userColumns.map((column) => rowData[column.field]);
    });

    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "maquinas.xlsx");
  };



  // Filtrar los datos en función del término de búsqueda
  const filteredData = data.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="datatable">

      <div className='volver'>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Boton2 />
        </Link>
      </div>
      <div className="datatableTitle">
        <h1>Historial de Facturacion</h1>
      </div>

      <div className="searchBarWrapper">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
                <a
          href="#"
          onClick={exportToExcel}
          style={{
            display: "inline-block",
            position: "relative",
            textDecoration: "none",
            background: "rgba(0,128,0,255)",
            color: "white",
            padding: "7px 10px",
            marginLeft: "79.5vw",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          Exportar a Excel
        </a>
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

    </div>
  );
};

export default Datatable;
