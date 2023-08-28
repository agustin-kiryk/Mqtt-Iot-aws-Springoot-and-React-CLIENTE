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
    coment: "",
    district:"",
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
  const id = url.split("/").pop(); // Obtener la id de la URL actual

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://iotcoremt-production.up.railway.app/machines/${id}`
      );
      const data = await response.json();
      setDetails(data);
      setEditedDetails(data); // Initialize editedDetails with fetched data
    }
    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleSaveClick = async () => {
 
    const editedCost = parseInt(editedDetails.cost, 10);
  
    const requestData = {
      ...editedDetails,
      cost: editedCost, 
    };
  
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `https://iotcoremt-production.up.railway.app/machines/edit/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedDetails), // Send editedDetails
        }
      );

      if (response.ok) {
        setDetails(editedDetails); // Update details with edited data
        setIsEditing(false);
      } else {
        console.error("Save failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

    return (
      <div className="single">
        <div className="singleContainer">
          <Navbar />
          <div className="top">
            <div className="left">
              <div className="editButton" onClick={handleEditClick}>
                {isEditing ? "" : "Editar"}
              </div>
              {isEditing && (
                <div className="editButtons">
                  <button className="saveButton" onClick={handleSaveClick}>
                    Guardar
                  </button>
                </div>
              )}
  
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
                          value={editedDetails.machineId}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.machineId
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">ID de Usuario:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="userId"
                          value={editedDetails.userId}
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
                          value={editedDetails.price}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.price
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Comentario:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="coment"
                          value={editedDetails.coment}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.coment
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Direccion:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="adress"
                          value={editedDetails.adress + editedDetails.district}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.adress
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
                          value={editedDetails.light}
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
                          value={editedDetails.status}
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
                          value={editedDetails.valveFill}
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
                          value={editedDetails.valveWash}
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
                          value={editedDetails.waterPumpSwich}
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
            <div className="dni">
              <img src={details.image} alt="" width="500px" height="400px" />
            </div>
          </div>
          <div>
              <h1>Datos de transaccion</h1>
              {details.machineId && <TransactionTable machineId={details.machineId} />}
            </div>
          </div>
        </div>
  );
};

export default Single;
