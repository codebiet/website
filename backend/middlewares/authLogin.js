const authLogin = async (req,res,next) => {
    if(req.session.userId) next();//logged in
    else res.redirect('/login');
}
module.exports = authLogin;