import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ViewFarmerPayment(props) {

    const {_id,fid,fname,pname,quantity,billno,date,amount,femail,fnumber} = props.farmerpayments;

    const navigate = useNavigate();

    const deleteHandler = async()=>{
        await axios.delete(`http://localhost:5000/Farmers/${_id}`)
        .then(res=>res.data)
        .then(()=>navigate("/"))
        .then(()=>navigate("/displayFarmerPayment"))
      }

  return (
    <div>
      <h1>Farmer Payments</h1>
      <br></br>
        <h1>ID:{_id}</h1>
        <h1>Farmer NIC:{fid}</h1>
        <h1>Farmer Name:{fname}</h1>
        <h1>Product Name:{pname}</h1>
        <h1>Product Quantity:{quantity}</h1>
        <h1>Bill Number:{billno}</h1>
        <h1>Billed Date:{date}</h1>
        <h1>Bill Amount:{amount}</h1>
        <h1>Email Address:{femail}</h1>
        <h1>Contact Number:{fnumber}</h1>
        <Link to={`/displayFarmerPayment/${_id}`}>Update</Link>
        <button onClick={deleteHandler}>Delete</button>
    </div>
  )
}

export default ViewFarmerPayment
