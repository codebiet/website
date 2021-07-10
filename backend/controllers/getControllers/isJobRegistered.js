const Job = require('../../models/job')

module.exports = async(req,res) => {
  const id = req.params.id;

  try {
    const alreadyReg = await Job.findById(id,{applications:{$elemMatch:{userId:req.body.userId}}})
    if(alreadyReg.applications.length) {
      return res.send({registered:true})
    }
    return res.send({registered:false})
  } catch(err) {
    console.log(err.message)
    return res.status(500).send({ errorMsg: err.message })
  }
}