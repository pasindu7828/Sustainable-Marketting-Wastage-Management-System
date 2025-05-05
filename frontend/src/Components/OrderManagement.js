import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Chip, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/orders');
      setOrders(res.data);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleView = (order) => {
    setSelectedOrder(order);
    setViewOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await axios.delete(`http://localhost:5000/orders/${deleteId}`);
    setDeleteOpen(false);
    setDeleteId(null);
    fetchOrders();
  };

  const handleMarkPaid = async (order) => {
    await axios.patch(`http://localhost:5000/orders/${order._id}/status`, { status: 'Paid' });
    fetchOrders();
  };

  const filteredOrders = orders.filter(order => {
    const q = search.toLowerCase();
    return (
      order._id.toLowerCase().includes(q) ||
      (order.user?.name || '').toLowerCase().includes(q) ||
      (order.user?.email || '').toLowerCase().includes(q)
    );
  });

  return (
    <Box p={3} sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #fffde4 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Typography variant="h4" fontWeight={700} color="#388e3c" mb={3} sx={{
        letterSpacing: 1,
        textShadow: '0 2px 8px rgba(56,142,60,0.08)'
      }}>
        Order Management
      </Typography>
      <Box mb={2} sx={{
        width: '100%',
        maxWidth: 700,
        borderRadius: 4,
        background: 'rgba(255,255,255,0.55)',
        boxShadow: '0 8px 32px 0 rgba(56,142,60,0.10)',
        backdropFilter: 'blur(12px)',
        p: 2,
        display: 'flex',
        alignItems: 'center',
      }}>
        <TextField
          label="Search orders"
          variant="outlined"
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
          sx={{
            background: 'rgba(255,255,255,0.7)',
            borderRadius: 2,
            input: { color: '#222' },
          }}
        />
      </Box>
      <Paper elevation={0} sx={{
        borderRadius: 4,
        width: '100%',
        maxWidth: 1100,
        background: 'rgba(255,255,255,0.65)',
        boxShadow: '0 8px 32px 0 rgba(56,142,60,0.10)',
        backdropFilter: 'blur(12px)',
        p: 2,
        mb: 4,
      }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'rgba(232,248,127,0.7)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c', letterSpacing: 1 }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c', letterSpacing: 1 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c', letterSpacing: 1 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c', letterSpacing: 1 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c', letterSpacing: 1 }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c', letterSpacing: 1 }}>Items</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c', letterSpacing: 1 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c', letterSpacing: 1 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order._id} hover sx={{
                  transition: 'background 0.2s',
                  '&:hover': {
                    background: 'rgba(76,175,80,0.08)',
                  },
                }}>
                  <TableCell>{order._id.slice(-6)}</TableCell>
                  <TableCell>{order.user?.name || '-'}</TableCell>
                  <TableCell>{order.user?.email || '-'}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  <TableCell>Rs. {order.total}</TableCell>
                  <TableCell>
                    <Box>
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, idx) => (
                          <Box key={item._id || idx} sx={{
                            mb: 0.5,
                            p: 1,
                            borderRadius: 2,
                            bgcolor: 'rgba(232,248,127,0.18)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                          }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#388e3c' }}>{item.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Qty: {item.quantityKg} | Price: Rs. {item.price} | Subtotal: Rs. {item.subtotal}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="caption" color="text.secondary">-</Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={order.status || 'Paid'} color={order.status === 'Paid' ? 'success' : 'success'} size="small" />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details"><IconButton color="success" onClick={() => handleView(order)}><VisibilityIcon /></IconButton></Tooltip>
                    {/* <Tooltip title="Mark as Paid"><IconButton color="primary" onClick={() => handleMarkPaid(order)} disabled={order.status === 'Paid'}><CheckCircleIcon /></IconButton></Tooltip> */}
                    <Tooltip title="Delete"><IconButton color="error" onClick={() => { setDeleteId(order._id); setDeleteOpen(true); }}><DeleteIcon /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* View Order Dialog */}
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255,255,255,0.75)',
            boxShadow: '0 8px 32px 0 rgba(56,142,60,0.15)',
            backdropFilter: 'blur(16px)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#388e3c', fontWeight: 700, letterSpacing: 1 }}>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Typography fontWeight={600} color="#388e3c">User: {selectedOrder.user?.name || '-'}</Typography>
              <Typography>Email: {selectedOrder.user?.email || '-'}</Typography>
              <Typography>Phone: {selectedOrder.user?.phone || '-'}</Typography>
              <Typography>Address: {selectedOrder.user?.address || '-'}</Typography>
              <Typography>Date: {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
              <Typography fontWeight={600} mt={2} color="#388e3c">Items:</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Kg</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantityKg}</TableCell>
                      <TableCell>Rs. {item.price}</TableCell>
                      <TableCell>Rs. {item.subtotal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography fontWeight={700} mt={2} color="#388e3c">Total: Rs. {selectedOrder.total}</Typography>
              <Typography>Status: <Chip label={selectedOrder.status || 'Paid'} color={selectedOrder.status === 'Paid' ? 'success' : 'success'} size="small" /></Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewOpen(false)} color="success" variant="contained" sx={{ borderRadius: 3, fontWeight: 600 }}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 8px 32px 0 rgba(56,142,60,0.10)',
            backdropFilter: 'blur(12px)',
          }
        }}
      >
        <DialogTitle sx={{ color: '#d32f2f', fontWeight: 700 }}>Delete Order?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} sx={{ borderRadius: 3 }}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained" sx={{ borderRadius: 3, fontWeight: 600 }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderManagement; 