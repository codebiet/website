const Project = require('../../models/projectModal')

module.exports = async(req,res) => {
  const projectId = req.params.project_id

  try {
    let result = await Project.deleteOne({_id:projectId})
    res.status(202).send(result)
  } catch(err) {
    console.log(err)
    return res.status(406).send({ errorMsg: err.message })
  }
}