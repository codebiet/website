const crypto = require("crypto");
const User = require("../../models/userModal");
const decrypt = (cipher) => { 
  const decipher = crypto.createDecipher(process.env.ENCRYPTION_ALGO, process.env.CRYPTOJS_SECRET);
  var decrypted = decipher.update(cipher, "hex", "utf8") + decipher.final("utf8"); 
  return decrypted;
}
const verifyEmail = async (req, res) => {
  const host = req.get('host');
  if(`${req.protocol}://${host}` == `${req.session.protocol}://${req.session.host}`){//domain matched
    //now we don't need protocol and host in our session variables;
    req.session.protocol = null;
    req.session.host = null;
    const encryptedID = req.query.id;
    console.log(encryptedID);
    // const decryptedBytes = CryptoJS.AES.decrypt(
    //   encryptedID,
    //   process.env.CRYPTOJS_SECRET
    // );
    // console.log(decryptedBytes);
    // const decryptedID = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const decryptedID = decrypt(encryptedID);
    console.log("decryptedID : ", decryptedID);
    const user = await User.findById(decryptedID).exec();
    if (user) {
      console.log(user);
      user.emailVerified = true;
      user.save();
      console.log("email verified");
      res.redirect('home');
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
