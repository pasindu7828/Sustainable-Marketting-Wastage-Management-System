import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton, Tooltip, TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/users?adminEmail=admin@gmail.com`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to fetch users');
        setUsers([]);
        return;
      }
      setUsers(data.filter(u => u.email !== 'admin@gmail.com'));
    } catch (err) {
      setError('Network error');
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`${API_BASE_URL}/users/${id}?adminEmail=admin@gmail.com`, { method: 'DELETE' });
        const data = await res.json();
        if (!res.ok) {
          alert(data.message || 'Delete failed');
          return;
        }
        fetchUsers();
      } catch (err) {
        alert('Network error');
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const q = search.toLowerCase();
    return (
      (user.name || '').toLowerCase().includes(q) ||
      (user.email || '').toLowerCase().includes(q) ||
      (user.phone || '').toLowerCase().includes(q) ||
      (user.address || '').toLowerCase().includes(q)
    );
  });

  return (
    <Box sx={{
      maxWidth: 900,
      margin: '40px auto',
      p: 3,
      bgcolor: 'linear-gradient(135deg, #e8f5e9 0%, #fffde4 100%)',
      minHeight: '100vh',
      borderRadius: 6,
      boxShadow: '0 8px 32px 0 rgba(56,142,60,0.10)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton sx={{ color: '#2e7d32' }} onClick={() => navigate('/admin-dashboard')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700, ml: 1, color: '#2e7d32', letterSpacing: 1, textShadow: '0 2px 8px rgba(56,142,60,0.08)' }}>
          User Management
        </Typography>
      </Box>
      <Box mb={2} sx={{
        width: '100%',
        borderRadius: 4,
        background: 'rgba(255,255,255,0.55)',
        boxShadow: '0 8px 32px 0 rgba(56,142,60,0.10)',
        backdropFilter: 'blur(12px)',
        p: 2,
        display: 'flex',
        alignItems: 'center',
      }}>
        <TextField
          label="Search users"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
          sx={{
            background: 'rgba(255,255,255,0.7)',
            borderRadius: 2,
            input: { color: '#222' },
          }}
        />
      </Box>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <TableContainer component={Paper} elevation={0} sx={{
        borderRadius: 4,
        background: 'rgba(255,255,255,0.65)',
        boxShadow: '0 8px 32px 0 rgba(56,142,60,0.10)',
        backdropFilter: 'blur(12px)',
        mb: 4,
      }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(90deg, #e8f5e9 0%, #c8e6c9 100%)' }}>
              <TableCell sx={{ fontWeight: 600, color: '#2e7d32', letterSpacing: 1 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#2e7d32', letterSpacing: 1 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#2e7d32', letterSpacing: 1 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#2e7d32', letterSpacing: 1 }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#2e7d32', letterSpacing: 1 }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No users found.</Typography>
                </TableCell>
              </TableRow>
            )}
            {filteredUsers.map(user => (
              <TableRow key={user._id} hover sx={{
                transition: 'background 0.2s',
                '&:hover': {
                  background: 'rgba(76,175,80,0.08)',
                },
              }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton sx={{ color: '#388e3c' }} onClick={() => alert(`Name: ${user.name}\nEmail: ${user.email}`)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList; 