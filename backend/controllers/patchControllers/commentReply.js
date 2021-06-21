const Blogs = require("../../models/blogs");
const Users = require("../../models/userModal");
module.exports = async (req, res) => {
  const body = req.body.reply;
  const commentId = req.params.id;
  const blogId = req.params.blogId;
  if (!body) return res.status(400).send({ errorMsg: "reply required!" });
  if (!commentId) return res.status(404).send({ errorMsg: "Not Found" });
  const reply = {
    body,
    repliedBy: req.body.userId,
    repliedAt: new Date(),
  };
  try {
    await Blogs.updateOne(
      { _id: blogId, "comments._id": commentId },
      { $push: { "comments.$.replies": reply } },
      { new: true }
    );
    const comment = await Blogs.findOne(
      {
        _id: blogId,
        "comments._id": commentId,
      },
      { "comments.$": 1 }
    ).populate(
      "comments.commentedBy comments.replies.repliedBy",
      "name profilePhoto",
      Users
    );
    return res.send({ comment: comment.comments[0] });
  } catch (err) {
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
