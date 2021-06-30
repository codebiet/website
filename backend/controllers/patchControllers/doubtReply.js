const doubts = require("../../models/doubts");
const Users = require("../../models/userModal");
const reply = async (req, res) => {
  const repliedBy = req.body.userId;
  const { answerTitle, answer } = req.body;
  const tags = JSON.parse(req.body.tags);
  const postId = req.params.id;
  if (!answerTitle || !answer)
    return res.status(400).send({
      errorMsg: "Please add the solution headline and describe your solution!",
    });
  try {
    const doubt = await doubts.findById(postId);
    if (!doubt) return res.status(400).send({ errorMsg: "Invalid post id!" });
    doubt.replies.push({
      replyTitle: answerTitle,
      replyDescription: answer,
      repliedBy,
      tags,
    });
    doubt.replyAdded = true;
    await doubt.save();
    //filters for returning doubts to render updated doubts after adding...
    const dbFilters = {};
    if (req.query.category) dbFilters.category = req.query.category;
    if (req.query.tags) dbFilters.tags = { $in: req.query.tags.split(",") };
    if (req.query.replyAdded == "true") dbFilters.replyAdded = true;
    else if (req.query.replyAdded == "false") dbFilters.replyAdded = false;
    const page = (req.query.page && parseInt(req.query.page)) || 0;
    const limit = (req.query.limit && parseInt(req.query.limit)) || 10;
    const totalItems = await doubts.countDocuments(dbFilters);
    let posts;
    if (req.query.sort == "oldest")
      posts = await doubts
        .find(dbFilters)
        .sort({ postedAt: -1 })
        .skip(page * limit)
        .limit(limit)
        .populate("postedBy", "name profilePhoto", Users);
    else if (req.query.sort == "latest")
      posts = await doubts
        .find(dbFilters)
        .sort({ postedAt: -1 })
        .skip(page * limit)
        .limit(limit)
        .populate("postedBy", "name profilePhoto", Users);
    else if (req.query.sort == "likes")
      posts = await doubts
        .find(dbFilters)
        .sort({ postedAt: -1 })
        .skip(page * limit)
        .limit(limit)
        .populate("postedBy", "name profilePhoto", Users);
    else if (req.query.sort == "alphabetically")
      posts = await doubts
        .find(dbFilters)
        .sort({ postedAt: -1 })
        .skip(page * limit)
        .limit(limit)
        .populate("postedBy", "name profilePhoto", Users);
    else
      posts = await doubts
        .find(dbFilters)
        .skip(page * limit)
        .limit(limit)
        .populate("postedBy", "name profilePhoto", Users);
    posts = posts.map((post) => {
      post = {
        ...post._doc,
        likes: post.likedBy.length,
        likedByThisUser: post.likedBy.includes(req.body.userId || "   "),
        likedBy: [], //setting likedBy to empty array because we don't need it on frontend and setting this can reduce the size of response a lot
      };
      return post;
    });
    res.status(200).send({ doubts: posts, totalItems });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ errorMsg: "Status-Code:500,Internal Server Error!" });
  }
};

module.exports = reply;
