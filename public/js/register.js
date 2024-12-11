// document.addEventListener("DOMContentLoaded", () => {
//     const passwordInput = document.getElementById("account_password");
//     const toggleButton = document.createElement("button");
  
//     // Configure the toggle button
//     toggleButton.type = "button";
//     toggleButton.textContent = "Show";
//     toggleButton.style.marginLeft = "10px";
  
//     // Add the toggle button after the password input
//     passwordInput.insertAdjacentElement("afterend", toggleButton);
  
//     // Toggle password visibility
//     toggleButton.addEventListener("click", () => {
//       const isPasswordVisible = passwordInput.type === "text";
//       passwordInput.type = isPasswordVisible ? "password" : "text";
//       toggleButton.textContent = isPasswordVisible ? "Show" : "Hide";
//     });
//   });
 

// This is another way of achieving the hidden password
// Please note: The first method above also works perfectly
// It is so I know/remember the various methods/ways to do it.

const passwordButton = document.querySelector("#passwordButton");
passwordButton.addEventListener("click", function(){
    const passwordInput = document.getElementById("account_password");
    const currentType = passwordInput.getAttribute("type", "text");
    if (currentType == "password"){
        passwordInput.setAttribute("type", "text");
        passwordButton.innerHTML = "Hide Password";
    } else {
        passwordInput.setAttribute("type", "password");
        passwordButton.innerHTML = "Show Password"
    }
});