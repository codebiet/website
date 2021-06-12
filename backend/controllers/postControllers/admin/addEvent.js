const Events = require("../../../models/events");
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
const addEvent = async (req, res) => {
  const {
    name,
    type,
    entryFee,
    startsOn,
    endsOn,
    duration,
    venue,
    shortDescription,
    tags,
    details,
  } = req.body;
  //---------------------------------------------------------------------------
  //data verification
  if (
    !name ||
    !type ||
    !entryFee ||
    !startsOn ||
    !endsOn ||
    !duration ||
    !venue ||
    !shortDescription ||
    !tags ||
    !details
  )
    return res.status(400).send({ errorMsg: "All the fields are required!" });
  if (!req.files || !req.files.banner)
    return res.status(400).send({ errorMsg: "Banner is required!" });
  if (!req.files || !req.files.cardImg)
    return res.status(400).send({ cardImg: "Card Image is required!" });
  //-----------------------------------------------------------------------------
  //data verification end
  //------------------------------------------------------------------------------
  //file upload to s3
  let bannerUrl = "",
    cardImgUrl = "";
  const banner = req.files.banner;
  const cardImg = req.files.cardImg;
  //file type verification -- start
  if (invalidFileType(banner))
    return res.status(400).send({ errorMsg: "Invalid file type for banner!" });
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
  const bannerParams = getParams(banner);
  try {
    bannerUrl = await uploadS3(bannerParams);
  } catch (err) {
    return res.status(500).send({ errorMsg: "Error while uploading banner!" });
  }
  //end file upload to s3
  //------------------------------------------------------------------------------
  const event = new Events({
    name,
    type,
    entryFee,
    startsOn: new Date(startsOn),
    endsOn: new Date(endsOn),
    duration,
    venue,
    shortDescription,
    tags: JSON.parse(tags),
    details,
    banner: bannerUrl,
    cardImg: cardImgUrl,
  });
  try {
    await event.save();
    return res.send({ msg: "Event Added Successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};

module.exports = addEvent;
