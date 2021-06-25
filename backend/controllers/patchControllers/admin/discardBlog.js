const Blogs = require("../../../models/blogs");

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
      new Date(Date.now() + 1000 * 60 * 60), // there will be no blogs in our db posted in future, ofcourse;
    page: req.query.page || 0,
    limit: (req.query.limit && parseInt(req.query.limit)) || 10000,
  };
  let dbFilters = {
    postedAt: { $gt: filters.postedAtGt, $lt: filters.postedAtLt },
    state: { $in: filters.state },
  };
  const reason = req.body.reason;
  if (!reason)
    return res.status(400).send({
      errorMsg: "Please give a valid reason why you are discarding the blog!",
    });
  const id = req.params.id;
  try {
    const discarded = await Blogs.findByIdAndUpdate(id, {
      $set: {
        state: "DISCARDED",
        discardReason: reason,
      },
    });
    const newSuggestion = new Blogs({
      title: discarded.title,
      tags: discarded.tags,
      suggestedAt: discarded.suggestedAt,
      cardImg: discarded.cardImg,
      approvedSuggestion: true,
      suggestedBy: discarded.suggestedBy,
      suggestedById: discarded.suggestedById,
      category: discarded.category,
    });
    newSuggestion.save();
    const totalItems = await Blogs.countDocuments(dbFilters);
    const blogs = await Blogs.find(dbFilters)
      .sort({ postedAt: -1 })
      .skip(filters.page * filters.limit) //pagination starts from 0
      .limit(filters.limit); //getting blogs;
    return res.send({ totalItems, blogs });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ errorMsg: "Internal Server Error!" });
  }
};
