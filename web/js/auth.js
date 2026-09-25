function showMessage(message, type = "error") {
  const el = document.getElementById("formMessage");
  if (el) {
    el.textContent = message;
    el.className = `form-message ${type}`;
  }
}

const userLoginForm = document.getElementById("userLoginForm");
if (userLoginForm) {
  userLoginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        })
      });

      saveSession(data);
      window.location.href = "user-dashboard.html";
    } catch (error) {
      showMessage(error.message);
    }
  });
}

const adminLoginForm = document.getElementById("adminLoginForm");
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const data = await api("/auth/admin-login", {
        method: "POST",
        body: JSON.stringify({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        })
      });

      saveSession(data);
      window.location.href = "admin-dashboard.html";
    } catch (error) {
      showMessage(error.message);
    }
  });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const data = await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        })
      });

      saveSession(data);
      showMessage("Account created. Redirecting...", "success");
      setTimeout(() => window.location.href = "user-dashboard.html", 500);
    } catch (error) {
      showMessage(error.message);
    }
  });
}
