import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./single.scss";
import TransactionTable from "../lista/ListaDis";

const Single = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    adress: "",
    type: "",
    cost: "",
    email: "",
    documentNumber: "",
    joinDate: "",
    district:"",
    costumeRented: "",
    pickupDate: "",
    returnDate: "",
    clientStatus: "",
    image: "",
  });
  const url = window.location.href;
  const id = url.split("/").pop(); // Obtener la id de la URL actual

  console.log("Selected User ID:", details.id);

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

  const [selectedMachineId, setSelectedMachineId] = useState("1"); // Valor inicial seleccionado

  const handleEditClick = () => setIsEditing(!isEditing);

  const [editedDetails, setEditedDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target; // Get the name and value from the event target
    setEditedDetails({
      ...editedDetails,
      [name]: value, // Use the 'name' variable as the key to update the corresponding field in 'editedDetails'
    });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://iotcoremt-production.up.railway.app/user/edit/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedDetails),
        }
      );
      const data = await response.json();
      setDetails(editedDetails);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="single">
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="datos">
              <div className="editButton" onClick={handleEditClick}>
                {isEditing ? "Terminar" : "Editar"}
              </div>
              {isEditing && (
                <div className="editButtons">
                  <button className="saveButton" onClick={handleSaveClick}>
                    Guardar
                  </button>
                </div>
              )}
              <h1 className="title1">Informacion de Cliente</h1>
              <div className="item">
                <div className="details">
                  <div className="detailItem">
                    <span className="itemKey">ID de cliente:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="id"
                          value={details.id}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.id
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Nombre:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={editedDetails.firstName || details.firstName}
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
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="email"
                          value={editedDetails.email || details.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.email
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Cargo:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="role"
                          value={editedDetails.role || details.role}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.role
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
                          value={editedDetails.document || details.document}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.document
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Distrito:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="type"
                          value={editedDetails.district || details.district}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.district
                      )}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">
                      {" "}
                      Porcentaje de derecho de marca:
                    </span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="cost"
                          value={editedDetails.cost || details.cost}
                          onChange={handleInputChange}
                        />
                      ) : (
                        `${details.cost}%` // Agregar el símbolo "%" al valor
                      )}
                    </span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Cantidad de Maquinas:</span>
                    <span className="itemValue">
                      {isEditing ? (
                        <input
                          type="text"
                          name="type"
                          value={editedDetails.machinesTotals || details.machinesTotals}
                          onChange={handleInputChange}
                        />
                      ) : (
                        details.machinesTotals
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
                  <div className="right">
                    <div className="detailItem">
                      <img
                        src="https://cdn.discordapp.com/attachments/1061404202498277458/1104503779795140618/18067b8c-fc00-4ca3-9c02-eaea4b3c7f21.jpg"
                        alt=""
                        width="550px"
                        height="400px"
                        style={{ borderRadius: "4px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="long-title">Datos de transacciones</h1>
              {details.id && <TransactionTable machineId={details.id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
