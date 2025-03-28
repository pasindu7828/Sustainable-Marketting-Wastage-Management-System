const User =require("../Model/FinanceModel");

const getAllFarmers = async(req,res,next) =>{

    let Farmers;

    //get all billed farmers

    try{
        Farmers = await User.find();
    }catch(err){
        console.log(err);
    }

    //not found

    if(!Farmers){
        return res.status(404).json({message:"User not found"})
    }

    //Display billed farmers

    return res.status(200).json({ Farmers });

};

//data insert

const addBill = async(req,res,next)=>{

    const {fid,fname,pname,quantity,billno,date,amount,femail,fnumber} = req.body;

    let payments;

    try{
        payments = new User({fid,fname,pname,quantity,billno,date,amount,femail,fnumber});
        await payments.save();
    }catch(err){
        console.log(err);
    }

    //not insert data

    if(!payments){
        return res.status(404).send({message:"unable to add users"});
    }

    return res.status(200).json({payments});
};

//Get by id

const getById = async(req,res,next)=>{

    const id = req.params.id;

    let farmer;

    try{
        farmer = await User.findById(id);
    }catch(err){
        console.log(err);
    }

    //not available users

    if(!farmer){
        return res.status(404).json({message:"unable to find users"});
    }

    return res.status(200).json({ farmer });

}

//Update bill details

const updateBill = async (req,res,next)=>{

    const id = req.params.id;
    const {fid,fname,pname,quantity,billno,date,amount,femail,fnumber} = req.body;

    let bills;

    try{
        bills = await User.findByIdAndUpdate(id,
            {fid:fid,fname:fname,pname:pname,quantity:quantity,billno:billno,date:date,amount:amount,femail:femail,fnumber:fnumber});
            bills = await bills.save();
    }catch(err){
        console.log(err);
    }

    //if not update

    if(!bills){
        return res.status(404).json({message:"unable to update bill details"});
    }

    return res.status(200).json({ bills });


};

//Delete bill details

const deleteBills = async (req,res,next) =>{

    const id = req.params.id;

    let bill;

    try{
        bill = await User.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }

    //unable to delete

    if(!bill){
        return res.status(404).json({message:"unable to delete bill details"});
    }

    return res.status(200).json({ bill });

};

exports.getAllFarmers = getAllFarmers;
exports.addBill = addBill;
exports.getById = getById;
exports.updateBill = updateBill;
exports.deleteBills = deleteBills;