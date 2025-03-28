import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function ByProductNav() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FEDE00', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
          Wastage Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/HomeInventoryMain"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/AddByProductDetails"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              },
            }}
          >
            Add Byproduct Details
          </Button>
          <Button
            component={Link}
            to="/DisplayByProductDetails"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
              },
            }}
          >
            Display Byproduct Details
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ByProductNav;
