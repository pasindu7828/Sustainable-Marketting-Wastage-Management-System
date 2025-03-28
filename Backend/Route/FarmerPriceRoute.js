const express = require("express");
const router = express.Router();

//insert model
const FarmerPrices = require("../Model/FarmerPriceModel");

//insert controller
const FarmerPriceListControllers =require("../Controllers/FarmerPriceListController");

router.get("/",FarmerPriceListControllers.getAllFarmerPrices);
router.post("/",FarmerPriceListControllers.addFarmerPrice);
router.get("/:pname",FarmerPriceListControllers.getById);
router.put("/:FPid",FarmerPriceListControllers.updateFarmerPrices);
router.delete("/:FPid",FarmerPriceListControllers.deleteFarmerPrices);

//export

module.exports=router;