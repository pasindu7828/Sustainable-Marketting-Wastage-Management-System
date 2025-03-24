const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    bp1:{
        type:Number,//data type
        required:true,//validate
    },
    bp2:{
        type:Number,
        required:true,
    },
    bp3:{
        type:Number,
        required:true,
    },
    bp4:{
        type:Number,
        required:true,
    },
    bp5:{
        type:Number,
        required:true,
    }
    
});

module.exports=mongoose.model(
    "ByproductModel",//file name
    userSchema //function name
)