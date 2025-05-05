import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import Navbar from './Navbar';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (!user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
        <Typography variant="h6" color="error">No user data found.</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
        <Paper elevation={8} sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: 3, background: '#fff', textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: '#388e3c', color: '#fff', width: 72, height: 72, mx: 'auto', mb: 2, fontSize: 36 }}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Typography variant="h5" fontWeight={700} gutterBottom color="#2e7d32">Profile</Typography>
          <Box sx={{ textAlign: 'left', mt: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">Name</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{user.name}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Email</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{user.email}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{user.phone}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Address</Typography>
            <Typography variant="body1">{user.address}</Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default UserProfile; 