document.addEventListener("DOMContentLoaded", () => {
    const regForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    const forgotForm = document.getElementById("forgotForm");
  
    // Register logic
    if (regForm) {
      regForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("regUsername").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;
  
        localStorage.setItem("user", JSON.stringify({ username, email, password }));
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "medicine index.html";
      });
    }
  
    // Login logic
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;
        const storedUser = JSON.parse(localStorage.getItem("user"));
  
        if (storedUser && storedUser.username === username && storedUser.password === password) {
          localStorage.setItem("isLoggedIn", "true");
          window.location.href = "medicine index.html";
        } else {
          alert("❌ Invalid credentials");
        }
      });
    }
  
    // Forgot password logic
    if (forgotForm) {
      forgotForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const enteredUsername = document.getElementById("forgotUsername").value;
        const enteredEmail = document.getElementById("forgotEmail").value;
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const msg = document.getElementById("recoveryMsg");
  
        if (
          storedUser &&
          storedUser.username === enteredUsername &&
          storedUser.email === enteredEmail
        ) {
          msg.innerText = `✅ Your password is: ${storedUser.password}`;
          msg.style.color = "green";
        } else {
          msg.innerText = "❌ User not found or email does not match!";
          msg.style.color = "red";
        }
      });
    }
  });
  