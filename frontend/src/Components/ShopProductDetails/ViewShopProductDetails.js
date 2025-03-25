import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewShopProductDetails(props) {

    const {_id,totalapple,totalorange,totalbanana,totalgrapes,totalwatermelon,totalmango,
        totalwoodapple,totalpineapple,totalpapaya,totalguava,shopapple,shoporange,shopbanana
        ,shopgrapes,shopwatermelon,shopmango,shopwoodapple,shoppineapple
        ,shoppapaya,shopguava} = props.user;

        const history = useNavigate();
        
            const deleteHandler = async()=>{
              await axios.delete(`http://localhost:5000/GoodInventorys/${_id}`)
              .then(res=>res.data)
              .then(() =>history("/"))
              .then(() =>history("/DisplayShopProductDetails"))
            }


  return (
    <div>
      
    <hi>Display product quantity in shop</hi>
    <br></br>
    <h1>id :{_id} </h1>
    <h1>totalapple:{totalapple}</h1>
    <h1>totalorange:{totalorange}</h1>
    <h1>totalbanana:{totalbanana}</h1>
    <h1>totalgrapes:{totalgrapes}</h1>
    <h1>totalwatermelon:{totalwatermelon}</h1>
    <h1>totalmango:{totalmango}</h1>
    <h1>totalwoodapple:{totalwoodapple}</h1>
    <h1>totalpineapple:{totalpineapple}</h1>
    <h1>totalpapaya:{totalpapaya}</h1>
    <h1>totalguava:{totalguava}</h1>
    <h1>shopapple:{shopapple}</h1>
    <h1>shoporange:{shoporange}</h1>
    <h1>shopbanana:{shopbanana}</h1>
    <h1>shopgrapes:{shopgrapes}</h1>
    <h1>shopwatermelon:{shopwatermelon}</h1>
    <h1>shopmango:{shopmango}</h1>
    <h1>shopwoodapple:{shopwoodapple}</h1>
    <h1>shoppineapple:{shoppineapple}</h1>
    <h1>shoppapaya:{shoppapaya}</h1>
    <h1>shopguava:{shopguava}</h1>
                     
    <Link to={`/DisplayShopProductDetails/${_id}`}>Update</Link>
     <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default ViewShopProductDetails;
