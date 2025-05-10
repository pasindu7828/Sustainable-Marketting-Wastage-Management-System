import React from 'react';
import { Button, Box, Typography, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  textAlign: 'center',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  padding: '12px 24px',
  borderRadius: '12px',
  fontWeight: 'bold',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

function MainHomePage() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'By Product Prices',
      description: 'Manage and update by-product pricing information',
      icon: 'https://cdn-icons-png.flaticon.com/512/8291/8291727.png',
      action: () => navigate('/addByproduct'),
      color: 'primary',
    },
    {
      title: 'Farmer Product Price List',
      description: 'View and analyze farmer product pricing data',
      icon: 'https://cdn-icons-png.flaticon.com/512/5436/5436010.png',
      action: () => navigate('/displayFarmerPrice'),
      color: 'secondary',
    },
    {
      title: 'Shop Market Price List',
      description: 'Access current market prices from various shops',
      icon: 'https://cdn-icons-png.flaticon.com/512/4253/4253750.png',
      action: () => navigate('/displayShopPrice'),
      color: 'success',
    },
    {
      title: 'Farmer Payment Details',
      description: 'Track and manage all farmer payment transactions',
      icon: 'https://cdn-icons-png.flaticon.com/512/1183/1183527.png',
      action: () => navigate('/farmersList'),
      color: 'error',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Top-left Dashboard Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/adminPage')}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
          }}
        >
          Back to Dashboard
        </Button>
      </Box>

      {/* Hero Section */}
      <Box textAlign="center" mb={8}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #3f51b5 30%, #2196F3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.05em',
          }}
        >
          Finance Management System
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: 'text.secondary',
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Streamline your financial operations with our comprehensive management solution
        </Typography>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={5} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <FeatureCard elevation={4}>
              <Box
                component="img"
                src={feature.icon}
                alt={feature.title}
                sx={{
                  width: 80,
                  height: 80,
                  mb: 3,
                  filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))',
                }}
              />
              <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {feature.description}
              </Typography>
              <Button
                variant="contained"
                color={feature.color}
                onClick={feature.action}
                sx={{
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1,
                  textTransform: 'none',
                  fontSize: '1rem',
                  mt: 'auto',
                }}
              >
                Access
              </Button>
            </FeatureCard>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box textAlign="center" mt={8}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
          Ready to optimize your financial management?
        </Typography>
        <GradientButton
          variant="contained"
          size="large"
          onClick={() => navigate('/dailyFinanceCal')}
          sx={{
            fontSize: '1.1rem',
            px: 6,
          }}
        >
          View Daily Summary
        </GradientButton>
      </Box>
    </Container>
  );
}

export default MainHomePage;
