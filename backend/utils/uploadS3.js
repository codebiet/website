const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});
const uploadS3 = (params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, async (err, data) => {
      if (err) {
        reject(`Error while uploading the file.`);
      } else
        resolve(
          `https://s3.ap-south-1.amazonaws.com/soorajarsn.warehouse/${params.Key}`
        ); //file url
    });
  });
};
module.exports = uploadS3;