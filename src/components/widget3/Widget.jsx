import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import "./widget.scss";

export default function BasicCard() {
  const [data, setData] = useState({
    monthly: 0,
    electronicBilling: 0,
    collected: 0,
    owed: 0
  });
  const [type, setType] = useState('');
  const [monthNumber, setMonthNumber] = useState(1);

  const convertMonthToNumber = (month) => {
    const monthList = {
      '01': 1,
      '02': 2,
      '03': 3,
      '04': 4,
      '05': 5,
      '06': 6,
      '07': 7,
      '08': 8,
      '09': 9,
      '10': 10,
      '11': 11,
      '12': 12
    }
    return monthList[month];
  }

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const monthSelected = convertMonthToNumber(type); // Obtener el mes seleccionado en el TextField
        const response = await fetch(`https://disfracesrosario.up.railway.app/transactions/monthSelected?month=${monthSelected}`);
        const responseData = await response.json();
        console.log(responseData)

        setData({
          currentMonth: responseData.currentMonth || 0,
          selectMonth: responseData.selectMonth || 0,
          totalElectronic: responseData.totalElectronic || 0,
          collected: responseData.collected || 0,
          selectMonthPending2: responseData.selectMonthPending2 || 0
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [type]);

  const cobrado = data.currentMonth - data.selectMonthPending2;

  return (
    <div className='container1'>
      <div>
        <TextField
          color="info"
          select
          label="Seleccionar mes"
          variant="outlined"
          value={type}
          onChange={handleTypeChange}
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
                MENSUAL
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 25 }}>
                ${data.selectMonth}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                FACTURACION ELECTRONICA
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 25 }}>
                ${data.totalElectronic}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                COBRADO
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 25 }}>
                ${cobrado}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                ADEUDADO
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 25 }}>
                ${data.selectMonthPending2}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </div>
    </div>
  );

}
