const Blogs = require("../../models/blogs");
const Users = require("../../models/userModal");
const notifyBlogger = require('../../utils/sendCommentNotification');
module.exports = async (req, res) => {
  const body = req.body.comment;
  const blogId = req.params.id;
  if (!body)
    return res.status(400).send({ errorMsg: "Comment Body required!" });
  if (!blogId) return res.status(400).send({ errorMsg: "Blog Id is required!" });
  const blog = await Blogs.findById(blogId);
  if(!blog) return res.status(404).send({ errorMsg: 'Not Found'});
  const comment = {
    body,
    commentedBy: req.body.userId,
    commentedAt: new Date(),
  };
  try {
    const blogComments = await Blogs.findByIdAndUpdate(
      blogId,
      { $push: { comments: comment } },
      { new: true }
    )
      .sort({ "comments.commentedAt": -1 })
      .select("comments")
      .populate(
        "comments.commentedBy comments.replies.repliedBy",
        "name profilePhoto",
        Users
      );
    const postedBy = blog.postedBy;
    const user = await Users.findById(postedBy);
    const userEmail = user.email;
    const blogTitle = blog.title;
    const linkToBlog = 'https://ourcode.in/blogs/'+blog.url;
    try{
      notifyBlogger(userEmail, blogTitle, linkToBlog);
    }catch(err){
      console.log('error while sending the email ',err);
    }
    console.log(blogComments);
    return res.send({ comments: blogComments.comments });
  } catch (err) {
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
