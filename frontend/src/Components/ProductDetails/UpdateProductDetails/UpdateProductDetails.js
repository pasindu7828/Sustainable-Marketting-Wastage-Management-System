import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function UpdateProductDetails() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const {id} = useParams();

    console.log("Incomming id",id);


    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://Localhost:5000/Inventorys/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.inventory));
        };
        fetchHandler();
    },[id]);

console.log(inputs);

    const sendRequest  = async ()=>{
        await axios 
        .put(`http://localhost:5000/Inventorys/${id}`,{
        
      pid:Number (inputs.pid),
      pname:String (inputs.pname),
      fid:Number (inputs.fid),
      fname:String (inputs.fname),
      fnumber:Number (inputs.fnumber),
      quantity:Number (inputs.quantity),
        })
        .then((res) => res.data);
    };

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
      };
    

  return (
    <div>
      <h1>update</h1>
      <form onSubmit={handleSubmit}>
        <label>pid</label>
        <br />
        <input type="text" name="pid" onChange={handleChange} value={inputs?.pid} required></input>
        <br></br>
        <label>pname</label>
        <br/>
        <input type="text" name="pname" onChange={handleChange} value={inputs?.pname} required></input>
        <br></br>
        <label>fid</label>
        <br />
        <input type="text" name="fid" onChange={handleChange} value={inputs?.fid} required></input>
        <br></br>
        <label>fname</label>
        <br />
        <input type="text" name="fname" onChange={handleChange} value={inputs?.fname} required></input>
        <br></br>
        <label>fnumber</label>
        <br />
        <input type="text" name="fnumber" onChange={handleChange} value={inputs?.fnumber} required></input>
        <br></br>
        <label>quantity</label>
        <br />
        <input type="text" name="quantity" onChange={handleChange} value={inputs?.quantity} required></input>
        <br></br>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default UpdateProductDetails;
