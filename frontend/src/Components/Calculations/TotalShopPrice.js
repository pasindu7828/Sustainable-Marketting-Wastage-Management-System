import React, { useEffect, useState } from "react";
import ByProductNav from "../Nav/ShopNav";
import axios from "axios";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/GoodInventorys";
const shopURL = "http://localhost:5000/ShopPrices";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.GoodInventorys || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchShopPrices = async () => {
  try {
    const res = await axios.get(shopURL);
    return res.data;
  } catch (err) {
    console.error("Error fetching shop prices:", err);
    return [];
  }
};

function TotalShopPrices() {
  const [goodInventorys, setGoodInventorys] = useState([]);
  const [groupedByDate, setGroupedByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ShopPrices, setShopPrices] = useState([]);
  
  const navigate = useNavigate(); // Initialize the navigation hook

  useEffect(() => {
    fetchShopPrices().then((data) => {
      setShopPrices(data.ShopPrices || []);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchHandler();

        if (Array.isArray(data)) {
          const groupedData = data.reduce((acc, item) => {
            if (!item || !item.createdAt) return acc;
            const date = item.createdAt.split("T")[0];
            if (!acc[date]) {
              acc[date] = {
                shop: {
                  apple: 0, orange: 0, banana: 0, grapes: 0, watermelon: 0,
                  mango: 0, woodapple: 0, pineapple: 0, papaya: 0, guava: 0,
                },
                total: {
                  apple: 0, orange: 0, banana: 0, grapes: 0, watermelon: 0,
                  mango: 0, woodapple: 0, pineapple: 0, papaya: 0, guava: 0,
                },
                ids: [],
              };
            }

            Object.keys(acc[date].shop).forEach(fruit => {
              acc[date].shop[fruit] += Number(item[`shop${fruit}`]) || 0;
              acc[date].total[fruit] += Number(item[`total${fruit}`]) || 0;
            });

            if (item._id) acc[date].ids.push(item._id);

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

  const fruits = ['apple', 'orange', 'banana', 'grapes', 'watermelon', 'mango', 'woodapple', 'pineapple', 'papaya', 'guava'];

  return (
    <div>
      <ByProductNav />
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", mt: 2, color: "#2c3e50" }}
      >
        Shop Product Details Display
      </Typography>

      <div style={{ overflowX: "auto" }}>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table stickyHeader sx={{ tableLayout: "auto", minWidth: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "auto" }} rowSpan={2}>
                  Date
                </TableCell>
                {fruits.map((fruit) => (
                  <TableCell key={fruit} sx={{ fontWeight: "bold", textAlign: "center", width: "auto" }} colSpan={2}>
                    {fruit.charAt(0).toUpperCase() + fruit.slice(1)}
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "auto" }} rowSpan={2}>
                  Total
                </TableCell>
              </TableRow>
              <TableRow>
                {fruits.map((_, i) => (
                  <React.Fragment key={i}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Shop
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        backgroundColor: "#f5f5f5",
                      }}
                    >
                      Total
                    </TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.entries(groupedByDate).map(([date, data]) => (
                <TableRow key={date}>
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold", width: "auto" }}>
                    {date}
                  </TableCell>
                  {fruits.map((fruit, i) => {
                    const shopQty = data.shop[fruit] || 0;
                    const totalQty = data.total[fruit] || 0;
                    const price = ShopPrices?.[0]?.[`sp${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`] || 0;
                    const calculated = shopQty * price;

                    return (
                      <React.Fragment key={i}>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {shopQty + " x " + price}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {calculated}
                        </TableCell>
                      </React.Fragment>
                    );
                  })}
                  {/* New Total Column */}
                  <TableCell sx={{ textAlign: "center" }}>
                    {fruits.reduce((acc, fruit) => {
                      const shopQty = data.shop[fruit] || 0;
                      const price = ShopPrices?.[0]?.[`sp${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`] || 0;
                      return acc + shopQty * price;
                    }, 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Button to navigate to Summary Page */}
      <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/summaryShopPrices")}>
          Go to Summary Report
        </Button>
      </div>
    </div>
  );
}

export default TotalShopPrices;
