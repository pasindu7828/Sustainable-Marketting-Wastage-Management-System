import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton, Tooltip
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

  return (
    <Box sx={{ maxWidth: 900, margin: '40px auto', p: 3, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton sx={{ color: '#2e7d32' }} onClick={() => navigate('/admin-dashboard')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700, ml: 1, color: '#2e7d32' }}>
          User Management
        </Typography>
      </Box>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(90deg, #e8f5e9 0%, #c8e6c9 100%)' }}>
              <TableCell sx={{ fontWeight: 600, color: '#2e7d32' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#2e7d32' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#2e7d32' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No users found.</Typography>
                </TableCell>
              </TableRow>
            )}
            {users.map(user => (
              <TableRow key={user._id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View">
                    <IconButton sx={{ color: '#388e3c' }} onClick={() => alert(`Name: ${user.name}\nEmail: ${user.email}`)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton sx={{ color: '#2e7d32' }} onClick={() => navigate(`/edit-user/${user.email}`)}>
                      <EditIcon />
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