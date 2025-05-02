import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const inventoryURL = "http://localhost:5000/GoodInventorys";
const farmerURL = "http://localhost:5000/FarmerPrices";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FD0",
  "#EF7C8E", "#2C73D2", "#FFC75F", "#62B6CB", "#BDB2FF"
];

const fruits = [
  "apple", "orange", "banana", "grapes", "watermelon",
  "mango", "woodapple", "pineapple", "papaya", "guava",
];

function FarmerPaymentAnalysis() {
  const [paymentData, setPaymentData] = useState([]);
  const [farmerPrices, setFarmerPrices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inventoryRes, priceRes] = await Promise.all([
          axios.get(inventoryURL),
          axios.get(farmerURL),
        ]);

        const inventory = inventoryRes.data.GoodInventorys || [];
        const prices = priceRes.data?.FarmerPrices?.[0] || {};
        setFarmerPrices(prices);

        const grouped = inventory.reduce((acc, item) => {
          const date = item.createdAt?.split("T")[0];
          if (!date) return acc;

          if (!acc[date]) acc[date] = 0;

          fruits.forEach((fruit) => {
            const qty = Number(item[`shop${fruit}`]) || 0;
            const price = Number(prices[`fp${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`]) || 0;
            acc[date] += qty * price;
          });

          return acc;
        }, {});

        const formattedData = Object.entries(grouped).map(([date, total]) => ({
          date,
          total: Number(total.toFixed(2)),
        }));

        setPaymentData(formattedData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#2c3e50" }}
      >
        Farmer Payment Analysis
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Grid
        container
        justifyContent="center"
        spacing={4}
      >
        <Grid item xs={12} md={5}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, backgroundColor: "#ffffff" }}>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ fontWeight: "600", color: "#2c3e50" }}
            >
              Bar Chart - Total Payments by Date
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={paymentData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `Rs. ${value}`} />
                <Legend />
                <Bar dataKey="total" fill="#2c3e50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3, backgroundColor: "#ffffff" }}>
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ fontWeight: "600", color: "#2c3e50" }}
            >
              Pie Chart - Proportional Payments
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentData}
                  dataKey="total"
                  nameKey="date"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                >
                  {paymentData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rs. ${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FarmerPaymentAnalysis;
