import React, { useState } from 'react'
import FarmerPricesNav from '../../Nav/FarmerPricesNav'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddFarmerPrice() {

    const history = useNavigate();
    const [inputs,setInputs] = useState({
        fpApple:"",
        fpOrange:"",
        fpBanana:"",
        fpGraphes:"",
        fpWatermelon:"",
        fpMango:"",
        fpWoodapple:"",
        fpPineapple:"",
        fpPapaya:"",
        fpGoava:"",
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
        sendRequest().then(()=>history('/displayFarmerPrice'))
    }

    const sendRequest = async()=>{
      await axios.post("http://localhost:5000/FarmerPrices",{
        fpApple:Number (inputs.fpApple),
        fpOrange:Number (inputs.fpOrange),
        fpBanana:Number (inputs.fpBanana),
        fpGraphes:Number (inputs.fpGraphes),
        fpWatermelon:Number (inputs.fpWatermelon),
        fpMango:Number (inputs.fpMango),
        fpWoodapple:Number (inputs.fpWoodapple),
        fpPineapple:Number (inputs.fpPineapple),
        fpPapaya:Number (inputs.fpPapaya),
        fpGoava:Number (inputs.fpGoava),
      }).then(res=>res.data);
    }

  return (
    <div>
      <FarmerPricesNav/>
      <h1>Add Prices</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Apple Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpApple" onChange={handleChange} value={inputs.fpApple} required></input>
        <br/><br/>
        
        <label>Enter Orange Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpOrange" onChange={handleChange} value={inputs.fpOrange} required></input>
        <br/><br/>
      
        <label>Enter Banana Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpBanana" onChange={handleChange} value={inputs.fpBanana} required></input>
        <br/><br/>
       
        <label>Enter Graphs Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpGraphes" onChange={handleChange} value={inputs.fpGraphes} required></input>
        <br/><br/>
       
        <label>Enter Watermelon Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpWatermelon" onChange={handleChange} value={inputs.fpWatermelon} required></input>
        <br/><br/>
      
        <label>Enter Mango Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpMango" onChange={handleChange} value={inputs.fpMango} required></input>
        <br/><br/>
       
        <label>Enter WoodApple Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpWoodapple" onChange={handleChange} value={inputs.fpWoodapple} required></input>
        <br/><br/>
        
        <label>Enter PineApple Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpPineapple" onChange={handleChange} value={inputs.fpPineapple} required></input>
        <br/><br/>
        
        <label>Enter Papaya Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpPapaya" onChange={handleChange} value={inputs.fpPapaya} required></input>
        <br/><br/>
        
        <label>Enter Goava Price (1 kg) : </label>
        <br/>
        <input type="text" name="fpGoava" onChange={handleChange} value={inputs.fpGoava} required></input>
        <br/><br/>
        
        <button>Submit</button>
      </form>
    
    </div>
  )
}

export default AddFarmerPrice
