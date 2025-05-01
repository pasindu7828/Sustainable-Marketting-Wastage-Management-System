const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema ({
    pid:{
        type:Number,//dataType
        required:true,//Validate
    },
    pname:{
        type:String,//dataType
        required:true,//Validate
    },
    fid:{
        type:Number,//dataType
        required:true,//Validate
    },
    fname:{
        type:String,//dataType
        required:true,//Validate
    },
    fnumber:{
        type:Number,//dataType
        required:true,//Validate
    },
    quantity:{
        type:Number,//dataType
        required:true,//Validate
    }

},{
    timestamps:true,
});


module.exports = mongoose.model(
    "InventoryModel",//file name
    inventorySchema  //function name
    

)   

