const Feedbacks = require("../../../models/feedback");

module.exports = async (req, res) => {
  try {
    const feedbacks = await Feedbacks.find({});
    return res.send({ feedbacks });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
