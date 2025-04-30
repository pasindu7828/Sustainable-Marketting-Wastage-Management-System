import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import reviewRoutes from "./Route/reviewRoutes.js"; // Updated to review routes
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response
    .status(234)
    .send("Welcome To E-Farmer Review System MERN Project");
});

app.use("/reviews", reviewRoutes); // Updated route prefix

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(5000, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
