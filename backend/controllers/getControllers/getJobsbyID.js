const Job = require('../../models/job')

module.exports = async(req,res) => {
  try {
    let job = await Job.findById(req.params.id)
    return res.status(200).send(job)
  } catch(err) {
    return res.status(500).send({ errorMsg: err.message })
  }
}