import React, { useEffect, useState } from 'react';
import ByProductNav from '../Nav/ShopNav';
import axios from "axios";
import ViewShopProductDetails from './ViewShopProductDetails';

const URL = "http://Localhost:5000/GoodInventorys";

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}

function DisplayShopProductDetails() {

     const [GoodInventorys, setUsers] = useState();
          useEffect(()=> {
            fetchHandler().then((data) => setUsers(data.GoodInventorys));
          },[])
    
  return (
    <div>
        <ByProductNav/>
        <h1>By Product Details Dispaly Page</h1>
         <div>
         {GoodInventorys && GoodInventorys.map((user,i) => (
         <div key={i}>
         <ViewShopProductDetails user={user}/>
                
         </div>
         ))}
        </div>
      
    </div>
  );
}

export default DisplayShopProductDetails;
