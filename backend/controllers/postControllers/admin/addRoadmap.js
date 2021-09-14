const roadmaps = require("../../../models/roadmapModal");
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
const addRoadmap = async (req, res) => {
  const { roadmapTitle, type,roadmapDescription } = req.body;
  //---------------------------------------------------------------------------
  //data verification
  if (!roadmapTitle || !type || !roadmapDescription)
    return res.status(400).send({ errorMsg: "All the fields are required!" });
  if (!req.files || !req.files.roadmapImg)
    return res.status(400).send({ errorMsg: "Roadmap Image is required!" });
  //-----------------------------------------------------------------------------
  //data verification end
  //------------------------------------------------------------------------------

  //file upload to s3
  let roadmapImgUrl = "https://roadmap.sh/roadmaps/react.png"
  const roadmapImg = req.files.roadmapImg;
  //file type verification -- start
  if (invalidFileType(roadmapImg))
    return res.status(400).send({ errorMsg: "Invalid file type for Image!" });
  //file type verification -- end

  // const roadmapImgParams = getParams(roadmapImg);
  // try {
  //   roadmapImgUrl = await uploadS3(roadmapImgParams);
  // } catch (err) {
  //   console.log(err)
  //   return res.status(500).send({ errorMsg: "Error while uploading Roadmap image!" });
  // }
  //end file upload to s3
  //------------------------------------------------------------------------------
  const event = new roadmaps({
    roadmapTitle:roadmapTitle.toUpperCase(),
    type,
    roadmapDescription,
    roadmapImg: roadmapImgUrl
  });
  try {
    await event.save();
    return res.send({ msg: "Roadmap Added Successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};

module.exports = addRoadmap;
