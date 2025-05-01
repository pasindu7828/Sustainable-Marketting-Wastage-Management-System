const express = require("express");
const router = express.Router();
//Insret Model
const GoodInventorys = require("../Model/GoodInventoryModel");
//Insert inventory contrller
const GoodInventoryController = require("../Controllers/GoodInventoryControllers");

router.get("/",GoodInventoryController.getAllInventory);
router.post("/",GoodInventoryController.addInventorys);
router.get("/:id",GoodInventoryController.getById);
router.put("/:id",GoodInventoryController.updateInventory);
router.delete("/:id",GoodInventoryController.deleteInventory);

//export
module.exports = router;