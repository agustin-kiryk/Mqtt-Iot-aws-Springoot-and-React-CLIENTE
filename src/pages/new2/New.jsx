import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import "./new2.scss";
import React, { useRef, useEffect } from 'react';

const New = ({ inputs, title, apiUrl }) => {

  const [formData, setFormData] = useState({
    machineId: "",
    light: "",
    currency: "",
    price: "",
    status: "",
    valveFill: "",
    valveWash: "",
    waterPumpSwich: "",
    district: "",
    detail: "",
    adress: "",
    model: "",
    coment: "",
    mail: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem("jwtToken");

      const response = await axios.post("https://iotcoremt-production.up.railway.app/machines/new", formData, {
        headers: {
          "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      console.log(response);
      alert("Máquina creada correctamente");
      // Redireccionar u otras acciones aquí
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleInputChange = (e) => {
    let value = e.target.value;
    
    // Convertir el campo price a un número si es necesario
    if (e.target.name === "price") {
      value = parseFloat(value);
    }
    
    setFormData({ ...formData, [e.target.name]: value });
  };
  
  return (
    <div className="new">
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>INGRESO DE MAQUINA NUEVA</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Id de maquina:</label>
                <input
                  type="text"
                  placeholder="Ingrese su id de maquina"
                  name="machineId"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Direccion:</label>
                <input
                  type="text"
                  placeholder="Ingrese su Direccion"
                  name="adress"
                  onChange={handleInputChange}
                />
              </div>


              <div className="formInput">
                <label>Distrito:</label>

                <input
                  type="text"
                  placeholder="Ingrese su Distrito"
                  name="district"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Modelo:</label>
                <input
                  type="text"
                  placeholder="Ingrese el Modelo"
                  name="model"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Moneda:</label>
                <input
                  type="text"
                  placeholder="Ingrese el tipo de Moneda"
                  name="currency"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Precio:</label>
                <input
                  type="text"
                  placeholder="Ingrese el precio"
                  name="price"
                  onChange={handleInputChange}
                />
              </div>
               <div className="formInput">
                <label htmlFor="type">Mail:</label>
                <input
                  type="text"
                  placeholder="Ingrese el estado"
                  name="mail"
                  onChange={handleInputChange}
                />
              </div>
               <div className="formInput">
                <label htmlFor="type">Estado:</label>
                <input
                  type="text"
                  placeholder="Ingrese el estado"
                  name="status"
                  onChange={handleInputChange}
                />
              </div>
                             <div className="formInput">
                <label htmlFor="type">Valvula de llenado:</label>
                <input
                  type="text"
                  placeholder="Ingrese el estado de la valvula de llenado"
                  name="valveFill"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Valvula de lavado:</label>
                <input
                  type="text"
                  placeholder="Ingrese el estado de la valvula de lavado"
                  name="valveWash"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Valvula waterPumpSwich:</label>
                <input
                  type="text"
                  placeholder="Ingrese el estado de la valvula de lavado"
                  name="waterPumpSwich"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Detalle:</label>
                <input
                  type="text"
                  placeholder="Ingrese el Detalle"
                  name="detail"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Informacion adicional:</label>
                <input
                  type="text"
                  placeholder="Ingrese Informacion adicional"
                  name="coment"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Luz:</label>
                <input
                  type="text"
                  placeholder="Ingrese la Fecha de inicio"
                  name="light"
                  onChange={handleInputChange}
                />
              </div>
              
              <button type="submit" className="submitButton">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;