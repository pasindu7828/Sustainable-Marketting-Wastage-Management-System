import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UpdateByProductDetails() {

    const [inputs, setInputs] = useState({});
        const history = useNavigate();
        const {id} = useParams();
    
        console.log("Incomming id",id);
    
    
        useEffect(()=>{
            const fetchHandler = async ()=>{
                await axios
                .get(`http://Localhost:5000/BadInventorys/${id}`)
                .then((res)=> res.data)
                .then((data)=> setInputs(data.BadInventorys));
            };
            fetchHandler();
        },[id]);
    
        console.log("Input data",inputs);
    
        const sendRequest  = async ()=>{
            await axios 
            .put(`http://localhost:5000/BadInventorys/${id}`,{
            
          Bp1:Number (inputs.Bp1),
          Bp2:Number (inputs.Bp2),
          Bp3:Number (inputs.Bp3),
          Bp4:Number (inputs.Bp4),
          Bp5:Number (inputs.Bp5),
          
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
            sendRequest().then(()=>history('/DisplayByProductDetails'))
          };
        

  return (
    <div>
      <h1>update</h1>
      <form onSubmit={handleSubmit}>
        <label>Bp1</label>
        <br />
        <input type="text" name="Bp1" onChange={handleChange} value={inputs?.Bp1} required></input>
        <br></br>
        <label>Bp2</label>
        <br/>
        <input type="text" name="Bp2" onChange={handleChange} value={inputs?.Bp2} required></input>
        <br></br>
        <label>Bp3</label>
        <br />
        <input type="text" name="Bp3" onChange={handleChange} value={inputs?.Bp3} required></input>
        <br></br>
        <label>Bp4</label>
        <br />
        <input type="text" name="Bp4" onChange={handleChange} value={inputs?.Bp4} required></input>
        <br></br>
        <label>Bp5</label>
        <br />
        <input type="text" name="Bp5" onChange={handleChange} value={inputs?.Bp5} required></input>
        <br></br>
       
        <button>Submit</button>
      </form>


    </div>
  );
}

export default UpdateByProductDetails;
