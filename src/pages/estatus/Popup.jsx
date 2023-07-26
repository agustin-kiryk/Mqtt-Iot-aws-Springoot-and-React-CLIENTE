import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import "./pupup.css";

Modal.setAppElement('#root'); // Establece el elemento raíz de tu aplicación

const Popup = ({ isOpen, onClose, token }) => {
  const [data, setData] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken').trim();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    // Función para obtener los datos del endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://iotcoremt-production.up.railway.app/transactions/machineUserLogin',
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
      <h2>Título de la ventana emergente</h2>
      <div className="row-container">
        {currentRows.map((item) => (
          <div key={item.id} className="row">
            <p>Transaction ID: {item.transactionId}</p>
            <p>Amount: {item.amount}</p>
            <p>Currency: {item.currency}</p>
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
      <button onClick={onClose} className="close-button">Cerrar</button>
    </Modal>
  );
};

export default Popup;