const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema ({
    Bp1:{
        type:Number,//dataType
        required:true,//Validate
    },
    Bp2:{
        type:Number,//dataType
        required:true,//Validate
    },
    Bp3:{
        type:Number,//dataType
        required:true,//Validate
    },
    Bp4:{
        type:Number,//dataType
        required:true,//Validate
    },
    Bp5:{
        type:Number,//dataType
        required:true,//Validate
    }
    
    

},{
    timestamps:true,
});


module.exports = mongoose.model(
    "BadInventoryModel",//file name
    inventorySchema  //function name
    

)   
