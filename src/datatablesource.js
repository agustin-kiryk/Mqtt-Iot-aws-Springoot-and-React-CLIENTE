import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

export const userColumns = [
  //Cambiar ancho tablas
  {
    field: "machinesTotals",
    headerName: "Cantidad de Maquinas",
    width: 150,
  },
  {
    field: "firstName",
    headerName: "Nombre",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="">
          <img className="" alt="" />
          {params.row.firstName}
        </div>
      );
    },
  },
  {
    field: "lastName",
    headerName: "Apellido",
    width: 170,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "adress",
    headerName: "Direccion",
    width: 100,
  },

  {
    field: "phone",
    headerName: "Telefono",
    width: 200,
  },
  {
    field: "cost",
    headerName: "Derecho de marca",
    width: 200,
    valueFormatter: ({ value }) => `${value}%`, // Agregar el símbolo "%" al valor
  },
  {
    field: "status",
    headerName: "Estatus",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export function UserTable() {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://iotcoremt-production.up.railway.app/user/all")
      .then((response) => setUserRows(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Tabla de usuarios</h1>
      <DataGrid rows={userRows} columns={userColumns} />
    </div>
  );
}

export async function userRows() {
  try {
    const response = await axios.get('https://iotcoremt-production.up.railway.app/user/all');
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default UserTable;
