import React, { useState } from "react";
import Modal from "react-modal";
import "./popup.css";
import axios from "axios";
import Switch from "react-switch";
import "./config.css";
import { Typography } from "@mui/material";

Modal.setAppElement("#root");

const Popup = ({ isOpen, onClose, data, sendComand }) => {
  const [clientId, setClientId] = useState("");
  const [cop, setCop] = useState("");
  const [price, setPrice] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [isBlocked1, setIsBlocked1] = useState(false);
  const [isBlocked2, setIsBlocked2] = useState(false);
  const [isBlocked3, setIsBlocked3] = useState(false);
  const [isBlocked4, setIsBlocked4] = useState(false);

  const handleCopChange = (event) => {
    setCop(event.target.value);
  };

  const handleClientIdChange = (event) => {
    setClientId(event.target.value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    const parsedPrice = parseInt(value); // Parse the input value as an integer
    setPrice(parsedPrice); // Set the state with the parsed integer value
  };
  const handleSwitchChange = () => {
    setIsBlocked(!isBlocked);
  };

  const handleSwitchChange1 = () => {
    setIsBlocked1(!isBlocked1);
  };

  const handleSwitchChange2 = () => {
    setIsBlocked2(!isBlocked2);
  };

  const handleSwitchChange3 = () => {
    setIsBlocked3(!isBlocked3);
  };

  const handleSwitchChange4 = () => {
    setIsBlocked4(!isBlocked4);
  };

  const handleBlockedAccept = () => {
    const status = isBlocked ? "blocked" : "unblocked";
    const payload = {
      idMachine: clientId,
      status: status,
    };
    const data = {
      comand: `dispensador/bloqueo/${clientId}`,
      payload: payload,
    };

    axios
      .post("https://iotcoremt-production.up.railway.app/mqtt/publish", data)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        onClose();
      });
  };

  const handleConfigAccept = () => {
    const payload = {
      currency: cop,
      price: price, // The price state is now an integer, not a string
    };

    const data = {
      comand: `dispensador/configuracion/${clientId}`,
      payload: payload,
    };

    axios
      .post("https://iotcoremt-production.up.railway.app/mqtt/publish", data)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error sending data:", error);
        onClose();
      });
  };

  const handleControlAccept = () => {
    const switch1Status = isBlocked1 ? "ON" : "OFF";
    const switch2Status = isBlocked2 ? "ON" : "OFF";
    const switch3Status = isBlocked3 ? "ON" : "OFF";
    const switch4Status = isBlocked4 ? "ON" : "OFF";

    // Define an array to hold the commands
    const commands = [
      { command: "water_pump", status: switch1Status },
      { command: "light", status: switch2Status },
      { command: "valve_wash", status: switch3Status },
      { command: "valve_fill", status: switch4Status },
    ];

    // Define a variable to keep track of the current index
    let currentIndex = 0;

    // Define the interval in milliseconds (3 seconds = 3000 milliseconds)
    const interval = 3000;

    // Function to send individual API requests
    const sendCommand = () => {
      const command = commands[currentIndex];
      const payload = {
        command: command.command,
        status: command.status,
      };

      const data = {
        comand: `dispensador/control/${clientId}`,
        payload: payload,
      };

      axios
        .post("https://iotcoremt-production.up.railway.app/mqtt/publish", data)
        .then((response) => {
          console.log("Data sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });

      // Increase the current index
      currentIndex++;

      // If the currentIndex exceeds the commands array length, clear the interval
      if (currentIndex >= commands.length) {
        clearInterval(intervalId);
        onClose();
      }
    };

    // Call sendCommand immediately before starting the interval
    sendCommand();

    // Start the interval and store the intervalId
    const intervalId = setInterval(sendCommand, interval);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="popup-modal">
      <div className="popup-container">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="popup-content">
          <div className="blocked">
            <div className="titulo1">
            <h3>BLOQUEO</h3>
            </div>
            <div className="maquinoide">
            <label htmlFor="clientId3">ID de Maquina:</label>
            </div>
              <input
                type="text"
                id="clientId3"
                value={clientId}
                className="input-field" // Agrega la clase CSS aquí
                onChange={handleClientIdChange}
              />


            <div className="estado">
              <label htmlFor="switch">Estado:</label>
              <Switch
                id="switch"
                checked={isBlocked}
                onChange={handleSwitchChange}
                onColor="#FF0000" // Red color when blocked
                offColor="#42a342" // Adjusted green color when unblocked
              />
              <span className="switch-label">
                {isBlocked ? "Bloqueado" : "Desbloqueado"}
              </span>

            </div>
            <div className="deslock">
            <button
              className="jul"
              onClick={handleBlockedAccept}
              style={{ backgroundColor: "rgba(0, 128, 0, 1)", color: "white" }}
            >
              Bloquear/Desbloquear
            </button>
            </div>
          </div>

          <div className="column">
            <div className="config">
              <div className="titulo3">
              <h3>CONFIGURACION</h3>
              </div>
              <label htmlFor="clientId2" className="pap">
                ID de Maquina:
              </label>
              <input
                type="text"
                id="clientId2"
                value={clientId}
                className="input-field2" // Agrega la clase CSS aquí
                onChange={handleClientIdChange}
              />
              
              <label>
                Moneda:
              </label>
              <input
                type="text"
                id="cop"
                className="input-field2" // Agrega la clase CSS aquí
                value={cop}
                onChange={handleCopChange}
                style={{ paddingLeft: "44px" }}
              />

              <label
                htmlFor="price"
                className="pap"
              >
                Precio:{" "}
              </label>
              <input
                type="text"
                id="price"
                value={price}
                className="input-field2" // Agrega la clase CSS aquí
                onChange={handlePriceChange}
                style={{ paddingLeft: "55px" }}
              />
             <div className="vai">
              <button
                className="jul"
                onClick={handleConfigAccept}
                style={{
                  backgroundColor: "rgba(0, 128, 0, 1)",
                  color: "white",
                }}
              >
                
                Aceptar Configuracion
              </button>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="control">
              <div className="titulo1">
              <h3>CONTROL</h3>
              </div>
              <label htmlFor="clientId3" className="titulo">ID de Maquina:</label>
              <input
                type="text"
                id="clientId3"
                value={clientId}
                className="input-field" // Agrega la clase CSS aquí
                onChange={handleClientIdChange}
              />


              <div className="switches">
                <label htmlFor="switch1" className="texto">Bomba de Agua</label>
                <div className="switch-papu">
                <Switch
                  id="switch1"
                  checked={isBlocked1}
                  onChange={handleSwitchChange1}
                  onColor="#FF0000"
                  offColor="#42a342"
                />
                <span className={`status ${isBlocked1 ? "off" : "on"}`}>
                  {isBlocked1 ? "OFF" : "ON"}
                </span>
                </div>

                <div className="luz">
                <label htmlFor="switch2" className="texto">Luz</label>
                </div>
                <div className="switch-papu">
                <Switch
                  id="switch2"
                  checked={isBlocked2}
                  onChange={handleSwitchChange2}
                  onColor="#FF0000"
                  offColor="#42a342"
                />
                <span className={`status ${isBlocked2 ? "off" : "on"}`}>
                  {isBlocked2 ? "OFF" : "ON"}
                </span>
                </div>

                <label htmlFor="switch3" className="texto">Valvula de Lavado</label>
                <div className="switch-papu">
                <Switch
                  id="switch3"
                  checked={isBlocked3}
                  onChange={handleSwitchChange3}
                  onColor="#FF0000"
                  offColor="#42a342"
                />
                <span className={`status ${isBlocked3 ? "off" : "on"}`}>
                  {isBlocked3 ? "OFF" : "ON"}
                </span>
                </div>

                <label htmlFor="switch4" className="texto">Valvula de Llenado</label>
                <div className="switch-papu">
                <Switch
                  id="switch4"
                  checked={isBlocked4}
                  onChange={handleSwitchChange4}
                  onColor="#FF0000"
                  offColor="#42a342"
                />
                <span className={`status ${isBlocked4 ? "off" : "on"}`}>
                  {isBlocked4 ? "OFF" : "ON"}
                </span>
                </div>

              </div>
              <button
                className="jul"
                onClick={handleControlAccept}
                style={{
                  backgroundColor: "rgba(0, 128, 0, 1)",
                  color: "white",
                }}
              >
                Aceptar Control
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Popup;
