import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButtonExtendedSize() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended" color="success" aria-label="add">
        <NavigationIcon sx={{ mr: 1 }} />
        Cerrar Sesion
      </Fab>
    </Box>
  );
}