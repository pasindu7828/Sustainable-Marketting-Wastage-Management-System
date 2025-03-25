import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function HomeInventoryMain() {
    const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={3}>
      <Button variant="contained" color="primary" onClick={() => navigate('/addproductdetails')}>Product Details</Button>
      <Button variant="contained" color="secondary" onClick={() => navigate('/AddByProductDetails')}>ByProduct Details</Button>
      <Button variant="contained" color="success" onClick={() => navigate('/AddShopProductDetails')}>Shop Product Details</Button>
     
    </Box>
  );
}

export default HomeInventoryMain;
