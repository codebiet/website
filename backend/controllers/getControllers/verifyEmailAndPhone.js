const User = require('../../models/userModal');
const verifyEmailAndPhone = async (req,res) => {
    const user = await User.findById(req.session.userId).exec();
    if(user.emailVerified && user.phoneNumberVerified) res.redirect('/home');
    else res.render("verifyEmailAndPhone",{
        emailVerified:user.emailVerified,
        phoneNumberVerified:user.phoneNumberVerified
    });
}
module.exports = verifyEmailAndPhone;