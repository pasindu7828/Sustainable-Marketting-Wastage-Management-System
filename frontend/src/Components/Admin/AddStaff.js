import React, { useState } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress
} from '@mui/material';

const AddStaff = ({ onClose, onStaffAdded }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: 'staff'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication required');
            }

            axios.defaults.headers.common['token'] = token;
            const response = await axios.post('http://localhost:5000/users/register', formData);
            
            if (response.data.success) {
                onStaffAdded(response.data.user);
                onClose();
            } else {
                throw new Error(response.data.message || 'Failed to add staff member');
            }
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.data?.errors) {
                setError(err.response.data.errors.join(', '));
            } else if (err.response?.data?.missingFields) {
                const missingFields = Object.entries(err.response.data.missingFields)
                    .filter(([_, isMissing]) => isMissing)
                    .map(([field]) => field)
                    .join(', ');
                setError(`Please fill in the following required fields: ${missingFields}`);
            } else {
                setError(err.message || 'Failed to add staff member');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog 
            open={true} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Add New Staff Member</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            inputProps={{ minLength: 6 }}
                            helperText="Minimum 6 characters"
                        />
                        
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            inputProps={{ pattern: "[0-9]{10}" }}
                            helperText="10-digit phone number"
                        />
                        
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            multiline
                            rows={4}
                        />
                        
                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                label="Role"
                            >
                                <MenuItem value="staff">Staff</MenuItem>
                                <MenuItem value="manager">Manager</MenuItem>
                                <MenuItem value="supervisor">Supervisor</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        {loading ? 'Adding...' : 'Add Staff Member'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddStaff;