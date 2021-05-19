const User = require('../models/userModal');
const jwt = require('jsonwebtoken');
const authActiveUser = async (req,res,next) => {
    if(req.cookies['token']){//logged in
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        let user = await User.findById(decoded.id).exec();
        if(user.emailVerified) next();
        else res.redirect('/sentVerifyEmail');
    }
    else res.redirect('/login');
}
module.exports = authActiveUser;