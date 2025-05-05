import React from 'react';
import { useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Box,
  Typography,
  TextField,
  Rating,
  TextareaAutosize,
  Button,
  Paper,
  InputLabel,
  Alert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const CreateReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.length > 0 && !emailRegex.test(value)) {
      enqueueSnackbar("Please enter a valid email address", {
        variant: "error",
      });
    }
  };

  const handleSaveReview = () => {
    if (!/^[A-Za-z\s]+$/.test(name)) {
      setErrorMessage("Please enter letters only for Name");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (rating === 0) {
      setErrorMessage("Please select a rating");
      return;
    }
    if (reviewText.trim().length < 10) {
      setErrorMessage("Review must be at least 10 characters long");
      return;
    }

    // Clear any existing error message before submitting
    setErrorMessage("");

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("rating", rating);
    data.append("reviewText", reviewText);
    if (photo) data.append("photo", photo);

    setLoading(true);
    axios
      .post("http://localhost:5000/reviews", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Review Submitted Successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error submitting review", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e6ffe6, #e6f2ff)",
        p: 3,
      }}
    >
      <BackButton />
      <Typography
        variant="h4"
        align="center"
        sx={{ my: 4, color: "#2e7d32", fontWeight: "bold" }}
      >
        Share Your E-Farmer Experience
      </Typography>

      {loading && <Spinner />}

      <Paper
        elevation={3}
        sx={{ maxWidth: 700, mx: "auto", p: 4, borderRadius: 4 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {errorMessage && (
            <Alert severity="error" onClose={() => setErrorMessage("")}>
              {errorMessage}
            </Alert>
          )}

          {/* Name Input */}
          <Box>
            <InputLabel sx={{ mb: 1, color: "#616161" }}>
              Farmer Name
            </InputLabel>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              variant="outlined"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Box>

          {/* Email Input */}
          <Box>
            <InputLabel sx={{ mb: 1, color: "#616161" }}>Email</InputLabel>
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              variant="outlined"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Box>

          {/* Rating */}
          <Box>
            <InputLabel sx={{ mb: 1, color: "#616161" }}>
              Rate Your Experience
            </InputLabel>
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              emptyIcon={<StarIcon style={{ color: "#e0e0e0" }} />}
              icon={<StarIcon style={{ color: "#ffb300" }} />}
              size="large"
            />
          </Box>

          {/* Review Text */}
          <Box>
            <InputLabel sx={{ mb: 1, color: "#616161" }}>
              Your Review
            </InputLabel>
            <TextareaAutosize
              minRows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell us about your experience with E-Farmer..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                fontSize: "16px",
                resize: "vertical",
              }}
            />
          </Box>

          {/* Photo Upload */}
          <Box>
            <InputLabel sx={{ mb: 1, color: "#616161" }}>
              Add a Photo (Optional)
            </InputLabel>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              style={{ width: "100%", padding: "8px 0" }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            onClick={handleSaveReview}
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              bgcolor: "#4caf50",
              "&:hover": { bgcolor: "#45a049" },
              borderRadius: 2,
              fontSize: "16px",
            }}
          >
            Submit Review
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateReview;
