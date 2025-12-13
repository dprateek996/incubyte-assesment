const pool = require("../db");

exports.addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ error: "All fields required" });
    }

    const result = await pool.query(
      `INSERT INTO sweets (name, category, price, quantity)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, category, price, quantity]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
exports.getAllSweets = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sweets ORDER BY id ASC"
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM sweets WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    return res
      .status(200)
      .json({ message: "Sweet deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};