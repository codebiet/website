const roadmaps = require("../../models/roadmapModal");

module.exports = async (req, res) => {
  try {
    let r = await roadmaps.find({},{roadmapTitle:1,type:1,url:1})
    return res.status(200).send(r);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ errorMsg: err.message });
  }
};
