/* *****Exeption for testing***** */
const intentionalErrorController = {};
 
intentionalErrorController.causeError = async function (req, res, next) {
    console.log("Causing an error...");
    try {
        let aNumber = 1 / 0; // Simulated error
        throw new Error("This is an intentional error.");
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
};
 
module.exports = intentionalErrorController;