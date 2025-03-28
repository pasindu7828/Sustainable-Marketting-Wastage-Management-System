import React, { useEffect, useState } from "react";
import ByProductNav from "../Nav/ShopNav";
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

const URL = "http://localhost:5000/GoodInventorys";

// Fetch GoodInventorys
const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.GoodInventorys || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

function DisplayShopProductDetails() {
  const [goodInventorys, setGoodInventorys] = useState([]);
  const [groupedByDate, setGroupedByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchHandler();
        
        if (Array.isArray(data)) {
          setGoodInventorys(data);
          
          const groupedData = data.reduce((acc, item) => {
            if (!item || !item.createdAt) return acc;
            
            const date = item.createdAt.split('T')[0];
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
                total: {
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
                ids: []
              };
            }
            
            
            // Safely sum shop quantities
            acc[date].shop.apple += Number(item.shopapple) || 0;
            acc[date].shop.orange += Number(item.shoporange) || 0;
            acc[date].shop.banana += Number(item.shopbanana) || 0;
            acc[date].shop.grapes += Number(item.shopgrapes) || 0;
            acc[date].shop.watermelon += Number(item.shopwatermelon) || 0;
            acc[date].shop.mango += Number(item.shopmango) || 0;
            acc[date].shop.woodapple += Number(item.shopwoodapple) || 0;
            acc[date].shop.pineapple += Number(item.shoppineapple) || 0;
            acc[date].shop.papaya += Number(item.shoppapaya) || 0;
            acc[date].shop.guava += Number(item.shopguava) || 0;
            
            // Safely sum total quantities
            acc[date].total.apple += Number(item.totalapple) || 0;
            acc[date].total.orange += Number(item.totalorange) || 0;
            acc[date].total.banana += Number(item.totalbanana) || 0;
            acc[date].total.grapes += Number(item.totalgrapes) || 0;
            acc[date].total.watermelon += Number(item.totalwatermelon) || 0;
            acc[date].total.mango += Number(item.totalmango) || 0;
            acc[date].total.woodapple += Number(item.totalwoodapple) || 0;
            acc[date].total.pineapple += Number(item.totalpineapple) || 0;
            acc[date].total.papaya += Number(item.totalpapaya) || 0;
            acc[date].total.guava += Number(item.totalguava) || 0;
            
            if (item._id) {
              acc[date].ids.push(item._id);
            }
            
            return acc;
          }, {});
          
          setGroupedByDate(groupedData);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error processing data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Object.keys(groupedByDate).length) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <ByProductNav />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mt: 2,
          color: "#2c3e50",
        }}
      >
        Shop Product Details Display Page
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 600, overflowY: "auto", borderRadius: 2, boxShadow: 3 }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }} rowSpan={2}>
                Date
              </TableCell>
              {['Apple', 'Orange', 'Banana', 'Grapes', 'Watermelon', 'Mango', 'Woodapple', 'Pineapple', 'Papaya', 'Guava'].map((fruit) => (
                <TableCell key={fruit} sx={{ fontWeight: "bold", textAlign: "center" }} colSpan={2}>
                  {fruit}
                </TableCell>
              ))}
              
            </TableRow>
            <TableRow>
              {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#f5f5f5" }}>
                    Shop
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#f5f5f5" }}>
                    Total
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedByDate).map((date) => {
              const dateData = groupedByDate[date] || {};
              const shop = dateData.shop || {};
              const total = dateData.total || {};
              
              return (
                <TableRow key={date}>
                  <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {date}
                  </TableCell>
                  
                  {/* Apple */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.apple || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.apple || 0}</TableCell>
                  
                  {/* Orange */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.orange || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.orange || 0}</TableCell>
                  
                  {/* Banana */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.banana || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.banana || 0}</TableCell>
                  
                  {/* Grapes */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.grapes || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.grapes || 0}</TableCell>
                  
                  {/* Watermelon */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.watermelon || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.watermelon || 0}</TableCell>
                  
                  {/* Mango */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.mango || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.mango || 0}</TableCell>
                  
                  {/* Woodapple */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.woodapple || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.woodapple || 0}</TableCell>
                  
                  {/* Pineapple */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.pineapple || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.pineapple || 0}</TableCell>
                  
                  {/* Papaya */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.papaya || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.papaya || 0}</TableCell>
                  
                  {/* Guava */}
                  <TableCell sx={{ textAlign: "center" }}>{shop.guava || 0}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{total.guava || 0}</TableCell>
                  
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DisplayShopProductDetails;