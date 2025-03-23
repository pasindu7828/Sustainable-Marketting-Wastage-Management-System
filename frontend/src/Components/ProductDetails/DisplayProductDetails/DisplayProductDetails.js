import React, { useEffect, useState } from 'react';
import Nav from '../../Nav/Nav';
import axios from "axios";
import ViewProductDetails from '../ViewProductDetails/ViewProductDetails';

const URL = "http://Localhost:5000/Inventorys";

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}
function DisplayProductDetails() {

  const [Inventorys, setUsers] = useState();
  useEffect(()=> {
    fetchHandler().then((data) => setUsers(data.Inventorys));
  },[])


  return (
    <div>
      <Nav/>
      <h1>Product Details Dispaly Page</h1>
      <div>
        {Inventorys && Inventorys.map((user,i) => (
          <div key={i}>
            <ViewProductDetails user={user}/>

            </div>
        ))}
      </div>
    </div>
  )
}

export default DisplayProductDetails;
