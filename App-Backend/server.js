const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow cross-origin requests
app.use(helmet()); // Secure app by setting various HTTP headers

// Connect to MongoDB
connectDB();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.send("Test route is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
