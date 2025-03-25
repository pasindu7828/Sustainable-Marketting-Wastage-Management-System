import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UpdateShopProductDetails() {

    const [inputs, setInputs] = useState({});
            const history = useNavigate();
            const {id} = useParams();
        
            console.log("Incomming id",id);
        
        
            useEffect(()=>{
                const fetchHandler = async ()=>{
                    await axios
                    .get(`http://Localhost:5000/GoodInventorys/${id}`)
                    .then((res)=> res.data)
                    .then((data)=> setInputs(data.GoodInventorys));
                };
                fetchHandler();
            },[id]);
        
            console.log("Input data",inputs);
        
            const sendRequest  = async ()=>{
                await axios 
                .put(`http://localhost:5000/GoodInventorys/${id}`,{
                
              
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
                sendRequest().then(()=>history('/DisplayShopProductDetails'))
              };
            


  return (
    <div>
       <h1>Add Shop Products</h1>
            <form onSubmit={handleSubmit}>
              <label>totalapple</label>
              <br />
              <input type="text" name="totalapple" onChange={handleChange} value={inputs?.totalapple} required></input>
              <br></br>
              <label>totalorange</label>
              <br/>
              <input type="text" name="totalorange" onChange={handleChange} value={inputs?.totalorange} required></input>
              <br></br>
              <label>totalbanana</label>
              <br />
              <input type="text" name="totalbanana" onChange={handleChange} value={inputs?.totalbanana} required></input>
              <br></br>
              <label>totalgrapes</label>
              <br />
              <input type="text" name="totalgrapes" onChange={handleChange} value={inputs?.totalgrapes} required></input>
              <br></br>
              <label>totalwatermelon</label>
              <br />
              <input type="text" name="totalwatermelon" onChange={handleChange} value={inputs?.totalwatermelon} required></input>
              <br></br>
              <label>totalmango</label>
        <br />
        <input type="text" name="totalmango" onChange={handleChange} value={inputs?.totalmango} required></input>
        <br></br>
        <label>totalwoodapple</label>
        <br/>
        <input type="text" name="totalwoodapple" onChange={handleChange} value={inputs?.totalwoodapple} required></input>
        <br></br>
        <label>totalpineapple</label>
        <br />
        <input type="text" name="totalpineapple" onChange={handleChange} value={inputs?.totalpineapple} required></input>
        <br></br>
        <label>totalpapaya</label>
        <br />
        <input type="text" name="totalpapaya" onChange={handleChange} value={inputs?.totalpapaya} required></input>
        <br></br>
        <label>totalguava</label>
        <br />
        <input type="text" name="totalguava" onChange={handleChange} value={inputs?.totalguava} required></input>
        <br></br>


        <label>shopapple</label>
              <br />
              <input type="text" name="shopapple" onChange={handleChange} value={inputs?.shopapple} required></input>
              <br></br>
              <label>shoporange</label>
              <br/>
              <input type="text" name="shoporange" onChange={handleChange} value={inputs?.shoporange} required></input>
              <br></br>
              <label>shopbanana</label>
              <br />
              <input type="text" name="shopbanana" onChange={handleChange} value={inputs?.shopbanana} required></input>
              <br></br>
              <label>shopgrapes</label>
              <br />
              <input type="text" name="shopgrapes" onChange={handleChange} value={inputs?.shopgrapes} required></input>
              <br></br>
              <label>shopwatermelon</label>
              <br />
              <input type="text" name="shopwatermelon" onChange={handleChange} value={inputs?.shopwatermelon} required></input>
              <br></br>
              <label>shopmango</label>
        <br />
        <input type="text" name="shopmango" onChange={handleChange} value={inputs?.shopmango} required></input>
        <br></br>
        <label>shopwoodapple</label>
        <br/>
        <input type="text" name="shopwoodapple" onChange={handleChange} value={inputs?.shopwoodapple} required></input>
        <br></br>
        <label>shoppineapple</label>
        <br />
        <input type="text" name="shoppineapple" onChange={handleChange} value={inputs?.shoppineapple} required></input>
        <br></br>
        <label>shoppapaya</label>
        <br />
        <input type="text" name="shoppapaya" onChange={handleChange} value={inputs?.shoppapaya} required></input>
        <br></br>
        <label>shopguava</label>
        <br />
        <input type="text" name="shopguava" onChange={handleChange} value={inputs?.shopguava} required></input>
        <br></br>
                 
              <button>Submit</button>
            </form>
    </div>
  );
}

export default UpdateShopProductDetails;
