const Users = require("../../../models/userModal");

module.exports = async (req, res) => {
  try {
    const admins = await Users.find({ isAdmin: true });
    return res.send({ admins });
  } catch (err) {
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
