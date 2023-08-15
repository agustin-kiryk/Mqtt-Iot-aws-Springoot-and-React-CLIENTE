import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { saveAs } from "file-saver";
import * as ExcelJS from "exceljs";

const List = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const response = await axios.get('https://iotcoremt-production.up.railway.app/transactions/monthlySummaryByUserLogin', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const jsonData = response.data;
          setData(jsonData);
        } else {
          console.error('Token no encontrado en el localStorage.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const userColumns = [ // Define your userColumns here
    { field: 'machineId', headerName: 'ID Maquina' },
    { field: 'month', headerName: 'Mes' },
    { field: 'totalWaterDispensed', headerName: 'Litros Vendidos' },
    { field: 'revenue', headerName: 'Ganancias' },
    { field: 'cost', headerName: 'Derecho de Marca' },
    { field: 'totalAmount', headerName: 'Total Vendido' },
    { field: 'status', headerName: 'Estatus' },
  ];

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

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
<div className="excel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <TextField
    label="Buscar"
    variant="outlined"
    size="small"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
  <a
    href="#"
    onClick={exportToExcel}
    style={{
      textDecoration: "none",
      background: "rgba(0, 128, 0, 1)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "14px",
    }}
  >
    Exportar tabla a Excel
  </a>
</div>


      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {userColumns.map((column) => (
                <TableCell className="tableCell" key={column.field}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                {userColumns.map((column) => (
                  <TableCell className="tableCell" key={column.field}>
                    {row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </TableContainer>


    </div>
  );
};

export default List;
