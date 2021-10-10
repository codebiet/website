const Blogs = require("../../models/blogs");
const Users = require("../../models/userModal");
const notifyCommentReply = require('../../utils/notifyCommentReply');

module.exports = async (req, res) => {
  const body = req.body.reply;
  const commentId = req.params.id;
  const blogId = req.params.blogId;
  if (!body) return res.status(400).send({ errorMsg: "reply required!" });
  if (!commentId) return res.status(404).send({ errorMsg: "Invalid Reply, Comment don't exist!" });
  if(!blogId) return res.status(400).send({errorMsg: 'BlogId is required!'});
  const blog = await Blogs.findById(blogId);
  if(!blog) return res.status(404).send({errorMsg: 'Blog not Found!'});
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
    // const commentBody = comment.comments[0].body;//can be used to show the comment in mail;
    const commentUserId = comment.comments[0].commentedBy;
    const commentUser = await Users.findById(commentUserId);
    try{
      notifyCommentReply(commentUser.email, `https://ourcode.in/blogs/${blog.url}`);
      // console.log('mail got send to ',commentUser.email);
    }catch(err){
      console.log('error while sending the notification of reply to commenter: ',err);
    }
    return res.send({ comment: comment.comments[0] });
  } catch (err) {
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
