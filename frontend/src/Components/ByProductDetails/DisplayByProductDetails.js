import React, { useEffect, useState } from 'react';
import ByProductNav from '../Nav/ByProductNav';
import axios from "axios";
import ViewByProductDetails from './ViewByProductDetails';

const URL = "http://Localhost:5000/BadInventorys";

const fetchHandler = async () =>{
  return await axios.get(URL).then((res) => res.data);
}
function DisplayByProductDetails() {
    
      const [BadInventorys, setUsers] = useState();
      useEffect(()=> {
        fetchHandler().then((data) => setUsers(data.BadInventorys));
      },[])

  return (
    <div>
        <ByProductNav/>
              <h1>By Product Details Dispaly Page</h1>
              <div>
              {BadInventorys && BadInventorys.map((user,i) => (
              <div key={i}>
              <ViewByProductDetails user={user}/>
        
             </div>
            ))}
             </div>
    </div>
  )
}

export default DisplayByProductDetails;
