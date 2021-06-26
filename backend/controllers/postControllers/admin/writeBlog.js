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
  const suggestedBy = "ADMIN";
  const title = req.body.title;
  const category = req.body.category;
  const tags = JSON.parse(req.body.tags);
  const content = req.body.content;
  //validation ---- start
  if (!title || !category)
    return res
      .status(400)
      .send({ errorMsg: "Title and Category is required!" });
  if (!req.files.cardImg)
    return res.status(400).send({ errorMsg: "Card image is required!" });
  const blogAvailable = await Blogs.findOne({
    titleLower: title.toLowerCase(),
  });
  if (blogAvailable)
    return res.status(400).send({ errorMsg: "This title exists already!" });
  //validation ---- end
  let cardImgUrl = "";
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
  const date = new Date();
  try {
    const blog = new Blogs({
      title,
      tags,
      category,
      suggestedBy,
      content,
      postedAt: date,
      suggestedAt: date,
      postedBy: req.body.userId,
      pickedBy: req.body.userId,
      pickedAt: date,
      state: "APPROVED",
      suggestedBy: "ADMIN",
      approvedSuggestion: true,
      cardImg: cardImgUrl,
      suggestedById: req.body.userId,
    });
    await blog.save();
    return res.send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
