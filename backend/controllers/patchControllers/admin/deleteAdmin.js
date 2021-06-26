const Users = require("../../../models/userModal");

module.exports = async (req, res) => {
  try {
    const admin = await Users.findById(req.params.id);
    if (!admin) return res.status(400).send({ errorMsg: "No admin found" });
    if (admin._id.toString() == req.body.userId.toString())
      return res.status(400).send({ errorMsg: "You can't delete yourself" });
    admin.isAdmin = false; //this user is not an admin now;
    admin.save();
    const admins = await Users.find({ isAdmin: true });
    return res.send({ admins });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
