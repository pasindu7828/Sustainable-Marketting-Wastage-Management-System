const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import config values from config.js
const { PORT, mongoDBURL } = require("./config");

// Import your routes (must be using module.exports inside reviewRoutes.js)
const reviewRoutes = require("./Route/reviewRoutes");

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  res.status(234).send("Welcome To E-Farmer Review System MERN Project");
});

// Use the review routes
app.use("/reviews", reviewRoutes);

// Connect to MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
