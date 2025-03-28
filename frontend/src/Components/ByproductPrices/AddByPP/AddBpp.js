import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import Nav from '../../Nav/Nav';

function AddBpp() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        bp1: "", bp2: "", bp3: "", bp4: "", bp5: "",
        addedDate: ""
    });
    const [currentDate, setCurrentDate] = useState("");

    // Get the current date when the component is mounted
    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setCurrentDate(today);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent negative numbers from being entered
        if (parseFloat(value) < 0) {
            return;
        }

        setInputs(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const today = new Date().toISOString().split('T')[0]; // Current date to store in the database
            await axios.post("http://localhost:5000/ByproductPrices", {
                bp1: Number(inputs.bp1),
                bp2: Number(inputs.bp2),
                bp3: Number(inputs.bp3),
                bp4: Number(inputs.bp4),
                bp5: Number(inputs.bp5),
                addedDate: today,
            });
            navigate('/BPPriceDetails');
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Nav />
            <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add By Product Prices
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                    System Date: {currentDate}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(inputs).filter(key => key !== "addedDate").map((key) => (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    label={`${key.replace('bp', 'By Product ')} Price (500 ml)`}
                                    type="number"
                                    name={key}
                                    value={inputs[key]}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    InputProps={{
                                        inputProps: { min: 0 }  // Enforce a minimum value of 0
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default AddBpp;
