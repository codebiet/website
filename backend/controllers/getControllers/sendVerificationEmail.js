const User = require("../../models/userModal");
const sendEmail = require("../../utils/sendVerificationEmail");
const jwt = require('jsonwebtoken');
const config = require('config');
const sendVerificationEmail = async (req, res) => {
  const token = req.cookies['token'];
  const decoded = jwt.verify(token,config.get('jwtSecret'));
  const id = decoded.id;
  console.log(id);
  const user = await User.findById(id).exec();
  if (user.emailVerified)
    return res.redirect('/home');
  try{
    const response = await sendEmail(id,user.email);
    console.log(response);
    res.set("Cache-Control","no-store");
    return res.status(200).send({msg:"success"});
  }
  catch(err){
    console.log(err);
    return res.status(500).send({errorMsg:"Can't sent Otp! Something went wrong"});
  }
};
module.exports = sendVerificationEmail;
