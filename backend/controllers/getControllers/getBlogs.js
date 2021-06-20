const Users = require("../../models/userModal");
const Blogs = require("../../models/blogs");
const getUTCDate = (ISTDateString) => {
  return new Date(new Date(ISTDateString) - 1000 * 60 * (60 * 5 + 30));
};
module.exports = async (req, res) => {
  const filters = {
    state: (req.query.state && [req.query.state]) || [
      "DRAFT",
      "PENDING",
      "DISCARDED",
      "APPROVED",
    ],
    postedAtGt: (req.query.gt && getUTCDate(req.query.gt)) || new Date(2019), //since we publised first version in 2021 itself;
    postedAtLt:
      (req.query.lt && getUTCDate(req.query.lt)) ||
      new Date(Date.now() + 1000 * 60 * 60), // there will be now blogs in our db posted in future, ofcourse;
    page: req.query.page || 0,
    limit: parseInt(req.query.limit) || 10000,
  };
  console.log(filters.limit);
  if (req.query.writing == "true") filters.state = ["PICKED", "DRAFT"]; //if getting blog detail at write-article page, then blog state will be PICKED
  let dbFilters = {
    postedAt: { $gt: filters.postedAtGt, $lt: filters.postedAtLt },
    state: { $in: filters.state },
  };
  if (req.query.writing == "true") {
    delete dbFilters.postedAt;
    dbFilters.pickedBy = req.query.pickedBy;
  }
  if (req.params.id) dbFilters._id = req.params.id;
  if (req.query.postedBy) dbFilters.postedBy = req.query.postedBy;
  console.log(dbFilters);
  //if no filters applied will get all the blogs, in descending order by posted date and time, but will limit to get 1000 blogs if no pagination limit given
  try {
    const skip = (req.query.skip && parseInt(req.query.skip)) || 0; //skip will be given when querying for blogs page, since we need some(3) blogs for hero section, we need to skip some(3) more blogs in each pagination
    const totalItems = await Blogs.countDocuments(dbFilters);
    const blogs = await Blogs.find(dbFilters)
      .sort({ postedAt: -1 })
      .skip(filters.page * filters.limit + skip) //pagination starts from 0
      .limit(filters.limit)
      .populate("postedBy", "name email", Users); //getting blogs;
    return res.send({ totalItems, blogs });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
