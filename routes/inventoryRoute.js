// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require('../utilities/');
const datavalidate = require('../utilities/inventory-validation');

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build inventory detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByVehicleId))

router.get("/", utilities.handleErrors(invController.buildVehicleManagement))

router.get("/addClassification", utilities.handleErrors(invController.buildAddClassification))

router.post("/addClassification", datavalidate.classificationRules(), datavalidate.checkclassdata, utilities.handleErrors(invController.buildAddClassificationName))


// Display the add inventory form
router.get("/addInventory", utilities.handleErrors(invController.buildAddInventory))

// Handle the form submission for adding inventory
router.post("/addInventory", datavalidate.addInventoryRules(), datavalidate.checkAddInventoryData, utilities.handleErrors(invController.buildAddInventoryItem))

//new route 
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;