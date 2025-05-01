import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeReview from "./pages/HomeReview";
import CreateReview from "./pages/CreateReview";
import ShowReview from "./pages/ShowReview";
import EditReview from "./pages/EditReview";
import DeleteReview from "./pages/DeleteReview";
import Navbar from "./Components/HomeR/Navbar";
import Admin from "./pages/admin";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeReview />} />
        <Route path="/reviews/create" element={<CreateReview />} />
        <Route path="/reviews/admin" element={<Admin />} />
        <Route path="/reviews/details/:id" element={<ShowReview />} />
        <Route path="/reviews/edit/:id" element={<EditReview />} />
        <Route path="/reviews/delete/:id" element={<DeleteReview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
