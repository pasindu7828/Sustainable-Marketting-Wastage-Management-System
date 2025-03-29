import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const URL = "http://localhost:5000/Inventorys";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const StyledTableContainer = styled(TableContainer)({
  margin: '20px auto',
  maxWidth: '1000px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#ECF87F'
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

// Removed StyledButton because we need to apply dynamic styles directly
function FarmerList() {
  const navigate = useNavigate();
  const [Inventorys, setUsers] = useState([]);
  const [clickedButtons, setClickedButtons] = useState({});

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.Inventorys));
  }, []);

  const buttonHandler = (id) => {
    console.log("Clicked ID:", id);

    // Updating state correctly
    setClickedButtons((prevState) => {
      const newState = { ...prevState, [id]: true }; 
      console.log("Updated clickedButtons state:", newState);
      return newState;
    });

    navigate('/addFarmerPayment', { state: { id } });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Product Details Display Page</h1>
      
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
            {Inventorys && Inventorys.map((user, i) => (
              <TableRow key={user._id} style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white', color: "black" }}>
                <StyledTableCell>{new Date(user.createdAt).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell2>{user.pid}</StyledTableCell2>
                <StyledTableCell2>{user.pname}</StyledTableCell2>
                <StyledTableCell2>{user.fid}</StyledTableCell2>
                <StyledTableCell2>{user.fname}</StyledTableCell2>
                <StyledTableCell2>{user.fnumber}</StyledTableCell2>
                <StyledTableCell2>{user.quantity}</StyledTableCell2>
                <StyledTableCell>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={() => buttonHandler(user._id)}
                      sx={{
                        backgroundColor: clickedButtons[user._id] ? '#4CAF50' : 'red',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '8px 20px',
                        margin: '10px',
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: clickedButtons[user._id] ? '#388E3C' : 'darkred' }
                      }}
                    >
                      {clickedButtons[user._id] ? "Issued" : "Issue Bill"}
                    </Button>
                  </div>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </div>
  );
}

export default FarmerList;
