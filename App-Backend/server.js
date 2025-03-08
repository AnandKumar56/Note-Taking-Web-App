const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow cross-origin requests
app.use(helmet()); // Secure app by setting various HTTP headers

// Serve favicon
app.use('/favicon.ico', (req, res) => {
  res.redirect('https://example.com/path/to/default/favicon.ico'); // Replace with a valid favicon URL
});

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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
