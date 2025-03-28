import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import FarmerPayment from '../Nav/FarmerPayment';

function AddFarmerPayment() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        fid: "", fname: "", pname: "", quantity: "", billno: "",
        date: "", amount: "", femail: "", fnumber: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const validateForm = () => {
        let formErrors = {};

        // Name Validation (No numbers allowed)
        if (!/^[A-Za-z ]+$/.test(inputs.fname)) {
            formErrors.fname = "Name cannot contain numbers.";
        }

        // Product Name Validation (Only letters and spaces allowed)
        if (!/^[A-Za-z\s]+$/.test(inputs.pname)) {
            formErrors.pname = "Product name should only contain letters and spaces.";
        }

        // Email Validation (Basic email regex)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(inputs.femail)) {
            formErrors.femail = "Please enter a valid email address.";
        }

        // Date Validation (Must be a future date)
        const currentDate = new Date();
        const enteredDate = new Date(inputs.date);
        if (enteredDate <= currentDate) {
            formErrors.date = "Date must be in the future.";
        }

        // Quantity Validation (Must be a number)
        if (isNaN(inputs.quantity) || inputs.quantity <= 0) {
            formErrors.quantity = "Quantity must be a positive number.";
        }

        // Fid Validation (Must be exactly 10 digits or 9 digits followed by 'V')
        const fidRegex = /^\d{10}$|^\d{9}V$/;
        if (!fidRegex.test(inputs.fid)) {
            formErrors.fid = "Fid must be exactly 10 digits or 9 digits followed by 'V'.";
        }

        // Contact Number Validation (Must be exactly 10 digits)
        const contactNumberRegex = /^\d{10}$/;
        if (!contactNumberRegex.test(inputs.fnumber)) {
            formErrors.fnumber = "Contact number must be exactly 10 digits.";
        }

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        // If there are errors, do not submit the form
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            await axios.post("http://localhost:5000/Farmers", {
                fid: Number(inputs.fid),
                fname: String(inputs.fname),
                pname: String(inputs.pname),
                quantity: Number(inputs.quantity),
                billno: Number(inputs.billno),
                date: String(inputs.date),
                amount: Number(inputs.amount),
                femail: String(inputs.femail),
                fnumber: String(inputs.fnumber)
            });
            navigate('/displayFarmerPayment');
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

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
                            key !== "fnumber" ? (
                                <Grid item xs={12} key={key}>
                                    <TextField
                                        label={
                                            key === "pname" ? "Enter Product Name" : `Enter ${key.replace(/f|p/, '').toUpperCase()}`
                                        }
                                        type={key === "amount" || key === "quantity" || key === "billno" || key === "fid" ? "number" : "text"}
                                        name={key}
                                        value={inputs[key]}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        variant="outlined"
                                        InputProps={key === "amount" || key === "quantity" || key === "billno" || key === "fid" ? { inputProps: { min: 0 } } : {}}
                                        error={!!errors[key]}
                                        helperText={errors[key]}
                                    />
                                </Grid>
                            ) : (
                                <Grid item xs={12} key={key}>
                                    <TextField
                                        label="Enter the Contact Number"
                                        type="text"
                                        name={key}
                                        value={inputs[key]}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        variant="outlined"
                                        error={!!errors[key]}
                                        helperText={errors[key]}
                                    />
                                </Grid>
                            )
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
