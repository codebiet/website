const User = require("../../models/userModal");
const Blogs = require("../../models/blogs");
module.exports = async (req, res) => {
  const url = req.params.url;
  console.log("url is : ", url);
  try {
    const blog = await Blogs.findOne({ url, state: "APPROVED" });
    if (!blog) return res.status(404).send({ errorMsg: "Not Found!" });
    const prevBlog = await Blogs.find({
      _id: { $gt: blog._id },
      state: "APPROVED",
    })
      .sort({ _id: 1 })
      .select("title url cardImg")
      .limit(1);
    const nextBlog = await Blogs.find({
      _id: { $lt: blog._id },
      state: "APPROVED",
    })
      .sort({ _id: -1 })
      .select("title url cardImg")
      .limit(1);
    const recentBlogs = await Blogs.find({
      _id: { $nin: [blog._id, prevBlog._id, nextBlog._id] },
      state: "APPROVED",
    })
      .sort({ postedAt: -1 })
      .select("title postedAt url")
      .limit(6);
    const suggestedBlogs = await Blogs.find({
      _id: { $nin: [blog._id, prevBlog._id, nextBlog._id] },
      state: "APPROVED",
    })
      .sort({ postedAt: -1 })
      .skip(6)
      .limit(4)
      .populate("postedBy", "user email", User);
    return res.send({ blog, prevBlog, nextBlog, suggestedBlogs, recentBlogs });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
