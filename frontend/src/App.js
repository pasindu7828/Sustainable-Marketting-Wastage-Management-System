import React from "react";
import { Route,Routes } from 'react-router-dom';
import './App.css';


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

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<MainHomePage/>}/>
          <Route path="/FinanceHome" element={<MainHomePage/>}/>
          <Route path="/addByproduct" element={<AddBpp/>}/>
          <Route path="/BPPriceDetails" element={<ShowBPprice/>}/>
          <Route path="/BPPriceDetails/:id" element={<UpdateBPlist/>}/>

          <Route path="/addFarmerPrice" element={<AddFarmerPrice/>}/>
          <Route path="/displayFarmerPrice" element={<DisplayFmPrices/>}/>
          <Route path="/displayFarmerPrice/:id" element={<UpdateFarmerPrice/>}/>

          <Route path="/addShopPrice" element={<AddShopPrices/>}/>
          <Route path="/displayShopPrice" element={<DisplayShopPrices/>}/>
          <Route path="/displayShopPrice/:id" element={<UpdateShopPrice/>}/>

          <Route path="/addFarmerPayment" element={<AddFarmerPayment/>}/>
          <Route path="/displayFarmerPayment" element={<DisplayFarmerPayment/>}/>
          <Route path="/displayFarmerPayment/:id" element={<UpdateFarmerPayment/>}/>

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
