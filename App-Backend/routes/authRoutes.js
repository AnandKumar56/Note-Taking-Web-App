import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/User.js"; // Ensure to add .js extension


const router = express.Router();

// User Signup
router.post(
  "/signup",
  [
    check("username", "Username is required").not().isEmpty(), // Ensure username is provided

    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body; // Destructure username from request body

      console.log("Signup request received:", req.body);

      const existingUser = await User.findOne({ email }); // Check if user already exists

      if (existingUser) {
        console.log("User already exists:", email);
        return res.status(400).json({ message: "User already exists!" });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      console.log("User registered successfully:", email);
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      console.error("Signup failed:", error.message);
      res.status(500).json({ message: "Signup failed", error: error.message });
    }
  }
);

// User Login
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found!" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || "1h" }
      );

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  }
);

export default router; // Change to export default
