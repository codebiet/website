const Blogs = require("../../models/blogs");

module.exports = async (req, res) => {
  const isAdmin = true; //will get using req.body.isAdmin, and this information will be added in middleware for verifying admin or user;
  const suggestedBy = "ADMIN"; //will get using req.body.userId, and this information will be added in middleware for verifying admin or user;
  const title = req.body.title;
  const tags = JSON.parse(req.body.tags);
  if (!title) return res.status(400).send({ errorMsg: "Title is required!" });
  const approvedSuggestion = isAdmin ? true : false; //whether this suggestion will be shown to users or not, if user suggested then this won't be shown to user until admin approves it;
  try {
    const suggestion = new Blogs({
      title,
      tags,
      approvedSuggestion,
      suggestedBy,
    });
    await suggestion.save();
    return res.send({ msg: "Suggestion Added Successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
