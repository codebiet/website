const Blogs = require("../../models/blogs");
const Users = require("../../models/userModal");
module.exports = async (req, res) => {
  const blogId = req.params.id;
  if (!blogId) return res.status(404).send({ errorMsg: "Not Found" });
  try {
    const blogComments = await Blogs.findById(blogId)
      .select("comments")
      .populate(
        "comments.commentedBy comments.replies.repliedBy",
        "name profilePhoto",
        Users
      );
    // console.log(blogComments);
    return res.send({ comments: blogComments.comments });
  } catch (err) {
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
