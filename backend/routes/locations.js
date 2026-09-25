const express = require("express");
const pool = require("../config/database");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const result = await pool.query(
    `SELECT id, name, description, category, latitude, longitude, status,
            created_by, created_at, updated_at
     FROM locations
     ORDER BY created_at DESC`
  );
  res.json({ locations: result.rows });
});

router.post("/", authenticateToken, async (req, res) => {
  const { name, description, category, latitude, longitude, status } = req.body;

  if (!name || !category) {
    return res.status(400).json({ message: "Name and category are required." });
  }

  const result = await pool.query(
    `INSERT INTO locations
      (name, description, category, latitude, longitude, status, created_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      name,
      description || "",
      category,
      latitude ?? null,
      longitude ?? null,
      status || "active",
      req.user.id
    ]
  );

  res.status(201).json({ location: result.rows[0] });
});

module.exports = router;
