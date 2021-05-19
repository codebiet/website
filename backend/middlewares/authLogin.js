const authLogin = async (req,res,next) => {
    console.log(req.cookies['token']);
    if(req.cookies['token']) next();//logged in
    else res.redirect('/login');
}
module.exports = authLogin;