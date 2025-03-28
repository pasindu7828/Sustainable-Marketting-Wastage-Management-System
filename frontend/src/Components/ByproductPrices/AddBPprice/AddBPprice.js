import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
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

function AddBPprice({ bpprices = [] }) {
  const navigate = useNavigate();

  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/ByproductPrices/${_id}`);
      navigate("/");
      navigate("/BPPriceDetails");
    } catch (error) {
      console.error("Error deleting byproduct price:", error);
    }
  };

  const renderTableRow = (bpprice) => {
    const { _id, bp1, bp2, bp3, bp4, bp5, createdAt } = bpprice;
    const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : "N/A";

    return (
      <TableRow key={_id} style={{ backgroundColor: '#f2f2f2' }}>
        <TableCell>
          <TextField
            type="number"
            name="bp1"
            defaultValue={bp1 || ''}
            variant="outlined"
            size="small"
            fullWidth
          />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            name="bp2"
            defaultValue={bp2 || ''}
            variant="outlined"
            size="small"
            fullWidth
          />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            name="bp3"
            defaultValue={bp3 || ''}
            variant="outlined"
            size="small"
            fullWidth
          />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            name="bp4"
            defaultValue={bp4 || ''}
            variant="outlined"
            size="small"
            fullWidth
          />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            name="bp5"
            defaultValue={bp5 || ''}
            variant="outlined"
            size="small"
            fullWidth
          />
        </TableCell>
        <TableCell>{formattedDate}</TableCell>
        <TableCell>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to={`/BPPriceDetails/${_id}`} style={{ textDecoration: 'none' }}>
              <StyledButton variant="contained" color="primary">Update</StyledButton>
            </Link>
            <StyledButton 
              variant="contained" 
              color="secondary" 
              onClick={() => deleteHandler(_id)}
            >
              Delete
            </StyledButton>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <StyledTableContainer component={Paper}>
      <h1 style={{ textAlign: 'center', color: '#333', padding: '20px' }}>Byproduct kk Prices</h1>
      <Table>
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Mix Fruit Jam (500 ml)</StyledTableCell>
            <StyledTableCell>Mix Fruit Cocktails (500 ml)</StyledTableCell>
            <StyledTableCell>Jellies (500 ml)</StyledTableCell>
            <StyledTableCell>Fruit Juices (500 ml)</StyledTableCell>
            <StyledTableCell>Smoothies (500 ml)</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {bpprices.map(renderTableRow)}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default AddBPprice;