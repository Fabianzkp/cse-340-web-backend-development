// Needed Resources
const utilities = require("../utilities/");
const accountModel = require("../models/account-model");
const bcrypt = require("bcryptjs")

/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav();
  
  res.render("account/login", {
    errors: null,
    title: "Login",
    nav,
  });
}

/* ****************************************
 *  Deliver registration view
 * *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav();
  
  res.render("account/register", {
    errors: null,
    title: "Register",
    nav,
  });
}

/* ****************************************
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav();
  const { account_firstname, account_lastname, account_email, account_password } = req.body;

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  );

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you're registered ${account_firstname}. Please log in.`
    );
    res.status(201).redirect("/account/login");
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    });
  }
}

/* ****************************************
 *  Process Login
 * *************************************** */
async function loginAccount(req, res) {
  const { email, password } = req.body;
  try {
    const user = await accountModel.getUserByEmail(email);
    if (!user) {
      req.flash("notice", "Invalid email or password.");
      return res.redirect("/account/login");
    }

    // Temporary plain text password check
    if (password !== user.account_password) {
      req.flash("notice", "Invalid email or password.");
      return res.redirect("/account/login");
    }

    // Successful login
    req.session.user = {
      id: user.account_id,
      name: `${user.account_firstname} ${user.account_lastname}`,
    };
    res.redirect("/vehicleManagement");
  } catch (err) {
    console.error(err.message);
    req.flash("notice", "An error occurred. Please try again later.");
    res.redirect("/account/login");
  }
}

module.exports = { buildLogin, buildRegister, registerAccount, loginAccount };
