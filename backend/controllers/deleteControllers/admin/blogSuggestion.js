const Blogs = require("../../../models/blogs");
module.exports = async (req, res) => {
  const filters = {
    state: req.query.state || "AVAILABLE",
    approvedSuggestion: req.query.approvedSuggestion || "true",
  };
  const id = req.params.id;
  try {
    await Blogs.findByIdAndDelete(id).exec();
    const suggestions = await Blogs.find({
      state: filters.state,
      approvedSuggestion: filters.approvedSuggestion == "true",
    }).sort({ suggestedAt: -1 }); //getting suggestions;
    return res.send({ suggestions });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
