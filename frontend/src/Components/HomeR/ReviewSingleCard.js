import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  CardActions,
  Divider,
} from "@mui/material";
import { FaLeaf } from "react-icons/fa";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import ReviewModal from "./ReviewModal";

const ReviewSingleCard = ({ review }) => {
  const [showModal, setShowModal] = useState(false);
console.log("data",review);

  return (
    <Card sx={{
      border: "2px solid",
      borderColor: "#38a169",
      borderRadius: 3,
      boxShadow: 3,
      transition: "all 0.3s",
      '&:hover': {
        transform: "translateY(-5px)",
        borderColor: "#2f855a",
      },
      p: 2,
      m: 2,
      backgroundColor: "white",
    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: "#c6f6d5",
              color: "#2f855a",
              padding: "4px 12px",
              borderRadius: "16px",
              fontWeight: "bold",
            }}
          >
            {review.name}
          </Typography>
          <FaLeaf className="text-green-600 text-2xl animate-pulse" />
        </Box>
        
        {review.photo ? (
          <CardMedia
            component="img"
            height="180"
            image={`${review.image}`}
            alt={`${review.name}'s review`}
            sx={{ borderRadius: 2, boxShadow: 1, transition: "transform 0.3s", '&:hover': { transform: "scale(1.05)" } }}
          />
        ) : (
          <Box
            height={180}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: "#edf2f7", borderRadius: 2 }}
          >
            <Typography color="textSecondary" fontStyle="italic">
              No Photo Available
            </Typography>
          </Box>
        )}

        <Box mt={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <BiUserCircle className="text-green-600 text-2xl" />
            <Typography variant="body2" color="textSecondary">
              {review.email}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mt={1}>
            <Typography variant="body2" color="textPrimary">
              {review.reviewText}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ justifyContent: "space-between", p: 2, backgroundColor: "#f7fafc", borderRadius: "0 0 16px 16px" }}>
        <IconButton color="primary" onClick={() => setShowModal(true)}>
          <BiShow title="View Details" />
        </IconButton>
        <IconButton color="success" component={Link} to={`/reviews/details/${review._id}`}>
          <BsInfoCircle title="More Info" />
        </IconButton>
        
      </CardActions>

      {showModal && <ReviewModal review={review} onClose={() => setShowModal(false)} />}
    </Card>
  );
};

export default ReviewSingleCard;
