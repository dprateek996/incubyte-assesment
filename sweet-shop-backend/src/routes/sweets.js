const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addSweet } = require("../controllers/sweetController");

router.post("/", authMiddleware, addSweet);

module.exports = router;