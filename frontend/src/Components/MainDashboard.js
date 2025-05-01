import React, { useState, useEffect } from 'react';
import { 
  Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, 
  ListItemIcon, ListItemText, Grid, Card, CardContent, 
  IconButton, Avatar, Divider, Badge, styled, useTheme, ThemeProvider,
  createTheme, CircularProgress, Paper, useMediaQuery, Button
} from '@mui/material';
import { 
  Menu as MenuIcon, ChevronLeft, Dashboard, AttachMoney, Inventory, People, 
  ShoppingCart, Notifications, Brightness4, Brightness7, Logout, Refresh,
  ArrowUpward, ArrowDownward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import axios from 'axios';
import { format, parseISO, subDays } from 'date-fns';

// =============================
// CONSTANTS
// =============================
const DRAWER_WIDTH = 240;
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// =============================
// THEME SETUP
// =============================
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#2e7d32' : '#4caf50', // Green shades
      contrastText: '#ffffff',
    },
    secondary: {
      main: mode === 'light' ? '#1b5e20' : '#388e3c', // Darker green
    },
    background: {
      default: mode === 'light' ? '#f5f7fa' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    info: {
      main: '#0288d1',
    },
    warning: {
      main: '#ed6c02',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '1.8rem',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'light' 
            ? 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)' 
            : 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light' 
            ? '0 2px 10px rgba(0,0,0,0.08)' 
            : '0 2px 10px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: mode === 'light' 
              ? '0 8px 20px rgba(0,0,0,0.12)' 
              : '0 8px 20px rgba(0,0,0,0.4)',
          },
        },
      },
    },
  },
});

// =============================
// STYLED COMPONENTS
// =============================
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DRAWER_WIDTH}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  }),
);

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: 'none',
  color: theme.palette.common.white,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DashboardCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s, box-shadow 0.3s',
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const TrendIndicator = styled(Box)(({ theme, trend }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
  fontWeight: 500,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(1),
}));

// =============================
// MAIN COMPONENT
// =============================
const MainDashboard = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    avgDaily: 0,
    peakDay: 0,
    growthRate: 0,
    transactions: 0,
    customers: 0
  });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Initialize theme
  const appTheme = createTheme(getDesignTokens(darkMode ? 'dark' : 'light'));

  const menuItems = [
    { text: 'Reviews', icon: <Dashboard />, path: '/reviews/admin' },
    { text: 'Finance', icon: <AttachMoney />, path: '/FinanceHome' },
    { text: 'Inventory', icon: <Inventory />, path: '/HomeInventoryMain' },
    { text: 'Users', icon: <People />, path: '/users' },
    { text: 'Payments', icon: <ShoppingCart />, path: '/payments' },
  ];

  useEffect(() => {
    const today = new Date();
    setCurrentDate(format(today, 'EEEE, MMMM do, yyyy'));

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [goodInventoryResponse, shopPriceResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/GoodInventorys`),
        axios.get(`${API_BASE_URL}/ShopPrices`)
      ]);

      const inventoryData = goodInventoryResponse.data.GoodInventorys || [];
      const shopPrices = shopPriceResponse.data.ShopPrices?.[0] || {};

      // Process line chart data
      const groupedData = inventoryData.reduce((acc, item) => {
        if (!item?.createdAt) return acc;
        const date = item.createdAt.split("T")[0];

        if (!acc[date]) {
          acc[date] = {
            shop: {
              apple: 0, orange: 0, banana: 0, grapes: 0, watermelon: 0,
              mango: 0, woodapple: 0, pineapple: 0, papaya: 0, guava: 0,
            }
          };
        }

        Object.keys(acc[date].shop).forEach(fruit => {
          acc[date].shop[fruit] += Number(item[`shop${fruit}`]) || 0;
        });

        return acc;
      }, {});

      const fruits = ['apple', 'orange', 'banana', 'grapes', 'watermelon', 
                    'mango', 'woodapple', 'pineapple', 'papaya', 'guava'];

      const chartData = Object.entries(groupedData).map(([date, data]) => {
        const total = fruits.reduce((sum, fruit) => {
          const priceKey = `sp${fruit.charAt(0).toUpperCase()}${fruit.slice(1)}`;
          const price = shopPrices[priceKey] || 0;
          return sum + (data.shop[fruit] * price);
        }, 0);

        return { 
          date: format(parseISO(date), 'MMM dd'), 
          total: parseFloat(total.toFixed(2)),
          fullDate: parseISO(date)
        };
      });

      // Sort by date
      chartData.sort((a, b) => a.fullDate - b.fullDate);
      
      // Generate bar chart data (last 7 days)
      const last7Days = chartData.slice(-7);
      setBarChartData(last7Days);
      
      // Calculate metrics
      const totalRevenue = chartData.reduce((sum, item) => sum + item.total, 0);
      const avgDaily = totalRevenue / (chartData.length || 1);
      const peakDay = Math.max(...chartData.map(item => item.total));
      
      // Calculate growth rate (week over week)
      let growthRate = 0;
      if (chartData.length >= 14) {
        const lastWeek = chartData.slice(-7).reduce((sum, item) => sum + item.total, 0);
        const prevWeek = chartData.slice(-14, -7).reduce((sum, item) => sum + item.total, 0);
        growthRate = prevWeek ? ((lastWeek - prevWeek) / prevWeek) * 100 : 0;
      }
      
      setMetrics({
        totalRevenue,
        avgDaily,
        peakDay,
        growthRate,
        transactions: inventoryData.length,
        customers: Math.floor(inventoryData.length * 0.8) // Mock customer count
      });
      
      setLineChartData(chartData);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <ThemeProvider theme={appTheme}>
        <LoadingContainer>
          <CircularProgress size={60} color="primary" />
        </LoadingContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* App Bar */}
        <AppBarStyled position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              GreenLeaf Analytics
            </Typography>
            
            <IconButton color="inherit" onClick={toggleDarkMode} sx={{ mr: 1 }}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton color="inherit" onClick={handleLogout} sx={{ mr: 1 }}>
              <Logout />
            </IconButton>
            
            <IconButton color="inherit" sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>AD</Avatar>
            </IconButton>
          </Toolbar>
        </AppBarStyled>

        {/* Sidebar */}
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              backgroundColor: appTheme.palette.background.paper,
              borderRight: 'none',
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
              padding: appTheme.spacing(0, 1),
              ...appTheme.mixins.toolbar,
              justifyContent: 'flex-end',
              backgroundColor: appTheme.palette.primary.main,
              color: appTheme.palette.primary.contrastText,
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1, ml: 2, fontWeight: 600 }}>
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle} color="inherit">
              <ChevronLeft />
            </IconButton>
          </Box>
          <Divider />
          
          <List>
            {menuItems.map((item, index) => (
              <ListItem 
                button 
                key={index} 
                onClick={() => navigate(item.path)}
                sx={{
                  '&:hover': {
                    backgroundColor: appTheme.palette.action.hover,
                  },
                  '&.Mui-selected': {
                    backgroundColor: appTheme.palette.action.selected,
                  },
                }}
              >
                <ListItemIcon sx={{ color: appTheme.palette.text.primary }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Main open={open}>
          <Box sx={{ mt: 10 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 4,
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 2 : 0,
            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Business Overview
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 2
              }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {currentDate}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Refresh />}
                  onClick={fetchDashboardData}
                  size="small"
                >
                  Refresh
                </Button>
              </Box>
            </Box>

            {error ? (
              <Paper elevation={3} sx={{ 
                p: 3, 
                mb: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <Typography color="error" variant="h6" gutterBottom>
                  Data Loading Error
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {error}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Refresh />}
                  onClick={fetchDashboardData}
                >
                  Retry
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {/* Metrics Cards */}
                <Grid xs={1} sm={6} md={3}>
                  <DashboardCard>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Total Revenue
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          ${metrics.totalRevenue.toLocaleString()}
                        </Typography>
                        <TrendIndicator trend={metrics.growthRate >= 0 ? 'up' : 'down'}>
                          {metrics.growthRate >= 0 ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                          {Math.abs(metrics.growthRate).toFixed(1)}%
                        </TrendIndicator>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        All time
                      </Typography>
                    </CardContent>
                  </DashboardCard>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <DashboardCard>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Avg. Daily Revenue
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        ${metrics.avgDaily.toFixed(2)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {lineChartData.length} days
                      </Typography>
                    </CardContent>
                  </DashboardCard>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <DashboardCard>
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Peak Day
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        ${metrics.peakDay.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Highest single day
                      </Typography>
                    </CardContent>
                  </DashboardCard>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
  <DashboardCard>
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Data Points
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {lineChartData.length}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {lineChartData.length >= 30 ? '30+ days' : `${lineChartData.length} days`}
      </Typography>
    </CardContent>
  </DashboardCard>
</Grid>

                {/* Line Chart Card */}
                <Grid item xs={12} md={8}>
                  <DashboardCard>
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Revenue Trend
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {lineChartData.length} days
                        </Typography>
                      </Box>
                      <Box sx={{ height: 350 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={lineChartData}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis 
                              dataKey="date" 
                              tick={{ fill: appTheme.palette.text.secondary }}
                            />
                            <YAxis 
                              tick={{ fill: appTheme.palette.text.secondary }}
                              tickFormatter={(value) => `$${value.toLocaleString()}`}
                            />
                            <Tooltip 
                              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                              labelFormatter={(label) => `Date: ${label}`}
                              contentStyle={{
                                background: appTheme.palette.background.paper,
                                border: `1px solid ${appTheme.palette.divider}`,
                                borderRadius: appTheme.shape.borderRadius
                              }}
                            />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="total" 
                              stroke={appTheme.palette.primary.main} 
                              strokeWidth={3}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              name="Revenue"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </DashboardCard>
                </Grid>

                {/* Bar Chart Card */}
                <Grid item xs={12} md={4}>
                  <DashboardCard>
                    <CardContent>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Last 7 Days
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Daily comparison
                        </Typography>
                      </Box>
                      <Box sx={{ height: 350 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={barChartData}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis 
                              dataKey="date" 
                              tick={{ fill: appTheme.palette.text.secondary }}
                            />
                            <YAxis 
                              tick={{ fill: appTheme.palette.text.secondary }}
                              tickFormatter={(value) => `$${value.toLocaleString()}`}
                            />
                            <Tooltip 
                              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                              labelFormatter={(label) => `Date: ${label}`}
                              contentStyle={{
                                background: appTheme.palette.background.paper,
                                border: `1px solid ${appTheme.palette.divider}`,
                                borderRadius: appTheme.shape.borderRadius
                              }}
                            />
                            <Legend />
                            <Bar 
                              dataKey="total" 
                              fill={appTheme.palette.primary.main}
                              name="Revenue"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                    </CardContent>
                  </DashboardCard>
                </Grid>

                {/* Additional Insights Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Key Insights
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <DashboardCard>
                        <CardContent>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Performance Summary
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {metrics.growthRate >= 0 ? (
                              <>Revenue is up by <strong>{metrics.growthRate.toFixed(1)}%</strong> compared to the previous period.</>
                            ) : (
                              <>Revenue is down by <strong>{Math.abs(metrics.growthRate).toFixed(1)}%</strong> compared to the previous period.</>
                            )}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            The average transaction value is <strong>${(metrics.totalRevenue / metrics.transactions || 0).toFixed(2)}</strong> across all customers.
                          </Typography>
                        </CardContent>
                      </DashboardCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DashboardCard>
                        <CardContent>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            Recommendations
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {metrics.growthRate >= 5 ? (
                              <>Strong growth observed. Consider expanding inventory to meet increasing demand.</>
                            ) : metrics.growthRate >= 0 ? (
                              <>Steady performance. Focus on customer retention strategies.</>
                            ) : (
                              <>Revenue decline detected. Analyze recent changes and consider promotional offers.</>
                            )}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Next steps: Review inventory levels and customer feedback for optimization opportunities.
                          </Typography>
                        </CardContent>
                      </DashboardCard>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Box>
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default MainDashboard;