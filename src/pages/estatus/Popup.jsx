import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import "./pupup.css";

Modal.setAppElement('#root'); // Establece el elemento raíz de tu aplicación

const Popup = ({ isOpen, onClose, token }) => {
  const [data, setData] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    // Función para obtener los datos del endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://iotcoremt-production.up.railway.app/machines/machinesUser',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Utiliza el token que proviene de la prop 'token'
            },
          }
        );
        const jsonData = response.data;
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, token]);

 const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="popup-modal">
      <h2>Detalle de Maquina</h2>
      <button onClick={onClose} className="close-button">Cerrar</button>
      <div className="row-container" style={{ maxHeight: '800px', overflowY: 'auto' }}>
        {currentRows.map((item) => (
          <div key={item.id} className="row">
            <p>ID de Maquina: {item.machineId}</p>
            <p>ID de usuario: {item.userId}</p>
            <p>Precio: {item.price}</p>
            <p>Luz: {item.light}</p>
            <p>Estatus: {item.status}</p>
            <p>Valvula de Llenado: {item.valveFill}</p>
            <p>Valvula de Lavado: {item.valveWash}</p>
            <p>Bomba de Agua: {item.waterPumpSwich}</p>
            <p>Moneda: {item.currency}</p>
            {/* Add other properties as needed */}
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(data.length / rowsPerPage) }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => paginate(page)}>
            {page}
          </button>
        ))}
      </div>
     
    </Modal>
  );
};

export default Popup;