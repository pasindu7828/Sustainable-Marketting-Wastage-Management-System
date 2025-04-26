import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle, ReceiptLong, Search } from '@mui/icons-material';

const URL = "http://localhost:5000/Inventorys";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

// Styled Components
const StyledTableContainer = styled(TableContainer)({
  margin: '20px auto',
  maxWidth: '1100px',
  borderRadius: '12px',
  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#3f51b5',
});

const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
  verticalAlign: 'middle',
  fontWeight: 'bold',
  color: 'white',
  fontSize: '14px',
  padding: '6px',
});

const StyledTableCell2 = styled(TableCell)({
  textAlign: 'center',
  verticalAlign: 'middle',
  color: '#333',
  fontSize: '13px',
  padding: '4px',
});

function FarmerList() {
  const navigate = useNavigate();
  const [inventorys, setInventorys] = useState([]);
  const [filteredInventorys, setFilteredInventorys] = useState([]);
  const [issuedButtons, setIssuedButtons] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchHandler().then((data) => {
      setInventorys(data.Inventorys);
      setFilteredInventorys(data.Inventorys); // Initial display = all data

      // Load issued state from localStorage
      const savedIssuedState = JSON.parse(localStorage.getItem('issuedButtons')) || {};
      const currentTime = Date.now();
      const timeLimit = 2 * 365 * 24 * 60 * 60 * 1000; // 2 years in milliseconds

      const filteredIssuedState = {};
      Object.keys(savedIssuedState).forEach((key) => {
        if (currentTime - savedIssuedState[key] < timeLimit) {
          filteredIssuedState[key] = savedIssuedState[key];
        }
      });

      setIssuedButtons(filteredIssuedState);
      localStorage.setItem('issuedButtons', JSON.stringify(filteredIssuedState));
    });
  }, []);

  const buttonHandler = (id) => {
    console.log("Clicked ID:", id);

    const updatedState = {
      ...issuedButtons,
      [id]: Date.now(),
    };

    setIssuedButtons(updatedState);
    localStorage.setItem('issuedButtons', JSON.stringify(updatedState));

    navigate('/addFarmerPayment', { state: { id } });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = inventorys.filter(item =>
      item.pname.toLowerCase().includes(query) ||
      item.fname.toLowerCase().includes(query) ||
      item.fid.toString().includes(query) ||
      item.pid.toString().includes(query)
    );

    setFilteredInventorys(filteredData);
  };

  // Button to navigate to "displayFarmerPayment" page
  const handleDisplayFarmerPayment = () => {
    navigate('/displayFarmerPayment');
  };

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold', marginTop: 2, color: '#333' }}>
        Product Details Display
      </Typography>

      {/* Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
        <TextField
          label="Search by Product, Farmer Name, ID..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "40%", backgroundColor: "white", borderRadius: 1 }}
          InputProps={{
            startAdornment: <Search sx={{ marginRight: 1 }} />
          }}
        />
      </div>

      {/* Button to navigate to 'displayFarmerPayment' page */}
      <Button
        variant="contained"
        onClick={handleDisplayFarmerPayment}
        sx={{
          position: 'absolute',
          right: '20px',
          top: '20px',
          backgroundColor: '#3f51b5',
          color: 'white',
          borderRadius: '12px',
          padding: '10px 20px',
          fontSize: '14px',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#303f9f'
          }
        }}
      >
        View Farmer Payments
      </Button>

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
            {filteredInventorys.length > 0 ? (
              filteredInventorys.map((user, i) => (
                <TableRow key={user._id} style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
                  <StyledTableCell2>{new Date(user.createdAt).toLocaleDateString()}</StyledTableCell2>
                  <StyledTableCell2>{user.pid}</StyledTableCell2>
                  <StyledTableCell2>{user.pname}</StyledTableCell2>
                  <StyledTableCell2>{user.fid}</StyledTableCell2>
                  <StyledTableCell2>{user.fname}</StyledTableCell2>
                  <StyledTableCell2>{user.fnumber}</StyledTableCell2>
                  <StyledTableCell2>{user.quantity}</StyledTableCell2>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      onClick={() => buttonHandler(user._id)}
                      sx={{
                        backgroundColor: issuedButtons[user._id] ? '#4CAF50' : '#f50057',
                        color: 'white',
                        borderRadius: '15px',
                        padding: '5px 15px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '90px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        '&:hover': { backgroundColor: issuedButtons[user._id] ? '#388E3C' : '#c51162' }
                      }}
                    >
                      {issuedButtons[user._id] ? <CheckCircle fontSize="small" /> : <ReceiptLong fontSize="small" />}
                      {issuedButtons[user._id] ? "Issued" : "Issue Bill"}
                    </Button>
                  </StyledTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ padding: 3, color: '#888' }}>
                  No matching records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
}

export default FarmerList;
