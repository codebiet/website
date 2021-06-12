const Events = require('../../models/events');

const EventById = async (req,res) => {
    const id = req.params.id;
    try{
        const event = await Events.findById(id).exec();
        if(!event) return res.status(404).send({errorMsg:"Not Found!"});
        return res.send({event});
    }catch(err){
        console.log(err);
        return res.status(500).send({errorMsg:"Status-Code: 500, Internal Server Error!"});
    }
}
module.exports = EventById;