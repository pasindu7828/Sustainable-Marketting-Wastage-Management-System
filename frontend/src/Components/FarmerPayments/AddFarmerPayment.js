import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Grid,
  Box,
  InputAdornment,
  Divider,
  CircularProgress
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FarmerPayment from '../Nav/FarmerPayment';
import { styled } from '@mui/material/styles';
import { AttachMoney, Person, Numbers, Email, Phone, Receipt } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
  background: 'linear-gradient(to bottom right, #ffffff, #f9f9f9)'
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(3),
  borderRadius: 12,
  fontWeight: 600,
  letterSpacing: 0.5,
  textTransform: 'none',
  fontSize: '1rem'
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  color: theme.palette.text.secondary
}));

function AddFarmerPayment() {
    const location = useLocation();
    const id = location.state?.id;
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        fid: "", 
        fname: "", 
        pname: "", 
        quantity: "", 
        billno: "",
        date: new Date().toISOString().split("T")[0], 
        amount: "",
        femail: "", 
        fnumber: ""
    });

    const [errors, setErrors] = useState({});

    const fetchInventoryData = async (id) => {
        try {
            setLoading(true);
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
                fetchPrices(data.pname);
                
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    

    const fetchPrices = async (pname) => {
        if (!pname) {
            console.error("Product name is missing");
            return;
        }
    
        const formattedProduct = `fp${pname.charAt(0).toUpperCase()}${pname.slice(1)}`;
        const URL = `http://localhost:5000/FarmerPrices/${formattedProduct}`;
    
        try {
            const response = await axios.get(URL);
            const data = response.data;
    
            if (data && data.price !== undefined) {
                console.log("Price:", data.price);
                setPrice(data.price);
            } else {
                console.warn("Price not found in response:", data);
            }
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

        if (errors.femail || errors.fnumber) {
            return;
        }

        try {
            setLoading(true);
            await axios.post("http://localhost:5000/Farmers", inputs);
            navigate('/displayFarmerPayment');
        } catch (error) {
            console.error("Error submitting data:", error);
        } finally {
            setLoading(false);
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

    const fieldIcons = {
        fid: <Person color="action" />,
        fname: <Person color="action" />,
        pname: <Receipt color="action" />,
        quantity: <Numbers color="action" />,
        billno: <Receipt color="action" />,
        amount: <AttachMoney color="action" />,
        femail: <Email color="action" />,
        fnumber: <Phone color="action" />
    };

    return (
        <Container maxWidth="md">
            <FarmerPayment />
            <StyledPaper>
                <Box mb={4}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                        Farmer Payment Processing
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary">
                        Complete the payment details for farmer transactions
                    </Typography>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                {loading ? (
                    <Box display="flex" justifyContent="center" py={6}>
                        <CircularProgress size={60} />
                    </Box>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {Object.keys(inputs).map((key) => (
                                <Grid item xs={12} sm={key === 'femail' || key === 'fnumber' ? 6 : 12} key={key}>
                                    <FieldLabel variant="body2">
                                        {key.replace(/f|p/, '').toUpperCase()}
                                    </FieldLabel>
                                    <TextField
                                        type={["amount", "quantity", "billno", "fid"].includes(key) ? "number" : "text"}
                                        name={key}
                                        value={inputs[key]}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        variant="outlined"
                                        disabled={key === "amount" || key === "fid" || key === "fname" || key === "quantity" || key === "pname"}
                                        error={!!errors[key]}
                                        helperText={errors[key]}
                                        size="medium"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {fieldIcons[key]}
                                                </InputAdornment>
                                            ),
                                            style: { borderRadius: 12 }
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: '#e0e0e0',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'primary.main',
                                                },
                                            }
                                        }}
                                    />
                                </Grid>
                            ))}
                            
                            
                        </Grid>
                        
                        <Box display="flex" justifyContent="flex-end" mt={4}>
                            <SubmitButton 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                                size="large"
                                disabled={loading}
                                sx={{
                                    maxWidth: 300,
                                    bgcolor: 'primary.main',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {loading ? 'Processing...' : 'Complete Payment'}
                            </SubmitButton>
                        </Box>
                    </form>
                )}
            </StyledPaper>
        </Container>
    );
}

export default AddFarmerPayment;