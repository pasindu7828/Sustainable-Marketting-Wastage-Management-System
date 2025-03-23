import React from 'react'
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div>
       <nav>
        <Link to="/mainhome">Home</Link>
        <Link to="/addByproduct">Add Byproduct Prices</Link>
        <Link to="/BPPriceDetails">Price Details</Link>
      </nav>
    </div>
  );
}

export default Nav
