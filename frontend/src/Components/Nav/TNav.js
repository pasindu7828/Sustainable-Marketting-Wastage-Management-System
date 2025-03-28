import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import style from './Nav.module.css';

function TNav() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#FEDE00', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif', 
            color: 'black' // Set text color to black for the title
          }}
        >
          Product Management System
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/HomeInventoryMain"
            className={style.navButton}
            sx={{ color: 'black' }} // Set text color to black for the button
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/addproductdetails"
            className={style.navButton}
            sx={{ color: 'black' }} // Set text color to black for the button
          >
            Add Product Details
          </Button>
          <Button
            component={Link}
            to="/DisplayProductDetails"
            className={style.navButton}
            sx={{ color: 'black' }} // Set text color to black for the button
          >
            Display Product Details
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TNav;
