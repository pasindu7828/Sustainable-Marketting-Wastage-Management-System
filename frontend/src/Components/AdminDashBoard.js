import React, { useState, useMemo } from 'react';
import { 
  Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, 
  ListItemIcon, ListItemText, Container, Grid, Card, CardContent, 
  IconButton, Avatar, Divider, Badge, styled, ThemeProvider, 
  createTheme, useTheme, Paper
} from '@mui/material';
import { 
  Menu, ChevronLeft, Dashboard, AttachMoney, Inventory, People, 
  Reviews, ShoppingCart, Notifications, Settings, Logout, 
  TrendingUp, PieChart, BarChart, Brightness4, Brightness7 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// =============================================
// STYLED COMPONENTS
// =============================================
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  }),
);

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(45deg, #121212 0%, #1e1e1e 100%)' 
    : 'linear-gradient(45deg, #3f51b5 0%, #2196F3 100%)',
  boxShadow: 'none',
  color: theme.palette.text.primary,
}));

const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s, box-shadow 0.3s',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

// =============================================
// CONTEXT
// =============================================
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

// =============================================
// MAIN COMPONENT
// =============================================
const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Finance Management', icon: <AttachMoney />, path: '/finance' },
    { text: 'Inventory Management', icon: <Inventory />, path: '/inventory' },
    { text: 'User Management', icon: <People />, path: '/users' },
    { text: 'Review Management', icon: <Reviews />, path: '/reviews' },
    { text: 'Cart & Payments', icon: <ShoppingCart />, path: '/payments' },
  ];

  const stats = [
    { title: 'Total Revenue', value: '$48,245', change: '+12%', icon: <TrendingUp color="success" /> },
    { title: 'Inventory Items', value: '1,245', change: '+5%', icon: <Inventory color="info" /> },
    { title: 'Active Users', value: '423', change: '+8%', icon: <People color="primary" /> },
    { title: 'Pending Reviews', value: '56', change: '-2%', icon: <Reviews color="warning" /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            FinancePro Admin
          </Typography>
          
          {/* Dark/Light mode toggle */}
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
          <Avatar sx={{ ml: 2, bgcolor: 'secondary.main' }}>A</Avatar>
        </Toolbar>
      </AppBarStyled>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </Box>
        <Divider />
        
        {/* Main Navigation */}
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: '8px',
                mx: 1,
                my: 0.5,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&.Mui-selected': {
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, #1976d2 0%, #2196F3 100%)'
                    : 'linear-gradient(45deg, #3f51b5 0%, #2196F3 100%)',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 1 }} />
        
        {/* Secondary Navigation */}
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Main open={open}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
          }}
        />
        
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {/* Dashboard Overview */}
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Dashboard Overview
          </Typography>
          
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <DashboardCard>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          {stat.title}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          {stat.value}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: stat.change.startsWith('+') ? 'success.main' : 'error.main',
                            display: 'flex',
                            alignItems: 'center',
                            mt: 1
                          }}
                        >
                          {stat.change} from last month
                        </Typography>
                      </Box>
                      <Box sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(25, 118, 210, 0.2)'
                          : 'rgba(63, 81, 181, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {stat.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </DashboardCard>
              </Grid>
            ))}
          </Grid>
          
          {/* Charts Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Financial Overview
                  </Typography>
                  <Box height={300}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center" 
                      height="100%"
                      sx={{ 
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(63, 81, 181, 0.05)',
                        borderRadius: '8px'
                      }}
                    >
                      <BarChart sx={{ 
                        fontSize: 60, 
                        color: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.2)'
                          : 'rgba(63, 81, 181, 0.3)'
                      }} />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                        Monthly Revenue Chart
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </DashboardCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <DashboardCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Inventory Distribution
                  </Typography>
                  <Box height={300}>
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center" 
                      height="100%"
                      sx={{ 
                        backgroundColor: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(63, 81, 181, 0.05)',
                        borderRadius: '8px'
                      }}
                    >
                      <PieChart sx={{ 
                        fontSize: 60, 
                        color: theme.palette.mode === 'dark'
                          ? 'rgba(255, 255, 255, 0.2)'
                          : 'rgba(63, 81, 181, 0.3)'
                      }} />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                        Product Categories
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </DashboardCard>
            </Grid>
          </Grid>
          
          {/* Recent Activity Section */}
          <DashboardCard sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box 
                display="flex" 
                alignItems="center" 
                justifyContent="center" 
                height={200}
                sx={{ 
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(63, 81, 181, 0.05)',
                  borderRadius: '8px'
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Recent transactions, user activities, etc.
                </Typography>
              </Box>
            </CardContent>
          </DashboardCard>
        </Container>
      </Main>
    </Box>
  );
};

// =============================================
// THEME PROVIDER WRAPPER
// =============================================
export default function AdminDashboardWrapper() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light mode palette
                primary: { main: '#3f51b5' },
                secondary: { main: '#f50057' },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
              }
            : {
                // Dark mode palette
                primary: { main: '#1976d2' },
                secondary: { main: '#ff4081' },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
                text: {
                  primary: '#ffffff',
                  secondary: 'rgba(255, 255, 255, 0.7)',
                },
              }),
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                transition: 'background-color 0.3s ease',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Paper elevation={0} sx={{ minHeight: '100vh' }}>
          <AdminDashboard />
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}