const doubts = require("../../models/doubts");
const Users = require("../../models/userModal");
const reply = async (req, res) => {
  const postId = req.params.id;
  try {
    const doubt = await doubts.findById(postId);
    if (!doubt) return res.status(400).send({ errorMsg: "Invalid post id!" });
    const indexOfThisUser = doubt.likedBy.indexOf(req.body.userId);
    if (indexOfThisUser >= 0) doubt.likedBy.splice(indexOfThisUser, 1);
    else doubt.likedBy.push(req.body.userId);
    doubt.likes = doubt.likedBy.length;
    await doubt.save();

    //filters for returning doubts to render updated doubts after adding...
    const dbFilters = {};
    if (req.query.category) dbFilters.category = req.query.category;
    if (req.query.tags) dbFilters.tags = { $in: req.query.tags.split(",") };
    if (req.query.replyAdded == "true") dbFilters.replyAdded = true;
    else if (req.query.replyAdded == "false") dbFilters.replyAdded = false;
    const page = (req.query.page && parseInt(req.query.page)) || 0;
    const limit = (req.query.limit && parseInt(req.query.limit)) || 10;
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
    res.status(200).send({ doubts: posts });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ errorMsg: "Status-Code:500,Internal Server Error!" });
  }
};

module.exports = reply;
