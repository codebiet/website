const Blogs = require("../../models/blogs");
module.exports = async (req, res) => {
  const getUTCDate = (ISTDateString) => {
    return new Date(new Date(ISTDateString) - 1000 * 60 * (60 * 5 + 30));
  };
  const filters = {
    state: (req.query.state && req.query.state.split(",")) || [
      "AVAILABLE",
      "PICKED",
      "DRAFT",
    ],
    approvedSuggestion: (req.query.approvedSuggestion && [
      req.query.approvedSuggestion == "true" || false,
    ]) || [true, false],
    disapprovedSuggestion: (req.query.disapprovedSuggestion && [
      req.query.disapprovedSuggestion == "true" || false,
    ]) || [true, false],
    suggestedBy: (req.query.suggestedBy && [req.query.suggestedBy]) || [
      "ADMIN",
      "USER",
    ],
    suggestedAtGt: (req.query.gt && getUTCDate(req.query.gt)) || new Date(2019), //suggestedAt in database will always be after year 2019
    suggestedAtLt:
      (req.query.lt && getUTCDate(req.query.lt)) ||
      new Date(Date.now() + 1000 * 60 * 60), //there will be no suggestion in our db which we get in future(after current time).
    page: parseInt(req.query.page) || 0,
    limit: parseInt(req.query.limit) || 1000,
  };
  if (req.query.pickedBy) filters.pickedBy = req.query.pickedBy;
  console.log(filters);
  let dbFilters = {
    suggestedAt: { $gt: filters.suggestedAtGt, $lt: filters.suggestedAtLt },
    state: { $in: filters.state },
    suggestedBy: { $in: filters.suggestedBy },
    approvedSuggestion: { $in: filters.approvedSuggestion },
    disapprovedSuggestion: { $in: filters.disapprovedSuggestion },
  };
  if (filters.pickedBy)
    dbFilters = { ...dbFilters, pickedBy: filters.pickedBy };
  try {
    const totalItems = await Blogs.countDocuments(dbFilters);
    const suggestions = await Blogs.find(dbFilters)
      .sort({ suggestedAt: -1 })
      .skip(filters.page * filters.limit) //pagination starts from 0
      .limit(filters.limit); //getting suggestions;
    return res.send({ totalItems, suggestions });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
