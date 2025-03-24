import React, { useState } from 'react'
import ShopPriceNav from '../Nav/ShopPriceNav'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddShopPrices() {

    const history = useNavigate();
    const [inputs,setInputs] = useState({
        spApple:"",
        spOrange:"",
        spBanana:"",
        spGraphes:"",
        spWatermelon:"",
        spMango:"",
        spWoodapple:"",
        spPineapple:"",
        spPapaya:"",
        spGoava:"",
    });

    const handleChange = (e) =>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }));
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>history('/displayShopPrice'))
    }

    const sendRequest = async()=>{
      await axios.post("http://localhost:5000/ShopPrices",{
        spApple:Number (inputs.spApple),
        spOrange:Number (inputs.spOrange),
        spBanana:Number (inputs.spBanana),
        spGraphes:Number (inputs.spGraphes),
        spWatermelon:Number (inputs.spWatermelon),
        spMango:Number (inputs.spMango),
        spWoodapple:Number (inputs.spWoodapple),
        spPineapple:Number (inputs.spPineapple),
        spPapaya:Number (inputs.spPapaya),
        spGoava:Number (inputs.spGoava),
      }).then(res=>res.data);
    }

  return (
    <div>
      <ShopPriceNav/>
      <h1>Add Prices</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Apple Price (1 kg) : </label>
        <br/>
        <input type="text" name="spApple" onChange={handleChange} value={inputs.spApple} required></input>
        <br/><br/>
        
        <label>Enter Orange Price (1 kg) : </label>
        <br/>
        <input type="text" name="spOrange" onChange={handleChange} value={inputs.spOrange} required></input>
        <br/><br/>
      
        <label>Enter Banana Price (1 kg) : </label>
        <br/>
        <input type="text" name="spBanana" onChange={handleChange} value={inputs.spBanana} required></input>
        <br/><br/>
       
        <label>Enter Graphs Price (1 kg) : </label>
        <br/>
        <input type="text" name="spGraphes" onChange={handleChange} value={inputs.spGraphes} required></input>
        <br/><br/>
       
        <label>Enter Watermelon Price (1 kg) : </label>
        <br/>
        <input type="text" name="spWatermelon" onChange={handleChange} value={inputs.spWatermelon} required></input>
        <br/><br/>
      
        <label>Enter Mango Price (1 kg) : </label>
        <br/>
        <input type="text" name="spMango" onChange={handleChange} value={inputs.spMango} required></input>
        <br/><br/>
       
        <label>Enter WoodApple Price (1 kg) : </label>
        <br/>
        <input type="text" name="spWoodapple" onChange={handleChange} value={inputs.spWoodapple} required></input>
        <br/><br/>
        
        <label>Enter PineApple Price (1 kg) : </label>
        <br/>
        <input type="text" name="spPineapple" onChange={handleChange} value={inputs.spPineapple} required></input>
        <br/><br/>
        
        <label>Enter Papaya Price (1 kg) : </label>
        <br/>
        <input type="text" name="spPapaya" onChange={handleChange} value={inputs.spPapaya} required></input>
        <br/><br/>
        
        <label>Enter Goava Price (1 kg) : </label>
        <br/>
        <input type="text" name="spGoava" onChange={handleChange} value={inputs.spGoava} required></input>
        <br/><br/>
        
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddShopPrices
