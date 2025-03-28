const User =require("../Model/ShopPriceModel");

const getAllShopPrices = async(req,res,next) =>{

    let ShopPrices;

    //get all prices for farmers

    try{
        ShopPrices = await User.find();
    }catch(err){
        console.log(err);
    }

    //not found

    if(!ShopPrices){
        return res.status(404).json({message:"Product not found"})
    }

    //Display price list for farmers

    return res.status(200).json({ ShopPrices });

};

//data insert

const addShopPrice = async(req,res,next)=>{

    const {spApple,spOrange,spBanana,spGraphes,spWatermelon,spMango,spWoodapple,spPineapple,spPapaya,spGoava} = req.body;

    let sPrices;

    try{
        sPrices = new User({spApple,spOrange,spBanana,spGraphes,spWatermelon,spMango,spWoodapple,spPineapple,spPapaya,spGoava});
        await sPrices.save();
    }catch(err){
        console.log(err);
    }

    //not insert data

    if(!sPrices){
        return res.status(404).send({message:"unable to add Prices"});
    }

    return res.status(200).json({sPrices});
};

//Get by id

const getById = async(req,res,next)=>{

    const SPid = req.params.SPid;

    let SproductPrice;

    try{
        SproductPrice = await User.findById(SPid);
    }catch(err){
        console.log(err);
    }

    //not available products

    if(!SproductPrice){
        return res.status(404).json({message:"unable to find product"});
    }

    return res.status(200).json({ SproductPrice });

}

//Update bill details

const updateShopPrices = async (req,res,next)=>{

    const SPid = req.params.SPid;
    const {spApple,spOrange,spBanana,spGraphes,spWatermelon,spMango,spWoodapple,spPineapple,spPapaya,spGoava} = req.body;

    let ShPrices;

    try{
        ShPrices = await User.findByIdAndUpdate(SPid,
            {spApple:spApple,spOrange:spOrange,spBanana:spBanana,spGraphes:spGraphes,spWatermelon:spWatermelon,spMango:spMango,spWoodapple:spWoodapple,spPineapple:spPineapple,spPapaya:spPapaya,spGoava:spGoava});
            ShPrices = await ShPrices.save();
    }catch(err){
        console.log(err);
    }

    //if not update

    if(!ShPrices){
        return res.status(404).json({message:"unable to update price details"});
    }

    return res.status(200).json({ ShPrices });


};

//Delete bill details

const deleteShopPrices = async (req,res,next) =>{

    const SPid = req.params.SPid;

    let deletesPrice;

    try{
        deletesPrice = await User.findByIdAndDelete(SPid);
    }catch(err){
        console.log(err);
    }

    //unable to delete

    if(!deletesPrice){
        return res.status(404).json({message:"unable to delete price details"});
    }

    return res.status(200).json({ deletesPrice });

};

exports.getAllShopPrices = getAllShopPrices;
exports.addShopPrice = addShopPrice;
exports.getById = getById;
exports.updateShopPrices = updateShopPrices;
exports.deleteShopPrices = deleteShopPrices;