import React from "react";
import { Routes, Route } from "react-router-dom";

// Review System Routes (Nimshara)
import HomeReview from "./pages/HomeReview";
import CreateReview from "./pages/CreateReview";
import ShowReview from "./pages/ShowReview";
import EditReview from "./pages/EditReview";
import DeleteReview from "./pages/DeleteReview";
import Admin from "./pages/admin";

// Inventory and Finance system (main)
import HomeInventoryMain from "./Components/HomeI/HomeInventoryMain";
import AddProduct from "./Components/ProductDetails/AddProduct/AddProduct";
import DisplayProductDetails from "./Components/ProductDetails/DisplayProductDetails/DisplayProductDetails";
import UpdateProductDetails from "./Components/ProductDetails/UpdateProductDetails/UpdateProductDetails";

import AddByProductDetails from "./Components/ByProductDetails/AddByProductDetails";
import DisplayByProductDetails from "./Components/ByProductDetails/DisplayByProductDetails";
import UpdateByProductDetails from "./Components/ByProductDetails/UpdateByProductDetails";
import SummaryChart from "./Components/ByProductDetails/SummaryChart";

import AddShopProductDetails from "./Components/ShopProductDetails/AddShopProductDetails";
import DisplayShopProductDetails from "./Components/ShopProductDetails/DisplayShopProductDetails";
import UpdateShopProductDetails from "./Components/ShopProductDetails/UpdateShopProductDetails";
import SummaryShopChart from "./Components/ShopProductDetails/SummaryShopChart";

import AddBpp from "./Components/ByproductPrices/AddByPP/AddBpp";
import ShowBPprice from "./Components/ByproductPrices/BPpriceDetails/ShowBPprice";
import UpdateBPlist from "./Components/ByproductPrices/UpdateBPlist/UpdateBPlist";

import MainHomePage from "./Components/Home/MainHomePage";
import AddFarmerPrice from "./Components/FarmerPriceList/AddFmPrices/AddFarmerPrice";
import DisplayFmPrices from "./Components/FarmerPriceList/DisplayFmPrices/DisplayFmPrices";
import UpdateFarmerPrice from "./Components/FarmerPriceList/UpdateFmPrice/UpdateFarmerPrice";
import AddShopPrices from "./Components/ShopPriceList/AddShopPrices";
import DisplayShopPrices from "./Components/ShopPriceList/DisplayShopPrices";
import UpdateShopPrice from "./Components/ShopPriceList/UpdateShopPrice";
import TotalShopPrices from "./Components/ShopPriceList/totalShopPrices";

import AddFarmerPayment from "./Components/FarmerPayments/AddFarmerPayment";
import DisplayFarmerPayment from "./Components/FarmerPayments/DisplayFarmerPayment";
import UpdateFarmerPayment from "./Components/FarmerPayments/UpdateFarmerPayment";
import FarmerList from "./Components/FarmerPayments/farmerList";

import TotalFarmerPayments from "./Components/Calculations/TotalFarmerPayments";
import SummaryTotalShopPrices from "./Components/Calculations/SummaryTotalShopPrices";
import MainDashboard from "./Components/MainDashboard";
import TotalFarmerPrices from "./Components/FarmerPriceList/TotalFarmerPrices";


const App = () => {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/* Default Page */}
          <Route path="/" element={<MainDashboard />} />
          <Route path="/reviewDashBoard" element={<HomeReview />} />

          {/* Review System Routes */}
          <Route path="/reviews/create" element={<CreateReview />} />
          <Route path="/reviews/admin" element={<Admin />} />
          <Route path="/reviews/details/:id" element={<ShowReview />} />
          <Route path="/reviews/edit/:id" element={<EditReview />} />
          <Route path="/reviews/delete/:id" element={<DeleteReview />} />

          {/* Inventory and Finance System Routes */}
          <Route path="/HomeInventoryMain" element={<HomeInventoryMain />} />
          <Route path="/addproductdetails" element={<AddProduct />} />
          <Route path="/DisplayProductDetails" element={<DisplayProductDetails />} />
          <Route path="/DisplayProductDetails/:id" element={<UpdateProductDetails />} />
          <Route path="/AddByProductDetails" element={<AddByProductDetails />} />
          <Route path="/DisplayByProductDetails" element={<DisplayByProductDetails />} />
          <Route path="/DisplayByProductDetails/:id" element={<UpdateByProductDetails />} />
          <Route path="/AddShopProductDetails" element={<AddShopProductDetails />} />
          <Route path="/DisplayShopProductDetails" element={<DisplayShopProductDetails />} />
          <Route path="/DisplayShopProductDetails/:id" element={<UpdateShopProductDetails />} />
          <Route path="/TotalShopPrices" element={<TotalShopPrices />} />
          <Route path="/FinanceHome" element={<MainHomePage />} />

          {/* Price and Payment Routes */}
          <Route path="/addByproduct" element={<AddBpp />} />
          <Route path="/BPPriceDetails" element={<ShowBPprice />} />
          <Route path="/BPPriceDetails/:id" element={<UpdateBPlist />} />
          <Route path="/addFarmerPrice" element={<AddFarmerPrice />} />
          <Route path="/displayFarmerPrice" element={<DisplayFmPrices />} />
          <Route path="/displayFarmerPrice/:id" element={<UpdateFarmerPrice />} />
          <Route path="/addShopPrice" element={<AddShopPrices />} />
          <Route path="/displayShopPrice" element={<DisplayShopPrices />} />
          <Route path="/displayShopPrice/:id" element={<UpdateShopPrice />} />
          <Route path="/addFarmerPayment" element={<AddFarmerPayment />} />
          <Route path="/displayFarmerPayment" element={<DisplayFarmerPayment />} />
          <Route path="/displayFarmerPayment/:id" element={<UpdateFarmerPayment />} />
          <Route path="/farmersList" element={<FarmerList />} />

          {/* Summary and Calculation Routes */}
          <Route path="/totalFarmerPayments" element={<TotalFarmerPayments />} />
          <Route path="/summaryShopPrices" element={<SummaryTotalShopPrices />} />
          <Route path="/totalFarmerPrices" element={<TotalFarmerPrices />} />
          <Route path="/byProductSummary" element={<SummaryChart />} />
          <Route path="/shopProductSummary" element={<SummaryShopChart />} />

          {/* Admin/Dashboard */}
          <Route path="/adminPage" element={<MainDashboard />} />
        </Routes>
      </React.Fragment>
    </div>
  );
};

export default App;
