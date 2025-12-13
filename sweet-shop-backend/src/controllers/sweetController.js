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