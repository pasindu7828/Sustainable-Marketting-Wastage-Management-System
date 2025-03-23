import React from "react";
import { Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
//By Product Price List
import AddBpp from "./Components/ByproductPrices/AddByPP/AddBpp";
import ShowBPprice from "./Components/ByproductPrices/BPpriceDetails/ShowBPprice";
import UpdateBPlist from "./Components/ByproductPrices/UpdateBPlist/UpdateBPlist";

//Farmer Products Price list

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/mainhome" element={<Home/>}/>
          <Route path="/addByproduct" element={<AddBpp/>}/>
          <Route path="/BPPriceDetails" element={<ShowBPprice/>}/>
          <Route path="/BPPriceDetails/:id" element={<UpdateBPlist/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
