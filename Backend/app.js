const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route handlers
const userRoutes = require("./Route/UserRoutes.js");
const staffRoutes = require("./Route/StaffRoutes.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

// Routes
app.use("/users", userRoutes);
app.use("/staff", staffRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:KkSgstyLqciJwnAP@cluster0.ympdn.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});
