import { Review } from "../Model/reviewModel.js";

// Controller to save a new review
const createReview = async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.rating ||
      !request.body.reviewText
    ) {
      return response.status(400).send({
        message: "Send all required fields: name, email, rating, reviewText",
      });
    }

    const newReview = {
      name: request.body.name,
      email: request.body.email,
      rating: Number(request.body.rating), 
      reviewText: request.body.reviewText,
      photo: request.file ? request.file.filename : null, 
    };

    const review = await Review.create(newReview);

    return response.status(201).send(review);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Controller to get all reviews
const getAllReviews = async (request, response) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 }); // Sort by newest first

    return response.status(200).json({
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Controller to get a single review by ID
const getReviewById = async (request, response) => {
  try {
    const { id } = request.params;

    const review = await Review.findById(id);

    if (!review) {
      return response.status(404).json({ message: "Review not found" });
    }

    return response.status(200).json(review);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Controller to update a review
const updateReview = async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.rating ||
      !request.body.reviewText
    ) {
      return response.status(400).send({
        message: "Send all required fields: name, email, rating, reviewText",
      });
    }

    const { id } = request.params;
    const { name, email, rating, reviewText } = request.body;
    const photo = request.file ? request.file.filename : null;

    const result = await Review.findByIdAndUpdate(id, {
      name,
      email,
      rating: Number(rating),
      reviewText,
      ...(photo && { photo }), // Only update photo if a new one is uploaded
    });

    if (!result) {
      return response.status(404).json({ message: "Review not found" });
    }

    return response
      .status(200)
      .send({ message: "Review updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Controller to delete a review
const deleteReview = async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Review.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Review not found" });
    }

    return response
      .status(200)
      .send({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Controller for the test route
const testCreateReview = (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "Review created successfully" });
};

// Export all controller functions
export {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  testCreateReview,
};
