import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";

function ShopNav() {
  return (
    <div>
      <nav>
        <Link to="/HomeInventoryMain">Home</Link>
        <Link to="/AddShopProductDetails">Add ShopProduct Details</Link>
        <Link to="/DisplayShopProductDetails">dispaly ShopProduct details</Link>
                    
      </nav>
      
    </div>
  );
}

export default ShopNav;
