const utilities = require("../utilities/");
const invModel = require("../models/inventory-model");
const { body, validationResult } = require("express-validator");
const validate = {};

/* **********************************
 * Add classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    // 
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isAlpha()
      .withMessage("A valid name is required. Please use only alphabetical characters without space."), // on error this message is sent.
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkclassdata = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/addClassification", {
      errors,
      title: "Add classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

/* ***************************
* Add Inventory Data Validation Rules
* *************************** */
validate.addInventoryRules = () => {
  return [
    body("classification_id")
      .isInt({ min: 1 })
      .withMessage("Please select a valid classification."),
    body("inv_make")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Make must be at least 3 characters long."),
    body("inv_model")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Model must be at least 3 characters long."),
    body("inv_year")
      .isInt({ min: 1900, max: 2100 })
      .withMessage("Enter a valid year."),

      body("inv_description")      
      .trim()      
      .escape()      
      .isLength({ min: 10 })      
      .withMessage("Enter a vehicle description"),
      
    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Enter a valid price."),
    body("inv_image")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required."),

    body("inv_thumbnail")
    .trim()
    .notEmpty()
    .withMessage("Thumbnail URL is required."),

    body("inv_miles")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Miles must be a non-negative integer."),
    body("inv_color")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long."),
  ];
};

/* ***************************
* Check Add Inventory Validation and Return Errors or Continue
* *************************** */
validate.checkAddInventoryData = async (req, res, next) => {
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_price, inv_image, inv_thumbnail, inv_miles, inv_color } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    const classifications = await invModel.getClassifications(); // Get classifications
    const classificationList = await utilities.buildClassificationList(classification_id); // Pass classification_id
    res.render("inventory/addInventory", {
      errors,
      title: "Add Inventory",
      nav,
      classifications: classifications.rows,
      classificationList, 
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_price,
      inv_image,
      inv_thumbnail,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

module.exports = validate;