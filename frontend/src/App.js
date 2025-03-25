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



function App() {

  return (
    <div>

    
      <React.Fragment>
       
       <Routes>
       <Route path="/" element={<HomeInventoryMain />}/> 
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


       </Routes>


      </React.Fragment>

     
    </div>
  );
}

export default App;
