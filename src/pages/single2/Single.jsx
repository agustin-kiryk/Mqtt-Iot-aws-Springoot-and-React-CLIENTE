import { useState, useEffect } from "react";
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
  const url = window.location.href;
  const id = url.split("/").pop(); // Obtener la id de la URL actual

  

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

  const handleEditClick = () => setIsEditing(!isEditing);

  const [editedDetails, setEditedDetails] = useState({
    userId: "",
    price: "",
    light: "",
    status: "",
    valveWash: "",
    valveFill: "",
    waterPumpSwich: "",
  });

  const handleInputChange = (event) => {
    const {
      userId,
      value,
      valveFill,
      price,
      light,
      status,
      valveWash,
      image,
      waterPumpSwich,
    } = event.target;
    setEditedDetails({
      ...editedDetails,
      [userId]: value,
      [waterPumpSwich]: value,
      [valveFill]: value,
      [price]: value,
      [light]: value,
      [valveWash]: value,
      [status]: value,
      [image]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `https://iotcoremt-production.up.railway.app/machines/${id}`,
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
                          value={details.machineId}
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
