require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
        
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const sweetRoutes = require("./routes/sweets");
app.use("/api/sweets", sweetRoutes);

module.exports = app;
