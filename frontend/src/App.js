import React from "react";
import { Route,Routes } from 'react-router-dom';
import './App.css';


// Main Home Page
import HomeInventoryMain from "./Components/HomeI/HomeInventoryMain";

// Product Details
import AddProduct from "./Components/ProductDetails/AddProduct/AddProduct";
import DisplayProductDetails from "./Components/ProductDetails/DisplayProductDetails/DisplayProductDetails";
import UpdateProductDetails from "./Components/ProductDetails/UpdateProductDetails/UpdateProductDetails";

// By Product Details
import AddByProductDetails from "./Components/ByProductDetails/AddByProductDetails";
import DisplayByProductDetails from "./Components/ByProductDetails/DisplayByProductDetails";
import UpdateByProductDetails from "./Components/ByProductDetails/UpdateByProductDetails";

// Shop Product Details
import AddShopProductDetails from "./Components/ShopProductDetails/AddShopProductDetails";
import DisplayShopProductDetails from "./Components/ShopProductDetails/DisplayShopProductDetails";
import UpdateShopProductDetails from "./Components/ShopProductDetails/UpdateShopProductDetails";




//By Product Price List
import AddBpp from "./Components/ByproductPrices/AddByPP/AddBpp";
import ShowBPprice from "./Components/ByproductPrices/BPpriceDetails/ShowBPprice";
import UpdateBPlist from "./Components/ByproductPrices/UpdateBPlist/UpdateBPlist";

//Main Home Page
import MainHomePage from "./Components/Home/MainHomePage";

//Farmer Products Price list
import AddFarmerPrice from "./Components/FarmerPriceList/AddFmPrices/AddFarmerPrice";
import DisplayFmPrices from "./Components/FarmerPriceList/DisplayFmPrices/DisplayFmPrices";
import UpdateFarmerPrice from "./Components/FarmerPriceList/UpdateFmPrice/UpdateFarmerPrice";

//import Shop Price List
import AddShopPrices from "./Components/ShopPriceList/AddShopPrices";
import DisplayShopPrices from "./Components/ShopPriceList/DisplayShopPrices";
import UpdateShopPrice from "./Components/ShopPriceList/UpdateShopPrice";

//import Farmer Payment Details
import AddFarmerPayment from "./Components/FarmerPayments/AddFarmerPayment";
import DisplayFarmerPayment from "./Components/FarmerPayments/DisplayFarmerPayment";
import UpdateFarmerPayment from "./Components/FarmerPayments/UpdateFarmerPayment";
import FarmerList from "./Components/FarmerPayments/farmerList";
import TotalFarmerPayments from "./Components/Calculations/TotalFarmerPayments";

function App() {

  return (
    <div>


    
      <React.Fragment>
       
       <Routes>
       <Route path="/" element={<MainHomePage />}/> 
       <Route path="/HomeInventoryMain" element={<HomeInventoryMain/>}/>
       <Route path="/addproductdetails" element={<AddProduct/>}/>
       <Route path="/DisplayProductDetails" element={<DisplayProductDetails/>}/>
       <Route path="/DisplayProductDetails/:id" element={<UpdateProductDetails/>}/>


       <Route path="/AddByProductDetails" element={<AddByProductDetails/>}/>
       <Route path="/DisplayByProductDetails" element={<DisplayByProductDetails/>}/>
       <Route path="/DisplayByProductDetails/:id" element={<UpdateByProductDetails/>}/>

       <Route path="/AddShopProductDetails" element={<AddShopProductDetails/>}/>
       <Route path="/DisplayShopProductDetails" element={<DisplayShopProductDetails/>}/>
       <Route path="/DisplayShopProductDetails/:id" element={<UpdateShopProductDetails/>}/>

         <Route path="/FinanceHome" element={<MainHomePage/>}/>
          <Route path="/addByproduct" element={<AddBpp/>}/>
          <Route path="/BPPriceDetails" element={<ShowBPprice/>}/>
          <Route path="/BPPriceDetails/:id" element={<UpdateBPlist/>}/>

          <Route path="/addFarmerPrice" element={<AddFarmerPrice/>}/>
          <Route path="/displayFarmerPrice" element={<DisplayFmPrices/>}/>
          <Route path="/farmersList" element={<FarmerList/>}/>
          <Route path="/displayFarmerPrice/:id" element={<UpdateFarmerPrice/>}/>

          <Route path="/addShopPrice" element={<AddShopPrices/>}/>
          <Route path="/displayShopPrice" element={<DisplayShopPrices/>}/>
          <Route path="/displayShopPrice/:id" element={<UpdateShopPrice/>}/>

          <Route path="/addFarmerPayment" element={<AddFarmerPayment/>}/>
          <Route path="/displayFarmerPayment" element={<DisplayFarmerPayment/>}/>
          <Route path="/displayFarmerPayment/:id" element={<UpdateFarmerPayment/>}/>
          <Route path="/" element={<MainHomePage/>}/>

          <Route path="/totalFarmerPayments" element={<TotalFarmerPayments/>}/>

       </Routes>


      </React.Fragment>


    </div>
  );
}

export default App;
