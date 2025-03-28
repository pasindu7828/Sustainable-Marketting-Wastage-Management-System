const express = require("express");
const router = express.Router();
//Insret Model
const BadInventorys = require("../Model/BadInventoryModel");
//Insert inventory contrller
const BadInventoryController = require("../Controllers/BadInventoryControllers");

router.get("/",BadInventoryController.getAllInventory);
router.post("/",BadInventoryController.addInventorys);
router.get("/:id",BadInventoryController.getById);
router.put("/:id",BadInventoryController.updateInventory);
router.delete("/:id",BadInventoryController.deleteInventory);

//export
module.exports = router;