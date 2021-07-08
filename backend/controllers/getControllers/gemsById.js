const User = require("../../models/userModal");


const GemsById = async (req,res) => {

    try{
        let gems = await User.findById(req.params.id);
        return res.status(200).send({gems})
    }catch(err){
        console.log(err);
        return res.status(500).send({errorMsg:"Status-Code: 500, Internal Server Error!"});
    }
}
module.exports = GemsById;