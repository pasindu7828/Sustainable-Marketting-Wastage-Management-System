import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, Grid } from "@mui/material";

function UpdateShopPrice() {
    const [inputs, setInputs] = useState({
        spApple: "",
        spOrange: "",
        spBanana: "",
        spGraphes: "",
        spWatermelon: "",
        spMango: "",
        spWoodapple: "",
        spPineapple: "",
        spPapaya: "",
        spGoava: "",
    });

    const [currentDate, setCurrentDate] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    // Get the current system date
    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setCurrentDate(today);
    }, []);

    // Fetch data for the given ID when the component mounts
    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/ShopPrices/${id}`);
                if (res.data && res.data.SproductPrice) {
                    const { _id, _v, ...filteredData } = res.data.SproductPrice;
                    setInputs(filteredData);
                }
            } catch (error) {
                console.error("Error fetching shop prices:", error);
            }
        };
        fetchHandler();
    }, [id]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (parseFloat(value) < 0) return; // Prevent negative numbers

        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Send PUT request to update the shop price details
    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/ShopPrices/${id}`, {
                ...inputs,
                updatedDate: new Date().toISOString().split("T")[0], // Store updated date
            });
        } catch (error) {
            console.error("Error updating shop prices:", error);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => navigate("/displayShopPrice"));
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Update Shop Price
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                    System Date: {currentDate}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Explicitly Define Fields */}
                        {[
                            { name: "spApple", label: "Apple" },
                            { name: "spOrange", label: "Orange" },
                            { name: "spBanana", label: "Banana" },
                            { name: "spGraphes", label: "Graphes" },
                            { name: "spWatermelon", label: "Watermelon" },
                            { name: "spMango", label: "Mango" },
                            { name: "spWoodapple", label: "Woodapple" },
                            { name: "spPineapple", label: "Pineapple" },
                            { name: "spPapaya", label: "Papaya" },
                            { name: "spGoava", label: "Goava" },
                        ].map((field) => (
                            <Grid item xs={12} key={field.name}>
                                <TextField
                                    label={`Enter ${field.label} Price`}
                                    type="number"
                                    name={field.name}
                                    value={inputs[field.name] || ""}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    InputProps={{
                                        inputProps: { min: 0 }, // Prevent negative values
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

export default UpdateShopPrice;
