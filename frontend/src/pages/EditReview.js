import React from 'react';
import { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const EditReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setRating(response.data.rating);
        setReviewText(response.data.reviewText);
        setPhoto(response.data.photo);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred while fetching review data", {
          variant: "error",
        });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);

  const handleEditReview = () => {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("rating", rating);
    data.append("reviewText", reviewText);
    if (photo && typeof photo !== "string") data.append("photo", photo);

    setLoading(true);
    axios
      .put(`http://localhost:5000/reviews/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Review Updated Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error Updating Review", { variant: "error" });
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
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <BackButton />

        <Typography
          variant="h4"
          align="center"
          sx={{ my: 4, color: "#2e7d32", fontWeight: "bold" }}
        >
          Edit Review
        </Typography>

        {loading && <Spinner />}

        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Name */}
            <Box>
              <InputLabel sx={{ mb: 1, color: "#616161" }}>Name</InputLabel>
              <TextField
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            {/* Email */}
            <Box>
              <InputLabel sx={{ mb: 1, color: "#616161" }}>Email</InputLabel>
              <TextField
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            {/* Rating */}
            <Box>
              <InputLabel sx={{ mb: 1, color: "#616161" }}>Rating</InputLabel>
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
              <InputLabel sx={{ mb: 1, color: "#616161" }}>Review</InputLabel>
              <TextareaAutosize
                minRows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Enter your review"
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

            {/* Photo */}
            <Box>
              <InputLabel sx={{ mb: 1, color: "#616161" }}>
                Photo (Optional)
              </InputLabel>
              {photo && typeof photo === "string" && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={`/public/images/${photo}`}
                    alt="Current review"
                    style={{
                      width: "128px",
                      height: "128px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, color: "#757575" }}
                  >
                    Current photo
                  </Typography>
                </Box>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                style={{ width: "100%", padding: "8px 0" }}
              />
            </Box>

            {/* Update Button */}
            <Button
              onClick={handleEditReview}
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                bgcolor: "#4caf50",
                "&:hover": { bgcolor: "#45a049" },
                borderRadius: 2,
                fontSize: "16px",
                boxShadow: 3,
              }}
            >
              Update Review
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditReview;
