import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';

function UpdateByProductDetails() {
    const [inputs, setInputs] = useState({});
    const [currentDate, setCurrentDate] = useState("");
    const history = useNavigate();
    const { id } = useParams();

    // Get the current system date
    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setCurrentDate(today);
    }, []);

    // Fetch data for the given ID when the component mounts
    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/BadInventorys/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.BadInventorys));
        };
        fetchHandler();
    }, [id]);

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

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/BadInventorys/${id}`, {
            Bp1: Number(inputs.Bp1),
            Bp2: Number(inputs.Bp2),
            Bp3: Number(inputs.Bp3),
            Bp4: Number(inputs.Bp4),
            Bp5: Number(inputs.Bp5),
        }).then((res) => res.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history('/DisplayByProductDetails'));
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Update ByProduct Details
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                    System Date: {currentDate}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Render form fields with updated labels */}
                        <Grid item xs={12}>
                            <TextField
                                label="Mix Fruit Jam (bottle)"
                                type="number"
                                name="Bp1"
                                value={inputs.Bp1 || ""}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 0 } // Enforce a minimum value of 0
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mix Fruit Cocktail (bottle)"
                                type="number"
                                name="Bp2"
                                value={inputs.Bp2 || ""}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 0 } // Enforce a minimum value of 0
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Jellies (packet)"
                                type="number"
                                name="Bp3"
                                value={inputs.Bp3 || ""}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 0 } // Enforce a minimum value of 0
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Fruit Juice (bottle)"
                                type="number"
                                name="Bp4"
                                value={inputs.Bp4 || ""}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 0 } // Enforce a minimum value of 0
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Smoothies (cup)"
                                type="number"
                                name="Bp5"
                                value={inputs.Bp5 || ""}
                                onChange={handleChange}
                                fullWidth
                                required
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 0 } // Enforce a minimum value of 0
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 20 }}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default UpdateByProductDetails;