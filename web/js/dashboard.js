document.addEventListener("DOMContentLoaded", async () => {
  const user = await requireAuth("user");
  if (!user) return;

  document.getElementById("welcome").textContent = `Welcome, ${user.name}`;

  document.getElementById("logoutButton").addEventListener("click", logout);

  try {
    const notificationData = await api("/notifications");
    document.getElementById("notifications").innerHTML =
      notificationData.notifications.map(n => `
        <div class="list-item">
          <strong>${escapeHtml(n.title)}</strong>
          <span>${escapeHtml(n.message)}</span>
        </div>
      `).join("") || `<div class="muted">No notifications.</div>`;

    const reportData = await api("/reports");
    document.getElementById("reports").innerHTML =
      reportData.reports.map(r => `
        <div class="list-item">
          <strong>${escapeHtml(r.title)}</strong>
          <span>${escapeHtml(r.description)} · ${escapeHtml(r.status)}</span>
        </div>
      `).join("") || `<div class="muted">No reports.</div>`;
  } catch (error) {
    console.error(error);
  }
});
