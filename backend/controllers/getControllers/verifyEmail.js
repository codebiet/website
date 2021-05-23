const User = require("../../models/userModal");
const decrypt = require('../../utils/decrypt');
const verifyEmail = async (req, res) => {
  const host = req.get("host");
  console.log("req.get('host') : ",host," req.protocol : ", req.protocol);
  console.log(`${req.protocol}://${host}`);
  console.log(`${process.env.PROTOCOL}://${process.env.HOST}`);
  // if (
  //   `${req.protocol}://${host}` ==
  //   `${process.env.PROTOCOL}://${process.env.HOST}`
  // ) {
    //domain not matching for now matched
    const encryptedID = req.query.a; //since a = id
    const encryptedTime = req.query.b; //since b = time
    // console.log(encryptedID);
    // console.log(encryptedTime);
    //decrypt ID and Time
    const decryptedID = decrypt(encryptedID);
    const decryptedTime = decrypt(encryptedTime);
    // console.log("decryptedId is : ",decryptedID);
    let user;
    try {
      user = await User.findById(decryptedID).exec();
      // console.log("got user : ",user);
    } catch (err) {
      console.log(err);
      res.status(500).send({ errorMsg: "Internal Server Error, Try Again!" });
    }
    // console.log("verifying user");
    if (!user) return res.status(400).send({ errorMsg: "Invalid Request!" });
    // console.log("user verified");
    // if (user) {
    if(user.emailVerified) return res.redirect('/login');
    const timeElapsed = process.env.EMAIL_LINK_VALIDITY;
    //if you want to verify time duration then uncomment the below line, and comment the above line;
    // const timeElapsed = (Date.now() - decryptedTime) / (1000 * 60); //in minutes;
    // console.log(user);
    if (timeElapsed > process.env.EMAIL_LINK_VALIDITY)
      return res
        .status(400)
        .send({ errorMsg: "Invalid Request! This link is not active." });
    //this block will execute always if you don't verify time duration;
    //email link is clicked in valid time duration
    user.emailVerified = true;
    try {
      await user.save();
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ errorMsg: "Internal Server Error, Try Again!" });
    }
    res.cookie("emailVerified", user.emailVerified, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
      httpOnly: false,
    });
    return res.redirect("/setPassword?id=" + encryptedID);
  // } else {
  //   //domain didn't matched
  //   //domain not matching for now
  //   res.status(400).send({ errorMsg: "Invalid request!" });
  // }
};
module.exports = verifyEmail;
