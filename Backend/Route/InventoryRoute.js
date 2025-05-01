const express = require("express");
const router = express.Router();
//Insret Model
const Inventorys = require("../Model/InventoryModel");
//Insert inventory contrller
const InventoryController = require("../Controllers/InventoryControllers");

router.get("/",InventoryController.getAllInventory);
router.post("/",InventoryController.addInventorys);
router.get("/:id",InventoryController.getById);
router.put("/:id",InventoryController.updateInventory);
router.delete("/:id",InventoryController.deleteInventory);

//export
module.exports = router;

