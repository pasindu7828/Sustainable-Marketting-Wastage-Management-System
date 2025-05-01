import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import ReviewSingleCard from "./ReviewSingleCard";
import { Grid } from "@mui/material";

const ReviewCard = ({ reviews }) => {
  console.log("Reviews",reviews);
  
  return (
    <Grid
      container
      spacing={3} // Adjusted spacing to match gap-6 (24px in Tailwind)
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr", // 1 column on extra-small screens
          sm: "repeat(2, 1fr)", // 2 columns on small screens
          lg: "repeat(3, 1fr)", // 3 columns on large screens
          xl: "repeat(4, 1fr)", // 4 columns on extra-large screens
        },
      }}
    >
      {reviews.map((item) => {
  const imageBasePath = "/uploads/reviews/"; // adjust path as needed
  const updatedItem = {
    ...item,
    image: `${imageBasePath}${item.photo}`, // prepend image path
  };

  return (
    <Grid item key={item._id} xs={12} sm={6} lg={4} xl={3}>
      <ReviewSingleCard review={updatedItem} />
    </Grid>
  );
})}

    </Grid>
  );
};

export default ReviewCard;