import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewByProductDetails(props) {

    const {_id,Bp1,Bp2,Bp3,Bp4,Bp5} = props.user;

    const history = useNavigate();

    const deleteHandler = async()=>{
      await axios.delete(`http://localhost:5000/BadInventorys/${_id}`)
      .then(res=>res.data)
      .then(() =>history("/"))
      .then(() =>history("/DisplayByProductDetails"))
    }

  return (
    <div>
        <hi>Display</hi>
                <br></br>
                <h1>id :{_id} </h1>
                <h1>Bp1 :{Bp1} </h1>
                <h1>Bp2 :{Bp2} </h1>
                <h1>Bp3 :{Bp3} </h1>
                <h1>Bp4 :{Bp4} </h1>
                <h1>Bp5 :{Bp5} </h1>
               
                <Link to={`/DisplayByProductDetails/${_id}`}>Update</Link>
                <button onClick={deleteHandler}>Delete</button>
      
    </div>
  );
}

export default ViewByProductDetails;

