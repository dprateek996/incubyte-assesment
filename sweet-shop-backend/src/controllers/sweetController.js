const pool = require("../db");

exports.addSweet = async (req, res) => {
  try {
    const { name, quantity, price, unit } = req.body;

    if (!name || quantity == null || price == null) {
      return res.status(400).json({ error: "Name, quantity, and price required" });
    }

    if (price < 0) {
      return res.status(400).json({ error: "Price must be non-negative" });
    }

    const validUnits = ["gram", "piece"];
    const selectedUnit = unit || "piece";

    if (!validUnits.includes(selectedUnit)) {
      return res.status(400).json({ error: "Unit must be 'gram' or 'piece'" });
    }

    const result = await pool.query(
      `INSERT INTO sweets (name, category, price, quantity, unit)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, "General", price, quantity, selectedUnit]
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
exports.updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity == null) {
      return res.status(400).json({ error: "Quantity is required" });
    }

    const result = await pool.query(
      "UPDATE sweets SET quantity = $1 WHERE id = $2 RETURNING *",
      [quantity, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    return res.status(200).json(result.rows[0]);
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