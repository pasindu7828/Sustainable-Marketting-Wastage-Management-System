import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MainHomePage() {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={3}>
      <Button variant="contained" color="primary" onClick={() => navigate('/addByproduct')}>By Product Prices</Button>
      <Button variant="contained" color="secondary" onClick={() => navigate('/addFarmerPrice')}>Farmer Product Price List</Button>
      <Button variant="contained" color="success" onClick={() => navigate('/addShopPrice')}>Shop Market Price List</Button>
      <Button variant="contained" color="error" onClick={() => navigate('/addFarmerPayment')}>Farmer Payment Details</Button>
    </Box>
  );
}

export default MainHomePage;
