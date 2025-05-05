import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Rating,
  Container,
} from "@mui/material";

const ShowReview = () => {
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((response) => {
        setReview(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        background: "linear-gradient(to bottom right, #e6ffe6, #e6f2ff)",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <BackButton />

        <Typography
          variant="h4"
          align="center"
          sx={{ my: 4, color: "#2e7d32", fontWeight: "bold" }}
        >
          Review Details
        </Typography>

        {loading ? (
          <Spinner />
        ) : (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* ID */}
              <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    width: 120,
                    color: "text.secondary",
                    fontWeight: "medium",
                  }}
                >
                  ID
                </Typography>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {review._id}
                </Typography>
              </Box>
              <Divider />

              {/* Name */}
              <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    width: 120,
                    color: "text.secondary",
                    fontWeight: "medium",
                  }}
                >
                  Name
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", fontWeight: "medium" }}
                >
                  {review.name}
                </Typography>
              </Box>
              <Divider />

              {/* Email */}
              <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    width: 120,
                    color: "text.secondary",
                    fontWeight: "medium",
                  }}
                >
                  Email
                </Typography>
                <Typography variant="body1" sx={{ color: "text.primary" }}>
                  {review.email}
                </Typography>
              </Box>
              <Divider />

              {/* Rating */}
              <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    width: 120,
                    color: "text.secondary",
                    fontWeight: "medium",
                  }}
                >
                  Rating
                </Typography>
                <Rating
                  value={review.rating || 0}
                  readOnly
                  precision={1}
                  sx={{ color: "#ffb300" }}
                />
                <Typography
                  variant="body2"
                  sx={{ ml: 1, color: "text.secondary" }}
                >
                  ({review.rating}/5)
                </Typography>
              </Box>
              <Divider />

              {/* Review Text */}
              <Box sx={{ pb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", fontWeight: "medium", mb: 1 }}
                >
                  Review
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", lineHeight: 1.6 }}
                >
                  {review.reviewText}
                </Typography>
              </Box>
              <Divider />

              {/* Photo */}
              <Box sx={{ pb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", fontWeight: "medium", mb: 1 }}
                >
                  Photo
                </Typography>
                {review.photo ? (
                  <Box
                    component="img"
                    src={`/public/images/${review.photo}`}
                    alt="Review"
                    sx={{
                      width: 256,
                      height: 256,
                      objectFit: "cover",
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  />
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontStyle: "italic" }}
                  >
                    No photo uploaded
                  </Typography>
                )}
              </Box>
              <Divider />

              {/* Timestamps */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      width: 120,
                      color: "text.secondary",
                      fontWeight: "medium",
                    }}
                  >
                    Created
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {new Date(review.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      width: 120,
                      color: "text.secondary",
                      fontWeight: "medium",
                    }}
                  >
                    Updated
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {new Date(review.updatedAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default ShowReview;
