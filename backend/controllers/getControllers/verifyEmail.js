const CryptoJS = require("crypto-js");
const User = require("../../models/userModal");

const verifyEmail = async (req, res) => {
  const host = req.get('host');
  if(`${req.protocol}://${req.get('host')}` == `${req.session.protocol}://${req.session.host}`){//domain matched
    //now we don't need protocol and host in our session variables;
    req.session.protocol = null;
    req.session.host = null;
    const encryptedID = req.query.id;
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedID,
      process.env.CRYPTOJS_SECRET
    );
    const decryptedID = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log("decryptedID : ", decryptedID);
    const user = await User.findById(decryptedID).exec();
    if (user) {
      console.log(user);
      user.emailVerified = true;
      user.save();
      console.log("email verified");
      res.status(200).send({ msg: "Your email has been verified!" });
    }else{
        res.status(400).send({error:"Invalid request!"});
    }
  }else{
      //domain didn't matched
      //now we need to reset req.session.host, req.session.protocol
      req.session.protocol = null;
      req.session.host = null;
      res.status(400).send({error:"Invalid request!"});
  }
};
module.exports = verifyEmail;
