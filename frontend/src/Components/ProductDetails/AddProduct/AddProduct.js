import React, {useState} from 'react';
import Nav from '../../Nav/Nav';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function AddProduct() {
  const history = useNavigate();
  const [inputs,setInputs] = useState({
   
    pid:"",
    pname:"",
    fid:"",
    fname:"",
    fnumber:"",
    quantity:"",

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
    sendRequest().then(()=>history('/DisplayProductDetails'))
  }

  const sendRequest = async()=>{
    await axios.post("http://Localhost:5000/Inventorys",{
      pid:Number (inputs.pid),
      pname:String (inputs.pname),
      fid:Number (inputs.fid),
      fname:String (inputs.fname),
      fnumber:Number (inputs.fnumber),
      quantity:Number (inputs.quantity),
    }).then(res => res.data);
  }


  return (
    <div>
      <Nav/>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>pid</label>
        <br />
        <input type="text" name="pid" onChange={handleChange} values={inputs.pid} required></input>
        <br></br>
        <label>pname</label>
        <br/>
        <input type="text" name="pname" onChange={handleChange} values={inputs.pname} required></input>
        <br></br>
        <label>fid</label>
        <br />
        <input type="text" name="fid" onChange={handleChange} values={inputs.fid} required></input>
        <br></br>
        <label>fname</label>
        <br />
        <input type="text" name="fname" onChange={handleChange} values={inputs.fname} required></input>
        <br></br>
        <label>fnumber</label>
        <br />
        <input type="text" name="fnumber" onChange={handleChange} values={inputs.fnumber} required></input>
        <br></br>
        <label>quantity</label>
        <br />
        <input type="text" name="quantity" onChange={handleChange} values={inputs.quantity} required></input>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
