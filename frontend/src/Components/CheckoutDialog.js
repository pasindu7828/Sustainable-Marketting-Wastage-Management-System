import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Box, Button, TextField, Grid, Divider, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCardChange = e => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.name || !form.email || !form.phone) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!card.number || !card.expiry || !card.cvv) {
      setError('Please enter all card details.');
      return;
    }
    if (card.number.length < 12 || card.number.length > 19 || !/^[0-9]+$/.test(card.number)) {
      setError('Invalid card number.');
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
      setError('Expiry must be MM/YY.');
      return;
    }
    if (card.cvv.length < 3 || card.cvv.length > 4 || !/^[0-9]+$/.test(card.cvv)) {
      setError('Invalid CVV.');
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
    <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#e8f5e9', color: '#388e3c', fontWeight: 700 }}>
        Checkout
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: '#388e3c' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
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
          <>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Order Summary
            </Typography>
            <Box mb={2}>
              {cart.map((item, idx) => (
                <Grid container key={idx} spacing={1} alignItems="center">
                  <Grid item xs={6}><Typography>{item.name}</Typography></Grid>
                  <Grid item xs={3}><Typography>{item.quantityKg} kg</Typography></Grid>
                  <Grid item xs={3}><Typography>Rs. {item.price * item.quantityKg}</Typography></Grid>
                </Grid>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={700}>Total</Typography>
                <Typography fontWeight={700}>Rs. {total}</Typography>
              </Box>
            </Box>
            <Typography variant="h6" fontWeight={600} mb={2}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" fontWeight={600} mb={2}>
              Card Details
            </Typography>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Card Number"
                  name="number"
                  value={card.number}
                  onChange={handleCardChange}
                  fullWidth
                  required
                  inputProps={{ maxLength: 19 }}
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
                  inputProps={{ maxLength: 5 }}
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
                  inputProps={{ maxLength: 4 }}
                />
              </Grid>
            </Grid>
            {error && <Typography color="error" mb={2}>{error}</Typography>}
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ bgcolor: '#f1f8e9', p: 3 }}>
        {success ? (
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ borderRadius: 3, fontWeight: 700, fontSize: 18, py: 1.5 }}
            onClick={handleDialogClose}
          >
            Close
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ borderRadius: 3, fontWeight: 700, fontSize: 18, py: 1.5 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Processing Payment...' : 'Pay & Place Order'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CheckoutDialog; 