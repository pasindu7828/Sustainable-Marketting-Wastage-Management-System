const User =require("../Model/FarmerPriceModel");

const getAllFarmerPrices = async(req,res,next) =>{

    let FarmerPrices;

    //get all prices for farmers

    try{
        FarmerPrices = await User.find();
    }catch(err){
        console.log(err);
    }

    //not found

    if(!FarmerPrices){
        return res.status(404).json({message:"Product not found"})
    }

    //Display price list for farmers

    return res.status(200).json({ FarmerPrices });

};

//data insert

const addFarmerPrice = async(req,res,next)=>{

    const {fpApple,fpOrange,fpBanana,fpGraphes,fpWatermelon,fpMango,fpWoodapple,fpPineapple,fpPapaya,fpGoava} = req.body;

    let fPrices;

    try{
        fPrices = new User({fpApple,fpOrange,fpBanana,fpGraphes,fpWatermelon,fpMango,fpWoodapple,fpPineapple,fpPapaya,fpGoava});
        await fPrices.save();
    }catch(err){
        console.log(err);
    }

    //not insert data

    if(!fPrices){
        return res.status(404).send({message:"unable to add Prices"});
    }

    return res.status(200).json({fPrices});
};

//Get by id
/**
const getById = async(req,res,next)=>{

    const FPid = req.params.FPid;

    let FproductPrice;

    try{
        FproductPrice = await User.findById(FPid);
    }catch(err){
        console.log(err);
    }

    //not available products

    if(!FproductPrice){
        return res.status(404).json({message:"unable to find product"});
    }

    return res.status(200).json({ FproductPrice });

}
    */
const getById = async (req, res, next) => {
    const { pname } = req.params; // Get product name from request parameters

    let farmerPrices;

    try {
        // Fetch the first document (assuming there's only one)
        farmerPrices = await User.findOne();
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

    // If no data is found
    if (!farmerPrices) {
        return res.status(404).json({ message: "Farmer price data not found" });
    }

    // Construct the key dynamically (e.g., "fpApple" for "Apple")
    const priceKey = `fp${pname}`;

    // Check if the field exists in the document
    if (!(priceKey in farmerPrices)) {
        return res.status(404).json({ message: `Price for ${pname} not found` });
    }

    // Return the corresponding price
    return res.status(200).json({ price: farmerPrices[priceKey] });
};

//Update bill details

const updateFarmerPrices = async (req,res,next)=>{

    const FPid = req.params.FPid;
    const {fpApple,fpOrange,fpBanana,fpGraphes,fpWatermelon,fpMango,fpWoodapple,fpPineapple,fpPapaya,fpGoava} = req.body;

    let farPrices;

    try{
        farPrices = await User.findByIdAndUpdate(FPid,
            {fpApple:fpApple,fpOrange:fpOrange,fpBanana:fpBanana,fpGraphes:fpGraphes,fpWatermelon:fpWatermelon,fpMango:fpMango,fpWoodapple:fpWoodapple,fpPineapple:fpPineapple,fpPapaya:fpPapaya,fpGoava:fpGoava});
            farPrices = await farPrices.save();
    }catch(err){
        console.log(err);
    }

    //if not update

    if(!farPrices){
        return res.status(404).json({message:"unable to update price details"});
    }

    return res.status(200).json({ farPrices });


};

//Delete bill details

const deleteFarmerPrices = async (req,res,next) =>{

    const FPid = req.params.FPid;

    let deletefPrice;

    try{
        deletefPrice = await User.findByIdAndDelete(FPid);
    }catch(err){
        console.log(err);
    }

    //unable to delete

    if(!deletefPrice){
        return res.status(404).json({message:"unable to delete price details"});
    }

    return res.status(200).json({ deletefPrice });

};

exports.getAllFarmerPrices = getAllFarmerPrices;
exports.addFarmerPrice = addFarmerPrice;
exports.getById = getById;
exports.updateFarmerPrices = updateFarmerPrices;
exports.deleteFarmerPrices = deleteFarmerPrices;