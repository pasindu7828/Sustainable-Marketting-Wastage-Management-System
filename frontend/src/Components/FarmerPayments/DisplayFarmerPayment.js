import React, { useEffect, useState } from 'react';
import FarmerPayment from '../Nav/FarmerPayment';
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/Farmers";

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
  backgroundColor: '#4CAF50'
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
  borderRadius: '20px',
  padding: '8px 20px',
  margin: '10px',
  fontWeight: 'bold'
});

function DisplayFarmerPayment() {
  const navigate = useNavigate();
  const [Farmers, setUsers] = useState([]);

  useEffect(() => {
      fetchHandler().then((data) => setUsers(data.Farmers));
  }, []);

  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/Farmers/${_id}`);
      setUsers(Farmers.filter(farmer => farmer._id !== _id)); // Remove deleted farmer from UI
    } catch (error) {
      console.error("Error deleting farmer payment:", error);
    }
  };

  return (
    <div>
      <FarmerPayment/>
      <h1 style={{ textAlign: 'center' }}>Display Farmer Payments</h1>

      {/* Button to navigate to Total Amounts Page */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/totalFarmerPayments')}
        >
          View Total Amounts
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
            {Farmers && Farmers.map((farmer, i) => (
              <TableRow key={i} style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <StyledTableCell>{new Date(farmer.createdAt).toLocaleDateString()}</StyledTableCell>
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
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/displayFarmerPayment/${farmer._id}`} style={{ textDecoration: 'none' }}>
                      <StyledButton variant="contained" color="primary">Update</StyledButton>
                    </Link>
                    <StyledButton
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteHandler(farmer._id)}
                    >
                      Delete
                    </StyledButton>
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

export default DisplayFarmerPayment;
