const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../db");

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true
      }
    });

    return res.status(201).json(user);
  } catch (error) {
    // Unique constraint violation (email already exists)
    // Prisma commonly uses P2002 for unique constraint errors :contentReference[oaicite:3]{index=3}
    if (error && error.code === "P2002") {
      return res.status(409).json({ error: "User already exists" });
    }

    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
