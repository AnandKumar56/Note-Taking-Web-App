import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import express from "express";
import mongoose from "mongoose"; // Directly import mongoose

const app = express();

// Log the MongoDB URI
console.log(`MongoDB URI: ${process.env.MONGO_URI}`); // Log the MongoDB URI

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://akn915573:uqTLAMQxwXU4fXLA@cluster0.5guv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB(); // Call the connectDB function

const PORT = process.env.PORT || 5008;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
