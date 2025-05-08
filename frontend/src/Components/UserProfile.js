import React from 'react';
import { Paper, Typography, Box, Divider } from '@mui/material';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('currentUser')) || {};

  if (!user) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: 'linear-gradient(135deg, #e8f5e9 0%, #f5f7fa 100%)' 
      }}>
        <Typography variant="h6" color="error">No user data found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #e8f5e9 0%, #f5f7fa 100%)',
      py: 4
    }}>
      <Paper elevation={12} sx={{ 
        p: 4, 
        maxWidth: 400, 
        width: '100%', 
        borderRadius: 5, 
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        boxShadow: '0 8px 32px 0 rgba(56,142,60,0.12)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: `'Poppins', 'Roboto', sans-serif`,
        transition: 'transform 0.3s cubic-bezier(.4,2,.3,1), box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: '0 16px 40px 0 rgba(56,142,60,0.18)',
        }
      }}>
        {/* Accent bar */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 8,
          bgcolor: 'linear-gradient(90deg, #43ea7f 0%, #388e3c 100%)',
          background: 'linear-gradient(90deg, #43ea7f 0%, #388e3c 100%)',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }} />
        <Typography variant="h4" fontWeight={800} gutterBottom color="#2e7d32" sx={{ letterSpacing: 1, mt: 2, fontFamily: `'Poppins', 'Roboto', sans-serif` }}>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" color="#43a047" sx={{ mb: 2, fontWeight: 600, fontFamily: `'Poppins', 'Roboto', sans-serif` }}>
          {user.isAdmin ? 'Administrator' : 'Standard User'}
        </Typography>
        <Divider sx={{ my: 3, borderColor: '#e0f2f1' }} />
        <Box sx={{ textAlign: 'left', mt: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>Email</Typography>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>{user.email}</Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>Phone</Typography>
          <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>{user.phone || 'Not provided'}</Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>Address</Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>{user.address || 'Not provided'}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfile; 