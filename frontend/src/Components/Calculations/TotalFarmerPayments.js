import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:5000/Farmers";

const StyledTableContainer = styled(TableContainer)({
  margin: '20px auto',
  maxWidth: '600px',
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

function TotalFarmerPayments() {
  const [totals, setTotals] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(URL).then((res) => {
      const totalsByDate = {};
      res.data.Farmers.forEach(farmer => {
        const formattedDate = new Date(farmer.createdAt).toLocaleDateString();
        if (!totalsByDate[formattedDate]) {
          totalsByDate[formattedDate] = 0;
        }
        totalsByDate[formattedDate] += farmer.amount; // Summing up amounts for each date
      });

      setTotals(totalsByDate);
    });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Total Amount per Date</h1>
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {Object.keys(totals).map((date, i) => (
              <TableRow key={i} style={{ backgroundColor: i % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <StyledTableCell>{date}</StyledTableCell>
                <StyledTableCell2>{totals[date].toFixed(2)}</StyledTableCell2>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Back to Farmer Payments
        </Button>
      </div>
    </div>
  );
}

export default TotalFarmerPayments;
