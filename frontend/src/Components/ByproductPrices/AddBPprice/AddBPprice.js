import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function AddBPprice(props) {
  const {_id,bp1,bp2,bp3,bp4,bp5} = props.bpprice;

  const navigate = useNavigate();

  const deleteHandler = async()=>{
    await axios.delete(`http://localhost:5000/ByproductPrices/${_id}`)
    .then(res=>res.data)
    .then(()=>navigate("/"))
    .then(()=>navigate("/BPPriceDetails"))
  }
  return (
    <div>
        <h1>By Product Prices List</h1>
        <br></br>
        <h1>ID:{_id}</h1>
        <h1>BP1:{bp1}</h1>
        <h1>BP2:{bp2}</h1>
        <h1>BP3:{bp3}</h1>
        <h1>BP4:{bp4}</h1>
        <h1>BP5:{bp5}</h1>
        <Link to={`/BPPriceDetails/${_id}`}>Update</Link>
        <button onClick={deleteHandler}>Delete</button>
    </div>
  )
}

export default AddBPprice
