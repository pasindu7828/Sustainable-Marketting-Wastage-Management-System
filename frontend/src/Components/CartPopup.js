import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Typography, Box, Button, TextField, Divider, Grid, Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckoutDialog from './CheckoutDialog';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartPopup = ({ open, onClose, cart, setCart, onCheckout, user }) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quantityErrors, setQuantityErrors] = useState({});

  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantityKg), 0);

  // Validate quantity
  const validateQuantity = (value, maxKg) => {
    if (!value) return 'Quantity is required';
    if (isNaN(value)) return 'Please enter a valid number';
    if (value < 0.1) return 'Minimum quantity is 0.1 kg';
    if (value > maxKg) return `Maximum quantity is ${maxKg} kg`;
    return '';
  };

  // Handle kg change
  const handleKgChange = (idx, value) => {
    const item = cart[idx];
    const error = validateQuantity(value, item.maxKg);
    
    if (error) {
      setQuantityErrors(prev => ({ ...prev, [idx]: error }));
      return;
    }

    const newCart = [...cart];
    newCart[idx].quantityKg = parseFloat(value);
    setCart(newCart);
    setQuantityErrors(prev => ({ ...prev, [idx]: '' }));
  };

  // Remove item
  const handleRemove = (idx) => {
    const newCart = cart.filter((_, i) => i !== idx);
    setCart(newCart);
    setQuantityErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[idx];
      return newErrors;
    });
  };

  // Check if cart is valid
  const isCartValid = () => {
    return cart.every((item, idx) => !validateQuantity(item.quantityKg, item.maxKg));
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!isCartValid()) {
      return;
    }
    setCheckoutOpen(true);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{
        sx: {
          borderRadius: 5,
          background: 'rgba(255,255,255,0.85)',
          boxShadow: '0 8px 32px rgba(76,175,80,0.15)',
          backdropFilter: 'blur(10px)',
        }
      }}>
        <DialogTitle sx={{ bgcolor: '#e8f5e9', color: '#388e3c', fontWeight: 700, borderTopLeftRadius: 20, borderTopRightRadius: 20, fontSize: 24, letterSpacing: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <ShoppingCartIcon sx={{ color: '#388e3c', fontSize: 28 }} />
            Your Cart
          </Box>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: '#388e3c' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0, bgcolor: 'rgba(255,255,255,0.95)' }}>
          {cart.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">Your cart is empty.</Typography>
            </Box>
          ) : (
            <Box>
              {cart.map((item, idx) => (
                <Box key={item.name} sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 64, height: 64, borderRadius: 3, overflow: 'hidden', boxShadow: 2, bgcolor: '#fff', flexShrink: 0 }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography fontWeight={700} color="#388e3c">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Rs. {item.price} / kg</Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <TextField
                        type="number"
                        size="small"
                        label="Kg"
                        value={item.quantityKg}
                        onChange={e => handleKgChange(idx, e.target.value)}
                        inputProps={{ min: 0.1, max: item.maxKg, step: 0.1 }}
                        error={!!quantityErrors[idx]}
                        helperText={quantityErrors[idx]}
                        sx={{ width: 80 }}
                      />
                      <Typography variant="caption" color="text.secondary">Max: {item.maxKg}kg</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ minWidth: 80, textAlign: 'right' }}>
                    <Typography fontWeight={600} color="#222">Rs. {item.price * item.quantityKg}</Typography>
                  </Box>
                  <IconButton color="error" onClick={() => handleRemove(idx)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', bgcolor: '#f1f8e9', p: 3, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography fontWeight={700} color="#388e3c">Subtotal</Typography>
            <Typography fontWeight={700} color="#388e3c">Rs. {total}</Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            sx={{ borderRadius: 3, fontWeight: 700, fontSize: 18, py: 1.5, boxShadow: '0 2px 8px rgba(76,175,80,0.15)' }}
            disabled={cart.length === 0 || !isCartValid()}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </DialogActions>
      </Dialog>
      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        total={total}
        user={user}
        onOrderPlaced={() => {
          setCart([]);
          setQuantityErrors({});
          onClose();
        }}
      />
    </>
  );
};

export default CartPopup; 