import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Link, Avatar, Menu, MenuItem } from '@mui/material';
import { FaLeaf } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { BsCart2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isLoggedIn = !!currentUser;

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    localStorage.removeItem('currentUser');
    setAnchorEl(null);
    navigate('/');
  };
  const handleEditProfile = () => {
    setAnchorEl(null);
    if (currentUser && currentUser.email) {
      navigate(`/edit-user/${currentUser.email}`);
    }
  };
  const handleViewProfile = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'rgba(255,255,255,0.85)',
        color: '#222',
        boxShadow: '0 2px 12px 0 rgba(56,142,60,0.08)',
        borderBottom: '1px solid #eee',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, md: 6 } }}>
        <Box display="flex" alignItems="center" gap={1}>
          <FaLeaf style={{ color: '#4caf50', fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700} sx={{ color: '#388e3c', letterSpacing: 1 }}>
            AgriFlow
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Link
            component="button"
            underline="none"
            color="inherit"
            fontSize={18}
            fontWeight={500}
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 3,
              transition: 'background 0.2s',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              '&:hover': { background: '#e8f5e9', color: '#388e3c' },
            }}
            onClick={() => navigate('/')}
          >
            Home
          </Link>
          <Link
            href="#"
            underline="none"
            color="inherit"
            fontSize={18}
            fontWeight={500}
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 3,
              transition: 'background 0.2s',
              '&:hover': { background: '#e8f5e9', color: '#388e3c' },
            }}
          >
            Menu
          </Link>
          <Link
            href="#"
            underline="none"
            color="inherit"
            fontSize={18}
            fontWeight={500}
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 3,
              transition: 'background 0.2s',
              '&:hover': { background: '#e8f5e9', color: '#388e3c' },
            }}
          >
            Contact Us
          </Link>
          {isLoggedIn ? (
          <Link
            component="button"
            underline="none"
            color="inherit"
            fontSize={18}
            fontWeight={500}
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 3,
              transition: 'background 0.2s',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              '&:hover': { background: '#e8f5e9', color: '#388e3c' },
            }}
            onClick={() => navigate('/reviewDashBoard')}
          >
            Reviews
          </Link>
          ) : (
            <></>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#f1f8e9',
              borderRadius: 3,
              px: 1.5,
              py: 0.5,
              boxShadow: '0 1px 4px 0 rgba(76,175,80,0.06)',
            }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') e.preventDefault(); }}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: 16,
                width: 120,
                color: '#222',
                padding: '4px 0',
              }}
            />
            <IconButton
              sx={{ color: '#388e3c', ml: 0.5 }}
              onClick={() => {}}
              tabIndex={-1}
            >
              <FiSearch size={22} />
            </IconButton>
          </Box>
          <IconButton><BsCart2 size={24} /></IconButton>
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: '#388e3c', color: '#fff' }}>
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem disabled>{currentUser.name || 'User'}</MenuItem>
                <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              sx={{
                borderRadius: 8,
                px: 3,
                fontWeight: 700,
                bgcolor: '#388e3c',
                color: '#fff',
                boxShadow: '0 2px 8px 0 rgba(76,175,80,0.10)',
                textTransform: 'none',
                '&:hover': { bgcolor: '#2e7031' },
              }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 