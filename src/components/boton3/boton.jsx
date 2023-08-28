import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useTheme } from '@mui/material/styles';
import { breakpoints } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import the ArrowBack icon

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
    <div className='volver'>
      <a href="/" style={{ textDecoration: "none", display: "inline-block", padding: "10px ", margin:"10px",backgroundColor: "green", color: "#fff", borderRadius: "10px" }}>
        <Box sx={{ display: "flex", alignItems: "center", fontSize: "17px" }}>
          <ArrowBackIcon sx={{ marginRight: "0.5rem" }} />
        </Box>
      </a>
    </div>
  );
};