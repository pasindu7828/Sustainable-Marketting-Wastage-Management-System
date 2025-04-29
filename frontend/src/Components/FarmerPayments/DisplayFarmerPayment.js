import React, { useEffect, useState } from 'react';
import FarmerPayment from '../Nav/FarmerPayment';
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";
import { Edit, Delete, Receipt } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const URL = "http://localhost:5000/Farmers";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};

const StyledTableContainer = styled(TableContainer)({
  margin: '30px auto',
  maxWidth: '100%',
  overflowX: 'auto',
  borderRadius: '12px',
  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.15)',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#3949AB',
  position: 'sticky',
  top: 0,
  zIndex: 2,
});

const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
  verticalAlign: 'middle',
  fontWeight: 'bold',
  color: 'white',
  fontSize: '12px',
  padding: '8px 6px',
  borderBottom: '2px solid #ddd',
});

const StyledTableCell2 = styled(TableCell)({
  textAlign: 'center',
  verticalAlign: 'middle',
  color: '#333',
  fontSize: '12px',
  padding: '8px 6px',
  borderBottom: '1px solid #ddd',
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
  '&:hover': { backgroundColor: '#e3e3e3' },
});

const StyledButton = styled(Button)({
  borderRadius: '15px',
  padding: '6px 16px',
  fontSize: '13px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

function DisplayFarmerPayment() {
  const navigate = useNavigate();
  const [Farmers, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.Farmers));
  }, []);

  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/Farmers/${_id}`);
      setUsers(Farmers.filter(farmer => farmer._id !== _id));
    } catch (error) {
      console.error("Error deleting farmer payment:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFarmers = Farmers.filter((farmer) => {
    return (
      String(farmer.fid).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(farmer.fname).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(farmer.pname).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(farmer.billno).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const generatePDF = (farmer) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Farmer Payment Report', 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(100);

    const tableData = [
      ['Farmer NIC', farmer.fid],
      ['Farmer Name', farmer.fname],
      ['Product Name', farmer.pname],
      ['Quantity', farmer.quantity],
      ['Bill Number', farmer.billno],
      ['Date', new Date(farmer.createdAt).toLocaleDateString()],
      ['Amount', `Rs. ${farmer.amount}`],
      ['Email', farmer.femail],
      ['Contact Number', farmer.fnumber],
    ];

    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [63, 81, 181], halign: 'center' },
      bodyStyles: { halign: 'left' },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 130 },
      },
    });

    doc.save(`Farmer_${farmer.fname}_Report.pdf`);
  };

  return (
    <div>
      <FarmerPayment />
      <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold', marginTop: '15px', color: '#333' }}>
        Display Farmer Payments
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '300px', marginRight: '10px' }}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button 
          variant="contained" 
          sx={{
            backgroundColor: '#1976D2',
            color: 'white',
            padding: '8px 16px',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#1565C0' },
          }}
          onClick={() => navigate('/totalFarmerPayments')}
        >
          <Receipt fontSize="small" /> View Total Amounts
        </Button>
      </div>

      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Farmer NIC</StyledTableCell>
              <StyledTableCell>Farmer Name</StyledTableCell>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Bill Number</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Contact Number</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {filteredFarmers && filteredFarmers.map((farmer) => (
              <StyledTableRow key={farmer._id}>
                <StyledTableCell2>{new Date(farmer.createdAt).toLocaleDateString()}</StyledTableCell2>
                <StyledTableCell2>{farmer.fid}</StyledTableCell2>
                <StyledTableCell2>{farmer.fname}</StyledTableCell2>
                <StyledTableCell2>{farmer.pname}</StyledTableCell2>
                <StyledTableCell2>{farmer.quantity}</StyledTableCell2>
                <StyledTableCell2>{farmer.billno}</StyledTableCell2>
                <StyledTableCell2>{farmer.date}</StyledTableCell2>
                <StyledTableCell2>{farmer.amount}</StyledTableCell2>
                <StyledTableCell2>{farmer.femail}</StyledTableCell2>
                <StyledTableCell2>{farmer.fnumber}</StyledTableCell2>
                <StyledTableCell>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Link to={`/displayFarmerPayment/${farmer._id}`} style={{ textDecoration: 'none' }}>
                      <StyledButton variant="contained" sx={{ backgroundColor: '#4CAF50', color: 'white', '&:hover': { backgroundColor: '#388E3C' } }}>
                        <Edit fontSize="small" /> Update
                      </StyledButton>
                    </Link>
                    <StyledButton
                      variant="contained"
                      sx={{ backgroundColor: '#f44336', color: 'white', '&:hover': { backgroundColor: '#D32F2F' } }}
                      onClick={() => deleteHandler(farmer._id)}
                    >
                      <Delete fontSize="small" /> Delete
                    </StyledButton>
                    <StyledButton
                      variant="contained"
                      sx={{ backgroundColor: '#1976D2', color: 'white', '&:hover': { backgroundColor: '#1565C0' } }}
                      onClick={() => generatePDF(farmer)}
                    >
                      <Receipt fontSize="small" /> Report
                    </StyledButton>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
}

export default DisplayFarmerPayment;
