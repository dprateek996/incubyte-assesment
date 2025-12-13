const prisma = require("../db");

function serializeSweet(s) {
  if (!s) return s;
  return {
    ...s,
    price: s.price != null ? Number(s.price) : s.price
  };
}

exports.addSweet = async (req, res) => {
  try {
    const { name, quantity, price, unit, category } = req.body;
    const userId = req.user.id; // Get userId from JWT token

    if (!name || quantity == null || price == null) {
      return res
        .status(400)
        .json({ error: "Name, quantity, and price required" });
    }

    if (Number(price) < 0) {
      return res.status(400).json({ error: "Price must be non-negative" });
    }

    const validUnits = ["gram", "piece"];
    const selectedUnit = unit || "piece";

    if (!validUnits.includes(selectedUnit)) {
      return res.status(400).json({ error: "Unit must be 'gram' or 'piece'" });
    }

    const created = await prisma.sweet.create({
      data: {
        name,
        category: category || "General",
        price: String(price), // Prisma Decimal accepts string safely
        quantity: Number(quantity),
        unit: selectedUnit,
        userId: userId // Associate sweet with user
      }
    });

    return res.status(201).json(serializeSweet(created));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getAllSweets = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from JWT token

    const sweets = await prisma.sweet.findMany({
      where: { userId: userId }, // Filter by user
      orderBy: { id: "asc" }
    });

    return res.status(200).json(sweets.map(serializeSweet));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id; // Get userId from JWT token

    if (quantity == null) {
      return res.status(400).json({ error: "Quantity is required" });
    }

    // First check if sweet exists and belongs to user
    const sweet = await prisma.sweet.findUnique({
      where: { id: Number(id) }
    });

    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    if (sweet.userId !== userId) {
      return res.status(403).json({ error: "Forbidden: You don't own this sweet" });
    }

    const updated = await prisma.sweet.update({
      where: { id: Number(id) },
      data: { quantity: Number(quantity) }
    });

    return res.status(200).json(serializeSweet(updated));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Get userId from JWT token

    // First check if sweet exists and belongs to user
    const sweet = await prisma.sweet.findUnique({
      where: { id: Number(id) }
    });

    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    if (sweet.userId !== userId) {
      return res.status(403).json({ error: "Forbidden: You don't own this sweet" });
    }

    await prisma.sweet.delete({
      where: { id: Number(id) }
    });

    return res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
