const crypto = require("crypto");
const encrypt = (text) => {
  var cipher = crypto.createCipher(
    process.env.ENCRYPTION_ALGO,
    process.env.CRYPTOJS_SECRET
  );
  var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};
module.exports = encrypt;