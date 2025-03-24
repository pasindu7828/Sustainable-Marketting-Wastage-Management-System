import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UpdateFarmerPayment() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const {id} = useParams();

    console.log("Incoming ID",id);
    
    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:5000/Farmers/${id}`)
            .then((res)=>res.data)
            .then((data) =>setInputs(data.farmer));
        };
        fetchHandler();
    },[id]);

    console.log("Inputs data",inputs);

    const sendRequest = async ()=>{
        await axios
        .put(`http://localhost:5000/Farmers/${id}`,{
            fid:Number (inputs.fid),
            fname:Number (inputs.fname),
            pname:Number (inputs.pname),
            quantity:Number (inputs.quantity),
            billno:Number (inputs.billno),
            date:Number (inputs.date),
            amount:Number (inputs.amount),
            femail:Number (inputs.femail),
            fnumber:Number (inputs.fnumber),
        })
        .then((res) => res.data);
    };

    const handleChange = (e) =>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }));
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>history("/displayFarmerPayment"));
    };

  return (
    <div>
      <h1>Update Farmer Payment Details</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter NIC : </label>
        <br/>
        <input type="text" name="fid" onChange={handleChange} value={inputs?.fid} required></input>
        <br/><br/>
        
        <label>Enter Farmer Name: </label>
        <br/>
        <input type="text" name="fname" onChange={handleChange} value={inputs?.fname} required></input>
        <br/><br/>
      
        <label>Enter Product Names : </label>
        <br/>
        <input type="text" name="pname" onChange={handleChange} value={inputs?.pname} required></input>
        <br/><br/>
       
        <label>Enter Quantity: </label>
        <br/>
        <input type="text" name="quantity" onChange={handleChange} value={inputs?.quantity} required></input>
        <br/><br/>
       
        <label>Enter Bill Number : </label>
        <br/>
        <input type="text" name="billno" onChange={handleChange} value={inputs?.billno} required></input>
        <br/><br/>
      
        <label>Enter Date : </label>
        <br/>
        <input type="text" name="date" onChange={handleChange} value={inputs?.date} required></input>
        <br/><br/>
       
        <label>Enter Amount: </label>
        <br/>
        <input type="text" name="amount" onChange={handleChange} value={inputs?.amount} required></input>
        <br/><br/>
        
        <label>Enter Email: </label>
        <br/>
        <input type="text" name="femail" onChange={handleChange} value={inputs?.femail} required></input>
        <br/><br/>
        
        <label>Enter Contact Number: </label>
        <br/>
        <input type="text" name="fnumber" onChange={handleChange} value={inputs?.fnumber} required></input>
        <br/><br/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UpdateFarmerPayment
