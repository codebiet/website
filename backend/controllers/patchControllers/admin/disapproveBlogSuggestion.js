const Blogs = require("../../../models/blogs");
module.exports = async (req, res) => {
  const filters = {
    state: (req.query.state && [req.query.state]) || [
      "AVAILABLE",
      "PICKED",
      "DRAFT",
      "PENDING",
      "APPROVED",
      "DISCARDED",
    ],
    approvedSuggestion: (req.query.approvedSuggestion && [
      req.query.approvedSuggestion == "true" || false,
    ]) || [true, false],
    disapprovedSuggestion: (req.query.disapprovedSuggestion && [
      req.query.disapprovedSuggestion == "true" || false,
    ]) || [true, false],
  };
  try {
    await Blogs.findByIdAndUpdate(
      id,
      { $set: { disapprovedSuggestion: true } },
      { new: true }
    );
    const suggestions = await Blogs.find({
      state: { $in: filters.state },
      approvedSuggestion: { $in: filters.approvedSuggestion },
      disapprovedSuggestion: { $in: filters.disapprovedSuggestion },
    }).sort({ suggestedAt: -1 }); //getting suggestions;
    return res.send({ suggestions });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
