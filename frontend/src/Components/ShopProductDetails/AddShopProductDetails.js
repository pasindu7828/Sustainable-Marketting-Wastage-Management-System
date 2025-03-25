import React, {useState} from 'react';
import ByProductNav from "../Nav/ShopNav";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function AddShopProductDetails() {

  const history = useNavigate();
  const [inputs,setInputs] = useState({
   
    totalapple:"",
    totalorange:"",
    totalbanana:"",
    totalgrapes:"",
    totalwatermelon:"",
    totalmango:"",
    totalwoodapple:"",
    totalpineapple:"",
    totalpapaya:"",
    totalguava:"",
    shopapple:"",
    shoporange:"",
    shopbanana:"",
    shopgrapes:"",
    shopwatermelon:"",
    shopmango:"",
    shopwoodapple:"",
    shoppineapple:"",
    shoppapaya:"",
    shopguava:"",
   

  });
  const handleChange =(e)=>{
    setInputs((prevState)=> ({
      ...prevState,
      [e.target.name] :  e.target.value,
    }));
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>history('/DisplayShopProductDetails'))
  }

  const sendRequest = async()=>{
    await axios.post("http://Localhost:5000/GoodInventorys",{
        
        totalapple:Number (inputs.totalapple),
        totalorange:Number (inputs.totalorange),
        totalbanana:Number (inputs.totalbanana),
        totalgrapes:Number (inputs.totalgrapes),
        totalwatermelon:Number (inputs.totalwatermelon),
        totalmango:Number (inputs.totalmango),
        totalwoodapple:Number (inputs.totalwoodapple),
        totalpineapple:Number (inputs.totalpineapple),
        totalpapaya:Number (inputs.totalpapaya),
        totalguava:Number (inputs.totalguava),
        shopapple:Number (inputs.shopapple),
        shoporange:Number (inputs.shoporange),
        shopbanana:Number (inputs.shopbanana),
        shopgrapes:Number (inputs.shopgrapes),
        shopwatermelon:Number (inputs.shopwatermelon),
        shopmango:Number (inputs.shopmango),
        shopwoodapple:Number (inputs.shopwoodapple),
        shoppineapple:Number (inputs.shoppineapple),
        shoppapaya:Number (inputs.shoppapaya),
        shopguava:Number (inputs.shopguava),

      
    }).then(res => res.data);
  }

  return (
    <div>
      
       <ByProductNav/>
            <h1>Add Shop Products</h1>
            <form onSubmit={handleSubmit}>
              <label>totalapple</label>
              <br />
              <input type="text" name="totalapple" onChange={handleChange} values={inputs.totalapple} required></input>
              <br></br>
              <label>totalorange</label>
              <br/>
              <input type="text" name="totalorange" onChange={handleChange} values={inputs.totalorange} required></input>
              <br></br>
              <label>totalbanana</label>
              <br />
              <input type="text" name="totalbanana" onChange={handleChange} values={inputs.totalbanana} required></input>
              <br></br>
              <label>totalgrapes</label>
              <br />
              <input type="text" name="totalgrapes" onChange={handleChange} values={inputs.totalgrapes} required></input>
              <br></br>
              <label>totalwatermelon</label>
              <br />
              <input type="text" name="totalwatermelon" onChange={handleChange} values={inputs.totalwatermelon} required></input>
              <br></br>
              <label>totalmango</label>
        <br />
        <input type="text" name="totalmango" onChange={handleChange} values={inputs.totalmango} required></input>
        <br></br>
        <label>totalwoodapple</label>
        <br/>
        <input type="text" name="totalwoodapple" onChange={handleChange} values={inputs.totalwoodapple} required></input>
        <br></br>
        <label>totalpineapple</label>
        <br />
        <input type="text" name="totalpineapple" onChange={handleChange} values={inputs.totalpineapple} required></input>
        <br></br>
        <label>totalpapaya</label>
        <br />
        <input type="text" name="totalpapaya" onChange={handleChange} values={inputs.totalpapaya} required></input>
        <br></br>
        <label>totalguava</label>
        <br />
        <input type="text" name="totalguava" onChange={handleChange} values={inputs.totalguava} required></input>
        <br></br>


        <label>shopapple</label>
              <br />
              <input type="text" name="shopapple" onChange={handleChange} values={inputs.shopapple} required></input>
              <br></br>
              <label>shoporange</label>
              <br/>
              <input type="text" name="shoporange" onChange={handleChange} values={inputs.shoporange} required></input>
              <br></br>
              <label>shopbanana</label>
              <br />
              <input type="text" name="shopbanana" onChange={handleChange} values={inputs.shopbanana} required></input>
              <br></br>
              <label>shopgrapes</label>
              <br />
              <input type="text" name="shopgrapes" onChange={handleChange} values={inputs.shopgrapes} required></input>
              <br></br>
              <label>shopwatermelon</label>
              <br />
              <input type="text" name="shopwatermelon" onChange={handleChange} values={inputs.shopwatermelon} required></input>
              <br></br>
              <label>shopmango</label>
        <br />
        <input type="text" name="shopmango" onChange={handleChange} values={inputs.shopmango} required></input>
        <br></br>
        <label>shopwoodapple</label>
        <br/>
        <input type="text" name="shopwoodapple" onChange={handleChange} values={inputs.shopwoodapple} required></input>
        <br></br>
        <label>shoppineapple</label>
        <br />
        <input type="text" name="shoppineapple" onChange={handleChange} values={inputs.shoppineapple} required></input>
        <br></br>
        <label>shoppapaya</label>
        <br />
        <input type="text" name="shoppapaya" onChange={handleChange} values={inputs.shoppapaya} required></input>
        <br></br>
        <label>shopguava</label>
        <br />
        <input type="text" name="shopguava" onChange={handleChange} values={inputs.shopguava} required></input>
        <br></br>
                 
              <button>Submit</button>
            </form>
    </div>
  );
}

export default AddShopProductDetails;
