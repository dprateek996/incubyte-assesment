const express = require("express");
const app = express();

app.use(express.json());

// Temporary route placeholder (so app doesn't break)
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

module.exports = app;