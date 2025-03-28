const express = require("express");
const router = express.Router();

//insert model
const Farmers = require("../Model/FinanceModel");

//insert controller
const FinanceController =require("../Controllers/FinanceControllers");

router.get("/",FinanceController.getAllFarmers);
router.post("/",FinanceController.addBill);
router.get("/:id",FinanceController.getById);
router.put("/:id",FinanceController.updateBill);
router.delete("/:id",FinanceController.deleteBills);

//export

module.exports=router;