import React from 'react'
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div>
       <nav>
        <Link to="/FinanceHome">Home</Link>
        <Link to="/addByproduct">Add Prices For Farmer Product</Link>
        <Link to="/BPPriceDetails">Price Details</Link>
      </nav>
    </div>
  );
}

export default Nav
