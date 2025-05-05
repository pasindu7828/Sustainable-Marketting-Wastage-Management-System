import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Alert } from '@mui/material';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const UserEdit = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Find user by email
    const fetchUser = async () => {
      setError('');
      try {
        const res = await fetch(`${API_BASE_URL}/users?adminEmail=admin@gmail.com`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || 'Failed to fetch user');
          return;
        }
        const found = data.find(u => u.email === email);
        if (found) {
          setUser(found);
          setUserId(found._id);
          setName(found.name);
          setPassword('');
          setPhone(found.phone || '');
          setAddress(found.address || '');
        }
      } catch (err) {
        setError('Network error');
      }
    };
    fetchUser();
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !password || !phone || !address) {
      setError('All fields are required.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password, phone, address })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Update failed');
        return;
      }
      // If current user is editing self, update currentUser
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.email === email) {
        localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, name, phone, address }));
        navigate('/home');
      } else {
        navigate('/users');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  if (!user) return <div style={{ margin: '60px auto', textAlign: 'center' }}>User not found.</div>;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
      <Paper elevation={8} sx={{ p: 4, maxWidth: 400, width: '100%', borderRadius: 3, background: '#fff' }}>
        <Typography variant="h5" fontWeight={700} gutterBottom color="#2e7d32" align="center">Edit Profile</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            disabled
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.2, fontWeight: 600, fontSize: 16, background: 'linear-gradient(90deg, #2e7d32 0%, #1b5e20 100%)' }}
          >
            Save
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default UserEdit; 