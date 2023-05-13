import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useTheme } from '@mui/material/styles';
import { breakpoints } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default function FloatingActionButtonExtendedSize() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ '& > :not(style)': { m: isSmallScreen ? 0.5 : 1 } }}>
      <Fab variant="extended" color="success" aria-label="add">
        <Box sx={{ mr: isSmallScreen ? 0.5 : 1, ml: isSmallScreen ? 3 : 0 }}>
          Cerrar Sesion
        </Box>
      </Fab>
    </Box>
  );
}
