import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import FarmerPayment from '../Nav/FarmerPayment';

function AddFarmerPayment() {
    const location = useLocation();
    const id = location.state?.id;
    console.log("id", id);

    const navigate = useNavigate();
    const [price, setPrice] = useState(0);

    const [inputs, setInputs] = useState({
        fid: "", fname: "", pname: "", quantity: "", billno: "",
        date: new Date().toISOString().split("T")[0], amount: "",
        femail: "", fnumber: ""
    });

    const [errors, setErrors] = useState({});

    const fetchInventoryData = async (id) => {
        try {
            const URL = `http://localhost:5000/Inventorys/${id}`;
            const response = await axios.get(URL);
            const data = response.data.inventory;

            setInputs(prev => ({
                ...prev,
                fid: data.fid || "",
                fname: data.fname || "",
                pname: data.pname || "",
                quantity: data.quantity || "",
                billno: data.billno || "",
                date: new Date().toISOString().split("T")[0],
                amount: data.amount || "",
                femail: data.femail || "",
                fnumber: data.fnumber || ""
            }));

            if (data.pname) {
                console.log("Fetching price for:", data.pname);
                fetchPrices("Watermelon");
            }

            console.log("Fetched users:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchPrices = async (pname) => {
        try {
            const URL = `http://localhost:5000/FarmerPrices/${pname}`;
            const response = await axios.get(URL);
            const data = response.data;
            setPrice(data.price);

            console.log("Fetched prices:", data.price);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (inputs.quantity && price) {
            setInputs(prev => ({
                ...prev,
                amount: totalPrice(prev.quantity)
            }));
        }
    }, [inputs.quantity, price]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Validation
        if (name === "femail") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setErrors(prev => ({
                ...prev,
                femail: emailRegex.test(value) ? "" : "Invalid email format"
            }));
        }

        if (name === "fnumber") {
            const phoneRegex = /^\d{10}$/;
            setErrors(prev => ({
                ...prev,
                fnumber: phoneRegex.test(value) ? "" : "Phone number must be 10 digits"
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submission if there are validation errors
        if (errors.femail || errors.fnumber) {
            return;
        }

        try {
            await axios.post("http://localhost:5000/Farmers", inputs);
            navigate('/displayFarmerPayment');
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const totalPrice = (quantity) => {
        return quantity * price;
    };

    useEffect(() => {
        if (id) {
            fetchInventoryData(id);
        }
    }, [id]);

    return (
        <Container maxWidth="sm">
            <FarmerPayment />
            <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Farmer Payment
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(inputs).map((key) => (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    label={`Enter ${key.replace(/f|p/, '').toUpperCase()}`}
                                    type={["amount", "quantity", "billno", "fid"].includes(key) ? "number" : "text"}
                                    name={key}
                                    value={inputs[key]}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    disabled={key === "amount" || key === "fid" || key === "fname" || key === "quantity"}
                                    error={!!errors[key]} // Show error state if validation fails
                                    helperText={errors[key]} // Display error message
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

export default AddFarmerPayment;
