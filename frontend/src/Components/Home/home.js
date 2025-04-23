import React from 'react';
import Nav from "../Nav/Nav";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid
} from '@mui/material';

function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Welcome to Sustainable Marketing & Waste Management
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1">
                We are committed to promoting sustainable marketing practices and efficient waste management solutions for a better future.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                What We Do
              </Typography>
              <Typography variant="body1">
                Our platform helps businesses implement eco-friendly marketing strategies while effectively managing their waste through innovative solutions.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="h5" gutterBottom>
                Get Started
              </Typography>
              <Typography variant="body1">
                Explore our platform to learn more about sustainable practices and how we can help your business grow while minimizing environmental impact.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
