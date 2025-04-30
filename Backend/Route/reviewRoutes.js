import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  testCreateReview,
} from "../Controllers/reviewController.js";
import { upload } from "../middleware/requirePhoto.js";

const router = express.Router();

// Route for Save a new Review
router.post("/", upload.single("photo"), createReview);

// Route for Get All Reviews from database
router.get("/", getAllReviews);

// Route for Get One Review from database by id
router.get("/:id", getReviewById);

// Route for Update a Review
router.put("/:id", upload.single("photo"), updateReview);

// Route for Delete a Review
router.delete("/:id", deleteReview);

// Test route for review context
router.post("/create", testCreateReview);

export default router;
