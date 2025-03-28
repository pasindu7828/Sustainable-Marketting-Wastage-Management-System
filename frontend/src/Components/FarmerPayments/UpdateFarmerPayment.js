import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper, Grid } from "@mui/material";

function UpdateFarmerPayment() {
    const [inputs, setInputs] = useState({
        fid: "",
        fname: "",
        pname: "",
        quantity: "",
        billno: "",
        date: "",
        amount: "",
        femail: "",
        fnumber: "",
    });

    const [errors, setErrors] = useState({
        femail: "",
        fid: "",
        quantity: "",
        billno: "",
        amount: "",
        fnumber: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/Farmers/${id}`);
                if (res.data && res.data.farmer) {
                    setInputs(res.data.farmer);
                }
            } catch (error) {
                console.error("Error fetching farmer payment details:", error);
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

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        // Check if email is valid
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (inputs.femail && !emailPattern.test(inputs.femail)) {
            tempErrors.femail = "Please enter a valid email address.";
            isValid = false;
        }

        // Validate fid (should be a number)
        if (inputs.fid && isNaN(inputs.fid)) {
            tempErrors.fid = "Please enter a valid NIC number.";
            isValid = false;
        }

        // Validate quantity (should be a number)
        if (inputs.quantity && isNaN(inputs.quantity)) {
            tempErrors.quantity = "Please enter a valid quantity.";
            isValid = false;
        }

        // Validate billno (should be a number)
        if (inputs.billno && isNaN(inputs.billno)) {
            tempErrors.billno = "Please enter a valid bill number.";
            isValid = false;
        }

        // Validate amount (should be a number)
        if (inputs.amount && isNaN(inputs.amount)) {
            tempErrors.amount = "Please enter a valid amount.";
            isValid = false;
        }

        // Validate fnumber (should be a valid phone number)
        const phonePattern = /^[0-9]{10}$/;
        if (inputs.fnumber && !phonePattern.test(inputs.fnumber)) {
            tempErrors.fnumber = "Please enter a valid 10-digit phone number.";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const sendRequest = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/Farmers/${id}`, inputs);
            console.log("API response:", res);  // Log response for debugging
        } catch (error) {
            console.error("Error updating farmer payment details:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('inputs', inputs);
        if (validateForm()) {
            sendRequest().then(() => {
                // Navigate only after the successful API request
                navigate("/displayFarmerPayment");
            });
        } else {
            console.log("Form validation failed. Check fields.");
        }
    };

    return (
        <Container  maxWidth={false} disableGutters>
            <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Update Farmer Payment
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {[
                            { name: "fid", label: "NIC" },
                            { name: "fname", label: "Farmer Name" },
                            { name: "pname", label: "Product Names" },
                            { name: "quantity", label: "Quantity" },
                            { name: "billno", label: "Bill Number" },
                            { name: "date", label: "Date" },
                            { name: "amount", label: "Amount" },
                            { name: "femail", label: "Email" },
                            { name: "fnumber", label: "Contact Number" },
                        ].map((field) => (
                            <Grid item xs={12} key={field.name}>
                                <TextField
                                    label={`Enter ${field.label}`}
                                    type="text"
                                    name={field.name}
                                    value={inputs[field.name] || ""}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    error={Boolean(errors[field.name])}
                                    helperText={errors[field.name]}
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

export default UpdateFarmerPayment;
