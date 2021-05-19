const User = require("../../models/userModal");
const sendEmail = require("../../utils/passwordResetEmail");
const recoverPassword = async (req,res) => {
    console.log(req.body.email);
  const user = await User.findOne().findByEmail(req.body.email).exec();
  console.log(user);
  if(!user)
    return res.status(400).send({errorMsg:"This email is not registered yet."})
  try{
    const response = await sendEmail(user._id,user.email);
    console.log(response);
    res.set("Cache-Control","no-store");
    return res.status(200).send({msg:"An Email containing the password reset link has been sent to your registered email. Click on the link to reset your password!"});
  }
  catch(err){
    console.log(err);
    return res.status(500).send({errorMsg:"Something went wrong! Please try again."});
  }
}
module.exports = recoverPassword;