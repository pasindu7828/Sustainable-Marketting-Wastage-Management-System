import React, { useState } from 'react'
import FarmerPayment from '../Nav/FarmerPayment'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddFarmerPayment() {

    const history = useNavigate();
    const [inputs,setInputs] = useState({
        fid:"",
        fname:"",
        pname:"",
        quantity:"",
        billno:"",
        date:"",
        amount:"",
        femail:"",
        fnumber:"",
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
            sendRequest().then(()=>history('/displayFarmerPayment'))
        }
    
    const sendRequest = async()=>{
          await axios.post("http://localhost:5000/Farmers",{
            fid:Number (inputs.fid),
            fname:String (inputs.fname),
            pname:String (inputs.pname),
            quantity:Number (inputs.quantity),
            billno:Number (inputs.billno),
            date:Number (inputs.date),
            amount:Number (inputs.amount),
            femail:String (inputs.femail),
            fnumber:Number (inputs.fnumber),
          }).then(res=>res.data);
        }
    
    
  return (
    <div>
      <FarmerPayment/>
      <form onSubmit={handleSubmit}>
        <label>Enter NIC : </label>
        <br/>
        <input type="text" name="fid" onChange={handleChange} value={inputs.fid} required></input>
        <br/><br/>
        
        <label>Enter Farmer Name: </label>
        <br/>
        <input type="text" name="fname" onChange={handleChange} value={inputs.fname} required></input>
        <br/><br/>
      
        <label>Enter Product Names : </label>
        <br/>
        <input type="text" name="pname" onChange={handleChange} value={inputs.pname} required></input>
        <br/><br/>
       
        <label>Enter Quantity: </label>
        <br/>
        <input type="text" name="quantity" onChange={handleChange} value={inputs.quantity} required></input>
        <br/><br/>
       
        <label>Enter Bill Number : </label>
        <br/>
        <input type="text" name="billno" onChange={handleChange} value={inputs.billno} required></input>
        <br/><br/>
      
        <label>Enter Date : </label>
        <br/>
        <input type="text" name="date" onChange={handleChange} value={inputs.date} required></input>
        <br/><br/>
       
        <label>Enter Amount: </label>
        <br/>
        <input type="text" name="amount" onChange={handleChange} value={inputs.amount} required></input>
        <br/><br/>
        
        <label>Enter Email: </label>
        <br/>
        <input type="text" name="femail" onChange={handleChange} value={inputs.femail} required></input>
        <br/><br/>
        
        <label>Enter Contact Number: </label>
        <br/>
        <input type="text" name="fnumber" onChange={handleChange} value={inputs.fnumber} required></input>
        <br/><br/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddFarmerPayment
