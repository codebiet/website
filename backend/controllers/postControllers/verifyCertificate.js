const Certificate = require('../../models/certificateModal');

const verifyCertificate = async (req,res) => {
    const {certificateNumber} = req.body;
    console.log(certificateNumber);
    if(!certificateNumber) return res.status(400).send({errorMsg:"Certificate Number required!"});
    else if(certificateNumber.length != 24) return res.status(400).send({errorMsg:"Invalid Certificate Number"});
    let certificate;
    try{
      certificate = await Certificate.findById(certificateNumber);
    }
    catch(err){
        console.log(err);
        return res.status(500).send({errorMsg:"Internal Server Error!"});
    }
    if(!certificate) return res.status(400).send({errorMsg:"Certificate Not Found"});
    return res.status(200).send({certificateData:certificate});
}
module.exports = verifyCertificate