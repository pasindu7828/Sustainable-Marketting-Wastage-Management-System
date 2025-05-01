const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fpApple:{
        type:Number,//data type
        required:true,//validate
    },
    fpOrange:{
        type:Number,
        required:true,
    },
    fpBanana:{
        type:Number,
        required:true,
    },
    fpGrapes:{
        type:Number,
        required:true,
    },
    fpWatermelon:{
        type:Number,
        required:true,
    },
    fpMango:{
        type:Number,
        required:true,
    },
    fpWoodapple:{
        type:Number,
        required:true,
    },
    fpPineapple:{
        type:Number,
        required:true,
    },
    fpPapaya:{
        type:Number,
        required:true,
    },
    fpGuava:{
        type:Number,
        required:true,
    }
    

},
{ timestamps: true } 
);

module.exports=mongoose.model(
    "FarmerPriceModel",//file name
    userSchema //function name
)