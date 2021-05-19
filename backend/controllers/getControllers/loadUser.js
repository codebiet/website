const config = require('config');
const User = require('../../models/userModal');
const jwt = require('jsonwebtoken');
module.exports = async (req,res) => {
    const token = req.cookies['token'];
    if(!token)return res.status(401).send({errorMsg:'Unauthorized!'});
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        let user = await User.findById(decoded.id).exec();
        let userData = {
            userName:user.name,
            userId:user._id,
            emailVerified:user.emailVerified,
            phoneNumberVerified:user.phoneNumberVerified
        }
        res.set('Cache-Control','no-store');
        req.session.userId = user._id;
        return res.status(200).send({...userData});
    }
    catch(e){
        console.log(e);
        return res.status(400).send({errorMsg:'Invalid Token!'});
    }

}