import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./transacciones2.css";
import { userColumns } from "../../datatablesource3";
import { UserTable, fetchUserData } from '../../datatablesource3';

const TransactionTable = ({ machineId }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const [sortField, setSortField] = useState("transactionId");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://iotcoremt-production.up.railway.app/transactions/${machineId}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [machineId]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setFilteredTransactions(
      transactions.filter((transaction) =>
        Object.values(transaction).some((value) =>
          value && value.toString().toLowerCase().includes(searchText)
        )
      )
    );
    setSearchText(searchText);
  };
  
  const compareFunction = (a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) {
      return sortOrder === "asc" ? -1 : 1;
    } else if (aValue > bValue) {
      return sortOrder === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  };

  const sortedTransactions = filteredTransactions.sort(compareFunction);

  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className="transaction-table-container">
      <h2>Transacciones de la Maquina: {machineId}</h2>
      <input
                type="text"
                value={searchText}
                onChange={handleSearch}
                placeholder="Buscar..."
              />
      <table className="transaction-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("transactionId")}>
              ID de Transaccion{" "}
              {sortField === "transactionId" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("date")}>
              Fecha{" "}
              {sortField === "date" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
            </th>
            <th onClick={() => handleSort("amount")}>
              Monto{" "}
              {sortField === "amount" && <span>{sortOrder === "asc" ? "▲" : "▼"}</span>}
            </th>
            <th onClick={() => handleSort("currency")}>
              Tipo{" "}
              {sortField === "currency" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("dispensedWater")}>
              Agua Dispensada{" "}
              {sortField === "dispensedWater" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
          </tr>
          <tr>
            <th>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.date.join('/')}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.dispensedWater}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastTransaction >= transactions.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
