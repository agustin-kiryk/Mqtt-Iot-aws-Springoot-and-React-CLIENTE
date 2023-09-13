import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";


export const userColumns = [
  {
    field: "machineId",
    headerName: "Id de Maquina",
    width: 150,
  },
  {
    field: "transactionId",
    headerName: "Id de Transaccion",
    width: 200,
  },
  {
    field: "id",
    headerName: "Id Unico",
    width: 150,
  },
  {
    field: "currency",
    headerName: "Tipo de moneda",
    width: 180,
  },
  {
    field: "dispensedWater",
    headerName: "Agua Dispensada",
    width: 200,
    renderCell: (params) => {
    },
  },
  {
    field: "date",
    headerName: "Fecha y Hora",
    width: 250,
    renderCell: (params) => {
      const dateArray = params.value; // Suponiendo que 'params.value' contiene el array de fecha y hora
  
      if (Array.isArray(dateArray) && dateArray.length === 6) {
        const [year, month, day, hour, minute, second] = dateArray;
        const formattedDate = new Date(year, month - 1, day).toLocaleDateString();
        const formattedTime = `${hour}:${minute}:${second}`;
  
        return (
          <div>
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>
        );
      }
  
      return null; // Manejo de error en caso de datos incorrectos
    },
  },
  {
    field: "amount",
    headerName: "Precio",
    width: 120,
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
    const token = localStorage.getItem('jwtToken'); 

    if (!token) {
      throw new Error('Token no encontrado en el localStorage');
    }

    const response = await axios.get(
      'https://iotcoremt-production.up.railway.app/transactions/machineUserLogin', 
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
