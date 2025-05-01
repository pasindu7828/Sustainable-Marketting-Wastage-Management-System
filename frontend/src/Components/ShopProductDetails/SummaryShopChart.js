import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { Typography, Box, CircularProgress, Grid } from "@mui/material";
import ShopNav from "../Nav/ShopNav";

const URL = "http://localhost:5000/GoodInventorys";

const COLORS = [
  "#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336",
  "#00bcd4", "#8bc34a", "#ffc107", "#e91e63", "#3f51b5"
];

const SummaryShopChart = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fruits = [
    "apple", "orange", "banana", "grapes", "watermelon",
    "mango", "woodapple", "pineapple", "papaya", "guava"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        const records = response.data.GoodInventorys || [];

        const totals = {};
        fruits.forEach(fruit => {
          totals[fruit] = 0;
        });

        records.forEach(item => {
          fruits.forEach(fruit => {
            const totalKey = `total${fruit}`;
            totals[fruit] += Number(item[totalKey]) || 0;
          });
        });

        const chartData = fruits.map((fruit, index) => ({
          name: fruit.charAt(0).toUpperCase() + fruit.slice(1),
          quantity: totals[fruit],
          fill: COLORS[index % COLORS.length]
        }));

        setSummaryData(chartData);
      } catch (err) {
        console.error("Error fetching summary chart data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Box textAlign="center" mt={5}><CircularProgress /></Box>;
  }

  return (
    <>
      <ShopNav />
      <Typography variant="h4" align="center" fontWeight="bold" mt={3} mb={2}>
        Shop Product Summary Chart
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center">Total Quantity per Product (Bar Chart)</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={summaryData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#4caf50" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center">Distribution by Product (Pie Chart)</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={summaryData}
                dataKey="quantity"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default SummaryShopChart;
