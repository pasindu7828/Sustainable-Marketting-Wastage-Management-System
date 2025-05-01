const Inventory = require("../Model/GoodInventoryModel");

// data display 

const getAllInventory = async (req,res,next)=>{

    let GoodInventorys;

    // Get all inventory
    try{
        GoodInventorys = await Inventory.find();
    }catch (err) {
        console.log(err);
    }

    // not found
    if(!GoodInventorys){

        return res.status(404).json({message:"Inventory not found"});

    }
    //Display all inventory
       
        return res.status(200).json({ GoodInventorys });
};

// data insert

const addInventorys = async (req,res,next)=> {

    const{totalapple,totalorange,totalbanana,totalgrapes,totalwatermelon,totalmango,
        totalwoodapple,totalpineapple,totalpapaya,totalguava,shopapple,shoporange,shopbanana
        ,shopgrapes,shopwatermelon,shopmango,shopwoodapple,shoppineapple,shoppapaya,shopguava} = req.body;

    let GoodInventorys;

    try{
        GoodInventorys = new Inventory({totalapple,totalorange,totalbanana,totalgrapes,
            totalwatermelon,totalmango,totalwoodapple,totalpineapple,totalpapaya,totalguava,shopapple
        ,shoporange,shopbanana,shopgrapes,shopwatermelon,shopmango,shopwoodapple,shoppineapple,shoppapaya,shopguava});
        
        await GoodInventorys.save();
    }catch (err){
        console.log(err);
    }

    // not insert inventorys
    if(!GoodInventorys){
        return res.status(404).send({message:"unable to add users"});
    }
    return res.status(200).json({ GoodInventorys });


};

// Get by id 

const getById = async(req,res,next) =>{

    const id = req.params.id;

    let GoodInventorys;

    try{
        GoodInventorys = await Inventory.findById(id);
    }catch (err){
        console.log(err);
    }

     // not available inventorys
     if(!GoodInventorys){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({ GoodInventorys });
};

// Update inventory details

const updateInventory = async(req,res,next) =>{

    const id = req.params.id;
    const{totalapple,totalorange,totalbanana,totalgrapes,totalwatermelon,totalmango,
        totalwoodapple,totalpineapple,totalpapaya,totalguava,shopapple,shoporange,shopbanana
        ,shopgrapes,shopwatermelon,shopmango,shopwoodapple,shoppineapple,shoppapaya,shopguava} = req.body;

    let GoodInventorys;

    try{
        GoodInventorys = await Inventory.findByIdAndUpdate(id,
            {totalapple: totalapple, totalorange: totalorange, totalbanana: totalbanana, 
                totalgrapes: totalgrapes,totalwatermelon: totalwatermelon, totalmango: totalmango,
                totalwoodapple: totalwoodapple,totalpineapple: totalpineapple,totalpapaya: totalpapaya,totalguava: totalguava,shopapple: shopapple,
                shoporange: shoporange, shopbanana: shopbanana, shopgrapes: shopgrapes, 
                shopwatermelon: shopwatermelon,shopmango: shopmango, shopwoodapple: shopwoodapple,
                shoppineapple: shoppineapple,shoppapaya: shoppapaya,shopguava: shopguava});
            GoodInventorys = await GoodInventorys.save();
    }catch(err){
        console.log(err);
    }

    // not available inventorys
    if(!GoodInventorys){
        return res.status(404).json({message:"Unable to update inventory details"});
    }
    return res.status(200).json({ GoodInventorys });
};

// Delete inventory

const deleteInventory = async(req,res,next) =>{
    const id = req.params.id;

    let GoodInventorys;

    try{
        GoodInventorys = await Inventory.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }

     // not available inventorys

    if(!GoodInventorys){
        return res.status(404).json({message:"Unable to delete inventory details"});
    }
    return res.status(200).json({ GoodInventorys });



};



exports.getAllInventory = getAllInventory;
exports.addInventorys = addInventorys;
exports.getById = getById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
