const Inventory = require("../Model/BadInventoryModel");

// data display 

const getAllInventory = async (req,res,next)=>{

    let BadInventorys;

    // Get all inventory
    try{
        BadInventorys = await Inventory.find();
    }catch (err) {
        console.log(err);
    }

    // not found
    if(!BadInventorys){

        return res.status(404).json({message:"Inventory not found"});

    }
    //Display all inventory
       
        return res.status(200).json({ BadInventorys });
};

// data insert

const addInventorys = async (req,res,next)=> {

    const{Bp1,Bp2,Bp3,Bp4,Bp5} = req.body;

    let BadInventorys;

    try{
        BadInventorys = new Inventory({Bp1,Bp2,Bp3,Bp4,Bp5});
        
        await BadInventorys.save();
    }catch (err){
        console.log(err);
    }

    // not insert inventorys
    if(!BadInventorys){
        return res.status(404).send({message:"unable to add users"});
    }
    return res.status(200).json({ BadInventorys });


};

// Get by id 

const getById = async(req,res,next) =>{

    const id = req.params.id;

    let BadInventorys;

    try{
        BadInventorys = await Inventory.findById(id);
    }catch (err){
        console.log(err);
    }

     // not available inventorys
     if(!BadInventorys){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({ BadInventorys });
};

// Update inventory details

const updateInventory = async(req,res,next) =>{

    const id = req.params.id;
    const{Bp1,Bp2,Bp3,Bp4,Bp5} = req.body;

    let BadInventorys;

    try{
        BadInventorys = await Inventory.findByIdAndUpdate(id,
            {Bp1: Bp1,Bp2: Bp2,Bp3: Bp3,Bp4: Bp4,Bp5: Bp5});
                BadInventorys = await BadInventorys.save();
    }catch(err){
        console.log(err);
    }

    // not available inventorys
    if(!BadInventorys){
        return res.status(404).json({message:"Unable to update inventory details"});
    }
    return res.status(200).json({ BadInventorys });
};

// Delete inventory

const deleteInventory = async(req,res,next) =>{
    const id = req.params.id;

    let BadInventorys;

    try{
        BadInventorys = await Inventory.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }

     // not available inventorys

    if(!BadInventorys){
        return res.status(404).json({message:"Unable to delete inventory details"});
    }
    return res.status(200).json({ BadInventorys });



};



exports.getAllInventory = getAllInventory;
exports.addInventorys = addInventorys;
exports.getById = getById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;
