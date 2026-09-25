const API_BASE = "http://localhost:5000/api";

async function api(path, options = {}) {
  const token = localStorage.getItem("sdg_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
}

function saveSession(data) {
  localStorage.setItem("sdg_token", data.token);
  localStorage.setItem("sdg_user", JSON.stringify(data.user));
}

function clearSession() {
  localStorage.removeItem("sdg_token");
  localStorage.removeItem("sdg_user");
}

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("sdg_user"));
  } catch {
    return null;
  }
}

async function requireAuth(role = null) {
  try {
    const data = await api("/auth/me");

    if (role && data.user.role !== role) {
      window.location.href = data.user.role === "admin"
        ? "admin-dashboard.html"
        : "user-dashboard.html";
      return null;
    }

    return data.user;
  } catch {
    window.location.href = role === "admin" ? "admin-login.html" : "login.html";
    return null;
  }
}

function logout() {
  clearSession();
  window.location.href = "index.html";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
