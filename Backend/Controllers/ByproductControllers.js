const User =require("../Model/ByproductModel");

const getAllBPrices = async(req,res,next) =>{

    let ByproductPrices;

    //get all product prices for farmers

    try{
        ByproductPrices = await User.find();
    }catch(err){
        console.log(err);
    }

    //not found

    if(!ByproductPrices){
        return res.status(404).json({message:"Product not found"})
    }

    //Display product

    return res.status(200).json({ ByproductPrices });

};

//data insert

const addPrice = async(req,res,next)=>{

    const {bp1,bp2,bp3,bp4,bp5} = req.body;

    let prices;

    try{
        prices = new User({bp1,bp2,bp3,bp4,bp5});
        await prices.save();
    }catch(err){
        console.log(err);
    }

    //not insert data

    if(!prices){
        return res.status(404).send({message:"unable to add users"});
    }

    return res.status(200).json({prices});
};

//Get by id

const getById = async(req,res,next)=>{

    const BPid = req.params.BPid;

    let Bproduct;

    try{
        Bproduct = await User.findById(BPid);
    }catch(err){
        console.log(err);
    }

    //not available users

    if(!Bproduct){
        return res.status(404).json({message:"unable to find users"});
    }

    return res.status(200).json({ Bproduct });

}

//Update bill details

const updateByProduct = async (req,res,next)=>{

    const BPid = req.params.BPid;
    const {bp1,bp2,bp3,bp4,bp5} = req.body;

    let Bprices;

    try{
        Bprices = await User.findByIdAndUpdate(BPid,
            {bp1:bp1,bp2:bp2,bp3:bp3,bp4:bp4,bp5:bp5});
            Bprices = await Bprices.save();
    }catch(err){
        console.log(err);
    }

    //if not update

    if(!Bprices){
        return res.status(404).json({message:"unable to update bill details"});
    }

    return res.status(200).json({ Bprices });


};

//Delete bill details

const deletePrices = async (req,res,next) =>{

    const BPid = req.params.BPid;

    let byproduct;

    try{
        byproduct = await User.findByIdAndDelete(BPid);
    }catch(err){
        console.log(err);
    }

    //unable to delete

    if(!byproduct){
        return res.status(404).json({message:"unable to delete bill details"});
    }

    return res.status(200).json({ byproduct });

};

exports.getAllBPrices = getAllBPrices;
exports.addPrice = addPrice;
exports.getById = getById;
exports.updateByProduct = updateByProduct;
exports.deletePrices = deletePrices;