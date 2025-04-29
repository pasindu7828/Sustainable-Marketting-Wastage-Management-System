import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid,
  styled,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Inventory, ShoppingBasket, LocalOffer } from '@mui/icons-material';

const FeatureCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s, box-shadow 0.3s',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const FeatureButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  fontSize: '1.1rem',
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

function HomeInventoryMain() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      title: "Product Details",
      description: "Manage core product inventory, pricing, and specifications",
      icon: <Inventory fontSize="large" color="primary" />,
      path: "/addproductdetails",
      color: "primary"
    },
    {
      title: "ByProduct Details",
      description: "Handle by-products and secondary inventory items",
      icon: <LocalOffer fontSize="large" color="secondary" />,
      path: "/AddByProductDetails",
      color: "secondary"
    },
    {
      title: "Shop Product Details",
      description: "Manage retail shop inventory and point-of-sale items",
      icon: <ShoppingBasket fontSize="large" color="success" />,
      path: "/AddShopProductDetails",
      color: "success"
    }
  ];

  return (
    <Box sx={{ 
      p: 4,
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      {/* Header Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 6,
        px: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            mb: 2,
            color: theme.palette.text.primary,
            [theme.breakpoints.down('sm')]: {
              fontSize: '2rem'
            }
          }}
        >
          Inventory Management System
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: theme.palette.text.secondary,
            maxWidth: '700px',
            mx: 'auto'
          }}
        >
          Comprehensive tools to manage all aspects of your inventory across multiple product categories
        </Typography>
      </Box>

      {/* Feature Cards Grid */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeatureCard>
              <CardContent sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 4
              }}>
                <Box sx={{ 
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme.palette[feature.color].light,
                  borderRadius: '50%',
                  mb: 3
                }}>
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    color: theme.palette.text.primary
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    color: theme.palette.text.secondary,
                    flexGrow: 1
                  }}
                >
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
                    }
                  }}
                >
                  Access {feature.title}
                </FeatureButton>
              </CardContent>
            </FeatureCard>
          </Grid>
        ))}
      </Grid>

      {/* Additional Info Section */}
      <Box sx={{ 
        mt: 8,
        textAlign: 'center',
        px: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 500,
            color: theme.palette.text.secondary,
            mb: 2
          }}
        >
          Need help with inventory management?
        </Typography>
        <Button 
          variant="outlined" 
          color="primary"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2
          }}
        >
          Contact Support
        </Button>
      </Box>
    </Box>
  );
}

export default HomeInventoryMain;