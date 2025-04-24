import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
} from '@mui/material';
import {
    TrendingUp,
    People,
    ShoppingCart,
    AttachMoney,
    MoreVert as MoreVertIcon
} from '@mui/icons-material';

const StatisticsCards = () => {
    const stats = [
        {
            title: "Total Sales",
            value: "$2,415",
            percentageChange: "+11%",
            icon: <TrendingUp sx={{ fontSize: 40 }} />,
            color: "#4CAF50"
        },
        {
            title: "Total Customers",
            value: "45,241",
            percentageChange: "+5.4%",
            icon: <People sx={{ fontSize: 40 }} />,
            color: "#2196F3"
        },
        {
            title: "Products Sold",
            value: "1,205",
            percentageChange: "+8.2%",
            icon: <ShoppingCart sx={{ fontSize: 40 }} />,
            color: "#FF9800"
        },
        {
            title: "Revenue",
            value: "$35,723",
            percentageChange: "+2.4%",
            icon: <AttachMoney sx={{ fontSize: 40 }} />,
            color: "#E91E63"
        }
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography color="textSecondary" gutterBottom variant="body2">
                                        {stat.title}
                                    </Typography>
                                    <Typography variant="h4" component="div">
                                        {stat.value}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: stat.percentageChange.startsWith('+') ? 'success.main' : 'error.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            mt: 1
                                        }}
                                    >
                                        {stat.percentageChange}
                                    </Typography>
                                </Box>
                                <Box>
                                    <IconButton size="small">
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 60,
                                    height: 60,
                                    backgroundColor: `${stat.color}15`,
                                    borderRadius: '50%',
                                    mt: 2
                                }}
                            >
                                <Box sx={{ color: stat.color }}>
                                    {stat.icon}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default StatisticsCards; 