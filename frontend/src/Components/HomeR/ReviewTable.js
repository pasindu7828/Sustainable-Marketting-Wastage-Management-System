import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import { useState } from "react";
import ReviewPDF from "./ReviewPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

const ReviewTable = ({ reviews }) => {
  const [query, setQuery] = useState("");
  const keys = ["name", "reviewText"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <Box mt={4}>
      {/* Search Input */}
      <TextField
        label="Search by name or review text"
        variant="outlined"
        fullWidth
        margin="normal"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#2e7d32", color: "white" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>No</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Rating</TableCell>
              <TableCell sx={{ color: "white" }}>Review</TableCell>
              <TableCell sx={{ color: "white" }}>Photo</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search(reviews).map((review, index) => (
              <TableRow key={review._id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{review.name}</TableCell>
                <TableCell>{review.email}</TableCell>
                <TableCell>{Array(review.rating).fill("★").join(" ")}</TableCell>
                <TableCell>{review.reviewText}</TableCell>
                <TableCell>
                  {review.photo ? (
                    <img
                      src={`../public/images/${review.photo}`}
                      alt="Review"
                      width={50}
                      height={50}
                      style={{ borderRadius: "8px" }}
                    />
                  ) : (
                    "No photo"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/reviews/details/${review._id}`}>
                    <BsInfoCircle color="green" />
                  </IconButton>
                  <IconButton component={Link} to={`/reviews/edit/${review._id}`}>
                    <AiOutlineEdit color="orange" />
                  </IconButton>
                  <IconButton component={Link} to={`/reviews/delete/${review._id}`}>
                    <MdOutlineDelete color="red" />
                  </IconButton>
                  <PDFDownloadLink
                    document={<ReviewPDF review={review} />}
                    fileName={`Review_${review.name}.pdf`}
                  >
                    {({ loading }) => (
                      <IconButton>
                        <FaFileDownload color="blue" />
                      </IconButton>
                    )}
                  </PDFDownloadLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReviewTable;
