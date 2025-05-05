import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Paper, Typography, TextField, Button, Alert, Link, InputAdornment, IconButton
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [adminAlert, setAdminAlert] = useState(false);
  const navigate = useNavigate();

  const isAdminLogin = window.location.search.includes('admin=true');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(data));
      if (isAdminLogin) {
        if (data.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          setAdminAlert(true);
          localStorage.removeItem('currentUser');
        }
      } else {
        if (data.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/home');
        }
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7fa' }}>
      <Paper elevation={8} sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: 3, background: '#fff' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <LockOutlinedIcon sx={{ fontSize: 40, mb: 1, color: '#2e7d32' }} />
          <Typography variant="h5" fontWeight={700} gutterBottom color="#2e7d32">Sign In</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon color="action" />
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.2, fontWeight: 600, fontSize: 16, background: 'linear-gradient(90deg, #2e7d32 0%, #1b5e20 100%)' }}
          >
            Login
          </Button>
        </form>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/register" underline="hover" sx={{ color: '#2e7d32', fontWeight: 600 }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
      <Snackbar
        open={adminAlert}
        autoHideDuration={3000}
        onClose={() => setAdminAlert(false)}
        message="Only can access by admin"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Login; 