import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  AppBar,
  Toolbar,
  Container
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FaLeaf } from "react-icons/fa";
import ReviewCard from "../Components/HomeR/ReviewCard"; // Import the Card Component

const theme = createTheme({
  palette: {
    primary: { main: "#388e3c" }, // Green
    secondary: { main: "#ffb300" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h3: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
});

const HomeReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/reviews")
      .then((response) => {
        setReviews(response.data.data);
        console.log(response);
        
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "background.default" }}>
        
        {/* Header */}
        <AppBar position="static" color="primary" elevation={4}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}>
              <FaLeaf /> E-Farmer Reviews
            </Typography>
            <Button component={Link} to="/reviews/admin" variant="contained" sx={{ bgcolor: "white", color: "primary.main" }}>
              Admin Dashboard
            </Button>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            minHeight: "60vh",
            backgroundImage: "url(https://richmondbrothersequipment.com/wp-content/uploads/2024/06/Quality-Farm.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: 8,
            color: "white",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
              Share Your Farming Experience
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: "1.2rem" }}>
              Rate and review our e-farmer services. Your feedback helps us grow greener together!
            </Typography>
            <Button component={Link} to="/reviews/create" variant="contained" size="large" sx={{ bgcolor: "#43a047" }}>
              Add Your Review
            </Button>
          </Container>
        </Box>

        {/* Reviews Section */}
        <Container sx={{ py: 4 }}>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Card View */}
              <ReviewCard reviews={reviews} />

              {/* Table View */}
              <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3, borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "primary.main", color: "white" }}>
                      {["No", "Name", "Email", "Rating", "Review"].map((header, idx) => (
                        <TableCell key={idx} sx={{ color: "white", fontWeight: "bold" }}>
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reviews.map((review, index) => (
                      <TableRow key={review._id} sx={{ "&:hover": { bgcolor: "#e8f5e9" } }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{review.name}</TableCell>
                        <TableCell>{review.email}</TableCell>
                        <TableCell>{"★".repeat(review.rating)}</TableCell>
                        <TableCell sx={{ maxWidth: 250, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {review.reviewText}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HomeReview;
