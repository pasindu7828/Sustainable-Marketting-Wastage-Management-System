import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'white',
});

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">
            <StyledLink to="/mainhome">Home</StyledLink>
          </Button>
          <Button color="inherit">
            <StyledLink to="/adduser">Add User</StyledLink>
          </Button>
          <Button color="inherit">
            <StyledLink to="/userdetails">User Detail</StyledLink>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;