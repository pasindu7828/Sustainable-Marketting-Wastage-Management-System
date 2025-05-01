import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Paper, Typography, Grid } from "@mui/material";

function UpdateFarmerPrice() {
    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const { id } = useParams();

    // Fetch the existing data based on ID
    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/FarmerPrices/product/${id}`);
                console.log("Full response data:", res.data); // ✅ Logs the full response
                setInputs(res.data); // or setInputs(res.data) based on your structure
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchHandler();
    }, [id]);
    

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Sending the updated data back to the server
    const sendRequest = async () => {
        await axios
            .put(`http://localhost:5000/FarmerPrices/${id}`, {
                fpApple: Number(inputs.fpApple),
                fpOrange: Number(inputs.fpOrange),
                fpBanana: Number(inputs.fpBanana),
                fpGrapes: Number(inputs.fpGrapes),
                fpWatermelon: Number(inputs.fpWatermelon),
                fpMango: Number(inputs.fpMango),
                fpWoodapple: Number(inputs.fpWoodapple),
                fpPineapple: Number(inputs.fpPineapple),
                fpPapaya: Number(inputs.fpPapaya),
                fpGuava: Number(inputs.fpGuava),
            })
            .then((res) => res.data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/displayFarmerPrice"));
    };

    // Fruit fields data for form generation
    const fields = [
        { name: "fpApple", label: "Apple" },
        { name: "fpOrange", label: "Orange" },
        { name: "fpBanana", label: "Banana" },
        { name: "fpGrapes", label: "Grapes" },
        { name: "fpWatermelon", label: "Watermelon" },
        { name: "fpMango", label: "Mango" },
        { name: "fpWoodapple", label: "WoodApple" },
        { name: "fpPineapple", label: "Pineapple" },
        { name: "fpPapaya", label: "Papaya" },
        { name: "fpGuava", label: "Guava" },
    ];

    return (
        <Container maxWidth="sm" style={{ marginTop: "40px" }}>
            <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Update Farmer Prices
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {fields.map((field) => (
                            <Grid item xs={12} key={field.name}>
                                <TextField
                                    label={`Enter ${field.label} Price (1 kg)`}
                                    type="number"
                                    name={field.name}
                                    onChange={handleChange}
                                    value={inputs?.[field.name] || ""}
                                    fullWidth
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: "20px" }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default UpdateFarmerPrice;
