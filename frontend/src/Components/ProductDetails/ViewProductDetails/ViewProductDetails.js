import React from 'react';

function ViewProductDetails(props) {
    const {_id,pid,pname,fid,fname,fnumber,quantity} = props.user;

  return (
    <div>
        <hi>Display</hi>
        <br></br>
        <h1>id :{_id} </h1>
        <h1>pid :{pid} </h1>
        <h1>pname :{pname} </h1>
        <h1>fid :{fid} </h1>
        <h1>fname :{fname} </h1>
        <h1>fnumber :{fnumber} </h1>
        <h1>quantity :{quantity} </h1>
        <button>Update</button>
        <button>Delete</button>
      
    </div>
  );
}

export default ViewProductDetails;
