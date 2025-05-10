import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, styled, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PackageCheck, Boxes, ShoppingCart } from 'lucide-react'; 

const FeatureCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
  transition: 'all 0.4s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
  },
}));

const FeatureButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(2),
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 5px 12px rgba(0,0,0,0.15)',
  },
}));

function HomeInventoryMain() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: 'Product Details',
      description: 'Manage core product inventory, pricing, and specifications',
      icon: <PackageCheck size={36} color={theme.palette.primary.main} />,
      path: '/addproductdetails',
      color: 'primary',
    },
    {
      title: 'ByProduct Details',
      description: 'Handle by-products and secondary inventory items',
      icon: <Boxes size={36} color={theme.palette.secondary.main} />,
      path: '/AddByProductDetails',
      color: 'secondary',
    },
    {
      title: 'Shop Product Details',
      description: 'Manage retail shop inventory and point-of-sale items',
      icon: <ShoppingCart size={36} color={theme.palette.success.main} />,
      path: '/AddShopProductDetails',
      color: 'success',
    },
  ];

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 4, sm: 6 }, minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: theme.palette.text.primary, fontSize: { xs: '2rem', md: '3rem' } }}>
          Inventory Management System
        </Typography>
        <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, maxWidth: 720, mx: 'auto', lineHeight: 1.7 }}>
          Comprehensive tools to manage all aspects of your inventory across multiple product categories
        </Typography>
      </Box>

      {/* Feature Cards */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureCard>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 4 }}>
                <Box sx={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.palette[feature.color].light, borderRadius: '50%', mb: 3 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: theme.palette.text.primary }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary, flexGrow: 1, fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
                <FeatureButton
                  variant="contained"
                  color={feature.color}
                  fullWidth
                  onClick={() => navigate(feature.path)}
                  sx={{
                    backgroundColor: theme.palette[feature.color].main,
                    '&:hover': {
                      backgroundColor: theme.palette[feature.color].dark,
                    },
                  }}
                >
                  Access {feature.title}
                </FeatureButton>
              </CardContent>
            </FeatureCard>
          </Grid>
        ))}
      </Grid>

      {/* Support Section */}
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 500, color: theme.palette.text.secondary, mb: 2 }}>
          Return to admin Dashboard
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            borderColor: theme.palette.primary.main,
            '&:hover': {
              borderColor: theme.palette.primary.dark,
              backgroundColor: theme.palette.primary.light,
            },
          }}
          onClick={() => navigate('/adminPage')}
        >
          Admin Dashboard
        </Button>
      </Box>
    </Box>
  );
}

export default HomeInventoryMain;
