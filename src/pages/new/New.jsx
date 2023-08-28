import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import "./new.scss";
import React, { useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

const New = ({ inputs, title, apiUrl }) => {
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    image: "",
    lastName: "",
    adress: "",
    document: "",
    password: "",
    email: "",
    district: "",
    cost: "",
    phone: "",
  });
  const cld = new Cloudinary({ cloud: { cloudName: "dpjnr25nl" } });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "shvapk2i");
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dpjnr25nl/image/upload",
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
      .post(
        "https://iotcoremt-production.up.railway.app/auth/register",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Franquiciado creado correctamente");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const value =
      e.target.name === "cost" ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
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
            <AdvancedImage
              cldImg={cld.image(formData.image)}
              alt=""
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "5px",
              }}
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={isButtonDisabled}
              >
                Subir imagen
              </button>

              <div className="formInput">
                <label htmlFor="image">Subir imagen:</label>
                <input
                  type="file"
                  id="image" // Add an id to the input element
                  name="image"
                  onChange={handleFileChange}
                />
                {/* Display a preview of the uploaded image */}
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
                {/* Cambiar el tipo de entrada a "number" */}
                <input
                  type="number"
                  placeholder="Ingresar derecho de marca"
                  name="cost"
                  value={formData.cost}
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
