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
    firstName: "",
    image: "",
    lastName: "",
    adress: "",
    document: "",
    password: "",
    email: "",
    district: "",
    machineid: "",
    type: "",
    cost: "",
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
      .post("https://iotcoremt-production.up.railway.app/auth/register", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'
        },
      })
      .then((response) => {
        console.log(response);
        alert("Cliente creado correctamente")
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
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "5px" // Agrega esta línea para quitar los bordes redondeados
              }}
            />
          </div>
          
          <div className="right">
            <form onSubmit={handleSubmit}>
            
              <div className="formInput">
                <label htmlFor="image">Imagen:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                />
                <button
                  type="submit"
                  className={`submitButton ${isUploading ? 'disabledButton' : ''}`}
                  onClick={handleImageUpload}
                  disabled={isButtonDisabled}
                >
                  Subir imagen
                </button>
              </div>
             
              <div className="formInput">
                <label>Nombre:</label>

                <input
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="firstName"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Apellido:</label>

                <input
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Email:</label>

                <input
                  type="text"
                  placeholder="Ingrese su Email"
                  name="email"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Contraseña:</label>

                <input
                  type="text"
                  placeholder="Ingrese su Contraseña"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              

              <div className="formInput">
                <label htmlFor="address">Dirección:</label>
                <input
                  type="text"
                  placeholder="Ingrese su dirección"
                  name="adress"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="address">Distrito:</label>
                <input
                  type="text"
                  placeholder="Ingrese el distrito"
                  name="district"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label>Identificacion:</label>

                <input
                  type="text"
                  placeholder="Ingrese su número de documento"
                  name="document"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Tipo de cliente:</label>
                <input
                  type="text"
                  placeholder="Ingrese el tipo de cliente"
                  name="type"
                  onChange={handleInputChange}
                />
              </div>

              <div className="formInput">
                <label htmlFor="phone">Teléfono:</label>
                <input
                  type="text"
                  placeholder="Ingrese su teléfono"
                  name="phone"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>Derecho de marca:</label>

                <input
                  type="text"
                  placeholder="Ingresar derecho de marca"
                  name="cost"
                  onChange={handleInputChange}
                />
              </div>
              <div className="formInput">
                <label>ID de maquina:</label>
                <input
                  type="text"
                  placeholder="Ingrese la id de maquina"
                  name="machineid"
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