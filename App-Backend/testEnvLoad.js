import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("All Environment Variables:", process.env);
