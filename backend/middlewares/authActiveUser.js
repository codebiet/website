const User = require('../models/userModal');

const authActiveUser = async (req,res,next) => {
    if(req.session.userId){//logged in
        const user = await User.findById(req.session.userId).exec();
        if(user.emailVerified && user.phoneNumberVerified) next();
        else res.redirect('/verifyEmailAndPhone');
    }
    else res.redirect('/login');
}
module.exports = authActiveUser;