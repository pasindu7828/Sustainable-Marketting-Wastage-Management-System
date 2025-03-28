import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Paper, Grid } from "@mui/material";
import ByProductNav from "../Nav/ShopNav";

function AddShopProductDetails() {
    const URL_INVENTORY = "http://localhost:5000/Inventorys";
    const navigate = useNavigate();

    const [inventorys, setInventorys] = useState([]);
    const [resultArray, setResultArray] = useState([]);
    const [inputs, setInputs] = useState({
        totalapple: "", totalorange: "", totalbanana: "", totalgrapes: "", totalwatermelon: "",
        totalmango: "", totalwoodapple: "", totalpineapple: "", totalpapaya: "", totalguava: "",
        shopapple: "", shoporange: "", shopbanana: "", shopgrapes: "", shopwatermelon: "",
        shopmango: "", shopwoodapple: "", shoppineapple: "", shoppapaya: "", shopguava: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (parseFloat(value) < 0) return;
        setInputs(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fetchInventory = async () => {
        try {
            const res = await axios.get(URL_INVENTORY);
            return res.data.Inventorys || [];
        } catch (error) {
            console.error("Error fetching inventory:", error);
            return [];
        }
    };

    useEffect(() => {
        fetchInventory().then((data) => {
            if (Array.isArray(data)) {
                setInventorys(data);
            } else {
                console.error("Expected an array, but got:", data);
            }
        });
    }, []);

    useEffect(() => {
        if (!inventorys || inventorys.length === 0) return;
    
        const today = new Date().toISOString().split("T")[0];
    
        const todaysInventory = inventorys.filter(item =>
            item.createdAt && item.createdAt.startsWith(today)
        );
    
        const groupedData = todaysInventory.reduce((acc, item) => {
            acc[item.pname] = (acc[item.pname] || 0) + item.quantity;
            return acc;
        }, {});

        setResultArray(Object.keys(groupedData).map(pname => ({
            pname,
            totalQuantity: groupedData[pname]
        })));

        // Automatically update input fields with total quantities
        setInputs(prevState => ({
            ...prevState,
            totalapple: groupedData["apple"] || 0,
            totalorange: groupedData["orange"] || 0,
            totalbanana: groupedData["banana"] || 0,
            totalgrapes: groupedData["grapes"] || 0,
            totalwatermelon: groupedData["watermelon"] || 0,
            totalmango: groupedData["mango"] || 0,
            totalwoodapple: groupedData["woodapple"] || 0,
            totalpineapple: groupedData["pineapple"] || 0,
            totalpapaya: groupedData["papaya"] || 0,
            totalguava: groupedData["guava"] || 0
        }));
    }, [inventorys]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/GoodInventorys", inputs);
            navigate("/DisplayShopProductDetails");
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const currentDate = new Date().toLocaleDateString();

    return (
        <Container maxWidth="sm">
            <ByProductNav />
            <Paper elevation={3} style={{ padding: 20, marginTop: 30, borderRadius: 10 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Add Shop Products ({currentDate})
                </Typography>
                
                <Typography variant="h6" style={{ marginBottom: 10 }}>
                    Today's Inventory Summary:
                </Typography>
                

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {[
                            { label: "Total Apple", key: "totalapple" },
                            { label: "Total Orange", key: "totalorange" },
                            { label: "Total Banana", key: "totalbanana" },
                            { label: "Total Grapes", key: "totalgrapes" },
                            { label: "Total Watermelon", key: "totalwatermelon" },
                            { label: "Total Mango", key: "totalmango" },
                            { label: "Total Woodapple", key: "totalwoodapple" },
                            { label: "Total Pineapple", key: "totalpineapple" },
                            { label: "Total Papaya", key: "totalpapaya" },
                            { label: "Total Guava", key: "totalguava" },
                            { label: "Shop Apple", key: "shopapple" },
                            { label: "Shop Orange", key: "shoporange" },
                            { label: "Shop Banana", key: "shopbanana" },
                            { label: "Shop Grapes", key: "shopgrapes" },
                            { label: "Shop Watermelon", key: "shopwatermelon" },
                            { label: "Shop Mango", key: "shopmango" },
                            { label: "Shop Woodapple", key: "shopwoodapple" },
                            { label: "Shop Pineapple", key: "shoppineapple" },
                            { label: "Shop Papaya", key: "shoppapaya" },
                            { label: "Shop Guava", key: "shopguava" }
                        ].map(({ label, key }) => (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    label={label + " (kg)"}
                                    type="number"
                                    name={key}
                                    value={inputs[key]}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        style={{ marginTop: 20 }} 
                        disabled={inventorys.length === 0}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default AddShopProductDetails;
