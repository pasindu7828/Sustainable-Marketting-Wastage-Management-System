import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>

<nav>
        <Link to="/HomeInventoryMain">Home</Link>
        <Link to="/addproductdetails">Add product Details</Link>
        <Link to="/DisplayProductDetails">dispaly product details</Link>
        
      </nav>

      
    </div>
  );
}

export default Nav;
