const Users = require('../../../models/userModal');
const Blogs = require("../../../models/blogs");
const uploadS3 = require("../../../utils/uploadS3");
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
  const title = req.body.title;
  const tags = JSON.parse(req.body.tags);
  const id = req.params.id;
  if (!title) return res.status(400).send({ errorMsg: "Title is required!" });
  const suggestion = await Blogs.findById(id);
  if (!suggestion.approvedSuggestion) {
    //means admin is approving the suggestion; card image required to be uploaded by admin
    if (!req.files || !req.files.cardImg)
      return res
        .status(400)
        .send({ errorMsg: "Please upload card Image also." });
  }
  suggestion.title = title;
  suggestion.tags = tags;
  suggestion.approvedSuggestion = true;
  if (req.files) {
    const cardImg = req.files.cardImg;
    if (invalidFileType(cardImg))
      return res
        .status(400)
        .send({ errorMsg: "Invalid file type for card Image!" });
    //file type verification -- end
    const cardImgParams = getParams(cardImg);
    try {
      let cardImgUrl = await uploadS3(cardImgParams);
      suggestion.cardImg = cardImgUrl;
    } catch (err) {
      return res
        .status(500)
        .send({ errorMsg: "Error while uploading card Image!" });
    }
  }
  try {
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
      .limit(filters.limit)
      .populate("pickedBy", "name email", Users); //getting suggestions;
    return res.send({ totalItems, suggestions });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
