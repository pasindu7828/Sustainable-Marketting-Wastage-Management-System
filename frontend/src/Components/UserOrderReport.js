import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Button, Grid, Card, CardContent
} from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import axios from 'axios';
import autoTable from 'jspdf-autotable';

const COLORS = ['#388e3c', '#81c784', '#aed581', '#e8f5e9', '#c8e6c9', '#43a047', '#689f38', '#558b2f', '#33691e'];

const glassCard = {
  borderRadius: 4,
  background: 'rgba(255,255,255,0.65)',
  boxShadow: '0 8px 32px 0 rgba(56,142,60,0.10)',
  backdropFilter: 'blur(12px)',
  p: 2,
  mb: 2,
};

const UserOrderReport = () => {
  const [orders, setOrders] = useState([]);
  const [grouped, setGrouped] = useState([]);
  const [search, setSearch] = useState('');
  const reportRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:5000/orders').then(res => {
      setOrders(res.data);
    });
  }, []);

  useEffect(() => {
    // Group orders by user email
    const map = {};
    orders.forEach(order => {
      const email = order.user?.email || 'unknown';
      if (!map[email]) {
        map[email] = {
          user: order.user,
          orders: [],
          totalSpent: 0,
          lastOrder: null,
          productCount: {},
        };
      }
      map[email].orders.push(order);
      map[email].totalSpent += order.total;
      if (!map[email].lastOrder || new Date(order.createdAt) > new Date(map[email].lastOrder.createdAt)) {
        map[email].lastOrder = order;
      }
      // Count products
      order.items.forEach(item => {
        map[email].productCount[item.name] = (map[email].productCount[item.name] || 0) + item.quantityKg;
      });
    });
    setGrouped(Object.values(map));
  }, [orders]);

  // Filtered users
  const filtered = grouped.filter(u => {
    const q = search.toLowerCase();
    return (
      (u.user?.name || '').toLowerCase().includes(q) ||
      (u.user?.email || '').toLowerCase().includes(q)
    );
  });

  // Summary stats
  const totalUsers = filtered.length;
  const totalOrders = filtered.reduce((sum, u) => sum + u.orders.length, 0);
  const totalRevenue = filtered.reduce((sum, u) => sum + u.totalSpent, 0);
  const avgOrderValue = totalOrders ? (totalRevenue / totalOrders) : 0;

  // Table data
  const tableRows = filtered.map(u => {
    const avg = u.orders.length ? (u.totalSpent / u.orders.length) : 0;
    // Top product by quantity
    let topProduct = '-';
    let maxQty = 0;
    Object.entries(u.productCount).forEach(([name, qty]) => {
      if (qty > maxQty) {
        topProduct = name;
        maxQty = qty;
      }
    });
    return {
      name: u.user?.name || '-',
      email: u.user?.email || '-',
      phone: u.user?.phone || '-',
      address: u.user?.address || '-',
      orderCount: u.orders.length,
      totalSpent: u.totalSpent,
      avgOrder: avg,
      lastOrder: u.lastOrder ? new Date(u.lastOrder.createdAt).toLocaleString() : '-',
      topProduct,
    };
  });

  // Chart data
  const barData = tableRows
    .map(u => ({ name: u.name, total: u.totalSpent }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 8);
  const pieData = tableRows.map(u => ({ name: u.name, value: u.orderCount }));

  // Download report as PDF (summary cards + charts + table)
  const handleDownload = async () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(20);
    doc.text('User Report', 40, 40);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 60);

    // Summary
    doc.setFontSize(14);
    doc.text(`Total Users: ${totalUsers}`, 40, 90);
    doc.text(`Total Orders: ${totalOrders}`, 200, 90);
    doc.text(`Total Revenue: Rs. ${totalRevenue.toLocaleString()}`, 40, 110);
    doc.text(`Avg. Order Value: Rs. ${avgOrderValue.toFixed(2)}`, 200, 110);

    // Table
    autoTable(doc, {
      startY: 140,
      head: [[
        'Name', 'Email', 'Order Count', 'Total Spent', 'Avg Order Value', 'Last Order', 'Top Product'
      ]],
      body: tableRows.map(row => [
        row.name,
        row.email,
        row.orderCount,
        `Rs. ${row.totalSpent.toLocaleString()}`,
        `Rs. ${row.avgOrder.toFixed(2)}`,
        row.lastOrder,
        row.topProduct
      ]),
      styles: { fontSize: 10, cellPadding: 4 },
      headStyles: { fillColor: [56, 142, 60] }
    });

    // Optionally add chart images (as before)
    const chart1 = document.getElementById('bar-chart');
    const chart2 = document.getElementById('pie-chart');
    if (chart1 && chart2) {
      const chart1Canvas = await html2canvas(chart1);
      const chart2Canvas = await html2canvas(chart2);
      doc.addPage();
      doc.text('Top Users by Total Spent', 40, 40);
      doc.addImage(chart1Canvas.toDataURL('image/png'), 'PNG', 40, 60, 520, 220);
      doc.text('Order Count per User', 40, 320);
      doc.addImage(chart2Canvas.toDataURL('image/png'), 'PNG', 40, 340, 320, 220);
    }
    doc.save('user_report.pdf');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #fffde4 100%)',
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography variant="h4" fontWeight={700} color="#388e3c" mb={3} sx={{ letterSpacing: 1, textShadow: '0 2px 8px rgba(56,142,60,0.08)' }}>
        User Report
      </Typography>
      {/* Summary Cards */}
      <Grid id="summary-cards" container spacing={3} sx={{ mb: 4, width: '100%', maxWidth: 1100 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...glassCard, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Total Users</Typography>
              <Typography variant="h5" color="#388e3c" fontWeight={700}>{totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...glassCard, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Total Orders</Typography>
              <Typography variant="h5" color="#388e3c" fontWeight={700}>{totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...glassCard, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Total Revenue</Typography>
              <Typography variant="h5" color="#388e3c" fontWeight={700}>Rs. {totalRevenue.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ ...glassCard, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary">Avg. Order Value</Typography>
              <Typography variant="h5" color="#388e3c" fontWeight={700}>Rs. {avgOrderValue.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
          label="Search users"
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
        <Button onClick={handleDownload} variant="contained" color="success" sx={{ ml: 2, borderRadius: 3, fontWeight: 700 }}>
          Download Report
        </Button>
      </Box>
      {/* Charts */}
      <Box sx={{ width: '100%', maxWidth: 1100, display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Paper id="bar-chart" elevation={0} sx={{ flex: 1, minWidth: 320, maxWidth: 500, p: 3, borderRadius: 4, background: 'rgba(255,255,255,0.8)', boxShadow: '0 8px 32px 0 rgba(56,142,60,0.13)', backdropFilter: 'blur(14px)' }}>
          <Typography fontWeight={700} color="#388e3c" mb={2} fontSize={18}>Top Users by Total Spent</Typography>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={140} tick={{ fill: '#388e3c', fontWeight: 700, fontSize: 15 }} />
              <Tooltip />
              <Bar dataKey="total" fill="#388e3c" radius={[10, 10, 10, 10]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper id="pie-chart" elevation={0} sx={{ flex: 1, minWidth: 320, maxWidth: 400, p: 3, borderRadius: 4, background: 'rgba(255,255,255,0.8)', boxShadow: '0 8px 32px 0 rgba(56,142,60,0.13)', backdropFilter: 'blur(14px)' }}>
          <Typography fontWeight={700} color="#388e3c" mb={2} fontSize={18}>Order Count per User</Typography>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
      {/* User Table */}
      <Paper elevation={0} sx={{
        borderRadius: 4,
        width: '100%',
        maxWidth: 1100,
        background: 'rgba(255,255,255,0.75)',
        boxShadow: '0 8px 32px 0 rgba(56,142,60,0.13)',
        backdropFilter: 'blur(14px)',
        p: 2,
        mb: 4,
      }}>
        <Box ref={reportRef}>
          <Table>
            <TableHead sx={{ bgcolor: 'rgba(232,248,127,0.7)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c' }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c' }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c' }}>Order Count</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c' }}>Total Spent</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c' }}>Avg Order Value</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c' }}>Last Order Date</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#388e3c' }}>Top Product</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows.map((row, idx) => (
                <TableRow key={row.email || idx} hover sx={{ transition: 'background 0.2s', '&:hover': { background: 'rgba(76,175,80,0.08)' } }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.orderCount}</TableCell>
                  <TableCell>Rs. {row.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>Rs. {row.avgOrder.toFixed(2)}</TableCell>
                  <TableCell>{row.lastOrder}</TableCell>
                  <TableCell>{row.topProduct}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserOrderReport; 