import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGO_URI); // Log the MongoDB URI
    console.log("Environment Variables Loaded:", process.env); // Log all environment variables
    await mongoose.connect("mongodb+srv://akn915573:uqTLAMQxwXU4fXLA@cluster0.5guv3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

      // Removed deprecated options
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
