const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory by detail view
 * ************************** */

invCont.buildByVehicleId = async function (req, res, next) {
  const inv_id = req.params.invId
  const vehicleData = await invModel.getVehicleByInvId(inv_id)
  // To ensure vehicleData is not empty
  if (!vehicleData || vehicleData.length === 0) {
    throw new Error("Vehicle not found.")
  }
  const drill = await utilities.buildVehicleView(vehicleData)
  let nav = await utilities.getNav()
  const vehicleName = `${vehicleData[0].inv_make} ${vehicleData[0].inv_model}`
  res.render("./inventory/vehicle", {
    title: vehicleName + " vehicles",
    nav,
    drill,
    errors: null,
  })
}

invCont.buildVehicleManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/vehicleManagement", {
    title: "Vehicles Management",
    nav,
    errors: null,
  })
}

invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/addClassification", {
    title: "Add Classification",
    nav,
    errors: null,
  })
}

invCont.buildAddClassificationName = async function (req, res, next) {
  const {classification_name} = req.body
  const addclass = await invModel.addClassificationName(classification_name)
  let nav = await utilities.getNav()
  if (addclass){ 
  req.flash ("notice", `Classification ${classification_name} was successfuly added.`)
  res.render("inventory/vehicleManagement", {
    title: "Vehicle Management",
    nav,
    errors: null,
    classification_name,
  }) 
} else {
  req.flash ("notice", "Sorry new classification could not be added.")
  res.status(501).render("inventory/addClassification", {
  title: "Add Classification",
  nav,
  errors: null,
  classification_name,
  })
}
} 

/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav();
  const classifications = await invModel.getClassifications();
  res.render("inventory/addInventory", {
    title: "Add Inventory",
    nav,
    classifications: classifications.rows, 
    errors: null,
  });
};

/* ***************************
 *  Add inventory to database
 * ************************** */
invCont.buildAddInventoryItem = async function (req, res, next) {
  const {classification_id, inv_make, inv_model, inv_year, inv_description, inv_price,
    inv_image, inv_thumbnail, inv_miles, inv_color,} = req.body;
    const addInventory = await invModel.addInventory(classification_id, inv_make, inv_model,
      inv_year, inv_description, inv_price,
    inv_image, inv_thumbnail, inv_miles, inv_color)
  let nav = await utilities.getNav()
 
  if (addInventory) {
    req.flash("notice", `${classification_name} was successfully added.`)
    res.redirect("inventory/vehicleManagement", {
      title: "Vehicle Management",
      nav,
      errors: null,
      classification_id, inv_make, inv_model, inv_year, inv_description, inv_price,
    inv_image, inv_thumbnail, inv_miles, inv_color,
    })
  } else {
    req.flash ("notice", "Sorry inventory could not be added.")
    res.status(501).render("inventory/addInventory",{
    title: "Add Inventory",
    nav, 
    errors: null,
    classification_id, inv_make, inv_model, inv_year, inv_description, inv_price,
    inv_image, inv_thumbnail, inv_miles, inv_color,
    })
  }
}

module.exports = invCont;
