import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText, Divider, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import { PieChart } from 'recharts'; // Make sure PieChart is installed correctly

const drawerWidth = 240;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <DashboardIcon />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/financial-management">
          <AttachMoneyIcon />
          <ListItemText primary="Financial Management" />
        </ListItem>
        <ListItem button component={Link} to="/inventory-management">
          <InventoryIcon />
          <ListItemText primary="Inventory Management" />
        </ListItem>
        <ListItem button component={Link} to="/reports">
          <AssessmentIcon />
          <ListItemText primary="Reports" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/settings">
          <SettingsIcon />
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#FFB200' }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 'bold', color: '#3e3d32' }}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#FFB200',
            color: '#3e3d32',
          },
        }}
        variant="persistent"
        anchor="left"
        open={mobileOpen}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#fff8e1', padding: 3, marginLeft: `${drawerWidth}px` }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#3e3d32', fontWeight: 'bold' }}>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: '#7f8c8d' }}>
          Here you can manage finances, inventory, and track the sustainability of your products.
        </Typography>

        {/* Key Metrics Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: '#FFB200', color: 'black', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h4">$50,000</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>View Details</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: '#FFB200', color: 'black', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">Total Products</Typography>
                <Typography variant="h4">120</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>View Details</Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: '#FFB200', color: 'black', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">Wastage Rate</Typography>
                <Typography variant="h4">5%</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>View Details</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Pie Chart for Financial Overview */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#3e3d32' }}>
                  Financial Breakdown
                </Typography>
                <PieChart width={400} height={400}>
                  {/* Add PieChart data here */}
                </PieChart>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#3e3d32' }}>
                  Recent Transactions
                </Typography>
                {/* Table or list for recent transactions */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
