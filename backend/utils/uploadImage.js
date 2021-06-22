const uploadS3 = require("./uploadS3");
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
module.exports = (file) => {
  return new Promise(async (resolve, reject) => {
    if (invalidFileType(file)) reject("Invalid file type!");
    const fileParams = getParams(file);
    try {
      let fileUrl = await uploadS3(fileParams);
      resolve(fileUrl);
    } catch (err) {
      reject("Status Code: 500, Internal Server Error!");
    }
  });
};
