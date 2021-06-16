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
const uploadFile = async (file, type) => {
  return new Promise(async (resolve, reject) => {
    if (invalidFileType(file)) reject("Invalid file type for " + type);
    const fileParams = getParams(file);
    try {
      url = await uploadS3(fileParams);
      resolve(url);
    } catch (err) {
      reject("Error while uploading banner!");
    }
  });
};
const valid = (event) => {
  if (
    !event.name ||
    !event.type ||
    !event.entryFee ||
    !event.startsOn ||
    !event.endsOn ||
    !event.duration ||
    !event.venue ||
    !event.shortDescription ||
    !event.tags ||
    !event.details
  )
    return false;
  else return true;
};
const events = async (req, res) => {
  const id = req.params.id;
  const event = req.body;
  //data verification
  if (!valid(event))
    return res.status(400).send({ errorMsg: "All the fields are required!" });
  event.tags = JSON.parse(event.tags);
  if (req.files && req.files.banner) {
    try {
      event.banner = await uploadFile(req.files.banner, "banner");
    } catch (err) {
      return res.status(400).send({ errorMsg: err });
    }
  }
  if (req.files && req.files.cardImg) {
    try {
      event.cardImg = await uploadFile(req.files.cardImg, "card Image");
    } catch (err) {
      return res.status(400).send({ errorMsg: err });
    }
  }
  try {
    const e = await Events.findByIdAndUpdate(
      id,
      { $set: { ...event } },
      { new: true }
    );
    // const evnts = await Events.find({});
    console.log("update event is : ", e);
    if (!e) return res.status(404).send({ errorMsg: "Event Not Found!" });
    delete event.registered;
    return res.send({ event: e });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
module.exports = events;
