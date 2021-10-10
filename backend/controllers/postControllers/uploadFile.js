const uploadS3 = require("../../utils/uploadS3");
const { v4: uuid } = require("uuid");
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
const uploadFile = async (req, res) => {
  const file = req.files.file;
  // console.log(file);
  const fileParams = getParams(file);
  try {
    const url = await uploadS3(fileParams);
    // console.log({ data: { link: url } });
    res.send({ data: { link: url } });
  } catch (err) {
    // console.log("there is an error ", err);
    res
      .status(500)
      .send({ errorMsg: "Status Code: 500, Internal Server Error!" });
  }
};
module.exports = uploadFile;
