import React from 'react'
import { Link } from "react-router-dom";

function ShopPriceNav() {
  return (
    <div>
      <nav>
              <Link to="/FinanceHome">Home</Link>
              <Link to="/addShopPrice">Add Shop product Prices</Link>
              <Link to="/displayShopPrice">Price Details</Link>
       </nav>
    </div>
  )
}

export default ShopPriceNav
