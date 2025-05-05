import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Typography, Box, Button, TextField, Divider, Grid, Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckoutDialog from './CheckoutDialog';

const CartPopup = ({ open, onClose, cart, setCart, onCheckout, user }) => {
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);

  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantityKg), 0);

  // Handle kg change
  const handleKgChange = (idx, value) => {
    if (value < 1 || value > cart[idx].maxKg) return;
    const newCart = [...cart];
    newCart[idx].quantityKg = value;
    setCart(newCart);
  };

  // Remove item
  const handleRemove = (idx) => {
    const newCart = cart.filter((_, i) => i !== idx);
    setCart(newCart);
  };

  // After successful order, clear cart (do not close dialogs)
  const handleOrderPlaced = () => {
    setCart([]);
  };

  // Close both dialogs after success
  const handleSuccessClose = () => {
    setCheckoutOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#e8f5e9', color: '#388e3c', fontWeight: 700 }}>
          Your Cart
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: '#388e3c' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          {cart.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">Your cart is empty.</Typography>
            </Box>
          ) : (
            <Box>
              {cart.map((item, idx) => (
                <Box key={item.name} sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={2}>
                      <Box sx={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', boxShadow: 2, bgcolor: '#fff' }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography fontWeight={600} color="#388e3c">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">Rs. {item.price} / kg</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        type="number"
                        size="small"
                        label="Kg"
                        value={item.quantityKg}
                        onChange={e => handleKgChange(idx, Math.max(1, Math.min(item.maxKg, Number(e.target.value))))}
                        inputProps={{ min: 1, max: item.maxKg, style: { width: 60 } }}
                        sx={{ width: 80 }}
                      />
                      <Typography variant="caption" color="text.secondary">Max: {item.maxKg}kg</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography fontWeight={600} color="#222">Rs. {item.price * item.quantityKg}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton color="error" onClick={() => handleRemove(idx)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', bgcolor: '#f1f8e9', p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography fontWeight={700} color="#388e3c">Total</Typography>
            <Typography fontWeight={700} color="#388e3c">Rs. {total}</Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            size="large"
            fullWidth
            sx={{ borderRadius: 3, fontWeight: 700, fontSize: 18, py: 1.5 }}
            disabled={cart.length === 0}
            onClick={() => setCheckoutOpen(true)}
          >
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        total={total}
        user={user}
        onOrderPlaced={handleOrderPlaced}
        onSuccessClose={handleSuccessClose}
      />
    </>
  );
};

export default CartPopup; 