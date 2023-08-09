import React, { useState, useEffect } from "react";
import axios from "axios";
import "./transacciones.css";
import { userColumns } from "../../datatablesource3";
import { UserTable, fetchUserData } from "../../datatablesource3";
import { saveAs } from "file-saver"; // Import file-saver to save the Excel file
import * as ExcelJS from "exceljs";

const TransactionTable = ({ machineId }) => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const [sortField, setSortField] = useState("transactionId");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [data, setData] = useState([]);
  const exportToExcel = async () => {
    // Create a new Workbook
    const workbook = new ExcelJS.Workbook();

    // Add a new worksheet to the workbook
    const worksheet = workbook.addWorksheet("Maquinas");

    // Extract the column headers from userColumns
    const columnHeaders = userColumns.map((column) => column.headerName);

    // Set the headers as the first row in the worksheet
    worksheet.addRow(columnHeaders);

    // Extract the data rows from the DataGrid rows prop
    const rows = data.map((rowData) => {
      return userColumns.map((column) => rowData[column.field]);
    });

    // Add the data rows to the worksheet
    rows.forEach((row) => {
      worksheet.addRow(row);
    });

    // Generate a buffer for the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Save the buffer as a file using FileSaver
    saveAs(new Blob([buffer]), "maquinas.xlsx");
  };
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://iotcoremt-production.up.railway.app/transactions/user/${machineId}`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
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
        Object.values(transaction).some(
          (value) =>
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
      <div className="excel">
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Buscar..."
      />
      
        <a
          href="#"
          onClick={exportToExcel}
          style={{
            display: "inline-block",
            textDecoration: "none",
            background: "rgba(0,128,0,255)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          Exportar tabla a Excel
        </a>
      </div>
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
              {sortField === "date" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("amount")}>
              Monto{" "}
              {sortField === "amount" && (
                <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
              )}
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
            <th></th>
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
              <td>{transaction.date.join("/")}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.dispensedWater}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastTransaction >= transactions.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
