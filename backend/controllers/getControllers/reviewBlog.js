const Blogs = require("../../models/blogs");
module.exports = async (req, res) => {
  const filters = {
    state: ["PENDING", "DISCARDED"],
  };
  let dbFilters = {
    state: { $in: filters.state },
    _id: req.params.id,
  };
  if (!req.body.isAdmin) dbFilters.postedBy = req.body.userId; //we'll get req.body.isAdmin and req.body.userId from middleware run on this route;
  try {
    const blog = await Blogs.findOne(dbFilters);
    console.log(blog, "db filters are : ", dbFilters);
    if (!blog) return res.status(404).send({ errorMsg: "Not Found!" });
    return res.send({ blog });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
