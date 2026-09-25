const express = require("express");
const pool = require("../config/database");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const result = await pool.query(
    `SELECT id, title, message, type, is_read, created_at
     FROM notifications
     WHERE user_id = $1 OR user_id IS NULL
     ORDER BY created_at DESC`,
    [req.user.id]
  );

  res.json({ notifications: result.rows });
});

module.exports = router;
