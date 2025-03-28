const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fid:{
        type:Number,//data type
        required:true,//validate
    },
    fname:{
        type:String,
        required:true,
    },
    pname:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    billno:{
        type:String,
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    femail:{
        type:String,
        required:true,
    },
    fnumber:{
        type:Number,
        required:true,
    }
    

},
{ timestamps: true } // Enable timestamps for createdAt and updatedAt
);

module.exports=mongoose.model(
    "FinanceModel",//file name
    userSchema //function name
)