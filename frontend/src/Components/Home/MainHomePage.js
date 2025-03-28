import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MainHomePage() {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={3} p={4}>
      {/* Welcome Text */}
      <Typography 
          variant="h4" 
          sx={{ 
              fontWeight: 'bold', 
              color: '#333', 
              textAlign: 'center', 
              mb: 2, 
              fontFamily: 'Roboto, sans-serif',
              letterSpacing: 1
          }}
      >
          Welcome To Finance Management System
      </Typography>

      {/* ByProduct Prices Button with Image */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/8291/8291727.png" 
          alt="ByProduct Prices" 
          width="80" 
          height="80"
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/addByproduct')}
          sx={{
            fontSize: '1.2rem', 
            padding: '12px 24px', 
            width: '300px', 
            borderRadius: '12px', 
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#1565C0',
              transform: 'scale(1.05)'
            }
          }}
        >
          By Product Prices
        </Button>
      </Box>

      {/* Farmer Product Price List Button with Image */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/5436/5436010.png" 
          alt="Farmer Product Price List" 
          width="80" 
          height="80"
        />
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => navigate('/addFarmerPrice')}
          sx={{
            fontSize: '1.2rem', 
            padding: '12px 24px', 
            width: '300px', 
            borderRadius: '12px', 
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#C2185B',
              transform: 'scale(1.05)'
            }
          }}
        >
          Farmer Product Price List
        </Button>
      </Box>

      {/* Shop Market Price List Button with Image */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/4253/4253750.png" 
          alt="Shop Market Price List" 
          width="80" 
          height="80"
        />
        <Button 
          variant="contained" 
          color="success" 
          onClick={() => navigate('/addShopPrice')}
          sx={{
            fontSize: '1.2rem', 
            padding: '12px 24px', 
            width: '300px', 
            borderRadius: '12px', 
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#2E7D32',
              transform: 'scale(1.05)'
            }
          }}
        >
          Shop Market Price List
        </Button>
      </Box>

      {/* Farmer Payment Details Button with Image */}
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/1183/1183527.png" 
          alt="Farmer Payment Details" 
          width="80" 
          height="80"
        />
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => navigate('/farmersList')}
          sx={{
            fontSize: '1.2rem', 
            padding: '12px 24px', 
            width: '300px', 
            borderRadius: '12px', 
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: '#D32F2F',
              transform: 'scale(1.05)'
            }
          }}
        >
          Farmer Payment Details
        </Button>
      </Box>
    </Box>
  );
}

export default MainHomePage;
