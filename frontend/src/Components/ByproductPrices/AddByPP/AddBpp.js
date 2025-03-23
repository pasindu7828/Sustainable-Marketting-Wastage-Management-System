import React, { useState } from 'react'
import Nav from '../../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddBpp() {
    const history = useNavigate();
    const [inputs,setInputs] = useState({
        bp1:"",
        bp2:"",
        bp3:"",
        bp4:"",
        bp5:"",
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
        sendRequest().then(()=>history('/BPPriceDetails'))
    }

    const sendRequest = async()=>{
      await axios.post("http://localhost:5000/ByproductPrices",{
          bp1:Number (inputs.bp1),
          bp2:Number (inputs.bp2),
          bp3:Number (inputs.bp3),
          bp4:Number (inputs.bp4),
          bp5:Number (inputs.bp5),
      }).then(res=>res.data);
    }

  return (
    <div>
      <Nav />
      <h1>Add Prices</h1>
      <form onSubmit={handleSubmit}>
        <label>By Product 1 (500 ml) : </label>
        <br/>
        <input type="text" name="bp1" onChange={handleChange} value={inputs.bp1} required></input>
        <br/><br/>
        <br/><br/>
        <label>By Product 2 (500 ml) : </label>
        <br/>
        <input type="text" name="bp2" onChange={handleChange} value={inputs.bp2} required></input>
        <br/><br/>
        <br/><br/>
        <label>By Product 3 (500 ml) : </label>
        <br/>
        <input type="text" name="bp3" onChange={handleChange} value={inputs.bp3} required></input>
        <br/><br/>
        <br/><br/>
        <label>By Product 4 (500 ml) : </label>
        <br/>
        <input type="text" name="bp4" onChange={handleChange} value={inputs.bp4} required></input>
        <br/><br/>
        <br/><br/>
        <label>By Product 5 (500 ml) : </label>
        <br/>
        <input type="text" name="bp5" onChange={handleChange} value={inputs.bp5} required></input>
        <br/><br/>
        <br/><br/>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddBpp
