const express = require("express");
const router = express.Router();

//insert model
const ByproductPrices = require("../Model/ByproductModel");

//insert controller
const ByproductController =require("../Controllers/ByproductControllers");

router.get("/",ByproductController.getAllBPrices);
router.post("/",ByproductController.addPrice);
router.get("/:BPid",ByproductController.getById);
router.put("/:BPid",ByproductController.updateByProduct);
router.delete("/:BPid",ByproductController.deletePrices);

//export

module.exports=router;