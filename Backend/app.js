const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route handler for user management
const userRoutes = require("./Route/UserRoutes.js");
const staffRoutes = require("./Route/StaffRoutes.js");

const app = express(); // Initialize Express application

// Middleware
app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Use the user routes for handling user-related requests
app.use("/users", userRoutes); // Access the user routes at /users
app.use("/staff", staffRoutes); // Access the staff routes at /staff

// Connect to MongoDB database
mongoose.connect("mongodb+srv://admin:KkSgstyLqciJwnAP@cluster0.ympdn.mongodb.net/")
    .then(() => console.log("Connected to MongoDB")) // Log success message if connected
    .then(() => {
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((err) => console.log(err)); // Log any connection errors
