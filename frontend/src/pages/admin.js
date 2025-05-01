/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import ReviewTable from "../Components/HomeR/ReviewTable"; // Updated component name
import ReviewCard from "../Components/HomeR/ReviewCard"; // Updated component name
import BackButton from "../Components/BackButton";

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
            E-Farmer Reviews Dashboard
          </h1>

          <div className="flex items-center gap-x-6">
            {/* View Toggle Buttons */}
            <div className="flex gap-x-3">
              <button
                className={`px-5 py-2 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-md ${
                  showType === "table"
                    ? "bg-green-600 text-white scale-105"
                    : "bg-white text-green-700 hover:bg-green-100 border border-green-300"
                }`}
                onClick={() => setShowType("table")}
              >
                Table View
              </button>
              <button
                className={`px-5 py-2 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-md ${
                  showType === "card"
                    ? "bg-green-600 text-white scale-105"
                    : "bg-white text-green-700 hover:bg-green-100 border border-green-300"
                }`}
                onClick={() => setShowType("card")}
              >
                Card View
              </button>
            </div>

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
