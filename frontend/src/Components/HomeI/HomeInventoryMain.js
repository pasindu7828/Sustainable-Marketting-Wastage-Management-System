import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomeInventoryMain() {
    const navigate = useNavigate();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={3} p={4}>
            {/* Welcome Text */}
            <Typography 
                variant="h4" 
                sx={{ 
                    fontWeight: 'bold', 
                    color: '#333', 
                    textAlign: 'center', 
                    mb: 2, 
                    fontFamily: 'Roboto, sans-serif',
                    letterSpacing: 1
                }}
            >
                Welcome To Inventory System
            </Typography>

            {/* Product Details Button with Image */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/8291/8291727.png" 
                    alt="Product Details" 
                    width="80" 
                    height="80"
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/addproductdetails')}
                    sx={{
                        fontSize: '1.2rem', 
                        padding: '12px 24px', 
                        width: '300px', 
                        borderRadius: '12px', 
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s',
                        '&:hover': {
                            backgroundColor: '#1565C0',
                            transform: 'scale(1.05)'
                        }
                    }}
                >
                    Product Details
                </Button>
            </Box>

            {/* ByProduct Details Button with Image */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/5436/5436010.png" 
                    alt="ByProduct Details" 
                    width="80" 
                    height="80"
                />
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => navigate('/AddByProductDetails')}
                    sx={{
                        fontSize: '1.2rem', 
                        padding: '12px 24px', 
                        width: '300px', 
                        borderRadius: '12px', 
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s',
                        '&:hover': {
                            backgroundColor: '#C2185B',
                            transform: 'scale(1.05)'
                        }
                    }}
                >
                    ByProduct Details
                </Button>
            </Box>

            {/* Shop Product Details Button with Image */}
            <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/4253/4253750.png" 
                    alt="Shop Product Details" 
                    width="80" 
                    height="80"
                />
                <Button 
                    variant="contained" 
                    color="success" 
                    onClick={() => navigate('/AddShopProductDetails')}
                    sx={{
                        fontSize: '1.2rem', 
                        padding: '12px 24px', 
                        width: '300px', 
                        borderRadius: '12px', 
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s',
                        '&:hover': {
                            backgroundColor: '#2E7D32',
                            transform: 'scale(1.05)'
                        }
                    }}
                >
                    Shop Product Details
                </Button>
            </Box>
        </Box>
    );
}

export default HomeInventoryMain;
