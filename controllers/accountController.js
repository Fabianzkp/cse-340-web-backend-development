// Needed Resources
const utilities = require("../utilities/");

/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  req.flash("notice", "This is a flash message.")
  res.render("account/login", {
    title: "Login",
    nav,
  });
}

async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    req.flash("notice", "This is a flash message.")
    res.render("account/register", {
        title: "Register",
        nav,
    });
}

module.exports = { buildLogin, buildRegister };
