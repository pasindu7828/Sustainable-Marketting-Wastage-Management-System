import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Box, Button, TextField, Grid, Divider, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';

const CheckoutDialog = ({ open, onClose, cart, total, user, onOrderPlaced, onSuccessClose }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]*$/.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return 'Phone number is required';
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) return 'Please enter a valid 10-digit phone number';
    return '';
  };

  const validateAddress = (address) => {
    if (!address.trim()) return 'Address is required';
    if (address.length < 5) return 'Address must be at least 5 characters';
    return '';
  };

  const validateCardNumber = (number) => {
    if (!number.trim()) return 'Card number is required';
    const cardRegex = /^[0-9]{16}$/;
    if (!cardRegex.test(number)) return 'Please enter a valid 16-digit card number';
    return '';
  };

  const validateExpiry = (expiry) => {
    if (!expiry.trim()) return 'Expiry date is required';
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiry)) return 'Please enter expiry in MM/YY format';
    
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return 'Card has expired';
    }
    return '';
  };

  const validateCVV = (cvv) => {
    if (!cvv.trim()) return 'CVV is required';
    const cvvRegex = /^[0-9]{3,4}$/;
    if (!cvvRegex.test(cvv)) return 'Please enter a valid 3 or 4-digit CVV';
    return '';
  };

  const validateForm = () => {
    const errors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      address: validateAddress(form.address),
      cardNumber: validateCardNumber(card.number),
      expiry: validateExpiry(card.expiry),
      cvv: validateCVV(card.cvv)
    };
    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardChange = e => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
    } else if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setCard(prev => ({ ...prev, [name]: formattedValue }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError('Please correct the errors in the form');
      return;
    }

    setLoading(true);
    try {
      const items = cart.map(item => ({
        name: item.name,
        img: item.img,
        price: item.price,
        quantityKg: item.quantityKg,
        subtotal: item.price * item.quantityKg
      }));
      
      // First place the order
      const res = await axios.post('http://localhost:5000/orders', {
        user: form,
        items,
        total
      });

      // Then update inventory quantities
      for (const item of cart) {
        const productName = item.name.toLowerCase();
        const quantityToDeduct = item.quantityKg;
        
        // Get current inventory
        const inventoryRes = await axios.get('http://localhost:5000/GoodInventorys');
        const latestInventory = inventoryRes.data.GoodInventorys[inventoryRes.data.GoodInventorys.length - 1];
        
        // Calculate new quantity
        const currentQuantity = latestInventory[`shop${productName}`] || 0;
        const newQuantity = Math.max(0, currentQuantity - quantityToDeduct);
        
        // Update inventory
        await axios.put(`http://localhost:5000/GoodInventorys/${latestInventory._id}`, {
          ...latestInventory,
          [`shop${productName}`]: newQuantity
        });
      }

      setOrderData(res.data);
      setSuccess(true);
      if (onOrderPlaced) onOrderPlaced(res.data);
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error('Order error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setError('');
    setSuccess(false);
    setOrderData(null);
    onClose();
  };

  // PDF receipt generation
  const handleDownloadReceipt = () => {
    if (!orderData) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('AgriFlow Order Receipt', 14, 18);
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderData._id || ''}`, 14, 30);
    doc.text(`Date: ${orderData.createdAt ? new Date(orderData.createdAt).toLocaleString() : ''}`, 14, 38);
    doc.text(`Name: ${orderData.user.name}`, 14, 46);
    doc.text(`Email: ${orderData.user.email}`, 14, 54);
    doc.text(`Phone: ${orderData.user.phone}`, 14, 62);
    if (orderData.user.address) doc.text(`Address: ${orderData.user.address}`, 14, 70);
    autoTable(doc, {
      startY: orderData.user.address ? 78 : 70,
      head: [['Product', 'Kg', 'Price', 'Subtotal']],
      body: orderData.items.map(item => [item.name, item.quantityKg, `Rs. ${item.price}`, `Rs. ${item.subtotal}`]),
    });
    doc.text(`Total: Rs. ${orderData.total}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`AgriFlow_Receipt_${orderData._id || ''}.pdf`);
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth PaperProps={{
      sx: {
        borderRadius: 5,
        background: 'rgba(255,255,255,0.92)',
        boxShadow: '0 8px 32px rgba(76,175,80,0.15)',
        backdropFilter: 'blur(10px)',
      }
    }}>
      <DialogTitle sx={{ bgcolor: '#e8f5e9', color: '#388e3c', fontWeight: 700, borderTopLeftRadius: 20, borderTopRightRadius: 20, fontSize: 24, letterSpacing: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <PaymentIcon sx={{ color: '#388e3c', fontSize: 28 }} />
          Checkout
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#388e3c' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0, bgcolor: 'rgba(255,255,255,0.98)' }}>
        {success ? (
          <Box textAlign="center" py={4}>
            <Typography variant="h5" color="success.main" fontWeight={700} mb={2}>
              Order placed successfully!
            </Typography>
            <Typography mb={2}>Thank you for your purchase.</Typography>
            <Button
              variant="outlined"
              color="success"
              sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}
              onClick={handleDownloadReceipt}
            >
              Download Receipt
            </Button>
          </Box>
        ) : (
          <Grid container spacing={0}>
            {/* Left: Order Summary */}
            <Grid item xs={12} md={5} sx={{ bgcolor: '#f1f8e9', p: 0, borderRight: { md: '1px solid #e0e0e0' }, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, display: 'flex', flexDirection: 'column', height: '100%',width:'100%' }}>
              <Box sx={{
                p: 4,
                bgcolor: 'rgba(255,255,255,0.85)',
                borderRadius: 0,
                boxShadow: '0 2px 12px rgba(76,175,80,0.07)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                borderRight: { md: '1px solid #e0e0e0' },
              }}>
                <Typography variant="subtitle2" color="#388e3c" fontWeight={700} mb={1}>
                  Step 2 of 2: Review & Pay
                </Typography>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Order Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box component="table" width="100%" sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                  <Box component="thead">
                    <Box component="tr">
                      <Box component="th" sx={{ textAlign: 'left', color: '#388e3c', fontWeight: 700, fontSize: 15, pb: 1 }}>Product</Box>
                      <Box component="th" sx={{ textAlign: 'center', color: '#388e3c', fontWeight: 700, fontSize: 15, pb: 1 }}>Qty</Box>
                      <Box component="th" sx={{ textAlign: 'right', color: '#388e3c', fontWeight: 700, fontSize: 15, pb: 1 }}>Price</Box>
                      <Box component="th" sx={{ textAlign: 'right', color: '#388e3c', fontWeight: 700, fontSize: 15, pb: 1 }}>Subtotal</Box>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {cart.map((item, idx) => (
                      <Box component="tr" key={idx} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                        <Box component="td" sx={{ py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 32, height: 32, borderRadius: 1, overflow: 'hidden', boxShadow: 1, bgcolor: '#fff', mr: 1 }}>
                            <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </Box>
                          <Typography fontWeight={600} fontSize={15}>{item.name}</Typography>
                        </Box>
                        <Box component="td" sx={{ textAlign: 'center', fontWeight: 500, fontSize: 15 }}>{item.quantityKg} kg</Box>
                        <Box component="td" sx={{ textAlign: 'right', fontWeight: 500, fontSize: 15 }}>Rs. {item.price}</Box>
                        <Box component="td" sx={{ textAlign: 'right', fontWeight: 700, color: '#388e3c', fontSize: 15 }}>Rs. {item.price * item.quantityKg}</Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography fontWeight={600}>Subtotal</Typography>
                  <Typography fontWeight={600}>Rs. {total}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography color="text.secondary">Delivery</Typography>
                  <Typography color="text.secondary">Free</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography fontWeight={700} fontSize={20}>Total</Typography>
                  <Typography fontWeight={700} fontSize={20} color="#388e3c">Rs. {total}</Typography>
                </Box>
                <Box mt={4} display="flex" alignItems="center" gap={1}>
                  <LockIcon sx={{ color: '#388e3c' }} />
                  <Typography variant="caption" color="#388e3c">Secure Payment</Typography>
                </Box>
              </Box>
            </Grid>
            {/* Right: User & Payment Details */}
            <Grid item xs={12} md={7} sx={{ p: 4, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Your Details
              </Typography>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!formErrors.address}
                    helperText={formErrors.address}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight={700} mb={2}>
                Card Details
              </Typography>
              <Grid container spacing={2} mb={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Card Number"
                    name="number"
                    value={card.number.replace(/(\d{4})(?=\d)/g, '$1 ')}
                    onChange={handleCardChange}
                    fullWidth
                    required
                    error={!!formErrors.cardNumber}
                    helperText={formErrors.cardNumber}
                    InputProps={{
                      startAdornment: <CreditCardIcon sx={{ color: '#388e3c', mr: 1 }} />,
                      inputMode: 'numeric',
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Expiry (MM/YY)"
                    name="expiry"
                    value={card.expiry}
                    onChange={handleCardChange}
                    fullWidth
                    required
                    error={!!formErrors.expiry}
                    helperText={formErrors.expiry}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="CVV"
                    name="cvv"
                    value={card.cvv}
                    onChange={handleCardChange}
                    fullWidth
                    required
                    error={!!formErrors.cvv}
                    helperText={formErrors.cvv}
                    type="password"
                  />
                </Grid>
              </Grid>
              {error && <Typography color="error" mb={2}>{error}</Typography>}
              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ borderRadius: 3, fontWeight: 700, fontSize: 18, py: 1.5, mt: 2, boxShadow: '0 2px 8px rgba(76,175,80,0.15)' }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Processing Payment...' : 'Pay & Place Order'}
              </Button>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog; 