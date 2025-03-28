const express = require("express");
const router = express.Router();

//insert model
const FarmerPrices = require("../Model/ShopPriceModel");

//insert controller
const ShopPriceListControllers =require("../Controllers/ShopPriceListController");

router.get("/",ShopPriceListControllers.getAllShopPrices);
router.post("/",ShopPriceListControllers.addShopPrice);
router.get("/:SPid",ShopPriceListControllers.getById);
router.put("/:SPid",ShopPriceListControllers.updateShopPrices);
router.delete("/:SPid",ShopPriceListControllers.deleteShopPrices);

//export

module.exports=router;