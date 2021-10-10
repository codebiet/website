const Project = require("../../models/projectModal");

module.exports = async (req, res) => {
  const id = req.params.id;
  const rating = parseInt(req.body.rating);
  if (!rating)
    return res.status(400).send({ errorMsg: "Please provide a valid rating!" });
  try {
    const projectById = await Project.findById(id);
    if (!projectById)
      return res.status(404).send({ errorMsg: "Project Doesn't Exist!" });
    const project = await Project.findOne({
      _id: id,
      "ratings.rater": req.body.userId,
    });
    // console.log(project);
    let ratedProj;
    if (project) {
      ratedProj = await Project.findOneAndUpdate(
        { _id: id, "ratings.rater": req.body.userId },
        { $set: { "ratings.$.rating": rating } },
        { new: true }
      );
      // console.log(ratedProj);
    } else {
      if (projectById.ratings)
        projectById.ratings.push({ rater: req.body.userId, rating: rating });
      else projectById.ratings.push({ rater: req.body.userId, rating: rating });
      ratedProj = await projectById.save();
      // console.log("else: ", ratedProj);
    }
    let avgRating = 0;
    let ratings = ratedProj.ratings;
    for (let i = 0; i < ratings.length; i++) {
      avgRating += ratings[i].rating;
    }
    avgRating = parseInt(avgRating / ratings.length);
    ratedProj.avgRating = avgRating;
    await ratedProj.save();
    return res.send({ avgRating, userRating: rating });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code:500, Internal Server Error!" });
  }
};
