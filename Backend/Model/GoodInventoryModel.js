const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema ({
    totalapple:{
        type:Number,//dataType
        required:true,//Validate
    },
    totalorange:{
        type:Number,//dataType
        required:true,//Validate
    },
    totalbanana:{
        type:Number,//dataType
        required:true,//Validate
    },
    totalgrapes:{
        type:Number,//dataType
        required:true,//Validate
    },
    totalwatermelon:{
        type:Number,//dataType
        required:true,//Validate
    },
    totalmango:{
        type:Number,//dataType
        required:true,//Validate
    },
    totalwoodapple:{
        type:Number,//dataType
        required:true,//Validate
    },
    totalpineapple:{
        type:Number,//dataType
        required:true,//Validate
    },
    totalpapaya:{
        type:Number,//dataType
        required:true,//Validate
    },
    totalguava:{
        type:Number,//dataType
        required:true,//Validate
    },
    shopapple:{
        type:Number,//dataType
        required:true,//Validate
    },
    shoporange:{
        type:Number,//dataType
        required:true,//Validate
    },
    shopbanana:{
        type:Number,//dataType
        required:true,//Validate
    },
    shopgrapes:{
        type:Number,//dataType
        required:true,//Validate
    },
    shopwatermelon:{
        type:Number,//dataType
        required:true,//Validate
    },
    shopmango:{
        type:Number,//dataType
        required:true,//Validate
    },
    shopwoodapple:{
        type:Number,//dataType
        required:true,//Validate
    },
    shoppineapple:{
        type:Number,//dataType
        required:true,//Validate
    },
    shoppapaya:{
        type:Number,//dataType
        required:true,//Validate
    },
    shopguava:{
        type:Number,//dataType
        required:true,//Validate
    }

});


module.exports = mongoose.model(
    "GoodInventoryModel",//file name
    inventorySchema  //function name
    

)   
