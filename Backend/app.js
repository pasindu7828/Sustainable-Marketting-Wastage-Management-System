const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./Route/InventoryRoute");
const router2 = require("./Route/GoodInventoryRoute");
const router3 = require("./Route/BadInventoryRoute");
const prouter = require("./Route/FinanceRoute");
const prouter2 = require("./Route/ByproductRoute");
const prouter3 = require("./Route/FarmerPriceRoute");
const prouter4 = require("./Route/ShopPriceRoute");

const app = express();

// Middleware setup
app.use(cors()); // Moved to top
app.use(express.json()); // Moved to top

// Routes
app.use("/Inventorys", router);
app.use("/GoodInventorys", router2);
app.use("/BadInventorys", router3);
app.use("/Farmers", prouter);
app.use("/ByproductPrices", prouter2);
app.use("/FarmerPrices", prouter3);
app.use("/ShopPrices", prouter4);

// MongoDB connection
mongoose.connect("mongodb+srv://TharuFdo:eE2wJAaAZgIoT9oq@cluster0.rzklu.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch((err) => console.error("MongoDB Connection Error:", err));
