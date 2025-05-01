import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';

function UpdateShopProductDetails() {
    const [inputs, setInputs] = useState({});
    const [currentDate, setCurrentDate] = useState("");
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setCurrentDate(today);
    }, []);

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/GoodInventorys/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.GoodInventorys));
        };
        fetchHandler();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (parseFloat(value) < 0) return;
        setInputs(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/GoodInventorys/${id}`, inputs)
            .then((res) => res.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history('/DisplayShopProductDetails'));
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Update Shop Product Details
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                    System Date: {currentDate}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {["totalapple", "totalorange", "totalbanana", "totalgrapes", "totalwatermelon", "totalmango", "totalwoodapple", "totalpineapple", "totalpapaya", "totalguava", "shopapple", "shoporange", "shopbanana", "shopgrapes", "shopwatermelon", "shopmango", "shopwoodapple", "shoppineapple", "shoppapaya", "shopguava"].map((field, index) => (
                            <Grid item xs={12} key={index}>
                                <TextField
                                    label={field.replace(/([a-z])([A-Z])/g, '$1 $2').replace("total", "Total").replace("shop", "Shop").charAt(0).toUpperCase() + field.replace(/([a-z])([A-Z])/g, '$1 $2').replace("total", "Total").replace("shop", "Shop").slice(1) + " (kg)"}
                                    type="number"
                                    name={field}
                                    value={inputs[field] || ""}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    InputProps={{ inputProps: { min: 0 } }}
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

export default UpdateShopProductDetails;