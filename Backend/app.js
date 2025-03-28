
// psw = 6sTZGWBdVFDV2T7T

const router = require("./Route/InventoryRoute");
const router2 = require("./Route/GoodInventoryRoute");
const router3 = require("./Route/BadInventoryRoute");
const express = require("express");
const mongoose = require("mongoose");
const prouter = require("./Route/FinanceRoute");
const prouter2 = require("./Route/ByproductRoute");
const prouter3 = require("./Route/FarmerPriceRoute");
const prouter4 = require("./Route/ShopPriceRoute");

const app = express();
const cors = require("cors");


app.use("/Inventorys",router)
app.use("/GoodInventorys",router2)
app.use("/BadInventorys",router3)
app.use(express.json());
app.use(cors());
app.use("/Farmers",prouter);
app.use("/ByproductPrices",prouter2);
app.use("/FarmerPrices",prouter3);
app.use("/ShopPrices",prouter4);


mongoose.connect("mongodb+srv://TharuFdo:eE2wJAaAZgIoT9oq@cluster0.rzklu.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));

