import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

const inventoryURL = "http://localhost:5000/GoodInventorys";
const shopURL = "http://localhost:5000/ShopPrices";
const farmerURL = "http://localhost:5000/FarmerPrices";

function DailyFinance() {
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all required data in parallel
        const [inventoryRes, shopRes, farmerRes] = await Promise.all([
          axios.get(inventoryURL),
          axios.get(shopURL),
          axios.get(farmerURL),
        ]);

        const inventory = inventoryRes.data.GoodInventorys || [];
        const shopPrices = shopRes.data?.ShopPrices?.[0] || {};
        const farmerPrices = farmerRes.data?.FarmerPrices?.[0] || {};

        // Process the data to calculate expected profit
        const processedData = inventory.reduce((acc, item) => {
          if (!item?.createdAt) return acc;
          
          const date = item.createdAt.split("T")[0];
          if (!acc[date]) {
            acc[date] = {
              date,
              expectedIncome: 0,
              expectedExpenses: 0,
              expectedProfit: 0,
              details: {}
            };
          }

          const fruits = [
            "apple", "orange", "banana", "grapes", "watermelon",
            "mango", "woodapple", "pineapple", "papaya", "guava"
          ];

          fruits.forEach(fruit => {
            const shopQty = Number(item[`shop${fruit}`]) || 0;
            const totalQty = Number(item[`total${fruit}`]) || 0;
            
            const shopPriceKey = `sp${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`;
            const farmerPriceKey = `fp${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`;
            
            const shopPrice = Number(shopPrices[shopPriceKey]) || 0;
            const farmerPrice = Number(farmerPrices[farmerPriceKey]) || 0;

            // Calculate values for this fruit
            const income = shopQty * shopPrice;
            const expenses = shopQty * farmerPrice;
            const profit = income - expenses;

            // Accumulate totals
            acc[date].expectedIncome += income;
            acc[date].expectedExpenses += expenses;
            acc[date].expectedProfit += profit;

            // Store details per fruit (optional)
            acc[date].details[fruit] = {
              shopQty,
              shopPrice,
              farmerPrice,
              income,
              expenses,
              profit
            };
          });

          return acc;
        }, {});

        // Convert to array and sort by date
        const sortedData = Object.values(processedData)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map(item => ({
            ...item,
            expectedIncome: Number(item.expectedIncome.toFixed(2)),
            expectedExpenses: Number(item.expectedExpenses.toFixed(2)),
            expectedProfit: Number(item.expectedProfit.toFixed(2))
          }));

        setFinanceData(sortedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load financial data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh'
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: "bold", 
          mb: 3,
          color: "primary.main"
        }}
      >
        Daily Financial Summary
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => navigate("/totalShopPrices")}
        >
          View Shop Prices
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => navigate("/totalFarmerPrices")}
        >
          View Farmer Payments
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Expected Income (Rs.)</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Expected Expenses (Rs.)</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Expected Profit (Rs.)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financeData.length > 0 ? (
              financeData.map((row) => (
                <TableRow key={row.date}>
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {row.date}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    {row.expectedIncome.toLocaleString()}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    {row.expectedExpenses.toLocaleString()}
                  </TableCell>
                  <TableCell 
                    sx={{ 
                      textAlign: "right",
                      fontWeight: "bold",
                      color: row.expectedProfit >= 0 ? "success.main" : "error.main"
                    }}
                  >
                    {row.expectedProfit.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                  No financial data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DailyFinance;