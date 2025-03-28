const Inventory = require("../Model/InventoryModel");

// data display 

const getAllInventory = async (req,res,next)=>{

    let Inventorys;

    // Get all inventory
    try{
        Inventorys = await Inventory.find();
    }catch (err) {
        console.log(err);
    }

    // not found
    if(!Inventorys){

        return res.status(404).json({message:"Inventory not found"});

    }
    //Display all inventory
       
        return res.status(200).json({ Inventorys });
};

// data insert

const addInventorys = async (req,res,next)=> {

    const{pid,pname,fid,fname,fnumber,quantity} = req.body;

    let inventorys;

    try{
        inventorys = new Inventory({pid,pname,fid,fname,fnumber,quantity});
        await inventorys.save();
    }catch (err){
        console.log(err);
    }

    // not insert inventorys
    if(!inventorys){
        return res.status(404).send({message:"unable to add users"});
    }
    return res.status(200).json({ inventorys });


};

// Get by id 

const getById = async(req,res,next) =>{

    const id = req.params.id;

    let inventory;

    try{
        inventory = await Inventory.findById(id);
    }catch (err){
        console.log(err);
    }

     // not available inventorys
     if(!inventory){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({ inventory });
};

// Update inventory details

const updateInventory = async(req,res,next) =>{

    const id = req.params.id;
    const{pid,pname,fid,fname,fnumber,quantity} = req.body;

    let inventorys;

    try{
        inventorys = await Inventory.findByIdAndUpdate(id,
            {pid: pid, pname: pname, fid: fid, fname: fname,fnumber: fnumber, quantity: quantity});
            inventorys = await inventorys.save();
    }catch(err){
        console.log(err);
    }

    // not available inventorys
    if(!inventorys){
        return res.status(404).json({message:"Unable to update inventory details"});
    }
    return res.status(200).json({ inventorys });
};

// Delete inventory

const deleteInventory = async(req,res,next) =>{
    const id = req.params.id;

    let inventory;

    try{
        inventory = await Inventory.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }

     // not available inventorys

    if(!inventory){
        return res.status(404).json({message:"Unable to delete inventory details"});
    }
    return res.status(200).json({ inventory });



};



exports.getAllInventory = getAllInventory;
exports.addInventorys = addInventorys;
exports.getById = getById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
