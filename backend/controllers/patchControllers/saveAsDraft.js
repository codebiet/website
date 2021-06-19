const Blogs = require("../../models/blogs");

module.exports = async (req, res) => {
  const { content } = req.body;
  const id = req.params.id;
  try {
    await Blogs.findByIdAndUpdate(id, {
      $set: { content: content, state: "DRAFT" },
    });
    return res.send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ errorMsg: "Internal Server Error!" });
  }
};
