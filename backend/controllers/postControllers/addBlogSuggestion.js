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
  const getUTCDate = (ISTDateString) => {
    return new Date(new Date(ISTDateString) - 1000 * 60 * (60 * 5 + 30));
  };
  const filters = {
    state: (req.query.state && [req.query.state]) || [
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
  const isAdmin = req.body.isAdmin; //will get using req.body.isAdmin, and this information will be added in middleware for verifying admin or user;
  const suggestedBy = isAdmin ? "ADMIN" : "USER"; //will get using req.body.userId, and this information will be added in middleware for verifying admin or user;
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
  if (req.files && req.files.cardImg) {
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
  if (isAdmin && (!req.files || !req.files.cardImg))
    return res.status(400).send({
      errorMsg:
        "You have admin priviledges and an admin can't suggest article without card Image.",
    });
  try {
    const suggestion = new Blogs({
      title,
      tags,
      approvedSuggestion,
      suggestedBy,
      cardImg: cardImgUrl,
      suggestedById: req.body.userId,
    });
    await suggestion.save();
    const totalItems = await Blogs.countDocuments({
      suggestedAt: { $gt: filters.suggestedAtGt, $lt: filters.suggestedAtLt },
      state: { $in: filters.state },
      suggestedBy: { $in: filters.suggestedBy },
      approvedSuggestion: { $in: filters.approvedSuggestion },
      disapprovedSuggestion: { $in: filters.disapprovedSuggestion },
    });
    const suggestions = await Blogs.find({
      suggestedAt: { $gt: filters.suggestedAtGt, $lt: filters.suggestedAtLt },
      state: { $in: filters.state },
      suggestedBy: { $in: filters.suggestedBy },
      approvedSuggestion: { $in: filters.approvedSuggestion },
      disapprovedSuggestion: { $in: filters.disapprovedSuggestion },
    })
      .sort({ suggestedAt: -1 })
      .skip(filters.page * filters.limit) //pagination starts from 0
      .limit(filters.limit); //getting suggestions;
    return res.send({ totalItems, suggestions });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
