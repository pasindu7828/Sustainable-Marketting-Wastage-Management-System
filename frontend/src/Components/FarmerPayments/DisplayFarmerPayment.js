import React, { useEffect, useState } from 'react'
import FarmerPayment from '../Nav/FarmerPayment'
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const URL ="http://localhost:5000/Farmers";

const fetchHandler = async () =>{
    return await axios.get(URL).then((res) => res.data);
}

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
  textAlign: 'center',  // Centers content horizontally
  verticalAlign: 'middle',  // Centers content vertically
  fontWeight: 'bold',
  color: 'black',
});
const StyledTableCell2 = styled(TableCell)({
  textAlign: 'center',  // Centers content horizontally
  verticalAlign: 'middle',  // Centers content vertically
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
  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/Farmers/${_id}`);
      navigate("/");
      navigate("/addFarmerPayment");
    } catch (error) {
      console.error("Error deleting byproduct price:", error);
    }
  };
    const[Farmers, setUsers] = useState();
            useEffect(() => {
                fetchHandler().then((data) => setUsers(data.Farmers));
          },[])

  return (
    <div>
      <FarmerPayment/>
      <h1 style={{ textAlign: 'center' }}>Display Farmer Payments</h1>
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
                  {Farmers && Farmers.map((farmerpayments,i) =>(
                      <TableRow key={i}
                      style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white',
                        color:"black"
               }}>
                <StyledTableCell>{new Date(farmerpayments.createdAt).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell2>
                    {farmerpayments.fid}
                </StyledTableCell2>
                <StyledTableCell2>
                  {farmerpayments.fname}
                </StyledTableCell2>
                <StyledTableCell2>
                {farmerpayments.pname}
                </StyledTableCell2>
                <StyledTableCell2>
                {farmerpayments.quantity}
                </StyledTableCell2>
                <StyledTableCell2>
                {farmerpayments.billno}
                </StyledTableCell2>
                <StyledTableCell2>
                {farmerpayments.date}
                </StyledTableCell2>
                <StyledTableCell2>
                {farmerpayments.amount}
                </StyledTableCell2>
                <StyledTableCell2>
                {farmerpayments.femail}
                </StyledTableCell2>
                <StyledTableCell2>
                {farmerpayments.fnumber}
                </StyledTableCell2>
                
                <StyledTableCell>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/displayFarmerPayment/${farmerpayments._id}`} style={{ textDecoration: 'none' }}>
                      <StyledButton variant="contained" color="primary">Update</StyledButton>
                    </Link>
                    <StyledButton
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteHandler(farmerpayments._id)}
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

export default DisplayFarmerPayment
