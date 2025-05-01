import React, { useEffect, useState } from "react";
import ByProductNav from "../Nav/ShopPriceNav";
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
} from "@mui/material";

const inventoryURL = "http://localhost:5000/GoodInventorys";
const farmerURL = "http://localhost:5000/FarmerPrices";

const fetchInventory = async () => {
  try {
    const response = await axios.get(inventoryURL);
    return response.data.GoodInventorys || [];
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
};

const fetchFarmerPrices = async () => {
  try {
    const res = await axios.get(farmerURL);
    return res.data;
  } catch (err) {
    console.error("Error fetching farmer prices:", err);
    return [];
  }
};

function TotalFarmerPrices() {
  const [groupedByDate, setGroupedByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [farmerPrices, setFarmerPrices] = useState([]);

  useEffect(() => {
    fetchFarmerPrices().then((data) => {
      setFarmerPrices(data.FarmerPrices || []);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchInventory();

        if (Array.isArray(data)) {
          const groupedData = data.reduce((acc, item) => {
            if (!item?.createdAt) return acc;
            const date = item.createdAt.split("T")[0];
            if (!acc[date]) {
              acc[date] = {
                shop: {
                  apple: 0,
                  orange: 0,
                  banana: 0,
                  grapes: 0,
                  watermelon: 0,
                  mango: 0,
                  woodapple: 0,
                  pineapple: 0,
                  papaya: 0,
                  guava: 0,
                },
              };
            }

            Object.keys(acc[date].shop).forEach((fruit) => {
              acc[date].shop[fruit] += Number(item[`shop${fruit}`]) || 0;
            });

            return acc;
          }, {});
          setGroupedByDate(groupedData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!Object.keys(groupedByDate).length) return <div>No data available</div>;

  const fruits = [
    "apple",
    "orange",
    "banana",
    "grapes",
    "watermelon",
    "mango",
    "woodapple",
    "pineapple",
    "papaya",
    "guava",
  ];

  return (
    <div>
      <ByProductNav />

      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", mt: 2, color: "#2c3e50" }}
      >
        Farmer Payments (Shop Quantity × Farmer Price)
      </Typography>

      <div style={{ overflowX: "auto" }}>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }} rowSpan={2}>
                  Date
                </TableCell>
                {fruits.map((fruit) => (
                  <TableCell key={fruit} colSpan={2} sx={{ fontWeight: "bold", textAlign: "center" }}>
                    {fruit.charAt(0).toUpperCase() + fruit.slice(1)}
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }} rowSpan={2}>
                  Total
                </TableCell>
              </TableRow>
              <TableRow>
                {fruits.map((_, i) => (
                  <React.Fragment key={i}>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#f5f5f5" }}>
                      Qty × Price
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#f5f5f5" }}>
                      Total
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(groupedByDate).map(([date, data]) => (
                <TableRow key={date}>
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>{date}</TableCell>
                  {fruits.map((fruit, i) => {
                    const qty = data.shop[fruit] || 0;
                    const price =
                      farmerPrices?.[0]?.[`fp${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`] || 0;
                    const total = qty * price;
                    return (
                      <React.Fragment key={i}>
                        <TableCell sx={{ textAlign: "center" }}>{`${qty} × ${price}`}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>{total}</TableCell>
                      </React.Fragment>
                    );
                  })}
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {fruits.reduce((acc, fruit) => {
                      const qty = data.shop[fruit] || 0;
                      const price =
                        farmerPrices?.[0]?.[`fp${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`] || 0;
                      return acc + qty * price;
                    }, 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default TotalFarmerPrices;
