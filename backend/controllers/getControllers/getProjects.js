const { template } = require("babel-core");
const Project = require("../../models/projectModal");

module.exports = async (req, res) => {
  try {
    let projects = await Project.find();
    if (req.body.userId) {
      projects = projects.map((proj) => {
        let tempProj = proj._doc;
        for (let i = 0; i < tempProj.ratings.length; i++) {
          if (
            req.body.userId.toString() == tempProj.ratings[i].rater.toString()
          ) {
            tempProj.userRating = tempProj.ratings[i].rating;
            break;
          }
        }
        delete tempProj.ratings;
        return tempProj;
      });
    }
    return res.status(200).send(projects);
  } catch (err) {
    console.log(err);
    return res.status(406).send({ errorMsg: err.message });
  }
};
