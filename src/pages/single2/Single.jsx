import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./single2.scss";
import TransactionTable from "../lista2/ListaDis";

const Single = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    machineId: "",
    userId: "",
    lastName: "",
    phone: "",
    adress: "",
    type: "",
    documentNumber: "",
    joinDate: "",
    costumeRented: "",
    pickupDate: "",
    returnDate: "",
    clientStatus: "",
    image: "",
  });

  const [editedDetails, setEditedDetails] = useState({
    userId: "",
    price: "",
    light: "",
    status: "",
    valveWash: "",
    valveFill: "",
    waterPumpSwich: "",
  });

  const url = window.location.href;
  const id = url.split("/").pop();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://iotcoremt-production.up.railway.app/machines/${id}`
      );
      const data = await response.json();
      setDetails(data);
    }
    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedDetails(details);
    }
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  }

  const handleSaveClick = async () => {
    // Obtener el token JWT del localStorage
    const jwtToken = localStorage.getItem('jwtToken');
  
    // Verificar si el token está presente
    if (!jwtToken) {
      // Manejar el caso en el que el token no esté disponible
      console.error('JWT token not available');
      return;
    }
  
    try {
      const response = await fetch(`https://iotcoremt-production.up.railway.app/machines/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`, // Agregar el token JWT al encabezado de autorización
        },
        body: JSON.stringify(editedDetails),
      });
  
      if (response.ok) {
        setDetails(editedDetails);
        setIsEditing(false);
      } else {
        // Manejar el error de acuerdo a tus requerimientos
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      // Manejar cualquier error de red u otros errores
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="single">
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButtonContainer">
              {isEditing ? (
                <button className="editButton" onClick={handleSaveClick}>
                  Save
                </button>
              ) : (
                <button className="editButton" onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </div>
            <div className="datos">
              <h1 className="title1">Informacion</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">Maquina</h1>
                  <div className="detailItem">
                    <span className="itemKey">ID de Maquina:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="machineId"
                          value={editedDetails.machineId || details.machineId}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.machineId
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">ID de usuario:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="userId"
                          value={editedDetails.userId || details.userId}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.userId
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Precio:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="price"
                          value={editedDetails.price || details.price}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.price
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Luz:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="light"
                          value={editedDetails.light || details.light}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.light
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Estatus:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="status"
                          value={editedDetails.status || details.status}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.status
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Valvula de Llenado:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="valveFill"
                          value={editedDetails.valveFill || details.valveFill}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.valveFill
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Valvula de Lavado:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="valveWash"
                          value={editedDetails.valveWash || details.valveWash}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.valveWash
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Bomba de Agua:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="waterPumpSwich"
                          value={
                            editedDetails.waterPumpSwich ||
                            details.waterPumpSwich
                          }
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.waterPumpSwich
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1>Datos de transaccion</h1>
              {details.machineId && <TransactionTable machineId={details.machineId} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
