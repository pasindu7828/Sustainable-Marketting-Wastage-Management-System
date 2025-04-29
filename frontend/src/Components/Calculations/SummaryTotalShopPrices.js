import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Box, Button, TextField
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const inventoryURL = "http://localhost:5000/GoodInventorys";
const shopURL = "http://localhost:5000/ShopPrices";

const fruits = [
  "apple", "orange", "banana", "grapes", "watermelon",
  "mango", "woodapple", "pineapple", "papaya", "guava"
];

function SummaryTotalShopPrices() {
  const [summaryData, setSummaryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryRes = await axios.get(inventoryURL);
        const priceRes = await axios.get(shopURL);
        const inventory = inventoryRes.data.GoodInventorys || [];
        const shopPrices = priceRes.data.ShopPrices?.[0] || {};

        const grouped = {};

        inventory.forEach(item => {
          if (!item?.createdAt) return;
          const date = item.createdAt.split("T")[0];

          if (!grouped[date]) grouped[date] = 0;

          fruits.forEach(fruit => {
            const qty = Number(item[`shop${fruit}`]) || 0;
            const price = shopPrices[`sp${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`] || 0;
            grouped[date] += qty * price;
          });
        });

        const result = Object.entries(grouped).map(([date, total]) => ({
          date,
          total: total.toFixed(2),
        }));

        setSummaryData(result);
        setFilteredData(result);
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByDate = () => {
    const filtered = summaryData.filter(entry => {
      return (!startDate || entry.date >= startDate) && (!endDate || entry.date <= endDate);
    });
    setFilteredData(filtered);
  };

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Summary");
    XLSX.writeFile(wb, "ShopSummary.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Daily Shop Total Summary", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["Date", "Total Shop Price (Rs.)"]],
      body: filteredData.map(row => [row.date, row.total]),
    });
    doc.save("ShopSummary.pdf");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
        Daily Shop Total Summary
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
        <Button variant="contained" onClick={filterByDate}>Filter</Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Total Shop Price (Rs.)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map(row => (
              <TableRow key={row.date}>
                <TableCell sx={{ textAlign: "center" }}>{row.date}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData} margin={{ top: 20, right: 30, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>

      {/* Export Buttons */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="outlined" onClick={exportCSV}>Download CSV</Button>
        <Button variant="outlined" onClick={exportPDF}>Download PDF</Button>
      </Box>
    </Box>
  );
}

export default SummaryTotalShopPrices;
