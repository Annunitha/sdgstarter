const bcrypt = require("bcryptjs");
const pool = require("../config/database");

(async () => {
  try {
    const adminHash = await bcrypt.hash("Admin@123", 10);
    const userHash = await bcrypt.hash("User@123", 10);

    await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES
       ('Demo Administrator', 'admin@example.com', $1, 'admin'),
       ('Demo User', 'user@example.com', $2, 'user')
       ON CONFLICT (email)
       DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      [adminHash, userHash]
    );

    console.log("Demo users created/updated.");
  } finally {
    await pool.end();
  }
})();
