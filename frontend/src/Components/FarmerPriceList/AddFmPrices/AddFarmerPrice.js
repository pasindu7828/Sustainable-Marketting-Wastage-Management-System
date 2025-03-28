import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import FarmerPricesNav from '../../Nav/FarmerPricesNav';

function AddFarmerPrice() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        fpApple: "", fpOrange: "", fpBanana: "", fpGraphes: "", fpWatermelon: "",
        fpMango: "", fpWoodapple: "", fpPineapple: "", fpPapaya: "", fpGoava: "",
        addedDate: ""
    });
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        // Get the system date when the component loads
        const today = new Date().toLocaleDateString();
        setCurrentDate(today);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // If the value is a negative number, reset to an empty string
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
            const today = new Date().toISOString().split('T')[0];  // Saving current date to the backend
            await axios.post("http://localhost:5000/FarmerPrices", {
                fpApple: Number(inputs.fpApple),
                fpOrange: Number(inputs.fpOrange),
                fpBanana: Number(inputs.fpBanana),
                fpGraphes: Number(inputs.fpGraphes),
                fpWatermelon: Number(inputs.fpWatermelon),
                fpMango: Number(inputs.fpMango),
                fpWoodapple: Number(inputs.fpWoodapple),
                fpPineapple: Number(inputs.fpPineapple),
                fpPapaya: Number(inputs.fpPapaya),
                fpGoava: Number(inputs.fpGoava),
                addedDate: today,
            });
            navigate('/displayFarmerPrice');
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <FarmerPricesNav />
            <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Farmer Prices
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                    System Date: {currentDate}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(inputs).filter(key => key !== "addedDate").map((key) => (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    label={`Enter ${key.replace('fp', '')} Price (1 kg)`}
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

export default AddFarmerPrice;
