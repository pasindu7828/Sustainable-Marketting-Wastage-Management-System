import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

function ViewShopProductDetails(props) {
  const { _id, totalapple, totalorange, totalbanana, totalgrapes, totalwatermelon, totalmango,
    totalwoodapple, totalpineapple, totalpapaya, totalguava, shopapple, shoporange, shopbanana,
    shopgrapes, shopwatermelon, shopmango, shopwoodapple, shoppineapple, shoppapaya, shopguava } = props.user;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/GoodInventorys/${_id}`)
      .then(res => res.data)
      .then(() => navigate("/"))
      .then(() => navigate("/DisplayShopProductDetails"));
  };

  return (
    <StyledTableContainer component={Paper}>
      <h1 style={{ textAlign: 'center', color: '#333', padding: '20px' }}>Shop Product Quantity</h1>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell>Total Quantity (kg)</StyledTableCell>
            <StyledTableCell>Shop Quantity (kg)</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {[['Apple', totalapple, shopapple], ['Orange', totalorange, shoporange], ['Banana', totalbanana, shopbanana],
            ['Grapes', totalgrapes, shopgrapes], ['Watermelon', totalwatermelon, shopwatermelon],
            ['Mango', totalmango, shopmango], ['Woodapple', totalwoodapple, shopwoodapple],
            ['Pineapple', totalpineapple, shoppineapple], ['Papaya', totalpapaya, shoppapaya],
            ['Guava', totalguava, shopguava]].map((item, index) => (
            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
              <TableCell>{item[0]}</TableCell>
              <TableCell>{item[1]}</TableCell>
              <TableCell>{item[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Link to={`/DisplayShopProductDetails/${_id}`} style={{ textDecoration: 'none' }}>
          <StyledButton variant="contained" color="primary">Update</StyledButton>
        </Link>
        <StyledButton variant="contained" color="secondary" onClick={deleteHandler}>Delete</StyledButton>
      </div>
    </StyledTableContainer>
  );
}

export default ViewShopProductDetails;