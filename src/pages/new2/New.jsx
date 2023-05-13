import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import "./new.scss";
import React, { useRef } from 'react';


const New = ({ inputs, title, apiUrl }) => {

  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    adress: "",
    documentNumber: "",
    type: "",
    phone: "",
    image: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qarsntph");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dkzil7l5p/image/upload",
        formData
      );
      setFormData({ ...formData, image: res.data.secure_url });
      setIsButtonDisabled(true); // Deshabilitar el botón
      alert("La imagen se subió correctamente");
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://disfracesrosario.up.railway.app/clients/newClient", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'
        },
      })
      .then((response) => {
        console.log(response);
        alert("Cliente creado correctamente")
        window.location.href = '/users';
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                  name="name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Direccion:</label>

                <input
                  type="text"
                  placeholder="Ingrese su Direccion"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </div>


              <div className="formInput">
                <label>Distrito:</label>

                <input
                  type="text"
                  placeholder="Ingrese su Distrito"
                  name="documentNumber"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Modelo:</label>
                <input
                  type="text"
                  placeholder="Ingrese el Modelo"
                  name="type"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Detalle:</label>
                <input
                  type="text"
                  placeholder="Ingrese el Detalle"
                  name="type"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Informacion adicional:</label>
                <input
                  type="text"
                  placeholder="Ingrese Informacion adicional"
                  name="type"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Fecha de inicio:</label>
                <input
                  type="text"
                  placeholder="Ingrese la Fecha de inicio"
                  name="type"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Infomacion de servidor:</label>
                <input
                  type="text"
                  placeholder="Ingrese la Infomacion de servidor"
                  name="type"
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