import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)({
  margin: '20px auto',
  maxWidth: '800px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#4CAF50'
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: 'white'
});

const StyledButton = styled(Button)({
  borderRadius: '20px',
  padding: '8px 20px',
  margin: '10px',
  fontWeight: 'bold'
});

function ViewFmPrices(props) {
  const { _id, fpApple, fpOrange, fpBanana, fpGraphes, fpWatermelon, fpMango, fpWoodapple, fpPineapple, fpPapaya, fpGoava, createdAt } = props.farmerproductprices;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/FarmerPrices/${_id}`)
      .then(res => res.data)
      .then(() => navigate("/"))
      .then(() => navigate("/displayFarmerPrice"));
  };

  // Format the date
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : "N/A";

  return (
    <StyledTableContainer component={Paper}>
      <h1 style={{ textAlign: 'center', color: '#333', padding: '20px' }}>Farmer Product Prices List</h1>
      <h3 style={{ textAlign: 'center', color: '#555' }}>Added Date: {formattedDate}</h3>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell>Price (1 kg)</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {[
            ['Apple', fpApple], ['Orange', fpOrange], ['Banana', fpBanana], ['Grapes', fpGraphes],
            ['Watermelon', fpWatermelon], ['Mango', fpMango], ['Woodapple', fpWoodapple],
            ['Pineapple', fpPineapple], ['Papaya', fpPapaya], ['Guava', fpGoava]
          ].map((item, index) => (
            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <TableCell>{item[0]}</TableCell>
              <TableCell>{item[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Link to={`/displayFarmerPrice/${_id}`} style={{ textDecoration: 'none' }}>
          <StyledButton variant="contained" color="primary">Update</StyledButton>
        </Link>
        <StyledButton variant="contained" color="secondary" onClick={deleteHandler}>Delete</StyledButton>
      </div>
    </StyledTableContainer>
  );
}

export default ViewFmPrices;
