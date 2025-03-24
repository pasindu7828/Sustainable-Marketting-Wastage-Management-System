import React from 'react'
import { Link } from "react-router-dom";

function FarmerPricesNav() {
  return (
    <div>
      <nav>
        <Link to="/FinanceHome">Home</Link>
        <Link to="/addFarmerPrice">Add Farmer product Prices</Link>
        <Link to="/displayFarmerPrice">Price Details</Link>
      </nav>
    </div>
  )
}

export default FarmerPricesNav
