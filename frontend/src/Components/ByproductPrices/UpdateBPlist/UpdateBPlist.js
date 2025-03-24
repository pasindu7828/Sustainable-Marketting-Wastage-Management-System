import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function UpdateBPlist() {

    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const {id} = useParams();

    console.log("Incoming ID",id);
    
    useEffect(()=>{
        const fetchHandler = async ()=>{
            await axios
            .get(`http://localhost:5000/ByproductPrices/${id}`)
            .then((res)=>res.data)
            .then((data) =>setInputs(data.Bproduct));
        };
        fetchHandler();
    },[id]);

    console.log("Inputs data",inputs);
    

    const sendRequest = async ()=>{
        await axios
        .put(`http://localhost:5000/ByproductPrices/${id}`,{
            bp1:Number (inputs.bp1),
            bp2:Number (inputs.bp2),
            bp3:Number (inputs.bp3),
            bp4:Number (inputs.bp4),
            bp5:Number (inputs.bp5),
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
        sendRequest().then(()=>history("/BPPriceDetails"));
    };

  return (
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <label>By Product 1 (500 ml) : </label>
        <br/>
        <input type="text" name="bp1" onChange={handleChange} value={inputs?.bp1} required></input>
        <br/><br/>
        <br/><br/>
        <label>By Product 2 (500 ml) : </label>
        <br/>
        <input type="text" name="bp2" onChange={handleChange} value={inputs?.bp2} required></input>
        <br/><br/>
        <br/><br/>
        <label>By Product 3 (500 ml) : </label>
        <br/>
        <input type="text" name="bp3" onChange={handleChange} value={inputs?.bp3} required></input>
        <br/><br/>
        <br/><br/>
        <label>By Product 4 (500 ml) : </label>
        <br/>
        <input type="text" name="bp4" onChange={handleChange} value={inputs?.bp4} required></input>
        <br/><br/>
        <br/><br/>
        <label>By Product 5 (500 ml) : </label>
        <br/>
        <input type="text" name="bp5" onChange={handleChange} value={inputs?.bp5} required></input>
        <br/><br/>
        <br/><br/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UpdateBPlist
