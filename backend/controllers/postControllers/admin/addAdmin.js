const Users = require("../../../models/userModal");

module.exports = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || !emailRegex.test(email))
      return res
        .status(400)
        .send({ errorMsg: "Please provide a valid email Address" });
    const user = await Users.findOne({ email });
    if (user) {
      user.isAdmin = true;
      await user.save();
      return res.send({ msg: "success" });
    } else {
      const admin = new Users({
        name: name || "Admin",
        email: email,
        password: email,
      });
      await admin.save();
      return res.send({ msg: "success" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
