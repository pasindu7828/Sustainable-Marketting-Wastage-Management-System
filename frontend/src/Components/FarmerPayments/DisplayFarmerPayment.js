import React, { useEffect, useState } from 'react'
import FarmerPayment from '../Nav/FarmerPayment'
import axios from "axios";
import ViewFarmerPayment from "./ViewFarmerPayment";

const URL ="http://localhost:5000/Farmers";

const fetchHandler = async () =>{
    return await axios.get(URL).then((res) => res.data);
}

function DisplayFarmerPayment() {

    const[Farmers, setUsers] = useState();
            useEffect(() => {
                fetchHandler().then((data) => setUsers(data.Farmers));
          },[])

  return (
    <div>
      <FarmerPayment/>
      <h1>Display Farmer Payments</h1>
      <div>
          {Farmers && Farmers.map((farmerpayments,i) =>(
            <div key={i}>
              <ViewFarmerPayment farmerpayments={farmerpayments}/>
            </div>
          ))}
        </div>
    </div>
  )
}

export default DisplayFarmerPayment
