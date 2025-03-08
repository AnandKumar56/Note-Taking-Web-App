const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// User Signup
router.post(
  "/signup",
  [
    check("username", "Username is required").not().isEmpty(),

    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;
      console.log("Signup request received:", req.body); // Log the request body
      console.log("Errors:", errors.array()); // Log validation errors if any

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      console.log("Creating user with data:", { username, email }); // Log user data before saving

      const user = new User({ name: username, email, password: hashedPassword });





      await user.save();
      res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
      res.status(500).json({ message: 'Signup failed', error: error.message });
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

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  }
);

module.exports = router;
