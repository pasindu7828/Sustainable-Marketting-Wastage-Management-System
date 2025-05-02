import React, { useEffect, useState } from 'react';
import TNav from '../../Nav/TNav';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const URL = "http://Localhost:5000/Inventorys";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const StyledTableContainer = styled(TableContainer)({
  margin: '20px auto',
  maxWidth: '1000px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  overflowX: 'auto',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#ECF87F',
});

const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
  verticalAlign: 'middle',
  fontWeight: 'bold',
  color: 'black',
});

const StyledTableCell2 = styled(TableCell)({
  textAlign: 'center',
  verticalAlign: 'middle',
  color: 'black',
});

const StyledButton = styled(Button)({
  borderRadius: '8px',
  padding: '6px 12px',
  minWidth: '100px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.85rem',
  boxShadow: 'none',
  whiteSpace: 'nowrap',
});

function DisplayProductDetails() {
  const navigate = useNavigate();
  const [Inventorys, setUsers] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.Inventorys));
  }, []);

  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://Localhost:5000/Inventorys/${_id}`);
      setUsers(prev => prev.filter(item => item._id !== _id));
    } catch (error) {
      console.error("Error deleting product details:", error);
    }
  };

  const generatePDF = (item) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Product Report", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Date', new Date(item.createdAt).toLocaleDateString()],
        ['Product ID', item.pid],
        ['Product Name', item.pname],
        ['Farmer ID', item.fid],
        ['Farmer Name', item.fname],
        ['Farmer Number', item.fnumber],
        ['Quantity (kg)', item.quantity],
      ],
    });

    doc.save(`Product_Report_${item.pid}.pdf`);
  };

  const filteredInventorys = Inventorys?.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      new Date(item.createdAt).toLocaleDateString().includes(search) ||
      item.pid?.toString().toLowerCase().includes(search) ||
      item.pname?.toLowerCase().includes(search) ||
      item.fid?.toString().toLowerCase().includes(search) ||
      item.fname?.toLowerCase().includes(search) ||
      item.fnumber?.toString().toLowerCase().includes(search) ||
      item.quantity?.toString().toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <TNav />
      <h1 style={{ textAlign: 'center' }}>Product Details Display Page</h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '60%' }}
        />
      </div>

      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Product ID</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Farmer ID</StyledTableCell>
              <StyledTableCell>Farmer Name</StyledTableCell>
              <StyledTableCell>Farmer Number</StyledTableCell>
              <StyledTableCell>Product Quantity (kg)</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {filteredInventorys && filteredInventorys.map((user, i) => (
              <TableRow key={i} style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white', color: "black" }}>
                <StyledTableCell>{new Date(user.createdAt).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell2>{user.pid}</StyledTableCell2>
                <StyledTableCell2>{user.pname}</StyledTableCell2>
                <StyledTableCell2>{user.fid}</StyledTableCell2>
                <StyledTableCell2>{user.fname}</StyledTableCell2>
                <StyledTableCell2>{user.fnumber}</StyledTableCell2>
                <StyledTableCell2>{user.quantity}</StyledTableCell2>
                <StyledTableCell>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={1}
                  >
                    <Link to={`/DisplayProductDetails/${user._id}`} style={{ textDecoration: 'none' }}>
                      <StyledButton variant="contained" color="info">Update</StyledButton>
                    </Link>
                    <StyledButton variant="contained" color="error" onClick={() => deleteHandler(user._id)}>
                      Delete
                    </StyledButton>
                    <StyledButton variant="contained" color="success" onClick={() => generatePDF(user)}>
                      Generate Report
                    </StyledButton>
                  </Box>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
}

export default DisplayProductDetails;
