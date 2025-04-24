import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddStaff from './AddStaff';
import StatisticsCards from './StatisticsCards';
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
    Stack,
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    InputBase,
    Badge,
    Avatar,
    ListItemButton,
    Grid
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    Home as HomeIcon,
    Person as PersonIcon,
    ShoppingCart as ProductsIcon,
    Assignment as OrdersIcon,
    Article as PostsIcon,
    ViewModule as ElementsIcon,
    Note as NotesIcon,
    Description as FormsIcon,
    CalendarToday as CalendarIcon,
    Settings as SettingsIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Fullscreen as FullscreenIcon,
    People as PeopleIcon,
    Assignment as ReportsIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('dashboard');
    const [users, setUsers] = useState([]);
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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

    const menuItems = [
        { id: 'dashboard', icon: <HomeIcon />, label: 'Dashboard', type: 'item' },
        { id: 'staff', icon: <PersonIcon />, label: 'Staff Management', type: 'item' },
        { id: 'users', icon: <PeopleIcon />, label: 'User Management', type: 'item' },
        { id: 'reports', icon: <ReportsIcon />, label: 'Reports', type: 'item' },
        { id: 'settings', icon: <SettingsIcon />, label: 'Settings', type: 'item' }
    ];

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
                if (activeSection === 'staff') {
                    await axios.delete(`/staff/${userId}`);
                    await fetchStaff();
                    setSuccess('Staff member deleted successfully');
                    setTimeout(() => setSuccess(''), 3000);
                } else {
                    await axios.delete(`/users/${userId}`);
                    await fetchUsers();
                    setSuccess('User deleted successfully');
                    setTimeout(() => setSuccess(''), 3000);
                }
            } catch (err) {
                console.error('Delete error:', err);
                setError(err.response?.data?.message || 'Failed to delete');
                setTimeout(() => setError(''), 3000);
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
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuClick = (menuId) => {
        setSelectedMenu(menuId);
    };

    const drawer = (
        <Box>
            <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
                <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
                    Admin Dashboard
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    item.type === 'header' ? (
                        <Typography
                            key={item.id}
                            variant="overline"
                            sx={{
                                px: 3,
                                py: 1.5,
                                display: 'block',
                                color: 'text.secondary'
                            }}
                        >
                            {item.label}
                        </Typography>
                    ) : (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton
                                selected={selectedMenu === item.id}
                                onClick={() => handleMenuClick(item.id)}
                                sx={{
                                    py: 1.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'action.selected',
                                        '&:hover': {
                                            bgcolor: 'action.selected'
                                        }
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    )
                ))}
            </List>
        </Box>
    );

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
        </Box>
    );
    if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: '#1a1a1a',
                    color: 'white',
                    boxShadow: 1
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Paper
                        component="form"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: 400,
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            '& .MuiInputBase-root': {
                                color: 'white'
                            }
                        }}
                    >
                        <IconButton sx={{ p: '10px', color: 'white' }}>
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: 'white' }}
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Paper>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton sx={{ color: 'white' }}>
                        <FullscreenIcon />
                    </IconButton>
                    <IconButton sx={{ color: 'white' }}>
                        <Badge badgeContent={1} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton sx={{ ml: 1 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#2196f3' }}>A</Avatar>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: drawerWidth,
                            bgcolor: '#1a1a1a',
                            color: 'white',
                            '& .MuiListItemButton-root': {
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.08)'
                                },
                                '&.Mui-selected': {
                                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.12)'
                                    }
                                }
                            },
                            '& .MuiListItemIcon-root': {
                                color: 'rgba(255, 255, 255, 0.7)'
                            },
                            '& .MuiDivider-root': {
                                borderColor: 'rgba(255, 255, 255, 0.12)'
                            }
                        }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: drawerWidth,
                            bgcolor: '#1a1a1a',
                            color: 'white',
                            '& .MuiListItemButton-root': {
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.08)'
                                },
                                '&.Mui-selected': {
                                    bgcolor: 'rgba(255, 255, 255, 0.12)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.12)'
                                    }
                                }
                            },
                            '& .MuiListItemIcon-root': {
                                color: 'rgba(255, 255, 255, 0.7)'
                            },
                            '& .MuiDivider-root': {
                                borderColor: 'rgba(255, 255, 255, 0.12)'
                            }
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8
                }}
            >
                {/* Main content will go here */}
                <Container maxWidth="lg">
                    {selectedMenu === 'dashboard' && (
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Dashboard Overview
                            </Typography>
                            <StatisticsCards />
                        </Box>
                    )}
                    
                    {selectedMenu === 'staff' && (
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Staff Management
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => setShowAddStaff(true)}
                                sx={{ mb: 3 }}
                            >
                                Add New Staff
                            </Button>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Role</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {staff.map((staffMember) => (
                                            <TableRow key={staffMember._id}>
                                                <TableCell>{staffMember.fullName}</TableCell>
                                                <TableCell>{staffMember.email}</TableCell>
                                                <TableCell>{staffMember.role}</TableCell>
                                                <TableCell>{staffMember.phone}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleEdit(staffMember)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDelete(staffMember._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {selectedMenu === 'users' && (
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                User Management
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Address</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user._id}>
                                                <TableCell>{user.fullName}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.phone}</TableCell>
                                                <TableCell>{user.address}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleEdit(user)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDelete(user._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {selectedMenu === 'reports' && (
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                Reports
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 3 }}>
                                        <Typography variant="h6" gutterBottom>
                                            User Statistics
                                        </Typography>
                                        {/* Add charts or statistics here */}
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 3 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Staff Statistics
                                        </Typography>
                                        {/* Add charts or statistics here */}
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {/* Edit Dialog */}
                    <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
                        <DialogTitle>
                            {activeSection === 'staff' ? 'Edit Staff Member' : 'Edit User'}
                        </DialogTitle>
                        <DialogContent>
                            <Box component="form" onSubmit={handleUpdate} sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Full Name"
                                    name="fullName"
                                    value={editForm.fullName}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Email"
                                    name="email"
                                    value={editForm.email}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Phone"
                                    name="phone"
                                    value={editForm.phone}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Address"
                                    name="address"
                                    value={editForm.address}
                                    onChange={handleInputChange}
                                />
                                {activeSection === 'staff' && (
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            name="role"
                                            value={editForm.role}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="admin">Admin</MenuItem>
                                            <MenuItem value="staff">Staff</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button onClick={handleUpdate} variant="contained" color="primary">
                                Save Changes
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Add Staff Dialog */}
                    {showAddStaff && (
                        <AddStaff
                            open={showAddStaff}
                            onClose={() => setShowAddStaff(false)}
                            onStaffAdded={handleStaffAdded}
                        />
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default AdminDashboard;