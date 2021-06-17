const Blogs = require("../../models/blogs");
const uploadS3 = require("../../utils/uploadS3");
const { v4: uuid } = require("uuid");
const invalidFileType = (file) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/svg+xml" ||
    file.mimetype == "image/webp"
  )
    return false;
  //valid file type
  else return true; //invalid file type
};
const getParams = (file) => {
  const ext = file.name.split(".").pop();
  const fileName = uuid();
  return {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileName}.${ext}`,
    ContentType: file.mimetype,
    Body: file.data,
  };
};
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
  const isAdmin = true; //will get using req.body.isAdmin, and this information will be added in middleware for verifying admin or user;
  const suggestedBy = "ADMIN"; //will get using req.body.userId, and this information will be added in middleware for verifying admin or user;
  const title = req.body.title;
  const tags = JSON.parse(req.body.tags);
  const approvedSuggestion = isAdmin ? true : false; //whether this suggestion will be shown to users or not, if user suggested then this won't be shown to user until admin approves it;
  if (!title) return res.status(400).send({ errorMsg: "Title is required!" });
  const suggestionAvailabe = await Blogs.findOne({
    titleLower: title.toLowerCase(),
  });
  if (suggestionAvailabe)
    return res.status(400).send({ errorMsg: "This title exists already!" });
  let cardImgUrl = "";
  if (req.files) {
    const cardImg = req.files.cardImg;
    if (invalidFileType(cardImg))
      return res
        .status(400)
        .send({ errorMsg: "Invalid file type for card Image!" });
    //file type verification -- end
    const cardImgParams = getParams(cardImg);
    try {
      cardImgUrl = await uploadS3(cardImgParams);
    } catch (err) {
      return res
        .status(500)
        .send({ errorMsg: "Error while uploading card Image!" });
    }
  }
  try {
    const suggestion = new Blogs({
      title,
      tags,
      approvedSuggestion,
      suggestedBy,
      cardImg: cardImgUrl,
    });
    await suggestion.save();
    const suggestions = await Blogs.find({
      state: { $in: filters.state },
      approvedSuggestion: { $in: filters.approvedSuggestion },
      disapprovedSuggestion: { $in: filters.disapprovedSuggestion },
    }).sort({ suggestedAt: -1 }); //getting suggestions;
    return res.send({ suggestions: suggestions });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
