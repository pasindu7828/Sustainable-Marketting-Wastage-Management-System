import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";

function ByProductNav() {
  return (
    <div>
      <nav>
              <Link to="/HomeInventoryMain">Home</Link>
              <Link to="/AddByProductDetails">Add Byproduct Details</Link>
              <Link to="/DisplayByProductDetails">dispaly Byproduct details</Link>
              
            </nav>
      
      
    </div>
  );
}

export default ByProductNav;
