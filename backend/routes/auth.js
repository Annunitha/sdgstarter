const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../config/database");
const createToken = require("../utils/token");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must contain at least 6 characters." });
    }

    const existing = await pool.query(
      "SELECT id FROM users WHERE LOWER(email) = LOWER($1)",
      [email.trim()]
    );

    if (existing.rowCount) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, LOWER($2), $3, 'user')
       RETURNING id, name, email, role, status, created_at`,
      [name.trim(), email.trim(), passwordHash]
    );

    const user = result.rows[0];
    const token = createToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed." });
  }
});

async function login(req, res, expectedRole = null) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
      [email.trim()]
    );

    if (!result.rowCount) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = result.rows[0];

    if (expectedRole && user.role !== expectedRole) {
      return res.status(403).json({ message: "This account is not authorized for this portal." });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "This account is inactive." });
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    };

    res.json({
      token: createToken(safeUser),
      user: safeUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed." });
  }
}

router.post("/login", (req, res) => login(req, res, "user"));
router.post("/admin-login", (req, res) => login(req, res, "admin"));

router.get("/me", authenticateToken, async (req, res) => {
  const result = await pool.query(
    "SELECT id, name, email, role, status, created_at FROM users WHERE id = $1",
    [req.user.id]
  );

  if (!result.rowCount) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json({ user: result.rows[0] });
});

module.exports = router;
