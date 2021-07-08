const { CompareArrowsOutlined } = require("@material-ui/icons");
const { query } = require("express");
const User = require("../../models/userModal");

module.exports = async (req, res) => {
  const filter = req.query.filter;

  try {
    let queryObj = {};

    // if (req.query.year == "1") {
    //   queryObj.year = 1;
    // }
    // if (req.query.year == "2") {
    //   queryObj.year = 2;
    // }
    // if (req.query.year == "3") {
    //   queryObj.year = 3;
    // }
    // if (req.query.year == "4") {
    //   queryObj.year = 4;
    // }
    // if (req.query.profession == "Student") {
    //   queryObj.role = "Student";
    // }
    // if (req.query.year == "Passout" || req.query.profession == "Professional") {
    //   queryObj.role = "Professional";
    // }

    // if(req.query.branch){
    //   queryObj.branch = req.query.branch;
    //   }

    if (req.query.profession) {
      queryObj.role = req.query.profession;
    }
    if (req.query.year) {
      if (req.query.year == "Passout") {
        queryObj.role = "Professional";
      } else {
        queryObj.year = parseInt(req.query.year);
      }
    }

    if (req.query.branch) {
      queryObj.branch = req.query.branch;
    }
    // queryObj.phoneNumberVerified=true;
    queryObj.emailVerified=true;

    let { page, size } = req.query;
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 5;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    console.log(queryObj);
    let totalItems = await User.countDocuments({ ...queryObj });
    let Users = await User.find(queryObj).limit(limit).skip(skip);

    return res.status(200).send({ totalItems, page, size, data: Users });
  } catch (err) {
    return res.status(500).send({ errorMsg: err.message });
  }
};
