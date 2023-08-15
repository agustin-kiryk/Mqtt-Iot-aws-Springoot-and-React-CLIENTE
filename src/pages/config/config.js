import React, { useState } from 'react';
import Popup from './Popup';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState('');

  const handleButtonClick = () => {
    // Aquí puedes realizar acciones previas al abrir la ventana emergente
    // y establecer los datos que deseas mostrar en ella
    const data = 'Datos de ejemplo';
    setPopupData(data);
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className='hul' onClick={handleButtonClick}>Configuracion</button>
      <Popup isOpen={isOpen} onClose={handleClosePopup} data={popupData} />
    </div>
  );
};

export default App;
