import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function ShopPriceNav() {
  return (
    <AppBar position="static" elevation={6} sx={{ background: 'linear-gradient(45deg, #fbc02d, #ffeb3b)' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1.5, fontFamily: 'Roboto, sans-serif', color: 'black' }}>
          Shop Prices Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/FinanceHome" 
            sx={{ fontWeight: 'bold', color: 'black', transition: '0.3s', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/addShopPrice" 
            sx={{ fontWeight: 'bold', color: 'black', transition: '0.3s', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
          >
            Add Product Prices
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/displayShopPrice" 
            sx={{ fontWeight: 'bold', color: 'black', transition: '0.3s', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' } }}
          >
            Price Details
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ShopPriceNav;
