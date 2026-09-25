const express = require("express");
const pool = require("../config/database");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const result = await pool.query(
    `SELECT r.id, r.title, r.description, r.status, r.created_at,
            u.name AS reporter
     FROM reports r
     JOIN users u ON u.id = r.user_id
     ORDER BY r.created_at DESC`
  );

  res.json({ reports: result.rows });
});

router.post("/", authenticateToken, async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Report title is required." });
  }

  const result = await pool.query(
    `INSERT INTO reports (user_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [req.user.id, title, description || ""]
  );

  res.status(201).json({ report: result.rows[0] });
});

module.exports = router;
