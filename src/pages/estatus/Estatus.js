import React, { useState, useEffect } from 'react';
import Popup from './Popup';

const MainComponent = () => {
  // Estado para controlar si se muestra el Popup
  const [showPopup, setShowPopup] = useState(false);

  // Obtener el token del LocalStorage
  const jwtToken = localStorage.getItem('jwtToken').trim();


  // Función para abrir el Popup
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  // Función para cerrar el Popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {/* Botón para abrir el Popup */}
      <button onClick={handleOpenPopup}>Mostrar Popup</button>

      {/* Renderizar el Popup */}
      <Popup isOpen={showPopup} onClose={handleClosePopup} token={jwtToken} />
    </div>
  );
};

export default MainComponent;
