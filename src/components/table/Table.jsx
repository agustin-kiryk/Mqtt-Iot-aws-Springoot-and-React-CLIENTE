import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Enero",
      customer: "5000",
      date: "1400$",
      amount: "500$",
      method: "1900$",
      status: "Corriente", 
    },
    {
      id: 2235235,
      product: "Febrero",
      customer: "3000",
      date: "3000$",
      amount: "1000$",
      method: "4000$",
      status: "Deuda",
    },
    {
      id: 2342353,
      product: "Marzo",
      customer: "2000",
      date: "1000$",
      amount: "300$",
      method: "1300$",
      status: "Corriente",
    },
    {
      id: 2357741,
      product: "Abril",
      customer: "8000",
      date: "500$",
      amount: "200$",
      method: "700$",
      status: "Corriente",
    },
    {
      id: 2342355,
      product: "Mayo",
      customer: "1000",
      date: "2000$",
      amount: "1000$",
      method: "3000$",
      status: "Deuda",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID Maquina</TableCell>
            <TableCell className="tableCell">Mes</TableCell>
            <TableCell className="tableCell">Litros Vendidos</TableCell>
            <TableCell className="tableCell">Ganancias</TableCell>
            <TableCell className="tableCell">Derecho de Marca</TableCell>
            <TableCell className="tableCell">Total Vendido</TableCell>
            <TableCell className="tableCell">Estatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
