import React from 'react';
import { useState } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const DeleteReview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteReview = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/reviews/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Review Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error Deleting Review", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f0fff0, #f0f8ff)",
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: 450, mx: "auto" }}>
        <BackButton />

        <Typography
          variant="h5"
          sx={{ mt: 3, mb: 4, color: "#1b5e20", fontWeight: "bold" }}
          align="center"
        >
          Delete Review
        </Typography>

        {loading && <Spinner />}

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 3, color: "#424242", textAlign: "center" }}
          >
            Are you sure you want to delete this review?
          </Typography>

          <WarningAmberIcon sx={{ color: "#ef5350", fontSize: 40, mb: 3 }} />

          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteReview}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: 2,
                fontSize: "16px",
                boxShadow: 2,
                "&:hover": { bgcolor: "#d32f2f" },
              }}
            >
              Yes, Delete It
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/")}
              sx={{
                flex: 1,
                py: 1.5,
                borderRadius: 2,
                fontSize: "16px",
                boxShadow: 2,
                "&:hover": { bgcolor: "#f5f5f5" },
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default DeleteReview;