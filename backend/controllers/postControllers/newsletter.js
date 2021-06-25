const newsletter = require("../../models/newsletter");

module.exports = async (req, res) => {
  const { email } = req.body;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || !emailRegex.test(email))
    return res
      .status(400)
      .send({ errorMsg: "Please provide a valid Email Address!" });
  try {
    const user = await newsletter.findOne({ email }).exec();
    if (user && user.subscribed == true) {
      return res
        .status(400)
        .send({ errorMsg: "Hey, you are already subscribed to our newsletter!" });
    } else {
      if (user) {
        //user has unsubscribed, and is subscribing again
        user.subscribed = true;
        await user.save();
      } else {
        const newUser = new newsletter({ email });
        await newUser.save();
      }
      return res.status(200).send({ msg: "success" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ errorMsg: "Status-Code:500,Internal Servr Error!" });
  }
};
