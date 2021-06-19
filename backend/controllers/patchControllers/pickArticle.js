const Blogs = require("../../models/blogs");
module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    await Blogs.findByIdAndUpdate(
      id,
      {
        $set: {
          state: "PICKED",
          pickedBy: req.body.userId,
          pickedAt: new Date(),
        },
      },
      { new: true }
    );
    return res.status(200).send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
