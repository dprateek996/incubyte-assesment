require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

module.exports = app;