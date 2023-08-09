import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import "./widget3.scss";

export default function BasicCard() {
  const [data, setData] = useState({
    totalAmount: 0,
    totalWaterDispensed: 0,
    revenue: 0,
    pending: 0
  });
  const [selectedMonth, setSelectedMonth] = useState('01');
  const currentYear = new Date().getFullYear();

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('jwtToken');
        const config = {
          headers: {
            "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
          },
        };

        if (selectedMonth) {
          const response = await axios.get(`https://iotcoremt-production.up.railway.app/transactions/summary/${currentYear}/${selectedMonth}`, config);
          const responseData = response.data;

          setData({
            totalAmount: responseData[0].totalAmount,
            totalWaterDispensed: responseData[0].totalWaterDispensed,
            revenue: responseData[0].revenue,
            pending: responseData[0].pending
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [selectedMonth, currentYear]);

  return (
    <div className='container1'>
      <div>
        <TextField
          color="info"
          select
          label="Mes"
          variant="outlined"
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ marginBottom: "25px", minWidth: "170px" }}
        >
          <MenuItem value="01">Enero</MenuItem>
          <MenuItem value="02">Febrero</MenuItem>
          <MenuItem value="03">Marzo</MenuItem>
          <MenuItem value="04">Abril</MenuItem>
          <MenuItem value="05">Mayo</MenuItem>
          <MenuItem value="06">Junio</MenuItem>
          <MenuItem value="07">Julio</MenuItem>
          <MenuItem value="08">Agosto</MenuItem>
          <MenuItem value="09">Septiembre</MenuItem>
          <MenuItem value="10">Octubre</MenuItem>
          <MenuItem value="11">Noviembre</MenuItem>
          <MenuItem value="12">Diciembre</MenuItem>
        </TextField>
        <Box sx={{
          display: 'flex', flexDirection: 'row', gap: 25, '@media (max-width: 768px)': {
            flexDirection: 'column',
          }
        }}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                Cobrado
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 25 }}>
                ${data.totalAmount}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                Agua Dispensada
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 25 }}>
                {data.totalWaterDispensed} Litros
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                Derecho de Marca
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 25 }}>
                ${data.revenue}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                Adeudado
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 25 }}>
                ${data.pending}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );
}
