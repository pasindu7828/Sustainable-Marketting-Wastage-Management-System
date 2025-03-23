import React, { useEffect, useState } from 'react'
import Nav from '../../Nav/Nav'
import axios from "axios";
import AddBPprice from '../AddBPprice/AddBPprice';

const URL ="http://localhost:5000/ByproductPrices";

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}

function ShowBPprice() {

  const[ByproductPrices, setUsers] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.ByproductPrices));
  },[])

  return (
    <div>
        <Nav/>
        <h1>By Product Price List</h1>
        <div>
          {ByproductPrices && ByproductPrices.map((bpprice,i) =>(
            <div key={i}>
              <AddBPprice bpprice={bpprice}/>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ShowBPprice
