import React, { useEffect, useState } from 'react'
import ShopPriceNav from '../Nav/ShopPriceNav'
import axios from "axios";
import ViewShopPrices from "./ViewShopPrices";

const URL ="http://localhost:5000/ShopPrices";

const fetchHandler = async () =>{
    return await axios.get(URL).then((res) => res.data);
}

function DisplayShopPrices() {

    const[ShopPrices, setUsers] = useState();
        useEffect(() => {
            fetchHandler().then((data) => setUsers(data.ShopPrices));
      },[])

  return (
    <div>
      <ShopPriceNav/>
      <h1>Shop Product Price List</h1>
      <div>
          {ShopPrices && ShopPrices.map((shopproductprices,i) =>(
            <div key={i}>
              <ViewShopPrices shopproductprices={shopproductprices}/>
            </div>
          ))}
        </div>
    </div>
  )
}

export default DisplayShopPrices
