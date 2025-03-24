import React from 'react'
import { Link } from "react-router-dom";

function FarmerPayment() {
  return (
    <div>
      <nav>
              <Link to="/FinanceHome">Home</Link>
              <Link to="/addFarmerPayment">Add Farmer Payments</Link>
              <Link to="/displayFarmerPayment">Farmer Payment Details</Link>
            </nav>
    </div>
  )
}

export default FarmerPayment
