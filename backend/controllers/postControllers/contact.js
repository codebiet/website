const Message = require("../../models/messageModal");

const contact = async (req, res) => {
  const { name, email, phoneNumber, msg } = req.body;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!name || !email || !phoneNumber || !msg) {
    return res
      .status(400)
      .send({ errorMsg: "You're required to fill in all the fields!" });
  } else if (!emailRegex.test(email)) {
    return res.status(400).send({ errorMsg: "Invalid Email!" });
  } else if (phoneNumber.length < 10 || phoneNumber.length > 10) {
    return res
      .status(400)
      .send({
        errorMsg: "Invalid Phone Number. Please Enter 10 digit phone Number!",
      });
  } else if (msg.length < 20) {
    return res
    .status(400)
    .send({
      errorMsg: "Message too Short!",
    });
  }
  const message = new Message({name,email,phoneNumber,msg});
  try{
      await message.save();
      return res.status(200).send({msg:"success"});
  }catch(err){
      console.log(err);
      return res.status(500).send({errorMsg:"Status-Code:500, Internal Server Error!"});
  }
};
module.exports = contact;
