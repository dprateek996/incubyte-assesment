const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addSweet,
  getAllSweets,
  updateSweet,
  deleteSweet
} = require("../controllers/sweetController");

router.post("/", authMiddleware, addSweet);
router.get("/", authMiddleware, getAllSweets);
router.put("/:id", authMiddleware, updateSweet);
router.delete("/:id", authMiddleware, deleteSweet);

module.exports = router;