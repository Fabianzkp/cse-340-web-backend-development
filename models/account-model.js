const pool = require("../database/");

/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *";
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password]);
  } catch (error) {
    return error.message;
  }
}

/* **********************
 *   Check for existing Login email
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM public.account WHERE account_email = $1";
    const email = await pool.query(sql, [account_email]);
    return email.rowCount;
  } catch (error) {
    return error.message;
  }
}

/* *******************************
 *   Fetch User by Email
 * ******************************* */
async function getUserByEmail(account_email) {
  try {
      const sql = "SELECT * FROM public.account WHERE account_email = $1";
      const user = await pool.query(sql, [account_email]);
      return user.rows[0]; // Return the user record
  } catch (error) {
      return error.message;
  }
}

module.exports = { registerAccount, checkExistingEmail, getUserByEmail };

