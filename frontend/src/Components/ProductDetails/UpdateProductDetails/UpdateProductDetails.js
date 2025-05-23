import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

function UpdateProductDetails() {
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
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
  }, []);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/Inventorys/${id}`);
        setInputs(res.data.inventory);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Custom restrictions for specific fields
    if (name === "fid") {
      if (/^[0-9vV]*$/.test(value) && value.length <= 13) {
        setInputs((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "fname" || name === "pname") {
      if (/^[A-Za-z ]*$/.test(value)) {
        setInputs((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!/^[0-9]+$/.test(inputs.pid)) {
      newErrors.pid = "Product ID must contain only numbers.";
    }

    if (!/^[A-Za-z ]+$/.test(inputs.pname)) {
      newErrors.pname = "Product Name must contain only letters.";
    }

    if (!/^[0-9vV]{0,13}$/.test(inputs.fid)) {
      newErrors.fid = "Farmer ID must be exactly 13 characters (digits and 'v' only).";
    }

    if (!/^[A-Za-z ]+$/.test(inputs.fname)) {
      newErrors.fname = "Farmer Name must contain only letters.";
    }

    if (!/^[0-9]{9}$/.test(inputs.fnumber)) {
      newErrors.fnumber = "Farmer Number must be exactly 10 digits.";
    }

    if (!/^[0-9]+$/.test(inputs.quantity) || inputs.quantity < 0) {
      newErrors.quantity = "Quantity must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/Inventorys/${id}`, {
        pid: Number(inputs.pid),
        pname: String(inputs.pname),
        fid: String(inputs.fid),
        fname: String(inputs.fname),
        fnumber: Number(inputs.fnumber),
        quantity: Number(inputs.quantity),
        updatedDate: currentDate,
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      sendRequest().then(() => navigate("/DisplayProductDetails"));
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Update Product Details
        </Typography>

        <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
          System Date: {currentDate}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[{ name: "pid", label: "Product ID", type: "number" },
              { name: "pname", label: "Product Name", type: "text" },
              { name: "fid", label: "Farmer ID", type: "text" },
              { name: "fname", label: "Farmer Name", type: "text" },
              { name: "fnumber", label: "Farmer Number", type: "number" },
              { name: "quantity", label: "Product Quantity (kg)", type: "number" }].map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  label={field.label}
                  type={field.type}
                  name={field.name}
                  value={inputs[field.name] || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!!errors[field.name]}
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

export default UpdateProductDetails;
