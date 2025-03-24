import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ViewShopPrices(props) {

  const {_id,spApple,spOrange,spBanana,spGraphes,spWatermelon,spMango,spWoodapple,spPineapple,spPapaya,spGoava} = props.shopproductprices;

  const navigate = useNavigate();

  const deleteHandler = async()=>{
    await axios.delete(`http://localhost:5000/ShopPrices/${_id}`)
    .then(res=>res.data)
    .then(()=>navigate("/"))
    .then(()=>navigate("/displayShopPrice"))
  }

  return (
    <div>
      <div>
                  <h1>Shop Product Prices List</h1>
                  <br></br>
                  <h1>ID:{_id}</h1>
                  <h1>Apple Price (1 kg):{spApple}</h1>
                  <h1>Orange Price (1 kg):{spOrange}</h1>
                  <h1>Banana Price (1 kg):{spBanana}</h1>
                  <h1>Graphs Price (1 kg):{spGraphes}</h1>
                  <h1>Watermelon Price (1 kg):{spWatermelon}</h1>
                  <h1>Mango Price (1 kg):{spMango}</h1>
                  <h1>Woodapple Price (1 kg):{spWoodapple}</h1>
                  <h1>Pineapple Price (1 kg):{spPineapple}</h1>
                  <h1>Papaya Price (1 kg):{spPapaya}</h1>
                  <h1>Goava Price (1 kg):{spGoava}</h1>
                  <Link to={`/displayShopPrice/${_id}`}>Update</Link>
                  <button onClick={deleteHandler}>Delete</button>
          </div>
    </div>
  )
}

export default ViewShopPrices
