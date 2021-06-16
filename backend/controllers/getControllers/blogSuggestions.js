const Blogs = require('../../models/blogs');
module.exports = async (req,res) => {
    try{
        const suggestions = await Blogs.find({state:"AVAILABLE",approvedSuggestion:true});
        return res.send({suggestions});
    }catch(err){
        console.log(err);
        return res.status(500).send({errorMsg:"Status-Code: 500, Internal Server Error!"});
    }
}
