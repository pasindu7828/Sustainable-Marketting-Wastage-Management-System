import React, { useEffect, useState } from 'react';
import ByProductNav from '../Nav/ByProductNav';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';


const URL = "http://Localhost:5000/BadInventorys";

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


function DisplayByProductDetails() {


  const navigate = useNavigate();
  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://Localhost:5000/BadInventorys/${_id}`);
      navigate("/");
      navigate("/DisplayByProductDetails");
    } catch (error) {
      console.error("Error deleting byproduct price:", error);
    }
  };
    
      const [BadInventorys, setUsers] = useState();
      useEffect(()=> {
        fetchHandler().then((data) => setUsers(data.BadInventorys));
      },[])

  return (
    <div>
        <ByProductNav/>
        <h1 style={{ textAlign: 'center' }}>By Product Details Dispaly Page</h1>
              
        <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>

            <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Mix Fruit Jam (500 ml)</StyledTableCell>
              <StyledTableCell>Mix Fruit Cocktails (500 ml)</StyledTableCell>
              <StyledTableCell>Jellies (500 ml)</StyledTableCell>
              <StyledTableCell>Fruit Juices (500 ml)</StyledTableCell>
              <StyledTableCell>Smoothies (500 ml)</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>



             
              {BadInventorys && BadInventorys.map((user,i) => (
              <TableRow key={i}

              style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white',
                        color:"black"
               }}>

                <StyledTableCell>{new Date(user.createdAt).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell2>
                    {user.Bp1}
                </StyledTableCell2>
                <StyledTableCell2>
                  {user.Bp2}
                </StyledTableCell2>
                <StyledTableCell2>
                {user.Bp3}
                </StyledTableCell2>
                <StyledTableCell2>
                {user.Bp4}
                </StyledTableCell2>
                <StyledTableCell2>
                {user.Bp5}
                </StyledTableCell2>

                <StyledTableCell>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={`/DisplayByProductDetails/${user._id}`} style={{ textDecoration: 'none' }}>
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

export default DisplayByProductDetails;
