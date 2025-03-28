import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Typography, Container } from "@mui/material";

function UpdateBPlist() {
    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/ByproductPrices/${id}`)
                .then((res) => res.data)
                .then((data) => setInputs(data.Bproduct));
        };
        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        await axios
            .put(`http://localhost:5000/ByproductPrices/${id}`, {
                bp1: Number(inputs.bp1),
                bp2: Number(inputs.bp2),
                bp3: Number(inputs.bp3),
                bp4: Number(inputs.bp4),
                bp5: Number(inputs.bp5),
            })
            .then((res) => res.data);
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/BPPriceDetails"));
    };

    return (
      <Container maxWidth="sm">
          <Typography variant="h4" align="center" paddingBottom="50px">
              Update Byproduct Prices
          </Typography>
          <form onSubmit={handleSubmit}>
              <Stack spacing={6}>
                  {[
                      { name: "bp1", label: "Mix Fruit Jam (500 ml)" },
                      { name: "bp2", label: "Mix Fruit Cocktails (500 ml)" },
                      { name: "bp3", label: "Jellies (500 ml)" },
                      { name: "bp4", label: "Fruit Juices (500 ml)" },
                      { name: "bp5", label: "Smoothies (500 ml)" },
                  ].map((field) => (
                    <TextField
                    label={field.label}
                    name={field.name}
                    type="number"
                    onChange={handleChange}
                    value={inputs?.[field.name] || ""}
                    required
                    variant="outlined"
                />
                  ))}
              </Stack>
              <Stack direction="row" justifyContent="center" mt={2}>
                  <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                  >
                      Submit
                  </Button>
              </Stack>
          </form>
      </Container>
  );
}

export default UpdateBPlist;
