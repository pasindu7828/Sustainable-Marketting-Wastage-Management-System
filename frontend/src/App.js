import React from "react";
import { Route,Routes } from 'react-router-dom';
import './App.css';
import HomeI from "./Components/HomeI/HomeI";
import AddProduct from "./Components/ProductDetails/AddProduct/AddProduct";
import DisplayProductDetails from "./Components/ProductDetails/DisplayProductDetails/DisplayProductDetails";

function App() {

  return (
    <div>

    
      <React.Fragment>
       
       <Routes>
       <Route path="/" element={<HomeI />}/> 
       <Route path="/mainhome" element={<HomeI/>}/>
       <Route path="/addproductdetails" element={<AddProduct/>}/>
       <Route path="/DisplayProductDetails" element={<DisplayProductDetails/>}/>

       </Routes>


      </React.Fragment>

     
    </div>
  );
}

export default App;
