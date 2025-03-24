import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ViewFmPrices(props) {

    const {_id,fpApple,fpOrange,fpBanana,fpGraphes,fpWatermelon,fpMango,fpWoodapple,fpPineapple,fpPapaya,fpGoava} = props.farmerproductprices;

  const navigate = useNavigate();

  const deleteHandler = async()=>{
    await axios.delete(`http://localhost:5000/FarmerPrices/${_id}`)
    .then(res=>res.data)
    .then(()=>navigate("/"))
    .then(()=>navigate("/displayFarmerPrice"))
  }

  return (
    
    <div>
            <h1>Farmer Product Prices List</h1>
            <br></br>
            <h1>ID:{_id}</h1>
            <h1>Apple Price (1 kg):{fpApple}</h1>
            <h1>Orange Price (1 kg):{fpOrange}</h1>
            <h1>Banana Price (1 kg):{fpBanana}</h1>
            <h1>Graphs Price (1 kg):{fpGraphes}</h1>
            <h1>Watermelon Price (1 kg):{fpWatermelon}</h1>
            <h1>Mango Price (1 kg):{fpMango}</h1>
            <h1>Woodapple Price (1 kg):{fpWoodapple}</h1>
            <h1>Pineapple Price (1 kg):{fpPineapple}</h1>
            <h1>Papaya Price (1 kg):{fpPapaya}</h1>
            <h1>Goava Price (1 kg):{fpGoava}</h1>
            <Link to={`/displayFarmerPrice/${_id}`}>Update</Link>
            <button onClick={deleteHandler}>Delete</button>
    </div>
      
    
  )
}

export default ViewFmPrices
