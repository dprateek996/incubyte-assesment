const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addSweet,
  getAllSweets
} = require("../controllers/sweetController");

router.post("/", authMiddleware, addSweet);
router.get("/", authMiddleware, getAllSweets);

module.exports = router;