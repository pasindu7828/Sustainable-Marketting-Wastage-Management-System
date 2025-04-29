import React, { useEffect, useState } from 'react'
import FarmerPricesNav from "../../Nav/FarmerPricesNav"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

const URL ="http://localhost:5000/FarmerPrices";

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

function DisplayFmPrices() {

  const navigate = useNavigate();
  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/FarmerPrices/${_id}`);
      navigate("/");
      navigate("/displayFarmerPrice");
    } catch (error) {
      console.error("Error deleting byproduct price:", error);
    }
  };

    const[FarmerPrices, setUsers] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.FarmerPrices));
  },[])

  return (
    <div>
      <FarmerPricesNav/>
      <h1 style={{ textAlign: 'center' }}>Farmer Product Price List</h1>
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
      
          {FarmerPrices && FarmerPrices.map((farmerproductprices,i) =>(
            <TableRow key={i}
             style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white',
                        color:"black"
               }}>
               <StyledTableCell>{new Date(farmerproductprices.createdAt).toLocaleDateString()}</StyledTableCell>
               <StyledTableCell2>
                    {farmerproductprices.fpApple}
                </StyledTableCell2>
                <StyledTableCell2>
                    {farmerproductprices.fpOrange}
                </StyledTableCell2>
                <StyledTableCell2>
                    {farmerproductprices.fpBanana}
                </StyledTableCell2>
                <StyledTableCell2>
                    {farmerproductprices.fpGraphes}
                </StyledTableCell2>
                <StyledTableCell2>
                    {farmerproductprices.fpWatermelon}
                </StyledTableCell2>
                <StyledTableCell2>
                    {farmerproductprices.fpMango}
                </StyledTableCell2>
                <StyledTableCell2>
                    {farmerproductprices.fpWoodapple}
                </StyledTableCell2>
                <StyledTableCell2>
                    {farmerproductprices.fpPineapple}
                </StyledTableCell2>
                <StyledTableCell2>
                    {farmerproductprices.fpPapaya}
                </StyledTableCell2>
                <StyledTableCell2>
                    {farmerproductprices.fpGoava}
                </StyledTableCell2>

                <StyledTableCell>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/displayFarmerPrice/${farmerproductprices._id}`} style={{ textDecoration: 'none' }}>
                      <StyledButton variant="contained" color="primary">Update</StyledButton>
                    </Link>
                    
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

export default DisplayFmPrices
