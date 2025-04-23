import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddStaff from './AddStaff';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Tab,
    Tabs,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Alert,
    Stack
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Logout as LogoutIcon } from '@mui/icons-material';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState('users');
    const [showAddStaff, setShowAddStaff] = useState(false);
    const [editForm, setEditForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        role: ''
    });

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            if (!token || !user || user.role !== 'admin') {
                localStorage.clear();
                navigate('/login');
                return;
            }

            // Set up axios default headers and base URL
            axios.defaults.baseURL = 'http://localhost:5000';
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            try {
                await Promise.all([
                    fetchUsers(),
                    fetchStaff()
                ]);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch initial data:', err);
                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                } else {
                    setError(err.response?.data?.message || 'Failed to load dashboard data. Please try again.');
                }
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users');
            setUsers(response.data.users || []);
        } catch (err) {
            console.error('Failed to fetch users:', err);
            throw err;
        }
    };

    const fetchStaff = async () => {
        try {
            const response = await axios.get('/staff');
            setStaff(response.data.staff || []);
        } catch (err) {
            console.error('Failed to fetch staff:', err);
            throw err;
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/users/${userId}`);
                await fetchUsers();
            } catch (err) {
                setError('Failed to delete user');
                console.error('Delete error:', err);
            }
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditForm({
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role
        });
        setIsEditing(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (activeSection === 'staff') {
                response = await axios.put(`/staff/${selectedUser._id}`, editForm);
                if (response.data.success) {
                    await fetchStaff();
                    setIsEditing(false);
                    setError('');
                } else {
                    setError(response.data.message || 'Failed to update staff member');
                }
            } else {
                response = await axios.put(`/users/${selectedUser._id}`, editForm);
                if (response.data.success) {
                    await fetchUsers();
                    setIsEditing(false);
                    setError('');
                } else {
                    setError(response.data.message || 'Failed to update user');
                }
            }
        } catch (err) {
            console.error('Update error:', err);
            setError(err.response?.data?.message || 'Failed to update');
        }
    };

    const handleInputChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleStaffAdded = (newStaff) => {
        setStaff([...staff, newStaff]);
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
        </Box>
    );
    if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin Dashboard
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={['users', 'staff', 'reports', 'settings'].indexOf(activeSection)}
                        onChange={(_, newValue) => setActiveSection(['users', 'staff', 'reports', 'settings'][newValue])}
                    >
                        <Tab label="User Management" />
                        <Tab label="Staff Management" />
                        <Tab label="Reports" />
                        <Tab label="Settings" />
                    </Tabs>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                ) : (
                    <>
                        <TabPanel value={['users', 'staff', 'reports', 'settings'].indexOf(activeSection)} index={0}>
                            {isEditing ? (
                                <Paper sx={{ p: 3, mt: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Edit User
                                    </Typography>
                                    <Box component="form" onSubmit={handleUpdate} sx={{ mt: 2 }}>
                                        <Stack spacing={2}>
                                            <TextField
                                                fullWidth
                                                label="Full Name"
                                                name="fullName"
                                                value={editForm.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={editForm.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                label="Phone"
                                                name="phone"
                                                value={editForm.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                label="Address"
                                                name="address"
                                                multiline
                                                rows={4}
                                                value={editForm.address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Update User
                                                </Button>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Paper>
                            ) : (
                                <TableContainer component={Paper} sx={{ mt: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Phone</TableCell>
                                                <TableCell>Address</TableCell>
                                                <TableCell align="right">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((user) => (
                                                <TableRow key={user._id}>
                                                    <TableCell>{user.fullName}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell>{user.phone}</TableCell>
                                                    <TableCell>{user.address}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton
                                                            onClick={() => handleEdit(user)}
                                                            color="primary"
                                                            size="small"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(user._id)}
                                                            color="error"
                                                            size="small"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </TabPanel>

                        <TabPanel value={['users', 'staff', 'reports', 'settings'].indexOf(activeSection)} index={1}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6">Staff Management</Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => setShowAddStaff(true)}
                                >
                                    Add Staff Member
                                </Button>
                            </Box>
                            
                            {isEditing ? (
                                <Paper sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Edit Staff Member
                                    </Typography>
                                    <Box component="form" onSubmit={handleUpdate} sx={{ mt: 2 }}>
                                        <Stack spacing={2}>
                                            <TextField
                                                fullWidth
                                                label="Full Name"
                                                name="fullName"
                                                value={editForm.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={editForm.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                label="Phone"
                                                name="phone"
                                                value={editForm.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                label="Address"
                                                name="address"
                                                multiline
                                                rows={4}
                                                value={editForm.address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <FormControl fullWidth>
                                                <InputLabel>Role</InputLabel>
                                                <Select
                                                    name="role"
                                                    value={editForm.role}
                                                    onChange={handleInputChange}
                                                    required
                                                    label="Role"
                                                >
                                                    <MenuItem value="staff">Staff</MenuItem>
                                                    <MenuItem value="manager">Manager</MenuItem>
                                                    <MenuItem value="supervisor">Supervisor</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => setIsEditing(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Update Staff
                                                </Button>
                                            </Box>
                                        </Stack>
                                    </Box>
                                </Paper>
                            ) : (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Role</TableCell>
                                                <TableCell align="right">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {staff.map((member) => (
                                                <TableRow key={member._id}>
                                                    <TableCell>{member.fullName}</TableCell>
                                                    <TableCell>{member.email}</TableCell>
                                                    <TableCell>{member.role}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton
                                                            onClick={() => handleEdit(member)}
                                                            color="primary"
                                                            size="small"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(member._id)}
                                                            color="error"
                                                            size="small"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </TabPanel>

                        <TabPanel value={['users', 'staff', 'reports', 'settings'].indexOf(activeSection)} index={2}>
                            <Typography variant="h6">Reports</Typography>
                            <Typography color="textSecondary" sx={{ mt: 2 }}>
                                Reports section coming soon...
                            </Typography>
                        </TabPanel>

                        <TabPanel value={['users', 'staff', 'reports', 'settings'].indexOf(activeSection)} index={3}>
                            <Typography variant="h6">Settings</Typography>
                            <Typography color="textSecondary" sx={{ mt: 2 }}>
                                Settings section coming soon...
                            </Typography>
                        </TabPanel>
                    </>
                )}
            </Container>

            {showAddStaff && (
                <AddStaff
                    onClose={() => setShowAddStaff(false)}
                    onStaffAdded={handleStaffAdded}
                />
            )}
        </Box>
    );
};

export default AdminDashboard;