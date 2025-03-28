import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import TNav from '../../Nav/TNav';

function AddProduct() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    pid: "",
    pname: "",
    fid: "",
    fname: "",
    fnumber: "",
    quantity: "",
  });
  const [errors, setErrors] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Get the system date when the component loads
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!/^[0-9]+$/.test(inputs.pid)) {
      newErrors.pid = "Product ID must contain only numbers.";
    }

    if (!/^[A-Za-z ]+$/.test(inputs.pname)) {
      newErrors.pname = "Product Name must contain only letters.";
    }

    if (!/^(\d{12}|\d{10}V)$/.test(inputs.fid)) {
      newErrors.fid = "Farmer ID must be 10 digits or 9 digits followed by 'V'.";
    }

    if (!/^[0-9]{10}$/.test(inputs.fnumber)) {
      newErrors.fnumber = "Farmer Number must be exactly 10 digits.";
    }

    if (!/^[0-9]+$/.test(inputs.quantity) || inputs.quantity < 0) {
      newErrors.quantity = "Quantity must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      sendRequest().then(() => navigate('/DisplayProductDetails'));
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/Inventorys", {
      pid: Number(inputs.pid),
      pname: String(inputs.pname),
      fid: String(inputs.fid),
      fname: String(inputs.fname),
      fnumber: Number(inputs.fnumber),
      quantity: Number(inputs.quantity),
    }).then(res => res.data);
  };

  return (
    <Container maxWidth="sm">
      <TNav />
      <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Product
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
          System Date: {currentDate}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Product ID"
                type="text"
                name="pid"
                value={inputs.pid}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                error={!!errors.pid}
                helperText={errors.pid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                type="text"
                name="pname"
                value={inputs.pname}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                error={!!errors.pname}
                helperText={errors.pname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Farmer ID"
                type="text"
                name="fid"
                value={inputs.fid}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                error={!!errors.fid}
                helperText={errors.fid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Farmer Name"
                type="text"
                name="fname"
                value={inputs.fname}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Farmer Number"
                type="text"
                name="fnumber"
                value={inputs.fnumber}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                error={!!errors.fnumber}
                helperText={errors.fnumber}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Product Quantity (kg)"
                type="number"
                name="quantity"
                value={inputs.quantity}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  inputProps: { min: 0 },  // Enforce a minimum value of 0
                }}
                error={!!errors.quantity}
                helperText={errors.quantity}
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

export default AddProduct;
