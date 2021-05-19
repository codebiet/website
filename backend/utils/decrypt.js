const crypto = require("crypto");
const decrypt = (cipher) => {
  const decipher = crypto.createDecipher(
    process.env.ENCRYPTION_ALGO,
    process.env.CRYPTOJS_SECRET
  );
  var decrypted =
    decipher.update(cipher, "hex", "utf8") + decipher.final("utf8");
  return decrypted;
};
module.exports = decrypt;
