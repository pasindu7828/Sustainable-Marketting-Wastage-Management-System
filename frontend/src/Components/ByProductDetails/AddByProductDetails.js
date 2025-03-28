import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';
import ByProductNav from '../Nav/ByProductNav';

function AddByProductDetails() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Bp1: "", Bp2: "", Bp3: "", Bp4: "", Bp5: "",
    addedDate: ""
  });
  const [errors, setErrors] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Get the system date when the component loads
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
  }, []);

  const validateField = (name, value) => {
    if (value === "" || isNaN(value) || parseFloat(value) < 0) {
      return "Please enter 0 or a positive number";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);

    setInputs(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    let isValid = true;
    
    Object.keys(inputs).forEach((key) => {
      if (key !== "addedDate") {
        const errorMsg = validateField(key, inputs[key]);
        if (errorMsg) {
          isValid = false;
          validationErrors[key] = errorMsg;
        }
      }
    });
    
    setErrors(validationErrors);
    if (!isValid) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];  // Saving current date to the backend
      await axios.post("http://localhost:5000/BadInventorys", {
        Bp1: Number(inputs.Bp1),
        Bp2: Number(inputs.Bp2),
        Bp3: Number(inputs.Bp3),
        Bp4: Number(inputs.Bp4),
        Bp5: Number(inputs.Bp5),
        addedDate: today,
      });
      history('/DisplayByProductDetails');
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <ByProductNav />
      <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add ByProduct Details
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
          <strong>System Date: </strong>{currentDate}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {["Bp1", "Bp2", "Bp3", "Bp4", "Bp5"].map((field, index) => (
              <Grid item xs={12} key={field}>
                <TextField
                  label={
                    [
                      "Enter Mix Fruit Jam (bottle)",
                      "Enter Mix Fruit Cocktail (bottle)",
                      "Enter Jellies (packet)",
                      "Enter Fruit Juice (bottle)",
                      "Enter Smoothies (cup)"
                    ][index]
                  }
                  type="number"
                  name={field}
                  value={inputs[field]}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  InputProps={{
                    inputProps: { min: 0 }  // Enforce a minimum value of 0
                  }}
                  error={!!errors[field]}
                  helperText={errors[field]}
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

export default AddByProductDetails;
