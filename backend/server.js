require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const locationRoutes = require("./routes/locations");
const notificationRoutes = require("./routes/notifications");
const reportRoutes = require("./routes/reports");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "*"
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    application: "SDG Hackathon Starter",
    time: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found." });
});

const port = Number(process.env.PORT || 5000);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
