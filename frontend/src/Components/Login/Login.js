import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Link,
    Alert,
    CircularProgress
} from '@mui/material';
import { LoginOutlined } from '@mui/icons-material';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.defaults.baseURL = 'http://localhost:5000';
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (token && user && user.role) {
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/mainhome');
            }
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Attempting login with:', { email: formData.email });
            const response = await axios.post('/users/login', formData);
            console.log('Login response:', response.data);
            
            if (response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                axios.defaults.headers.common['token'] = response.data.token;
                
                if (response.data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/mainhome');
                }
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.status === 401) {
                setError('Invalid email or password');
            } else if (!err.response) {
                setError('Network error. Please check your connection.');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Typography component="h1" variant="h5" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Sign in to your account
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : <LoginOutlined />}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Link href="/forgot-password" variant="body2" display="block" gutterBottom>
                                Forgot Password?
                            </Link>
                            <Typography variant="body2">
                                Don't have an account?{' '}
                                <Link href="/register" variant="body2">
                                    Sign up
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;