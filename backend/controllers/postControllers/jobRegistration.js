const Job = require('../../models/job')

module.exports = async(req,res) => {
  const id = req.params.id;
  let userName = req.body.userName
  let email = req.body.email
  let skills = req.body.skills
  let contactNumber = req.body.contactNumber
  let resume = req.body.resume
  console.log('called',userName,email,contactNumber)
  if (!userName || !email || !contactNumber)
    return res.status(406).send({ errorMsg: "Please fill in all the fields!" })

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email))
    return res.status(406).send({ errorMsg: "Invalid Email!" })

  let application = {userName:userName,email:email,skills:skills,contactNumber:contactNumber,resume:resume}

  try {

    let app = await Job.find({_id:id,
      applications:{$elemMatch: {email:email}}
    })

    if(app.length) {
      return res.status(400).send({ errorMsg: "This user is already registered!" });
    }

    await Job.findByIdAndUpdate(id,{
      $push : {applications:application}},
    { safe: true, upsert: true },)

    return res.status(200).send({msg:"Applied Successfully"})
  } catch(err) {
    console.log(err.message)
    return res.status(500).send({ errorMsg: err.message })
  }
}