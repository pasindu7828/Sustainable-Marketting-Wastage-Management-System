const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    spApple:{
        type:Number,//data type
        required:true,//validate
    },
    spOrange:{
        type:Number,
        required:true,
    },
    spBanana:{
        type:Number,
        required:true,
    },
    spGraphes:{
        type:Number,
        required:true,
    },
    spWatermelon:{
        type:Number,
        required:true,
    },
    spMango:{
        type:Number,
        required:true,
    },
    spWoodapple:{
        type:Number,
        required:true,
    },
    spPineapple:{
        type:Number,
        required:true,
    },
    spPapaya:{
        type:Number,
        required:true,
    },
    spGoava:{
        type:Number,
        required:true,
    }
    

});

module.exports=mongoose.model(
    "ShopPriceModel",//file name
    userSchema //function name
)