import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";


export const userColumns = [
  {
    field: "machineId",
    headerName: "Identificador",
    width: 120,
  },
  {
    field: "userId",
    headerName: "Id de Usuario",
    width: 150,
  },

  {
    field: "currency",
    headerName: "Tipo de moneda",
    width: 180,
  },
  {
    field: "price",
    headerName: "Precio por litro",
    width: 150,
    renderCell: (params) => {
    },
  },
  {
    field: "status",
    headerName: "Estatus",
    width: 150,
    renderCell: (params) => {
    },
  },
  {
    field: "light",
    headerName: "Luz",
    width: 90,
  },

  {
    field: "valveFill",
    headerName: "Valvula de Carga",
    width: 250,
    renderCell: (params) => {
    },
  },
  {
    field: "valveWash",
    headerName: "Valvula de Lavado",
    width: 250,
    renderCell: (params) => {
    },
  },
  {
    field: "waterPumpSwich",
    headerName: "Bomba de Agua",
    width: 240,
    renderCell: (params) => {
    },
  },


];

export function UserTable() {
  const [fetchUserData, setfetchUserData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUserData();
        setfetchUserData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = fetchUserData.filter((row) => {
    const costumeName = row.name.toLowerCase();
    return costumeName.includes(searchValue.toLowerCase());
  });

  return (
    <div>
      <TextField
        label="Buscar"
        variant="outlined"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <DataGrid rows={filteredData} columns={userColumns} />
    </div>
  );
}

export async function fetchUserData() {
  try {
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNjg5ODM4ODY4LCJpYXQiOjE2ODk4MDI4Njh9.zvJZ_imtsBaeSMj6za2rPuWfojuVBHBqHBfbcJzeLQlX7QxJvWv-FcpYZQn4_tsO0XaiWAWIc07Yy9LJYoad2g";

    const response = await axios.get(
      "https://iotcoremt-production.up.railway.app/machines/allMachines",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Estilos CSS
const styles = {
  imageContainer: {
    display: "flex",
    alignItems: "center",
  },
  userImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
};

export default UserTable;
