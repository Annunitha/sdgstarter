async function loadUsers() {
  const data = await api("/admin/users");
  document.getElementById("userCount").textContent = data.users.length;

  document.getElementById("usersTable").innerHTML = data.users.map(user => `
    <tr>
      <td>${escapeHtml(user.name)}</td>
      <td>${escapeHtml(user.email)}</td>
      <td>${escapeHtml(user.role)}</td>
      <td><span class="status">${escapeHtml(user.status)}</span></td>
      <td>
        ${user.role === "user"
          ? `<button class="button small" onclick="toggleStatus(${user.id}, '${user.status}')">
              ${user.status === "active" ? "Disable" : "Enable"}
             </button>`
          : ""}
      </td>
    </tr>
  `).join("");
}

async function toggleStatus(id, current) {
  const status = current === "active" ? "inactive" : "active";

  try {
    await api(`/admin/users/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
    await loadUsers();
  } catch (error) {
    alert(error.message);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const user = await requireAuth("admin");
  if (!user) return;

  document.getElementById("logoutButton").addEventListener("click", logout);
  document.getElementById("refreshUsers").addEventListener("click", loadUsers);

  try {
    await loadUsers();
  } catch (error) {
    alert(error.message);
  }
});
