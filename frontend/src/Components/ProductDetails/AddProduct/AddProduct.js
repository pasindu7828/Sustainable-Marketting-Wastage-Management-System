import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
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

  const productNames = [
    "apple", "orange", "banana", "grapes", "watermelon", 
    "mango", "woodapple", "pineapple", "papaya", "guava"
  ];

  useEffect(() => {
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

    if (!inputs.pname) {
      newErrors.pname = "Please select a product name.";
    }

    if (!/^(\d{12}|\d{10}V)$/.test(inputs.fid)) {
      newErrors.fid = "Farmer ID must be 13 digits or 13 digits followed by 'V'.";
    }
    if (!/^[A-Za-z ]+$/.test(inputs.fname)) {
      newErrors.fname = "farmer Name must contain only letters.";
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
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                fullWidth
                required
                variant="outlined"
                error={!!errors.pid}
                helperText={errors.pid}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required error={!!errors.pname}>
                <InputLabel>Product Name</InputLabel>
                <Select
                  name="pname"
                  value={inputs.pname}
                  onChange={handleChange}
                  label="Product Name"
                >
                  {productNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.pname && (
                <Typography variant="body2" color="error">
                  {errors.pname}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
  <TextField
    label="Farmer ID"
    type="text"
    name="fid"
    value={inputs.fid}
    onChange={(e) => {
      const value = e.target.value.toUpperCase(); // Convert to uppercase
      if (/^[0-9V]{0,13}$/.test(value)) {
        setInputs((prevState) => ({
          ...prevState,
          fid: value,
        }));
      }
    }}
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
                onKeyPress={(e) => {
                  if (!/[a-zA-Z ]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                fullWidth
                required
                variant="outlined"
                error={!!errors.fname}
                helperText={errors.fname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Farmer Number"
                type="text"
                name="fnumber"
                value={inputs.fnumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                  }
                }}
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
                  inputProps: { min: 0 },
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
