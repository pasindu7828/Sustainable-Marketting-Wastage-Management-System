import React from 'react';
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import ReviewTable from "../Components/HomeR/ReviewTable"; // Updated component name
import ReviewCard from "../Components/HomeR/ReviewCard"; // Updated component name
import BackButton from "../Components/BackButton";
import { ButtonGroup, Button } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";

const Admin = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/reviews") // Updated endpoint
      .then((response) => {
        setReviews(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <BackButton />

        {/* Header Section */}
        <div className="flex justify-between items-center mt-6 mb-10">
          <h1 className="text-4xl font-extrabold text-green-900 bg-green-100 px-6 py-3 rounded-full shadow-md">
            E-Customer Reviews Dashboard
          </h1>

          <div className="flex items-center gap-x-6">
            {/* View Toggle Buttons */}
            <ButtonGroup variant="contained" color="primary" aria-label="view toggle" sx={{ borderRadius: "25px" }}>
              <Button
                startIcon={<ViewModuleIcon />}
                onClick={() => setShowType("table")}
                sx={{
                  backgroundColor: showType === "table" ? "#388e3c" : "#ffffff",
                  color: showType === "table" ? "#ffffff" : "#388e3c",
                  "&:hover": {
                    backgroundColor: showType === "table" ? "#388e3c" : "#e8f5e9",
                  },
                  borderRadius: "25px",
                  boxShadow: showType === "table" ? 3 : 1,
                  transition: "all 0.3s",
                }}
              >
                Table View
              </Button>
              <Button
                startIcon={<ViewComfyIcon />}
                onClick={() => setShowType("card")}
                sx={{
                  backgroundColor: showType === "card" ? "#388e3c" : "#ffffff",
                  color: showType === "card" ? "#ffffff" : "#388e3c",
                  "&:hover": {
                    backgroundColor: showType === "card" ? "#388e3c" : "#e8f5e9",
                  },
                  borderRadius: "25px",
                  boxShadow: showType === "card" ? 3 : 1,
                  transition: "all 0.3s",
                }}
              >
                Card View
              </Button>
            </ButtonGroup>

            {/* Add New Review Button */}
            <Link to="/reviews/create">
              <MdOutlineAddBox
                className="text-green-600 text-5xl bg-white p-2 rounded-full shadow-lg hover:text-green-800 hover:scale-110 transition-all duration-300"
                title="Add New Review"
              />
            </Link>
          </div>
        </div>

        {/* Review Count */}
        <div className="mb-8 bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Total Reviews:{" "}
            <span className="text-green-600 font-bold text-2xl">
              {reviews.length}
            </span>
          </h2>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <ReviewTable reviews={reviews} />
        ) : (
          <ReviewCard reviews={reviews} />
        )}
      </div>
    </div>
  );
};

export default Admin;
