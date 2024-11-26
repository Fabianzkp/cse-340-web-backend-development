const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res, next) {
  try {
    const nav = await utilities.getNav();  // This should be awaited
    res.render("index", { title: "Home", nav });
  } catch (err) {
    // If getNav fails, log the error and pass it to the error handler
    console.error('Error in getNav:', err.message);
    next(err); // This passes the error to the error handler
  }
}

module.exports = baseController