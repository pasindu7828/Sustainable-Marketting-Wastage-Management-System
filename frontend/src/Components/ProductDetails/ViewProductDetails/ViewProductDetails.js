import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewProductDetails(props) {
    const {_id,pid,pname,fid,fname,fnumber,quantity} = props.user;

    console.log("Props",pid);
    
    const history = useNavigate();

    const deleteHandler = async()=>{
      await axios.delete(`http://localhost:5000/Inventorys/${_id}`)
      .then(res=>res.data)
      .then(() =>history("/"))
      .then(() =>history("/DisplayProductDetails"))
    }

  return (
    <div>
        <hi>Display</hi>
        <br></br>
        <h1>id :{_id} </h1>
        <h1>pid :{pid} </h1>
        <h1>pname :{pname} </h1>
        <h1>fid :{fid} </h1>
        <h1>fname :{fname} </h1>
        <h1>fnumber :{fnumber} </h1>
        <h1>quantity :{quantity} </h1>
        <Link to={`/DisplayProductDetails/${_id}`}>Update</Link>
        <button onClick={deleteHandler}>Delete</button>
      
    </div>
  );
}

export default ViewProductDetails;
