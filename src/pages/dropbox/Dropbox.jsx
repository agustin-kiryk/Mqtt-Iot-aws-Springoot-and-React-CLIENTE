import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import "./dropbox.scss";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CopyrightIcon from "@mui/icons-material/Copyright";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Link } from "react-router-dom";

const endpoint =
  "https://iotcoremt-production.up.railway.app/transactions/currentMonthSummaryByUserLogin";

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [machineOptions, setMachineOptions] = React.useState([]);
  const [selectedMachineData, setSelectedMachineData] = React.useState(null);



  const Dropbox = () => {
    const [machineOptions, setMachineOptions] = React.useState([]);
    const [selectedMachineData, setSelectedMachineData] = React.useState(null);

    React.useEffect(() => {
      const fetchMachines = async () => {
        const token = localStorage.getItem("jwtToken");
        if (!token) return;

        try {
          const response = await fetch(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            const options = data.map((machine) => machine.machineId);
            setMachineOptions(options);

            // Guardar los datos en el localStorage
            localStorage.setItem("selectedMachineData", JSON.stringify(data));
          }
        } catch (error) {
          console.error("Error fetching machines:", error);
        }
      };

      fetchMachines();
    }, []);
  };

  React.useEffect(() => {
    // Function to fetch machines for the logged-in user
    const fetchMachines = async () => {
      const token = localStorage.getItem("jwtToken"); // Get the token from localStorage
      if (!token) return;

      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Filter out the machineIds and set the options
          const options = data.map((machine) => machine.machineId);
          setMachineOptions(options);
        }
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    fetchMachines();
  }, []);

  const handleClick = async () => {
    console.log(`You clicked ${machineOptions[selectedIndex]}`);

    // Fetch the data for the selected machineId
    const selectedMachineId = machineOptions[selectedIndex];
    const token = localStorage.getItem("jwtToken"); // Get the token from localStorage
    if (!token) return;

    try {
      const response = await fetch(
        `${"https://iotcoremt-production.up.railway.app/transactions/currentMonthSummaryByMachineId"}/${selectedMachineId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Guardar datos en el localStorage
        localStorage.setItem("selectedMachineData", JSON.stringify(data));

        setSelectedMachineData(data);

        // Console.log para mostrar los datos guardados en el localStorage
        console.log("Datos guardados en el localStorage:", data);
      }
    } catch (error) {
      console.error("Error fetching machine data:", error);
    }
  };

  React.useEffect(() => {
    // Leer datos del localStorage al iniciar el componente
    const storedData = localStorage.getItem("selectedMachineData");
    if (storedData) {
      setSelectedMachineData(JSON.parse(storedData));

      // Console.log para mostrar los datos recuperados del localStorage
      console.log(
        "Datos recuperados del localStorage:",
        JSON.parse(storedData)
      );
    }
  }, []);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        color="success"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick}>{machineOptions[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {machineOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/* You can use the selectedMachineData here to display the data in another part of your application */}
      {selectedMachineData && selectedMachineData.length > 0 && (

<div className="widgets" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '80px', backgroundColor: '#f0fffb'}}>
  
  {/* Widget for Total Amount */}
  <div className="widget" style={{ width: '50%', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '30px', borderRadius: '15px', textAlign: 'center', marginBottom: '10px',minWidth: '300px'}}>
    <div>
      <h3 style={{fontWeight: 700, fontSize: '30px', letterSpacing: '3px', color: 'rgb(114, 114, 114)' }}>INGRESO DINERO</h3>
      <pre style={{ fontFamily: 'Arial',fontWeight: 'bold', fontSize: '38px', margin: '0' }}>$ {selectedMachineData[0].totalAmount}</pre>
    </div>
    <div style={{ position: 'relative', bottom: '1px', right: '10px', left: '22vw', top: '1.2vw' }}>
      <Link to="/histfac" style={{ textDecoration: 'none' }}>
        <Button
          className="icon2"
          style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
        >
          <MonetizationOnOutlinedIcon />
        </Button>
      </Link>
    </div>
  </div>

  {/* Widget container for other three boxes */}
  <div className="widget-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '200px', flexWrap: 'wrap' }}>
    
    {/* Widget for Total Water Dispensed */}
    <div className="widget" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  padding: '90px', borderRadius: '15px', textAlign: 'center', minWidth: '300px' }}>
      <div>
        <h3 style={{fontWeight: 700, fontSize: '20px', letterSpacing: '3px', color: 'rgb(114, 114, 114)' }}>LITROS VENDIDOS</h3>
        <pre style={{ fontFamily: 'Arial',fontWeight: 'bold', fontSize: '28px', margin: '0' }}>{selectedMachineData[0].totalWaterDispensed}</pre>
      </div>
      <div style={{ position: 'relative', bottom: '10px', right: '10px', left:'8vw'}}>
        <WaterDropIcon
          className="icon"
          style={{
            backgroundColor: "rgba(135, 237, 255, 0.471)",
            color: "blue",
          }}
        />
      </div>
    </div>

    {/* Widget for Cost */}
    <div className="widget" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  padding: '90px', borderRadius: '15px', textAlign: 'center', minWidth: '300px' }}>
      <div>
        <h3 style={{fontWeight: 700, fontSize: '20px', letterSpacing: '3px', color: 'rgb(114, 114, 114)' }}>DERECHO DE MARCA</h3>
        <pre style={{ fontFamily: 'Arial',fontWeight: 'bold', fontSize: '28px', margin: '0' }}>$ {selectedMachineData[0].cost}</pre>
      </div>
      <div style={{ position: 'relative', bottom: '10px', right: '10px' , left:'8vw'}}>
        <CopyrightIcon
          className="icon"
          style={{
            backgroundColor: "rgba(0, 128, 0, 0.2)",
            color: "green",
          }}
        />
      </div>
    </div>

    {/* Widget for Revenue */}
    <div className="widget" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  padding: '90px', borderRadius: '15px', textAlign: 'center', minWidth: '300px' }}>
      <div>
        <h3 style={{fontWeight: 700, fontSize: '20px', letterSpacing: '3px', color: 'rgb(114, 114, 114)' }}>GANANCIAS</h3>
        <pre style={{ fontFamily: 'Arial',fontWeight: 'bold', fontSize: '28px', margin: '0' }}>$ {selectedMachineData[0].revenue}</pre>
      </div>
      <div style={{ position: 'relative', bottom: '10px', right: '10px' , left:'8vw'}}>
        <AccountBalanceWalletOutlinedIcon
          className="icon"
          style={{
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            color: "purple",
          }}
        />
      </div>
    </div>
  </div>
</div>

      )}
    </React.Fragment>
  );
}
