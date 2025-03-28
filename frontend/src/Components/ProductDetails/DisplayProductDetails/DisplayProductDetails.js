import React, { useEffect, useState } from 'react';
import TNav from '../../Nav/TNav';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const URL = "http://Localhost:5000/Inventorys";

const fetchHandler = async () =>{
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


function DisplayProductDetails() {

  const navigate = useNavigate();
  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://Localhost:5000/Inventorys/${_id}`);
      navigate("/");
      navigate("/DisplayProductDetails");
    } catch (error) {
      console.error("Error deleting product details:", error);
    }
  };

  const [Inventorys, setUsers] = useState();
  useEffect(()=> {
    fetchHandler().then((data) => setUsers(data.Inventorys));
  },[])


  return (
    <div>
      <TNav/>
      <h1 style={{ textAlign: 'center' }}>Product Details Dispaly Page</h1>
      
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

        {Inventorys && Inventorys.map((user,i) => (
          <TableRow key={i}
            style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white',
                        color:"black"
               }}>

                <StyledTableCell>{new Date(user.createdAt).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell2>
                    {user.pid}
                </StyledTableCell2>
                <StyledTableCell2>
                  {user.pname}
                </StyledTableCell2>
                <StyledTableCell2>
                {user.fid}
                </StyledTableCell2>
                <StyledTableCell2>
                {user.fname}
                </StyledTableCell2>
                <StyledTableCell2>
                {user.fnumber}
                </StyledTableCell2>
                <StyledTableCell2>
                {user.quantity}
                </StyledTableCell2>
            
                <StyledTableCell>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/DisplayProductDetails/${user._id}`} style={{ textDecoration: 'none' }}>
                      <StyledButton variant="contained" color="primary">Update</StyledButton>
                    </Link>
                    <StyledButton
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteHandler(user._id)}
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
export default DisplayProductDetails;
