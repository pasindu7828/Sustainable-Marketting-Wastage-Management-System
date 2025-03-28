
// psw = 6sTZGWBdVFDV2T7T

const router = require("./Route/InventoryRoute");
const router2 = require("./Route/GoodInventoryRoute");
const router3 = require("./Route/BadInventoryRoute");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/FinanceRoute");
const router2 = require("./Route/ByproductRoute");
const router3 = require("./Route/FarmerPriceRoute");
const router4 = require("./Route/ShopPriceRoute");

const app = express();
const cors = require("cors");


app.use("/Inventorys",router)
app.use("/GoodInventorys",router2)
app.use("/BadInventorys",router3)
app.use(express.json());
app.use(cors());
app.use("/Farmers",router);
app.use("/ByproductPrices",router2);
app.use("/FarmerPrices",router3);
app.use("/ShopPrices",router4);


mongoose.connect("mongodb+srv://TharuFdo:eE2wJAaAZgIoT9oq@cluster0.rzklu.mongodb.net/")
.then(()=>console.log("Connected to MongoDB"))
.then(()=>{
    app.listen(5000);
})
.catch((err)=>console.log((err)));

