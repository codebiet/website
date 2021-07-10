const Job = require("../../models/job");

module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const alreadyReg = await Job.findById(id, {
      applications: { $elemMatch: { userId: req.body.userId } },
    });
    if (alreadyReg.applications.length) {
      return res.status(409).send({ errorMsg: "Already registered" });
    }
    await Job.findByIdAndUpdate(
      id,
      {
        $push: { applications: { userId: req.body.userId } },
      },
      { safe: true, upsert: true }
    );
    return res.status(200).send({ msg: "Applied Successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ errorMsg: err.message });
  }
};
