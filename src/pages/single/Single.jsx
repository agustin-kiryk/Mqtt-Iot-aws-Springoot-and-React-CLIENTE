import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./single.scss";
import TransactionTable from "../lista/ListaDis";

const Single = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    adress: "",
    document: "",
    district: "",
    cost: "",
    image: "",
  });
  const [editedDetails, setEditedDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    adress: "",
    document: "",
    email: "",
    district: "",
    cost: "",
  });

  const url = window.location.href;
  const id = url.split("/").pop(); // Obtener la id de la URL actual

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://iotcoremt-production.up.railway.app/user/${id}`
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
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleSaveClick = async () => {
    // Convert the cost value to an integer before sending
    const editedCost = parseInt(editedDetails.cost, 10);
  
    const requestData = {
      ...editedDetails,
      cost: editedCost, // Replace the cost value with the integer value
    };
  
    try {
      const token = localStorage.getItem("jwtToken"); // Assuming your token key is "jwtToken"
      const response = await fetch(
        `https://iotcoremt-production.up.railway.app/user/edit/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(requestData), // Use the modified request data
        }
      );
  
      if (response.ok) {
        setDetails(requestData); // Update with the modified data
        setIsEditing(false);
      } else {
        console.error("Save failed with status:", response.status);
        // Handle the error appropriately
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error appropriately
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
                <h1 className="itemTitle">Cliente</h1>
                <div className="detailItem">
                  <span className="itemKey">Nombre:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={editedDetails.firstName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      details.firstName
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Apellido:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={editedDetails.lastName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      details.lastName
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Telefono:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={editedDetails.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      details.phone
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input
                        type="text"
                        name="email"
                        value={editedDetails.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      details.email
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
                        value={editedDetails.adress}
                        onChange={handleInputChange}
                      />
                    ) : (
                      details.adress
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Distrito:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input
                        type="text"
                        name="district"
                        value={editedDetails.district}
                        onChange={handleInputChange}
                      />
                    ) : (
                      details.district
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Documento:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input
                        type="text"
                        name="document"
                        value={editedDetails.document}
                        onChange={handleInputChange}
                      />
                    ) : (
                      details.document
                    )}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Derecho de Marca:</span>
                  <span className="itemValue">
                    {isEditing ? (
                      <input
                        type="text"
                        name="cost"
                        value={editedDetails.cost}
                        onChange={handleInputChange}
                      />
                    ) : (
                      `${details.cost}%` // Add the percentage symbol here
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
          <h1 className="long-title">Datos de transacciones</h1>
          {details.id && <TransactionTable machineId={details.id} />}
        </div>
      </div>
    </div>
  );
};

export default Single;
