import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
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

function ViewProductDetails(props) {
    const { _id, pid, pname, fid, fname, fnumber, quantity } = props.user;

    const [addedDate, setAddedDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch product details to get the added date
        axios.get(`http://localhost:5000/Inventorys/${_id}`)
            .then(res => {
                setAddedDate(res.data.addedDate);  // Assuming the response contains addedDate
            })
            .catch(error => console.error('Error fetching product details:', error));
    }, [_id]);

    const deleteHandler = async () => {
        await axios.delete(`http://localhost:5000/Inventorys/${_id}`)
            .then(res => res.data)
            .then(() => navigate("/"))
            .then(() => navigate("/DisplayProductDetails"));
    };

    return (
        <StyledTableContainer component={Paper}>
            <h1 style={{ textAlign: 'center', color: '#333', padding: '20px' }}>Product Details</h1>
            <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                Added Date: {addedDate}
            </Typography>
            <Table>
                <StyledTableHead>
                    <TableRow>
                        <StyledTableCell>Detail</StyledTableCell>
                        <StyledTableCell>Value</StyledTableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Product ID</TableCell>
                        <TableCell>{pid}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>{pname}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Farmer ID</TableCell>
                        <TableCell>{fid}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Farmer Name</TableCell>
                        <TableCell>{fname}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Farmer Number</TableCell>
                        <TableCell>{fnumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Product Quantity (kg)</TableCell>
                        <TableCell>{quantity}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Link to={`/DisplayProductDetails/${_id}`} style={{ textDecoration: 'none' }}>
                    <StyledButton variant="outlined" color="primary">Update</StyledButton>
                </Link>
                <StyledButton variant="contained" color="secondary" onClick={deleteHandler}>Delete</StyledButton>
            </div>
        </StyledTableContainer>
    );
}

export default ViewProductDetails;