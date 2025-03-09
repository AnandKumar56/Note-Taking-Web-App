import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./App-Backend/config/db.js"; // Correct path to db.js

dotenv.config(); // Ensure this is called at the very beginning

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

connectDB();

import authRoutes from "./App-Backend/routes/authRoutes.js";
import notesRoutes from "./App-Backend/routes/notesRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.send("Test route is working!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// Change the port number to avoid conflicts
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
