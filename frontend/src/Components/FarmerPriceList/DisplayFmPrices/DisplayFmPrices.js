import React, { useEffect, useState } from 'react'
import FarmerPricesNav from "../../Nav/FarmerPricesNav"
import axios from "axios";
import ViewFmPrices from '../ViewFmPrices/ViewFmPrices';

const URL ="http://localhost:5000/FarmerPrices";

const fetchHandler = async () =>{
    return await axios.get(URL).then((res) => res.data);
}

function DisplayFmPrices() {

    const[FarmerPrices, setUsers] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.FarmerPrices));
  },[])

  return (
    <div>
      <FarmerPricesNav/>
      <h1>Farmer Product Price List</h1>
      <div>
          {FarmerPrices && FarmerPrices.map((farmerproductprices,i) =>(
            <div key={i}>
              <ViewFmPrices farmerproductprices={farmerproductprices}/>
            </div>
          ))}
        </div>
    </div>
  )
}

export default DisplayFmPrices
