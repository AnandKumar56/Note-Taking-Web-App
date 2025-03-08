const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables
console.log("Environment Variables Loaded:", process.env); // Debugging line to check the loaded variables
console.log("MONGO_URI:", process.env.MONGO_URI); // Log the MONGO_URI

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Allow cross-origin requests

// Import Routes
const notesRoutes = require("./routes/notesRoutes");

// Use Routes
app.use("/api/notes", notesRoutes);

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || "mongodb://akn915573:Akn@9640080817@note-taking-app-shard-00-00.5guv3.mongodb.net:27017,note-taking-app-shard-00-01.5guv3.mongodb.net:27017,note-taking-app-shard-00-02.5guv3.mongodb.net:27017/test?ssl=true&replicaSet=atlas-1g0g5g-shard-0&authSource=admin&retryWrites=true&w=majority"; // Updated connection string format
if (!mongoUri) {
    console.error("MongoDB URI is not defined.");
    process.exit(1);
}
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
