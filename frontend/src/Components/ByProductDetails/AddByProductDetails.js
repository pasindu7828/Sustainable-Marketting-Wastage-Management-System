import React, {useState} from 'react';
import ByProductNav from "../Nav/ByProductNav";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function AddByProductDetails() {
  const history = useNavigate();
  const [inputs,setInputs] = useState({
   
    Bp1:"",
    Bp2:"",
    Bp3:"",
    Bp4:"",
    Bp5:"",
   

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
    sendRequest().then(()=>history('/DisplayByProductDetails'))
  }

  const sendRequest = async()=>{
    await axios.post("http://Localhost:5000/BadInventorys",{
        Bp1:Number (inputs.Bp1),
        Bp2:Number (inputs.Bp2),
        Bp3:Number (inputs.Bp3),
        Bp4:Number (inputs.Bp4),
        Bp5:Number (inputs.Bp5),
      
    }).then(res => res.data);
  }

  return (
    <div>
       <ByProductNav/>
      <h1>Add BYProduct</h1>
      <form onSubmit={handleSubmit}>
        <label>Bp1</label>
        <br />
        <input type="text" name="Bp1" onChange={handleChange} values={inputs.Bp1} required></input>
        <br></br>
        <label>Bp2</label>
        <br/>
        <input type="text" name="Bp2" onChange={handleChange} values={inputs.Bp2} required></input>
        <br></br>
        <label>Bp3</label>
        <br />
        <input type="text" name="Bp3" onChange={handleChange} values={inputs.Bp3} required></input>
        <br></br>
        <label>Bp4</label>
        <br />
        <input type="text" name="Bp4" onChange={handleChange} values={inputs.Bp4} required></input>
        <br></br>
        <label>Bp5</label>
        <br />
        <input type="text" name="Bp5" onChange={handleChange} values={inputs.Bp5} required></input>
        <br></br>
       
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddByProductDetails;
