const express = require("express");
const pool = require("../config/database");
const { authenticateToken, requireRole } = require("../middleware/auth");

const router = express.Router();

router.use(authenticateToken, requireRole("admin"));

router.get("/users", async (req, res) => {
  const result = await pool.query(
    `SELECT id, name, email, role, status, created_at
     FROM users
     ORDER BY created_at DESC`
  );

  res.json({ users: result.rows });
});

router.patch("/users/:id/status", async (req, res) => {
  const { status } = req.body;

  if (!["active", "inactive"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  const result = await pool.query(
    `UPDATE users SET status = $1 WHERE id = $2
     RETURNING id, name, email, role, status`,
    [status, req.params.id]
  );

  if (!result.rowCount) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json({ user: result.rows[0] });
});

router.delete("/users/:id", async (req, res) => {
  if (Number(req.params.id) === req.user.id) {
    return res.status(400).json({ message: "You cannot delete your own admin account." });
  }

  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [
    req.params.id
  ]);

  if (!result.rowCount) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json({ message: "User deleted." });
});

module.exports = router;
