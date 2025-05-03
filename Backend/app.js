const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import config values from config.js
const { PORT, mongoDBURL } = require("./config");

// Import your routes
const reviewRoutes = require("./Route/reviewRoutes");
const inventoryRoutes = require("./Route/InventoryRoute");
const goodInventoryRoutes = require("./Route/GoodInventoryRoute");
const badInventoryRoutes = require("./Route/BadInventoryRoute");
const financeRoutes = require("./Route/FinanceRoute");
const byproductRoutes = require("./Route/ByproductRoute");
const farmerPriceRoutes = require("./Route/FarmerPriceRoute");
const shopPriceRoutes = require("./Route/ShopPriceRoute");
const userRoutes = require("./Route/UserRoute");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.status(234).send("Welcome To E-Farmer Review System MERN Project");
});

// Use API routes
app.use("/reviews", reviewRoutes);
app.use("/Inventorys", inventoryRoutes);
app.use("/GoodInventorys", goodInventoryRoutes);
app.use("/BadInventorys", badInventoryRoutes);
app.use("/Farmers", financeRoutes);
app.use("/ByproductPrices", byproductRoutes);
app.use("/FarmerPrices", farmerPriceRoutes);
app.use("/ShopPrices", shopPriceRoutes);
app.use("/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://TharuFdo:eE2wJAaAZgIoT9oq@cluster0.rzklu.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));
