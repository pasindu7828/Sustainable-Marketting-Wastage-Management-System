import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

function FarmerPayment() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="static"
      elevation={6}
      sx={{
        background: 'linear-gradient(90deg, #fbc02d, #ffeb3b)',
        color: '#000',
        padding: { xs: 1, sm: 0 },
      }}
    >
      <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              letterSpacing: 1.5,
              fontFamily: 'Roboto, sans-serif',
              color: 'black',
            }}
          >
            Farmer Payment System
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
            mt: isMobile ? 2 : 0,
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <Button
            component={Link}
            to="/FinanceHome"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              width: isMobile ? '100%' : 'auto',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/farmersList"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              width: isMobile ? '100%' : 'auto',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
            }}
          >
            Add Payments
          </Button>
          <Button
            component={Link}
            to="/displayFarmerPayment"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              width: isMobile ? '100%' : 'auto',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
            }}
          >
            Payment Details
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default FarmerPayment;
