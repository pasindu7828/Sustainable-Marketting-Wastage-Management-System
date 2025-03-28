import React, { useEffect, useState } from 'react'
import ShopPricesNav from '../Nav/ShopPriceNav'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

const URL ="http://localhost:5000/ShopPrices";

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

function DisplayShopPrices() {

  const navigate = useNavigate();
  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/ShopPrices/${_id}`);
      navigate("/");
      navigate("/displayShopPrice");
    } catch (error) {
      console.error("Error deleting byproduct price:", error);
    }
  };

    const[ShopPrices, setUsers] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.ShopPrices));
  },[])

  return (
    <div>
      <ShopPricesNav/>
      <h1 style={{ textAlign: 'center' }}>Shop Product Price List</h1>
      <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
               <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Apple Price</StyledTableCell>
                  <StyledTableCell>Orange Price</StyledTableCell>
                  <StyledTableCell>Banana Price</StyledTableCell>
                  <StyledTableCell>Graphs Price</StyledTableCell>
                  <StyledTableCell>Watemelon Price</StyledTableCell>
                  <StyledTableCell>Mango Price</StyledTableCell>
                  <StyledTableCell>WoodApple Price</StyledTableCell>
                  <StyledTableCell>Pineapple Price</StyledTableCell>
                  <StyledTableCell>Papaya Price</StyledTableCell>
                  <StyledTableCell>GoavaPrice</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
            </StyledTableHead>
             <TableBody>
      
          {ShopPrices && ShopPrices.map((shopproductprices,i) =>(
            <TableRow key={i}
             style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white',
                        color:"black"
               }}>
               <StyledTableCell>{new Date(shopproductprices.createdAt).toLocaleDateString()}</StyledTableCell>
               <StyledTableCell2>
                    {shopproductprices.spApple}
                </StyledTableCell2>
                <StyledTableCell2>
                    {shopproductprices.spOrange}
                </StyledTableCell2>
                <StyledTableCell2>
                    {shopproductprices.spBanana}
                </StyledTableCell2>
                <StyledTableCell2>
                    {shopproductprices.spGraphes}
                </StyledTableCell2>
                <StyledTableCell2>
                    {shopproductprices.spWatermelon}
                </StyledTableCell2>
                <StyledTableCell2>
                    {shopproductprices.spMango}
                </StyledTableCell2>
                <StyledTableCell2>
                    {shopproductprices.spWoodapple}
                </StyledTableCell2>
                <StyledTableCell2>
                    {shopproductprices.spPineapple}
                </StyledTableCell2>
                <StyledTableCell2>
                    {shopproductprices.spPapaya}
                </StyledTableCell2>
                <StyledTableCell2>
                    {shopproductprices.spGoava}
                </StyledTableCell2>

                <StyledTableCell>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/displayShopPrice/${shopproductprices._id}`} style={{ textDecoration: 'none' }}>
                      <StyledButton variant="contained" color="primary">Update</StyledButton>
                    </Link>
                    <StyledButton
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteHandler(shopproductprices._id)}
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

export default DisplayShopPrices
