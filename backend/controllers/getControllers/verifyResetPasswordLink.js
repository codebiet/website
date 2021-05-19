const crypto = require("crypto");
const User = require("../../models/userModal");
const decrypt = (cipher) => {
  const decipher = crypto.createDecipher(
    process.env.ENCRYPTION_ALGO,
    process.env.CRYPTOJS_SECRET
  );
  var decrypted =
    decipher.update(cipher, "hex", "utf8") + decipher.final("utf8");
  return decrypted;
};
const verifyResetPasswordLink = async (req, res) => {
  const host = req.get("host");
  if (
    `${req.protocol}://${host}` ==
    `${process.env.PROTOCOL}://${process.env.HOST}`
  ) {
    //domain matched
    const encryptedID = req.query.a; //since a = id
    const encryptedTime = req.query.b; //since b = time
    //decrypt ID and Time
    const decryptedID = decrypt(encryptedID);
    const decryptedTime = decrypt(encryptedTime);
    console.log("decryptedID : ",decryptedID," decryptedTime : ",decryptedTime);
    let user;
    try{
        user = await User.findById(decryptedID).exec();
    }catch(err){
        return res.status(500).send({errorMsg:"Internal Server Error"})
    }
    if (user) {
      const timeElapsed = (Date.now() - decryptedTime) / (1000 * 60); //in minutes;
      console.log(user);
      if (timeElapsed < process.env.EMAIL_LINK_VALIDITY) {
        //email link is clicked in valid time duration
        res.send({msg:"success"});
      } else {
        //link not clicked in valid time duration
        console.log("the link is click after it gets disabled");
        res.status(400).send({errorMsg:"Invalid Link"});
        // res.render("sentEmailLinkAgain");
      }
    } else {
        console.log("invalid userId while verify reset password link");
      res.status(400).send({ errorMsg: "Invalid request!" });
    }
  } else {
    //domain didn't matched
    console.log("domain didn't matched");
    res.status(400).send({ errorMsg: "Invalid request!" });
  }
};
module.exports = verifyResetPasswordLink;
